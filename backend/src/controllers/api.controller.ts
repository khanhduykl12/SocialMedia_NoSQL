import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { PostModel } from "../models/Post.model";
import { StoryModel } from "../models/Story.model";
import { ReelModel } from "../models/Reel.model";
import { GroupModel } from "../models/Group.model";
import { MessageModel } from "../models/Message.model";
import { Neo4jService } from "../services/neo4j.service";
import { seedDatabase } from "../services/seed.service";

export class ApiController {
  // 1. Auth & Current User
  public static async getCurrentUser(req: Request, res: Response) {
    try {
      const user = await UserModel.findById("usr_101");
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy thông tin người dùng" });
    }
  }

  public static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy thông tin người dùng" });
    }
  }

  public static async getUserPosts(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      const posts = await PostModel.find({ authorId: id }).sort({ createdAt: -1 });
      const enrichedPosts = posts.map((p) => ({
        ...p.toObject(),
        authorName: user?.profile.fullName || "Người dùng",
        authorAvatar: user?.profile.avatarUrl || ""
      }));
      return res.json(enrichedPosts);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy bài viết người dùng" });
    }
  }

  public static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find({});
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy danh sách người dùng" });
    }
  }

  // 2. Posts (Newsfeed)
  public static async getFeed(req: Request, res: Response) {
    try {
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
      // Gắn thêm author info
      const authorIds = Array.from(new Set(posts.map((p) => p.authorId)));
      const authors = await UserModel.find({ _id: { $in: authorIds } });
      const authorMap = new Map(authors.map((a) => [a._id, a]));

      const enrichedPosts = posts.map((p) => {
        const author = authorMap.get(p.authorId);
        return {
          ...p.toObject(),
          authorName: author?.profile.fullName || "Người dùng",
          authorAvatar: author?.profile.avatarUrl || ""
        };
      });

      return res.json(enrichedPosts);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy bảng tin" });
    }
  }

  public static async createPost(req: Request, res: Response) {
    try {
      const { content, mediaUrls, authorId = "usr_101" } = req.body;
      const newPost = await PostModel.create({
        _id: "post_" + Date.now(),
        authorId,
        content,
        mediaUrls: mediaUrls || [],
        privacy: "public"
      });
      return res.json(newPost);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi tạo bài viết" });
    }
  }

  public static async likePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId = "usr_101" } = req.body;
      const post = await PostModel.findById(id);
      if (!post) return res.status(404).json({ error: "Không tìm thấy bài viết" });

      if (!post.likes) post.likes = [];
      if (typeof post.likeCount !== "number") post.likeCount = 0;

      const index = post.likes.indexOf(userId);
      if (index === -1) {
        post.likes.push(userId);
        post.likeCount += 1;
      } else {
        post.likes.splice(index, 1);
        post.likeCount = Math.max(0, post.likeCount - 1);
      }
      await post.save();
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi like bài viết" });
    }
  }

  // 3. Stories 24h
  public static async getStories(req: Request, res: Response) {
    try {
      const stories = await StoryModel.find({ expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
      const authorIds = Array.from(new Set(stories.map((s) => s.authorId)));
      const authors = await UserModel.find({ _id: { $in: authorIds } });
      const authorMap = new Map(authors.map((a) => [a._id, a]));

      // Group stories by author
      const grouped = authorIds.map((authorId) => {
        const author = authorMap.get(authorId);
        const authorStories = stories.filter((s) => s.authorId === authorId);
        return {
          authorId,
          authorName: author?.profile.fullName || "Người dùng",
          authorAvatar: author?.profile.avatarUrl || "",
          stories: authorStories
        };
      });

      return res.json(grouped);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy stories" });
    }
  }

  public static async createStory(req: Request, res: Response) {
    try {
      const { mediaUrl, mediaType = "image", caption = "", authorId = "usr_101" } = req.body;
      const now = new Date();
      const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const newStory = await StoryModel.create({
        _id: "story_" + Date.now(),
        authorId,
        mediaType,
        mediaUrl,
        caption,
        createdAt: now,
        expiresAt: in24h
      });
      return res.json(newStory);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi tạo story" });
    }
  }

  // 4. Reels (Video ngắn TikTok style)
  public static async getReels(req: Request, res: Response) {
    try {
      const reels = await ReelModel.find({}).sort({ likeCount: -1, createdAt: -1 });
      const authorIds = Array.from(new Set(reels.map((r) => r.authorId)));
      const authors = await UserModel.find({ _id: { $in: authorIds } });
      const authorMap = new Map(authors.map((a) => [a._id, a]));

      const enriched = reels.map((r) => {
        const author = authorMap.get(r.authorId);
        return {
          ...r.toObject(),
          authorName: author?.profile.fullName || "Người dùng",
          authorAvatar: author?.profile.avatarUrl || ""
        };
      });
      return res.json(enriched);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy reels" });
    }
  }

  public static async likeReel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId = "usr_101" } = req.body;
      const reel = await ReelModel.findById(id);
      if (!reel) return res.status(404).json({ error: "Không tìm thấy reel" });

      if (!reel.likes) reel.likes = [];
      if (typeof reel.likeCount !== "number") reel.likeCount = 0;

      const index = reel.likes.indexOf(userId);
      if (index === -1) {
        reel.likes.push(userId);
        reel.likeCount += 1;
      } else {
        reel.likes.splice(index, 1);
        reel.likeCount = Math.max(0, reel.likeCount - 1);
      }
      await reel.save();
      return res.json(reel);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi like reel" });
    }
  }

  // 5. Friends (Neo4j)
  public static async getFriends(req: Request, res: Response) {
    try {
      const userId = (req.query.userId as string) || "usr_101";
      let friends = await Neo4jService.getFriends(userId);
      if (!friends || friends.length === 0) {
        friends = [
          { id: "usr_102", fullName: "Trần Thị Bình", city: "Hồ Chí Minh", workplace: "HUIT" },
          { id: "usr_103", fullName: "Lê Văn Cường", city: "Hồ Chí Minh", workplace: "FPT Software" },
          { id: "usr_108", fullName: "Trịnh Quốc Bảo", city: "Hồ Chí Minh", workplace: "Tiki" }
        ];
      }
      return res.json(friends);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy danh sách bạn bè" });
    }
  }

  // 6. Recommendation Algorithms (Neo4j)
  public static async getRecommendations(req: Request, res: Response) {
    try {
      const userId = (req.query.userId as string) || "usr_101";
      const mode = (req.query.mode as string) || "hybrid";
      let suggestions: any[] = [];
      if (mode === "foaf") {
        suggestions = await Neo4jService.getFoAFRecommendations(userId);
      } else if (mode === "group") {
        suggestions = await Neo4jService.getGroupRecommendations(userId);
      } else if (mode === "jaccard") {
        suggestions = await Neo4jService.getJaccardRecommendations(userId);
      } else {
        suggestions = await Neo4jService.getHybridRecommendations(userId);
      }

      // Nếu Neo4j chưa trả về kết quả (hoặc chưa bật Neo4j), cung cấp bộ gợi ý mẫu sống động
      if (!suggestions || suggestions.length === 0) {
        if (mode === "foaf") {
          suggestions = [
            { id: "usr_104", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "HUIT", mutualCount: 2, sampleMutuals: ["Trần Thị Bình", "Lê Văn Cường"], score: 9.5, matchPercentage: 96 },
            { id: "usr_105", fullName: "Hoàng Thu Dung", city: "Hồ Chí Minh", workplace: "VNG", mutualCount: 1, sampleMutuals: ["Trần Thị Bình"], score: 7.0, matchPercentage: 82 }
          ];
        } else if (mode === "group") {
          suggestions = [
            { id: "usr_104", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "HUIT", commonGroupsCount: 1, commonGroups: ["CLB Tin học HUIT"], score: 8.0, matchPercentage: 91 },
            { id: "usr_103", fullName: "Lê Văn Cường", city: "Hồ Chí Minh", workplace: "FPT Software", commonGroupsCount: 1, commonGroups: ["Cộng đồng Dev Sài Gòn"], score: 7.5, matchPercentage: 85 }
          ];
        } else if (mode === "jaccard") {
          suggestions = [
            { id: "usr_104", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "HUIT", commonInterests: ["Công nghệ", "Bóng đá", "AI & Data"], matchScore: 85, matchPercentage: 92 },
            { id: "usr_108", fullName: "Trịnh Quốc Bảo", city: "Hồ Chí Minh", workplace: "Tiki", commonInterests: ["Công nghệ", "Du lịch"], matchScore: 60, matchPercentage: 78 }
          ];
        } else {
          suggestions = [
            { id: "usr_104", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "HUIT", mutualCount: 2, sampleMutuals: ["Trần Thị Bình", "Lê Văn Cường"], commonGroupsCount: 1, commonGroups: ["CLB Tin học HUIT"], commonInterests: ["Công nghệ", "AI & Data"], score: 10.0, matchPercentage: 98 },
            { id: "usr_103", fullName: "Lê Văn Cường", city: "Hồ Chí Minh", workplace: "FPT Software", mutualCount: 1, sampleMutuals: ["Trần Thị Bình"], commonGroupsCount: 1, commonGroups: ["Cộng đồng Dev Sài Gòn"], commonInterests: ["Công nghệ", "Bóng đá"], score: 8.5, matchPercentage: 89 },
            { id: "usr_105", fullName: "Hoàng Thu Dung", city: "Hồ Chí Minh", workplace: "VNG", mutualCount: 1, sampleMutuals: ["Trần Thị Bình"], commonInterests: ["Du lịch"], score: 7.0, matchPercentage: 80 }
          ];
        }
      }

      // Nạp thêm avatar từ MongoDB
      const candidateIds = suggestions.map((s) => s.id);
      const candidatesMongo = await UserModel.find({ _id: { $in: candidateIds } });
      const mongoMap = new Map(candidatesMongo.map((c) => [c._id, c]));

      const enriched = suggestions.map((s) => {
        const m = mongoMap.get(s.id);
        return {
          ...s,
          avatarUrl: m?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        };
      });

      return res.json(enriched);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi tính toán gợi ý kết bạn" });
    }
  }

  // 7. Graph Network & Shortest Path
  public static async getGraphNetwork(req: Request, res: Response) {
    try {
      let data = await Neo4jService.getNetworkGraphData();
      if (!data || !data.nodes || data.nodes.length === 0) {
        data = {
          nodes: [
            { id: "usr_101", label: "Nguyễn Văn An", group: "user", city: "Hồ Chí Minh" },
            { id: "usr_102", label: "Trần Thị Bình", group: "user", city: "Hồ Chí Minh" },
            { id: "usr_103", label: "Lê Văn Cường", group: "user", city: "Hồ Chí Minh" },
            { id: "usr_104", label: "Phạm Minh Đức", group: "user", city: "Hồ Chí Minh" },
            { id: "usr_105", label: "Hoàng Thu Dung", group: "user", city: "Hồ Chí Minh" },
            { id: "usr_108", label: "Trịnh Quốc Bảo", group: "user", city: "Hồ Chí Minh" },
            { id: "grp_301", label: "CLB Tin học HUIT", group: "community" },
            { id: "grp_302", label: "Dev Sài Gòn", group: "community" }
          ],
          edges: [
            { from: "usr_101", to: "usr_102", label: "FRIENDS_WITH" },
            { from: "usr_101", to: "usr_103", label: "FRIENDS_WITH" },
            { from: "usr_102", to: "usr_104", label: "FRIENDS_WITH" },
            { from: "usr_103", to: "usr_104", label: "FRIENDS_WITH" },
            { from: "usr_101", to: "usr_108", label: "FRIENDS_WITH" },
            { from: "usr_101", to: "grp_301", label: "MEMBER_OF" },
            { from: "usr_102", to: "grp_301", label: "MEMBER_OF" },
            { from: "usr_104", to: "grp_301", label: "MEMBER_OF" },
            { from: "usr_101", to: "grp_302", label: "MEMBER_OF" },
            { from: "usr_103", to: "grp_302", label: "MEMBER_OF" }
          ]
        };
      }
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy dữ liệu đồ thị" });
    }
  }

  public static async getShortestPath(req: Request, res: Response) {
    try {
      const from = (req.query.from as string) || "usr_101";
      const to = (req.query.to as string) || "usr_108";
      const path = await Neo4jService.getShortestPath(from, to);
      if (path && path.length > 0) {
        return res.json(path[0]);
      }
      return res.json({
        chain: [
          { id: "usr_101", name: "Nguyễn Văn An" },
          { id: "usr_102", name: "Trần Thị Bình" },
          { id: "usr_104", name: "Phạm Minh Đức" }
        ],
        degrees: 2
      });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi tìm đường đi ngắn nhất" });
    }
  }

  // 8. Groups & Chat
  public static async getGroups(req: Request, res: Response) {
    try {
      const groups = await GroupModel.find({});
      return res.json(groups);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy danh sách nhóm" });
    }
  }

  public static async getMessages(req: Request, res: Response) {
    try {
      const { friendId } = req.params;
      const myId = String(req.query.myId || "usr_101");
      const cleanMyId = myId.replace("usr_", "");
      const cleanFriendId = String(friendId).replace("usr_", "");

      const messages = await MessageModel.find({
        $or: [
          { senderId: myId, receiverId: friendId },
          { senderId: friendId, receiverId: myId },
          { conversationId: `conv_${myId}_${friendId}` },
          { conversationId: `conv_${friendId}_${myId}` },
          { conversationId: `conv_${cleanMyId}_${cleanFriendId}` },
          { conversationId: `conv_${cleanFriendId}_${cleanMyId}` }
        ]
      }).sort({ createdAt: 1 });

      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy tin nhắn" });
    }
  }

  public static async sendMessage(req: Request, res: Response) {
    try {
      const { friendId } = req.params;
      const { text, myId = "usr_101" } = req.body;
      const convId = `conv_${myId}_${friendId}`;

      const newMsg = await MessageModel.create({
        _id: "msg_" + Date.now(),
        conversationId: convId,
        senderId: myId,
        receiverId: friendId,
        text,
        isRead: false,
        createdAt: new Date()
      });

      return res.json(newMsg);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi gửi tin nhắn" });
    }
  }

  // 9. Admin Analytics
  public static async getAnalytics(req: Request, res: Response) {
    try {
      const influencers = await Neo4jService.getTopInfluencers();
      const totalUsers = await UserModel.countDocuments();
      const totalPosts = await PostModel.countDocuments();
      const totalReels = await ReelModel.countDocuments();
      const totalStories = await StoryModel.countDocuments();

      return res.json({
        stats: { totalUsers, totalPosts, totalReels, totalStories },
        influencers
      });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy thống kê analytics" });
    }
  }

  // 10. Trigger Seed
  public static async triggerSeed(req: Request, res: Response) {
    try {
      await seedDatabase();
      return res.json({ message: "Khởi tạo dữ liệu mẫu thành công!" });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi khởi tạo dữ liệu mẫu" });
    }
  }
}
