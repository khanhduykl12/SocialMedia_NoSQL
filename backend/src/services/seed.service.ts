import { UserModel } from "../models/User.model";
import { PostModel } from "../models/Post.model";
import { StoryModel } from "../models/Story.model";
import { ReelModel } from "../models/Reel.model";
import { GroupModel } from "../models/Group.model";
import { MessageModel } from "../models/Message.model";
import { Neo4jService } from "./neo4j.service";

export const seedDatabase = async () => {
  console.log("🌱 [Seed] Bắt đầu khởi tạo dữ liệu mẫu phong phú...");

  // 1. Dọn dẹp dữ liệu MongoDB cũ
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});
  await StoryModel.deleteMany({});
  await ReelModel.deleteMany({});
  await GroupModel.deleteMany({});
  await MessageModel.deleteMany({});

  // 2. Nạp 12 Users phong phú
  const users = [
    {
      _id: "usr_101",
      username: "khanhduy",
      email: "duy.nguyen@gmail.com",
      passwordHash: "123456",
      role: "admin",
      profile: {
        fullName: "Nguyễn Khánh Duy",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        bio: "Sinh viên CNTT HUIT • Lập trình viên Fullstack & Nghiên cứu NoSQL",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Khoa CNTT - HUIT",
        interests: ["Công nghệ", "Bóng đá", "AI & Data"]
      }
    },
    {
      _id: "usr_102",
      username: "thibinh",
      email: "binh.tran@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Trần Thị Bình",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        bio: "UI/UX Designer • Yêu thích thiết kế tối giản và nhiếp ảnh đường phố 📸",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Goonly Studio",
        interests: ["Công nghệ", "UI/UX Design", "Âm nhạc"]
      }
    },
    {
      _id: "usr_103",
      username: "vancuong",
      email: "cuong.le@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Lê Văn Cường",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        bio: "Senior Backend Engineer • Yêu thích Distributed Systems & Cloud",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "FPT Software",
        interests: ["Công nghệ", "Bóng đá", "AI & Data"]
      }
    },
    {
      _id: "usr_104",
      username: "minhduc",
      email: "duc.pham@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Phạm Minh Đức",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
        bio: "Cloud & Database Architect • Đam mê đồ thị mạng xã hội Neo4j 🚀",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Khoa CNTT - HUIT",
        interests: ["Công nghệ", "Bóng đá", "AI & Data"]
      }
    },
    {
      _id: "usr_105",
      username: "thudung",
      email: "dung.hoang@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Hoàng Thu Dung",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        bio: "Data Analyst & Travel Blogger • Khám phá dữ liệu và thế giới ✈️",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "VNG Corporation",
        interests: ["Du lịch", "AI & Data", "Âm nhạc"]
      }
    },
    {
      _id: "usr_106",
      username: "hoangnam",
      email: "nam.do@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Đỗ Hoàng Nam",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        bio: "AI Engineer • Xây dựng các hệ thống gợi ý thông minh với Graph GNN",
        city: "Hà Nội",
        school: "Đại học Bách Khoa",
        workplace: "Zalo AI Lab",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_107",
      username: "thuylinh",
      email: "linh.vu@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Vũ Thùy Linh",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        bio: "Product Designer • Nghệ thuật typography và design systems tối giản",
        city: "Hồ Chí Minh",
        school: "Đại học Kiến Trúc",
        workplace: "MoMo Fintech",
        interests: ["UI/UX Design", "Âm nhạc", "Du lịch"]
      }
    },
    {
      _id: "usr_108",
      username: "quocbao",
      email: "bao.trinh@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Trịnh Quốc Bảo",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
        bio: "Mobile App Developer • React Native & Flutter Specialist",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Tiki Tech",
        interests: ["Công nghệ", "Du lịch", "Bóng đá"]
      }
    },
    {
      _id: "usr_109",
      username: "myhanh",
      email: "hanh.dinh@huit.edu.vn",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Đinh Mỹ Hạnh",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
        bio: "Giảng viên Khoa CNTT - HUIT • Nghiên cứu Cơ sở dữ liệu & Big Data",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Đại học Công Thương TP.HCM (HUIT)",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_110",
      username: "tuananh",
      email: "anh.bui@shopee.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Bùi Tuấn Anh",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
        bio: "DevOps & Site Reliability Engineer • Kubernetes & Cloud Native",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Shopee Vietnam",
        interests: ["Công nghệ", "Bóng đá"]
      }
    },
    {
      _id: "usr_111",
      username: "ngoclan",
      email: "lan.phan@viettel.vn",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Phan Ngọc Lan",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        bio: "Cybersecurity Specialist • Đam mê bảo mật dữ liệu phân tán",
        city: "Hà Nội",
        school: "Học viện Kỹ thuật Mật mã",
        workplace: "Viettel Cyber Security",
        interests: ["Công nghệ", "Âm nhạc"]
      }
    },
    {
      _id: "usr_112",
      username: "thanhtung",
      email: "tung.mai@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Mai Thanh Tùng",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        bio: "Sinh viên CNTT HUIT • Đang tìm kiếm cơ hội thực tập NoSQL",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "HUIT",
        interests: ["Công nghệ", "Bóng đá", "Du lịch"]
      }
    }
  ];

  await UserModel.insertMany(users);

  // 3. Nạp 4 Groups
  await GroupModel.insertMany([
    {
      _id: "grp_301",
      name: "CLB Tin học HUIT",
      description: "Câu lạc bộ học thuật & nghiên cứu công nghệ thông tin khoa CNTT HUIT",
      coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
      creatorId: "usr_101",
      memberCount: 8,
      privacy: "public"
    },
    {
      _id: "grp_302",
      name: "Cộng đồng Dev Sài Gòn",
      description: "Diễn đàn kết nối lập trình viên Fullstack, Backend & DevOps tại TP.HCM",
      coverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
      creatorId: "usr_103",
      memberCount: 12,
      privacy: "public"
    },
    {
      _id: "grp_303",
      name: "NoSQL & Big Data Lab",
      description: "Nhóm nghiên cứu chuyên sâu MongoDB, Neo4j, Redis và kiến trúc dữ liệu lớn",
      coverUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
      creatorId: "usr_104",
      memberCount: 6,
      privacy: "public"
    },
    {
      _id: "grp_304",
      name: "UI/UX Design Vietnam",
      description: "Không gian chia sẻ kiến thức thiết kế giao diện, trải nghiệm người dùng",
      coverUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600",
      creatorId: "usr_102",
      memberCount: 5,
      privacy: "public"
    }
  ]);

  // 4. Nạp Stories 24h
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  await StoryModel.insertMany([
    {
      _id: "story_01",
      authorId: "usr_102",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
      caption: "Cuối tuần dạo phố và lên ý tưởng UI mới 🌿",
      viewers: [{ userId: "usr_101", viewedAt: now }],
      viewCount: 12,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_02",
      authorId: "usr_104",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      caption: "Thuật toán FoAF trên Neo4j phản hồi siêu tốc! ⚡",
      viewers: [],
      viewCount: 18,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_03",
      authorId: "usr_105",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      caption: "Biển Phú Quốc mùa này trong xanh tuyệt đẹp 🌊",
      viewers: [],
      viewCount: 25,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_04",
      authorId: "usr_106",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
      caption: "AI model training checkpoint 95% accuracy 🤖",
      viewers: [],
      viewCount: 30,
      createdAt: now,
      expiresAt: in24h
    }
  ]);

  // 5. Nạp Reels Video
  await ReelModel.insertMany([
    {
      _id: "reel_01",
      authorId: "usr_102",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
      caption: "Một ngày làm việc của Designer tại Sài Gòn ☕✨",
      musicTitle: "Lofi Chill Beats - HUIT Studio",
      likes: ["usr_101", "usr_103", "usr_104"],
      likeCount: 148,
      comments: [
        { authorId: "usr_101", content: "Giao diện đẹp mắt quá bạn ơi!", createdAt: now }
      ],
      commentCount: 18,
      createdAt: now
    },
    {
      _id: "reel_02",
      authorId: "usr_104",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
      caption: "Demo thuật toán Shortest Path 6 bậc trong đồ thị Neo4j",
      musicTitle: "Tech Soundscapes 2026",
      likes: ["usr_101"],
      likeCount: 92,
      comments: [],
      commentCount: 8,
      createdAt: now
    }
  ]);

  // 6. Nạp 6 Posts Bảng tin
  await PostModel.insertMany([
    {
      _id: "post_01",
      authorId: "usr_102",
      content: "Olive energy and satin dreams 🌿 Cuối tuần bình yên bên tách cà phê và những dòng code NoSQL. Chuẩn bị cho buổi bảo vệ đồ án mạng xã hội sắp tới!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_103", "usr_104"],
      likeCount: 122,
      comments: [
        { authorId: "usr_101", content: "Ảnh chụp góc này nghệ thuật quá bạn!", createdAt: now },
        { authorId: "usr_104", content: "Chúc team mình bảo vệ đồ án đạt điểm tối đa nhé!", createdAt: now }
      ],
      commentCount: 28,
      createdAt: new Date(now.getTime() - 15 * 60000)
    },
    {
      _id: "post_02",
      authorId: "usr_104",
      content: "Vừa hoàn thiện xong hệ thống gợi ý kết bạn kết hợp Polyglot Persistence (MongoDB Lưu Trữ Feed + Neo4j Tính Toán Đồ Thị). Tốc độ tìm kiếm bạn chung FoAF đạt dưới 8ms! 🚀⚡",
      mediaUrls: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102"],
      likeCount: 89,
      comments: [
        { authorId: "usr_103", content: "Kiến trúc này chạy mượt mà và scale tốt đấy Đức!", createdAt: now }
      ],
      commentCount: 14,
      createdAt: new Date(now.getTime() - 45 * 60000)
    },
    {
      _id: "post_03",
      authorId: "usr_103",
      content: "Chiều nay CLB Tin học HUIT tổ chức workshop chia sẻ về 'Thiết kế cơ sở dữ liệu hướng tài liệu MongoDB và mô hình đồ thị Neo4j'. Anh em ghé phòng máy lầu 4 tham gia nhé! 💻☕",
      mediaUrls: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_104", "usr_108"],
      likeCount: 156,
      comments: [
        { authorId: "usr_101", content: "Có phát slide tài liệu sau buổi học không anh Cường?", createdAt: now }
      ],
      commentCount: 35,
      createdAt: new Date(now.getTime() - 120 * 60000)
    },
    {
      _id: "post_04",
      authorId: "usr_106",
      content: "Thử nghiệm thuật toán Jaccard Similarity trên sở thích người dùng: khi hai bạn cùng quan tâm 'Công nghệ', 'AI & Data' và 'UI/UX Design', chỉ số tương đồng đạt trên 94%! Kết quả trực quan hóa rất ấn tượng.",
      mediaUrls: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_104"],
      likeCount: 64,
      comments: [],
      commentCount: 9,
      createdAt: new Date(now.getTime() - 240 * 60000)
    },
    {
      _id: "post_05",
      authorId: "usr_105",
      content: "Một góc làm việc đầy cảm hứng tại VNG Campus chiều nay. Làm việc với dữ liệu mạng xã hội lớn luôn đem lại nhiều thách thức thú vị ☀️🌿",
      mediaUrls: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102"],
      likeCount: 110,
      comments: [],
      commentCount: 16,
      createdAt: new Date(now.getTime() - 360 * 60000)
    },
    {
      _id: "post_06",
      authorId: "usr_109",
      content: "Khoa Công nghệ Thông tin - HUIT đánh giá rất cao đồ án Đề tài 11 về Mạng xã hội và phân hệ gợi ý kết bạn. Các bạn sinh viên đã vận dụng rất tốt cả lý thuyết và thực tiễn giữa MongoDB và Neo4j!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_103", "usr_104", "usr_108"],
      likeCount: 245,
      comments: [
        { authorId: "usr_101", content: "Dạ chúng em cảm ơn cô ạ!", createdAt: now }
      ],
      commentCount: 42,
      createdAt: new Date(now.getTime() - 500 * 60000)
    }
  ]);

  // 7. Nạp Messages Đầy Đủ
  await MessageModel.insertMany([
    {
      _id: "msg_01",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_102",
      receiverId: "usr_101",
      text: "Chào Duy! Cậu kiểm tra xong thuật toán gợi ý kết bạn trên đồ thị Neo4j chưa?",
      isRead: true,
      createdAt: new Date(now.getTime() - 7200000)
    },
    {
      _id: "msg_02",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_101",
      receiverId: "usr_102",
      text: "Chào Bình! Tớ vừa test xong, tốc độ duyệt đồ thị và tìm bạn chung cực nhanh luôn!",
      isRead: true,
      createdAt: new Date(now.getTime() - 3600000)
    },
    {
      _id: "msg_03",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_102",
      receiverId: "usr_101",
      text: "Tuyệt vời, giao diện phong cách Goonly tone ấm nhìn cũng rất ưng ý nữa 👍",
      isRead: true,
      createdAt: new Date(now.getTime() - 1800000)
    },
    {
      _id: "msg_04",
      conversationId: "conv_usr_101_usr_103",
      senderId: "usr_103",
      receiverId: "usr_101",
      text: "Duy ơi, slide thuyết trình đồ án NoSQL thứ 6 tuần này xong hết chưa em?",
      isRead: true,
      createdAt: new Date(now.getTime() - 5400000)
    },
    {
      _id: "msg_05",
      conversationId: "conv_usr_101_usr_103",
      senderId: "usr_101",
      receiverId: "usr_103",
      text: "Dạ em đã chuẩn bị xong cả đề cương 50 trang lẫn phần demo trực tiếp rồi anh Cường!",
      isRead: true,
      createdAt: new Date(now.getTime() - 2700000)
    },
    {
      _id: "msg_06",
      conversationId: "conv_usr_101_usr_104",
      senderId: "usr_104",
      receiverId: "usr_101",
      text: "Đức vừa thêm thuật toán đường nối 6 bậc (Shortest Path), test thử nhé Duy!",
      isRead: true,
      createdAt: new Date(now.getTime() - 1200000)
    }
  ]);

  // 8. Nạp dữ liệu đồ thị mạng lưới vào Neo4j (Graph)
  const cypherScript = `
    MATCH (n) DETACH DELETE n;

    // Tạo Sở thích (Interests)
    CREATE (i1:Interest {id: "int_1", name: "Công nghệ"})
    CREATE (i2:Interest {id: "int_2", name: "Bóng đá"})
    CREATE (i3:Interest {id: "int_3", name: "Du lịch"})
    CREATE (i4:Interest {id: "int_4", name: "Âm nhạc"})
    CREATE (i5:Interest {id: "int_5", name: "AI & Data"})
    CREATE (i6:Interest {id: "int_6", name: "UI/UX Design"});

    // Tạo Hội nhóm (Groups)
    CREATE (g1:Group {id: "grp_301", name: "CLB Tin học HUIT", privacy: "public"})
    CREATE (g2:Group {id: "grp_302", name: "Cộng đồng Dev Sài Gòn", privacy: "public"})
    CREATE (g3:Group {id: "grp_303", name: "NoSQL & Big Data Lab", privacy: "public"})
    CREATE (g4:Group {id: "grp_304", name: "UI/UX Design Vietnam", privacy: "public"});

    // Tạo 12 Users trong đồ thị Neo4j
    CREATE (u1:User {id: "usr_101", username: "khanhduy", fullName: "Nguyễn Khánh Duy", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT"})
    CREATE (u2:User {id: "usr_102", username: "thibinh", fullName: "Trần Thị Bình", city: "Hồ Chí Minh", workplace: "Goonly Studio"})
    CREATE (u3:User {id: "usr_103", username: "vancuong", fullName: "Lê Văn Cường", city: "Hồ Chí Minh", workplace: "FPT Software"})
    CREATE (u4:User {id: "usr_104", username: "minhduc", fullName: "Phạm Minh Đức", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT"})
    CREATE (u5:User {id: "usr_105", username: "thudung", fullName: "Hoàng Thu Dung", city: "Hồ Chí Minh", workplace: "VNG Corporation"})
    CREATE (u6:User {id: "usr_106", username: "hoangnam", fullName: "Đỗ Hoàng Nam", city: "Hà Nội", workplace: "Zalo AI Lab"})
    CREATE (u7:User {id: "usr_107", username: "thuylinh", fullName: "Vũ Thùy Linh", city: "Hồ Chí Minh", workplace: "MoMo Fintech"})
    CREATE (u8:User {id: "usr_108", username: "quocbao", fullName: "Trịnh Quốc Bảo", city: "Hồ Chí Minh", workplace: "Tiki Tech"})
    CREATE (u9:User {id: "usr_109", username: "myhanh", fullName: "Đinh Mỹ Hạnh", city: "Hồ Chí Minh", workplace: "Đại học Công Thương TP.HCM"})
    CREATE (u10:User {id: "usr_110", username: "tuananh", fullName: "Bùi Tuấn Anh", city: "Hồ Chí Minh", workplace: "Shopee Vietnam"})
    CREATE (u11:User {id: "usr_111", username: "ngoclan", fullName: "Phan Ngọc Lan", city: "Hà Nội", workplace: "Viettel Cyber Security"})
    CREATE (u12:User {id: "usr_112", username: "thanhtung", fullName: "Mai Thanh Tùng", city: "Hồ Chí Minh", workplace: "HUIT"});

    // Liên kết sở thích INTERESTED_IN (để tính Jaccard Similarity)
    CREATE (u1)-[:INTERESTED_IN]->(i1), (u1)-[:INTERESTED_IN]->(i2), (u1)-[:INTERESTED_IN]->(i5)
    CREATE (u2)-[:INTERESTED_IN]->(i1), (u2)-[:INTERESTED_IN]->(i4), (u2)-[:INTERESTED_IN]->(i6)
    CREATE (u3)-[:INTERESTED_IN]->(i1), (u3)-[:INTERESTED_IN]->(i2), (u3)-[:INTERESTED_IN]->(i5)
    CREATE (u4)-[:INTERESTED_IN]->(i1), (u4)-[:INTERESTED_IN]->(i2), (u4)-[:INTERESTED_IN]->(i5)
    CREATE (u5)-[:INTERESTED_IN]->(i3), (u5)-[:INTERESTED_IN]->(i4), (u5)-[:INTERESTED_IN]->(i5)
    CREATE (u6)-[:INTERESTED_IN]->(i1), (u6)-[:INTERESTED_IN]->(i5)
    CREATE (u7)-[:INTERESTED_IN]->(i3), (u7)-[:INTERESTED_IN]->(i4), (u7)-[:INTERESTED_IN]->(i6)
    CREATE (u8)-[:INTERESTED_IN]->(i1), (u8)-[:INTERESTED_IN]->(i2), (u8)-[:INTERESTED_IN]->(i3)
    CREATE (u10)-[:INTERESTED_IN]->(i1), (u10)-[:INTERESTED_IN]->(i2)
    CREATE (u12)-[:INTERESTED_IN]->(i1), (u12)-[:INTERESTED_IN]->(i2);

    // Liên kết tham gia hội nhóm MEMBER_OF
    CREATE (u1)-[:MEMBER_OF {role: "admin"}]->(g1)
    CREATE (u2)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u3)-[:MEMBER_OF {role: "admin"}]->(g2)
    CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g3)
    CREATE (u1)-[:MEMBER_OF {role: "member"}]->(g3)
    CREATE (u2)-[:MEMBER_OF {role: "admin"}]->(g4)
    CREATE (u7)-[:MEMBER_OF {role: "member"}]->(g4)
    CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g2)
    CREATE (u12)-[:MEMBER_OF {role: "member"}]->(g1);

    // Liên kết bạn bè FRIENDS_WITH (Hai chiều)
    // Bạn bè trực tiếp bậc 1 của usr_101
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2), (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u3), (u3)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u8), (u8)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u12), (u12)-[:FRIENDS_WITH {since: datetime()}]->(u1)

    // Bạn của bạn (Bậc 2 - làm ứng viên FoAF cho usr_101)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u3)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u7), (u7)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u3)
    CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u8)
    CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u8)

    // Bậc 3 và 4 (Để test Shortest Path 6 bậc)
    CREATE (u4)-[:FRIENDS_WITH {since: datetime()}]->(u6), (u6)-[:FRIENDS_WITH {since: datetime()}]->(u4)
    CREATE (u6)-[:FRIENDS_WITH {since: datetime()}]->(u11), (u11)-[:FRIENDS_WITH {since: datetime()}]->(u6)
    CREATE (u11)-[:FRIENDS_WITH {since: datetime()}]->(u9), (u9)-[:FRIENDS_WITH {since: datetime()}]->(u11);
  `;

  await Neo4jService.runCypher(cypherScript);
  console.log("✅ [Seed] Nạp toàn bộ dữ liệu mẫu phong phú thành công!");
};
