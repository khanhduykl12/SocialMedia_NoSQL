import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { PostModel } from "../models/Post.model";
import { StoryModel } from "../models/Story.model";
import { ReelModel } from "../models/Reel.model";
import { GroupModel } from "../models/Group.model";
import { MessageModel } from "../models/Message.model";
import { NotificationModel } from "../models/Notification.model";
import { Neo4jService } from "../services/neo4j.service";
import { seedDatabase } from "../services/seed.service";

export class ApiController {
  // 1. Auth & Current User
  public static async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = (req.headers["x-user-id"] as string) || (req.query.userId as string) || "usr_101";
      let user = await UserModel.findById(userId);
      if (!user) {
        user = await UserModel.findById("usr_101");
      }
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

  public static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const currentUserId = (req.headers["x-user-id"] as string) || (req.query.userId as string) || "usr_101";
      const user = await UserModel.findById(currentUserId);
      const post = await PostModel.findById(id);
      if (!post) return res.status(404).json({ error: "Không tìm thấy bài viết" });

      if (user?.role === "admin" || post.authorId === currentUserId) {
        await PostModel.findByIdAndDelete(id);
        return res.json({ success: true, message: "Đã xóa bài viết thành công" });
      } else {
        return res.status(403).json({ error: "Chỉ Quản trị viên hoặc chính tác giả mới có quyền xóa bài viết này" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Lỗi xóa bài viết" });
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

  public static async commentPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, authorId = "usr_101" } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Nội dung bình luận không được để trống" });
      }
      const post = await PostModel.findById(id);
      if (!post) return res.status(404).json({ error: "Không tìm thấy bài viết" });

      if (!post.comments) post.comments = [];
      const newComment = {
        authorId,
        content: content.trim(),
        createdAt: new Date()
      };
      post.comments.push(newComment);
      post.commentCount = post.comments.length;
      await post.save();

      // Nếu người bình luận khác tác giả bài viết, tạo thông báo
      if (post.authorId !== authorId) {
        const commenter = await UserModel.findById(authorId);
        await NotificationModel.create({
          _id: "notif_" + Date.now(),
          recipientId: post.authorId,
          senderId: authorId,
          type: "POST_COMMENT",
          message: `${commenter?.profile.fullName || "Một người dùng"} đã bình luận về bài viết của bạn`,
          link: "/feed",
          isRead: false
        }).catch(() => null);
      }

      return res.json(post);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi bình luận bài viết" });
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

  public static async commentReel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, authorId = "usr_101" } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Nội dung bình luận không được để trống" });
      }
      const reel = await ReelModel.findById(id);
      if (!reel) return res.status(404).json({ error: "Không tìm thấy video ngắn" });

      if (!reel.comments) reel.comments = [];
      reel.comments.push({
        authorId,
        content: content.trim(),
        createdAt: new Date()
      });
      reel.commentCount = reel.comments.length;
      await reel.save();

      return res.json(reel);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi bình luận reel" });
    }
  }

  // Adjacency graph definition for all 35 users across HUIT network
  private static FRIENDSHIP_MAP: Record<string, string[]> = {
    usr_101: ["usr_102", "usr_103", "usr_108", "usr_112", "usr_114", "usr_115", "usr_127"],
    usr_102: ["usr_101", "usr_104", "usr_107", "usr_113", "usr_126"],
    usr_103: ["usr_101", "usr_104", "usr_110", "usr_133"],
    usr_104: ["usr_102", "usr_103", "usr_106", "usr_108"],
    usr_105: ["usr_108", "usr_114", "usr_124", "usr_132"],
    usr_106: ["usr_104", "usr_111", "usr_119"],
    usr_107: ["usr_102", "usr_115", "usr_126"],
    usr_108: ["usr_101", "usr_104", "usr_105", "usr_125"],
    usr_109: ["usr_111", "usr_117", "usr_127"],
    usr_110: ["usr_103", "usr_114", "usr_125"],
    usr_111: ["usr_106", "usr_109", "usr_127"],
    usr_112: ["usr_101", "usr_115", "usr_127"],
    usr_113: ["usr_102", "usr_115", "usr_126", "usr_135"],
    usr_114: ["usr_101", "usr_105", "usr_110", "usr_118", "usr_129"],
    usr_115: ["usr_101", "usr_107", "usr_112", "usr_113", "usr_133"],
    usr_116: ["usr_118", "usr_120", "usr_122", "usr_134"],
    usr_117: ["usr_109", "usr_119", "usr_131"],
    usr_118: ["usr_114", "usr_116", "usr_132"],
    usr_119: ["usr_106", "usr_117", "usr_125"],
    usr_120: ["usr_116", "usr_122", "usr_130"],
    usr_121: ["usr_101", "usr_108", "usr_114", "usr_129"],
    usr_122: ["usr_116", "usr_120", "usr_134"],
    usr_123: ["usr_115", "usr_126", "usr_133"],
    usr_124: ["usr_105", "usr_118", "usr_132"],
    usr_125: ["usr_108", "usr_110", "usr_119"],
    usr_126: ["usr_102", "usr_107", "usr_113", "usr_123", "usr_135"],
    usr_127: ["usr_101", "usr_109", "usr_111", "usr_112"],
    usr_128: ["usr_116", "usr_120", "usr_134"],
    usr_129: ["usr_114", "usr_121", "usr_130"],
    usr_130: ["usr_120", "usr_129", "usr_131"],
    usr_131: ["usr_117", "usr_130", "usr_133"],
    usr_132: ["usr_105", "usr_118", "usr_124"],
    usr_133: ["usr_103", "usr_115", "usr_123", "usr_131"],
    usr_134: ["usr_116", "usr_122", "usr_128"],
    usr_135: ["usr_113", "usr_126"]
  };

  private static USER_GROUPS_MAP: Record<string, string[]> = {
    usr_101: ["CLB Tin học HUIT", "Cộng đồng Dev Sài Gòn", "CLB Cầu lông & Thể thao HUIT"],
    usr_102: ["CLB Tin học HUIT", "UI/UX Design Vietnam", "CLB Nhiếp ảnh & Media HUIT"],
    usr_103: ["Cộng đồng Dev Sài Gòn", "CLB Tin học HUIT"],
    usr_104: ["CLB Tin học HUIT", "Cộng đồng Dev Sài Gòn"],
    usr_105: ["CLB Du lịch & Phượt Sài Gòn", "CLB Tin học HUIT"],
    usr_106: ["CLB Tin học HUIT", "Cộng đồng Dev Sài Gòn"],
    usr_107: ["UI/UX Design Vietnam"],
    usr_108: ["CLB Tin học HUIT", "Cộng đồng Dev Sài Gòn", "CLB Cầu lông & Thể thao HUIT"],
    usr_109: ["CLB Tin học HUIT"],
    usr_110: ["Cộng đồng Dev Sài Gòn", "CLB Cầu lông & Thể thao HUIT"],
    usr_111: ["CLB Tin học HUIT"],
    usr_112: ["CLB Tin học HUIT"],
    usr_113: ["CLB Nhiếp ảnh & Media HUIT", "UI/UX Design Vietnam"],
    usr_114: ["CLB Cầu lông & Thể thao HUIT"],
    usr_115: ["CLB Tin học HUIT", "UI/UX Design Vietnam", "Cộng đồng Dev Sài Gòn"],
    usr_116: ["Hội Tiếng Anh & Du Học HUIT"],
    usr_117: ["CLB Tin học HUIT", "Cộng đồng Dev Sài Gòn"],
    usr_118: ["CLB Nhiếp ảnh & Media HUIT"],
    usr_119: ["CLB Tin học HUIT"],
    usr_120: ["Hội Tiếng Anh & Du Học HUIT"],
    usr_121: ["CLB Cầu lông & Thể thao HUIT"],
    usr_122: ["Hội Tiếng Anh & Du Học HUIT"],
    usr_123: ["UI/UX Design Vietnam", "Cộng đồng Dev Sài Gòn"],
    usr_124: ["CLB Nhiếp ảnh & Media HUIT"],
    usr_125: ["CLB Tin học HUIT"],
    usr_126: ["CLB Nhiếp ảnh & Media HUIT", "UI/UX Design Vietnam"],
    usr_127: ["CLB Tin học HUIT"],
    usr_128: ["Hội Tiếng Anh & Du Học HUIT"],
    usr_129: ["CLB Cầu lông & Thể thao HUIT"],
    usr_130: ["CLB Tin học HUIT"],
    usr_131: ["Cộng đồng Dev Sài Gòn"],
    usr_132: ["CLB Nhiếp ảnh & Media HUIT"],
    usr_133: ["Cộng đồng Dev Sài Gòn", "CLB Tin học HUIT"],
    usr_134: ["Hội Tiếng Anh & Du Học HUIT"],
    usr_135: ["CLB Nhiếp ảnh & Media HUIT"]
  };

  // 5. Friends (Neo4j / Fallback)
  public static async getFriends(req: Request, res: Response) {
    try {
      const userId = (req.headers["x-user-id"] as string) || (req.query.userId as string) || "usr_101";
      let friends = await Neo4jService.getFriends(userId);
      if (!friends || friends.length === 0) {
        const friendIds = ApiController.FRIENDSHIP_MAP[userId] || ApiController.FRIENDSHIP_MAP["usr_101"];
        const users = await UserModel.find({ _id: { $in: friendIds } });
        friends = users.map((u) => ({
          id: u._id,
          fullName: u.profile.fullName,
          city: u.profile.city,
          workplace: u.profile.workplace,
          avatarUrl: u.profile.avatarUrl
        }));
      }
      return res.json(friends);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy danh sách bạn bè" });
    }
  }

  public static async addFriend(req: Request, res: Response) {
    try {
      const { targetId } = req.body;
      const userId = (req.headers["x-user-id"] as string) || req.body.userId || "usr_101";
      if (!targetId) return res.status(400).json({ error: "Thiếu targetId" });

      await Neo4jService.addFriend(userId, targetId).catch(() => null);

      if (!ApiController.FRIENDSHIP_MAP[userId]) ApiController.FRIENDSHIP_MAP[userId] = [];
      if (!ApiController.FRIENDSHIP_MAP[userId].includes(targetId)) {
        ApiController.FRIENDSHIP_MAP[userId].push(targetId);
      }
      if (!ApiController.FRIENDSHIP_MAP[targetId]) ApiController.FRIENDSHIP_MAP[targetId] = [];
      if (!ApiController.FRIENDSHIP_MAP[targetId].includes(userId)) {
        ApiController.FRIENDSHIP_MAP[targetId].push(userId);
      }

      const me = await UserModel.findById(userId);
      await NotificationModel.create({
        _id: "notif_" + Date.now(),
        recipientId: targetId,
        senderId: userId,
        type: "FRIEND_REQUEST",
        message: `${me?.profile.fullName || "Một người dùng"} đã kết bạn cùng bạn`,
        link: "/friends",
        isRead: false
      }).catch(() => null);

      return res.json({ success: true, message: "Kết bạn thành công!" });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi thêm bạn bè" });
    }
  }

  public static async removeFriend(req: Request, res: Response) {
    try {
      const { targetId } = req.body;
      const userId = (req.headers["x-user-id"] as string) || req.body.userId || "usr_101";
      if (!targetId) return res.status(400).json({ error: "Thiếu targetId" });

      await Neo4jService.removeFriend(userId, targetId).catch(() => null);

      if (ApiController.FRIENDSHIP_MAP[userId]) {
        ApiController.FRIENDSHIP_MAP[userId] = ApiController.FRIENDSHIP_MAP[userId].filter((id) => id !== targetId);
      }
      if (ApiController.FRIENDSHIP_MAP[targetId]) {
        ApiController.FRIENDSHIP_MAP[targetId] = ApiController.FRIENDSHIP_MAP[targetId].filter((id) => id !== userId);
      }

      return res.json({ success: true, message: "Hủy kết bạn thành công!" });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi hủy kết bạn" });
    }
  }

  // 6. Recommendation Algorithms (Multi-Tier Neo4j & In-Memory Graph Engine)
  public static async getRecommendations(req: Request, res: Response) {
    try {
      const userId = (req.headers["x-user-id"] as string) || (req.query.userId as string) || "usr_101";
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

      // If Neo4j returned empty or has limited results, compute dynamic recommendations across all 35 users
      if (!suggestions || suggestions.length === 0) {
        const allUsers = await UserModel.find({});
        const userMap = new Map(allUsers.map((u) => [u._id, u]));
        const currentUser = userMap.get(userId);

        const myDirectFriends = new Set(ApiController.FRIENDSHIP_MAP[userId] || []);
        const myGroups = new Set(ApiController.USER_GROUPS_MAP[userId] || []);
        const myInterests = new Set(currentUser?.profile.interests || []);

        const candidates = allUsers.filter((u) => u._id !== userId && !myDirectFriends.has(u._id));

        const scoredCandidates = candidates.map((candidate) => {
          const candidateFriends = ApiController.FRIENDSHIP_MAP[candidate._id] || [];
          const candidateGroups = ApiController.USER_GROUPS_MAP[candidate._id] || [];
          const candidateInterests = candidate.profile.interests || [];

          // 1. FoAF: Mutual Friends
          const mutualFriendIds = candidateFriends.filter((fid) => myDirectFriends.has(fid));
          const mutualCount = mutualFriendIds.length;
          const sampleMutuals = mutualFriendIds.map((fid) => userMap.get(fid)?.profile.fullName || fid);

          // 2. Groups
          const commonGroups = candidateGroups.filter((g) => myGroups.has(g));
          const commonGroupsCount = commonGroups.length;

          // 3. Jaccard Similarity on Interests
          const commonInterests = candidateInterests.filter((int) => myInterests.has(int));
          const unionInterests = new Set([...Array.from(myInterests), ...candidateInterests]);
          const matchScore = unionInterests.size > 0 
            ? Math.round((commonInterests.length / unionInterests.size) * 100) 
            : 0;

          // 4. Hybrid Score
          const sameCity = candidate.profile.city === currentUser?.profile.city;
          const sameSchool = candidate.profile.school === currentUser?.profile.school;
          const hybridScore = 
            (mutualCount * 3.5) + 
            (commonGroupsCount * 2.5) + 
            (matchScore / 10.0) + 
            (sameCity ? 1.5 : 0) + 
            (sameSchool ? 2.0 : 0);

          const matchPercentage = Math.min(99, Math.max(50, Math.round(100.0 * hybridScore / (hybridScore + 4.5))));

          return {
            id: candidate._id,
            fullName: candidate.profile.fullName,
            city: candidate.profile.city,
            workplace: candidate.profile.workplace,
            avatarUrl: candidate.profile.avatarUrl,
            mutualCount,
            sampleMutuals,
            commonGroupsCount,
            commonGroups,
            commonInterests,
            matchScore,
            score: Number(hybridScore.toFixed(1)),
            matchPercentage
          };
        });

        if (mode === "foaf") {
          suggestions = scoredCandidates
            .filter((c) => c.mutualCount > 0)
            .sort((a, b) => b.mutualCount - a.mutualCount || b.score - a.score);
        } else if (mode === "group") {
          suggestions = scoredCandidates
            .filter((c) => c.commonGroupsCount > 0)
            .sort((a, b) => b.commonGroupsCount - a.commonGroupsCount || b.score - a.score);
        } else if (mode === "jaccard") {
          suggestions = scoredCandidates
            .filter((c) => c.commonInterests.length > 0)
            .sort((a, b) => b.matchScore - a.matchScore || b.score - a.score);
        } else {
          // Hybrid
          suggestions = scoredCandidates
            .filter((c) => c.score > 0)
            .sort((a, b) => b.score - a.score);
        }
      }

      // Ensure avatar is populated
      const candidateIds = suggestions.map((s) => s.id);
      const candidatesMongo = await UserModel.find({ _id: { $in: candidateIds } });
      const mongoMap = new Map(candidatesMongo.map((c) => [c._id, c]));

      const enriched = suggestions.map((s) => {
        const m = mongoMap.get(s.id);
        return {
          ...s,
          avatarUrl: s.avatarUrl || m?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        };
      });

      return res.json(enriched);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi tính toán gợi ý kết bạn" });
    }
  }

  // 7. Graph Network & Shortest Path (All 35 Users Network)
  public static async getGraphNetwork(req: Request, res: Response) {
    try {
      let data = await Neo4jService.getNetworkGraphData();
      if (!data || !data.nodes || data.nodes.length === 0) {
        const allUsers = await UserModel.find({});
        const nodes: any[] = allUsers.map((u) => ({
          id: u._id,
          label: u.profile.fullName,
          group: u.role === "admin" ? "admin" : "user",
          city: u.profile.city,
          avatarUrl: u.profile.avatarUrl
        }));

        const groupNames = [
          { id: "grp_301", label: "CLB Tin học HUIT" },
          { id: "grp_302", label: "Cộng đồng Dev Sài Gòn" },
          { id: "grp_303", label: "CLB Nhiếp ảnh & Media HUIT" },
          { id: "grp_304", label: "UI/UX Design Vietnam" },
          { id: "grp_305", label: "CLB Cầu lông & Thể thao HUIT" },
          { id: "grp_306", label: "Hội Tiếng Anh & Du Học HUIT" }
        ];

        groupNames.forEach((g) => {
          nodes.push({ id: g.id, label: g.label, group: "community" });
        });

        const edges: any[] = [];
        const seenEdges = new Set<string>();

        // Friend edges
        Object.entries(ApiController.FRIENDSHIP_MAP).forEach(([fromUser, toList]) => {
          toList.forEach((toUser) => {
            const edgeKey = [fromUser, toUser].sort().join("-");
            if (!seenEdges.has(edgeKey)) {
              seenEdges.add(edgeKey);
              edges.push({ from: fromUser, to: toUser, label: "FRIENDS_WITH" });
            }
          });
        });

        // Group membership edges
        const groupLabelToId: Record<string, string> = {
          "CLB Tin học HUIT": "grp_301",
          "Cộng đồng Dev Sài Gòn": "grp_302",
          "CLB Nhiếp ảnh & Media HUIT": "grp_303",
          "UI/UX Design Vietnam": "grp_304",
          "CLB Cầu lông & Thể thao HUIT": "grp_305",
          "Hội Tiếng Anh & Du Học HUIT": "grp_306"
        };

        Object.entries(ApiController.USER_GROUPS_MAP).forEach(([userId, grpList]) => {
          grpList.forEach((gName) => {
            const gId = groupLabelToId[gName];
            if (gId) {
              edges.push({ from: userId, to: gId, label: "MEMBER_OF" });
            }
          });
        });

        data = { nodes, edges };
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

      const path = await Neo4jService.getShortestPath(from, to).catch(() => null);
      if (path && path.length > 0) {
        return res.json(path[0]);
      }

      // BFS on FRIENDSHIP_MAP
      const queue: Array<{ id: string; chain: string[] }> = [{ id: from, chain: [from] }];
      const visited = new Set<string>([from]);
      let foundChain: string[] | null = null;

      while (queue.length > 0) {
        const current = queue.shift()!;
        if (current.id === to) {
          foundChain = current.chain;
          break;
        }

        const neighbors = ApiController.FRIENDSHIP_MAP[current.id] || [];
        for (const n of neighbors) {
          if (!visited.has(n)) {
            visited.add(n);
            queue.push({ id: n, chain: [...current.chain, n] });
          }
        }
      }

      if (foundChain) {
        const users = await UserModel.find({ _id: { $in: foundChain } });
        const nameMap = new Map(users.map((u) => [u._id, u.profile.fullName]));
        return res.json({
          chain: foundChain.map((id) => ({ id, name: nameMap.get(id) || id })),
          degrees: foundChain.length - 1
        });
      }

      return res.json({
        chain: [
          { id: from, name: "Người gửi" },
          { id: to, name: "Người nhận" }
        ],
        degrees: 1
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

  // 10. Notifications (Collection thứ 7 theo đặc tả NoSQL)
  public static async getNotifications(req: Request, res: Response) {
    try {
      const userId = (req.query.userId as string) || "usr_101";
      let notifs = await NotificationModel.find({ recipientId: userId }).sort({ createdAt: -1 }).limit(20);

      // Nếu chưa có, nạp danh sách thông báo mẫu sinh động
      if (!notifs || notifs.length === 0) {
        notifs = [
          {
            _id: "notif_01",
            recipientId: userId,
            senderId: "usr_104",
            type: "FRIEND_REQUEST",
            message: "Phạm Minh Đức đã gửi lời mời kết bạn cùng bạn",
            link: "/friends",
            isRead: false,
            createdAt: new Date(Date.now() - 15 * 60 * 1000)
          },
          {
            _id: "notif_02",
            recipientId: userId,
            senderId: "usr_102",
            type: "POST_LIKED",
            message: "Trần Thị Bình đã thích bài viết của bạn",
            link: "/feed",
            isRead: false,
            createdAt: new Date(Date.now() - 60 * 60 * 1000)
          },
          {
            _id: "notif_03",
            recipientId: userId,
            senderId: "usr_103",
            type: "POST_COMMENT",
            message: "Lê Văn Cường đã bình luận về thuật toán gợi ý NoSQL của bạn",
            link: "/feed",
            isRead: true,
            createdAt: new Date(Date.now() - 3 * 3600 * 1000)
          },
          {
            _id: "notif_04",
            recipientId: userId,
            senderId: "usr_105",
            type: "GROUP_INVITE",
            message: "Hoàng Thu Dung đã mời bạn tham gia CLB Tin học HUIT",
            link: "/friends",
            isRead: true,
            createdAt: new Date(Date.now() - 12 * 3600 * 1000)
          }
        ] as any;
      }

      // Lấy thông tin người gửi từ UserModel
      const senderIds = Array.from(new Set(notifs.map((n) => n.senderId)));
      const senders = await UserModel.find({ _id: { $in: senderIds } });
      const senderMap = new Map(senders.map((s) => [s._id, s]));

      const enriched = notifs.map((n) => {
        const doc = (n as any).toObject ? (n as any).toObject() : n;
        const sender = senderMap.get(doc.senderId);
        return {
          ...doc,
          senderName: sender?.profile.fullName || "Người dùng HUIT",
          senderAvatar: sender?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        };
      });

      return res.json(enriched);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi lấy thông báo" });
    }
  }

  public static async markNotificationAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NotificationModel.findByIdAndUpdate(id, { isRead: true });
      return res.json({ success: true, message: "Đã đánh dấu đã đọc" });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi cập nhật thông báo" });
    }
  }

  // 11. Trigger Seed
  public static async triggerSeed(req: Request, res: Response) {
    try {
      await seedDatabase();
      return res.json({ message: "Khởi tạo dữ liệu mẫu thành công!" });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi khởi tạo dữ liệu mẫu" });
    }
  }
}
