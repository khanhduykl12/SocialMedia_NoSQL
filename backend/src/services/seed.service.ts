import { UserModel } from "../models/User.model";
import { PostModel } from "../models/Post.model";
import { StoryModel } from "../models/Story.model";
import { ReelModel } from "../models/Reel.model";
import { GroupModel } from "../models/Group.model";
import { MessageModel } from "../models/Message.model";
import { NotificationModel } from "../models/Notification.model";
import { Neo4jService } from "./neo4j.service";

export const seedDatabase = async () => {
  console.log("🌱 [Seed] Bắt đầu khởi tạo dữ liệu mẫu lớn và đa dạng (35 Users, 25 Bài viết, 19 Stories, 18 Reels, 6 CLB)...");

  // 1. Dọn dẹp dữ liệu MongoDB cũ
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});
  await StoryModel.deleteMany({});
  await ReelModel.deleteMany({});
  await GroupModel.deleteMany({});
  await MessageModel.deleteMany({});
  await NotificationModel.deleteMany({});

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // 2. Nạp 35 Users (Chỉ usr_101 là admin, tất cả còn lại là user)
  const users = [
    {
      _id: "usr_101",
      username: "khanhduy_it",
      email: "duy.nguyen@gmail.com",
      passwordHash: "123456",
      role: "admin", // DUY NHẤT ADMIN
      profile: {
        fullName: "Nguyễn Khánh Duy",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        bio: "Sinh viên CNTT HUIT • Lập trình viên Fullstack & Quản trị viên hệ thống mạng xã hội",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Khoa CNTT - HUIT",
        interests: ["Công nghệ", "Bóng đá", "AI & Data", "Thể thao & Cầu lông"]
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
        bio: "UI/UX Designer • Yêu thích thiết kế tối giản, cà phê và nhiếp ảnh đường phố 📸",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Goonly Studio",
        interests: ["Công nghệ", "UI/UX Design", "Âm nhạc", "Nhiếp ảnh"]
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
        bio: "Senior Backend Engineer • Yêu thích Distributed Systems, Cloud & Cafe cóc ☕",
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
        bio: "Cloud & Database Architect • Thích nghiên cứu cấu trúc dữ liệu đồ thị mạng xã hội 🚀",
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
        bio: "Data Analyst & Travel Blogger • Thích phân tích dữ liệu và vi vu khám phá thế giới ✈️",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "VNG Corporation",
        interests: ["Du lịch", "AI & Data", "Âm nhạc", "Ẩm thực Sài Gòn"]
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
        bio: "AI Engineer • Xây dựng các mô hình đề xuất thông minh và mạng nơ-ron đồ thị 🤖",
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
        bio: "Product Designer • Nghệ thuật typography, trải nghiệm người dùng và mèo 🐱",
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
        bio: "Mobile App Developer • Chuyên React Native & Flutter • Mê đá banh cuối tuần ⚽",
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
        bio: "Giảng viên Khoa CNTT - HUIT • Nghiên cứu Cơ sở dữ liệu phân tán & Big Data 📚",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Đại học Công Thương TP.HCM (HUIT)",
        interests: ["Công nghệ", "AI & Data", "Tiếng Anh & Sách"]
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
        bio: "DevOps Engineer • Tự động hoá CI/CD, hạ tầng đám mây và Kubernetes 🐳",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Shopee Vietnam",
        interests: ["Công nghệ", "Bóng đá", "Thể thao & Cầu lông"]
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
        bio: "Chuyên viên An toàn thông tin • Yêu thích bảo mật, guitar acoustic và podcast 🎧",
        city: "Hà Nội",
        school: "Học viện Kỹ thuật Mật mã",
        workplace: "Viettel Cyber Security",
        interests: ["Công nghệ", "Âm nhạc", "Tiếng Anh & Sách"]
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
        bio: "Sinh viên năm cuối CNTT HUIT • Chuyên môn Web Frontend & Đang làm đồ án tốt nghiệp",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Khoa CNTT - HUIT",
        interests: ["Công nghệ", "Bóng đá", "Du lịch"]
      }
    },
    {
      _id: "usr_113",
      username: "hoanglong",
      email: "long.nguyen@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Nguyễn Hoàng Long",
        avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
        bio: "Sinh viên Thiết kế Đồ họa HUIT • Nhiếp ảnh gia tự do • Thích săn ảnh hoàng hôn 🌅",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Freelance Photographer",
        interests: ["Nhiếp ảnh", "UI/UX Design", "Du lịch"]
      }
    },
    {
      _id: "usr_114",
      username: "baongoc",
      email: "ngoc.le@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Lê Bảo Ngọc",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        bio: "Thành viên CLB Cầu lông HUIT • Yêu thể thao, thích du lịch trải nghiệm và ăn vặt 🏸",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "HUIT Sports Club",
        interests: ["Thể thao & Cầu lông", "Du lịch", "Ẩm thực Sài Gòn"]
      }
    },
    {
      _id: "usr_115",
      username: "giahuy",
      email: "huy.truong@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Trương Gia Huy",
        avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
        bio: "Frontend Developer • Fan cứng của React, Tailwind và các hiệu ứng web mượt mà ✨",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Tech Startup",
        interests: ["Công nghệ", "UI/UX Design", "Âm nhạc"]
      }
    },
    {
      _id: "usr_116",
      username: "phuongthao",
      email: "thao.vo@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Võ Phương Thảo",
        avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
        bio: "Chủ nhiệm CLB Tiếng Anh HUIT • Đam mê đọc sách, tranh biện và chia sẻ học bổng 📖",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "English Club HUIT",
        interests: ["Tiếng Anh & Sách", "Du lịch", "Âm nhạc"]
      }
    },
    {
      _id: "usr_117",
      username: "quangkhai",
      email: "khai.lam@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Lâm Quang Khải",
        avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
        bio: "Data Engineer • Đam mê giải quyết bài toán luồng dữ liệu thời gian thực và Big Data",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Data Platform Team",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_118",
      username: "quynhchi",
      email: "chi.duong@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Dương Quỳnh Chi",
        avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
        bio: "Content Creator • Thích quay vlog đời thường sinh viên và khám phá các quán ăn ngon 🍜",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "GenZ Media",
        interests: ["Ẩm thực Sài Gòn", "Nhiếp ảnh", "Du lịch"]
      }
    },
    {
      _id: "usr_119",
      username: "ducthang",
      email: "thang.ho@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Hồ Đức Thắng",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        bio: "Kỹ sư Hệ thống Nhúng & IoT • Đam mê phần cứng thông minh và nhà thông minh",
        city: "Đà Nẵng",
        school: "Đại học Bách Khoa Đà Nẵng",
        workplace: "SmartHome Lab",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_120",
      username: "ngocbich",
      email: "bich.nguyen@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Nguyễn Ngọc Bích",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        bio: "Sinh viên Quản trị Kinh doanh HUIT • Đam mê khởi nghiệp công nghệ và Marketing số 💡",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Student Startup HUIT",
        interests: ["Tiếng Anh & Sách", "Ẩm thực Sài Gòn", "UI/UX Design"]
      }
    },
    {
      _id: "usr_121",
      username: "dinhtrong",
      email: "trong.tran@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Trần Đình Trọng",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        bio: "Đội trưởng tuyển Bóng đá HUIT • Yêu thể thao, rèn luyện thể lực và du lịch bụi ⚽",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "CLB Bóng Đá Sinh Viên HUIT",
        interests: ["Bóng đá", "Thể thao & Cầu lông", "Du lịch"]
      }
    },
    {
      _id: "usr_122",
      username: "quynhnhu",
      email: "nhu.pham@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Phạm Quỳnh Như",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        bio: "Sinh viên Khoa Ngoại ngữ HUIT • Thích giao lưu bạn bè quốc tế và nghe nhạc Jazz 🎷",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Hội Tiếng Anh & Du Học HUIT",
        interests: ["Tiếng Anh & Sách", "Âm nhạc", "Du lịch"]
      }
    },
    {
      _id: "usr_123",
      username: "minhkhoi",
      email: "khoi.dang@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Đặng Minh Khôi",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        bio: "Game Developer • Đam mê Unity, Unreal Engine và đồ họa không gian 3D 🎮",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Game Studio",
        interests: ["Công nghệ", "Âm nhạc", "UI/UX Design"]
      }
    },
    {
      _id: "usr_124",
      username: "haiyen",
      email: "yen.nguyen@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Nguyễn Hải Yến",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        bio: "Sinh viên Khoa Du lịch HUIT • Thích chụp ảnh cảnh quan và review món ngon Việt Nam 🌸",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "HUIT Tourism",
        interests: ["Du lịch", "Nhiếp ảnh", "Ẩm thực Sài Gòn"]
      }
    },
    {
      _id: "usr_125",
      username: "quochuy",
      email: "huy.bui@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Bùi Quốc Huy",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
        bio: "Kỹ sư Mạng & Quản trị Hệ thống • Đam mê hệ điều hành Linux và mạng không dây 💻",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "HUIT Network Center",
        interests: ["Công nghệ", "Bóng đá"]
      }
    },
    {
      _id: "usr_126",
      username: "anhtuyet",
      email: "tuyet.hoang@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Hoàng Ánh Tuyết",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        bio: "Graphic Designer • Chuyên thiết kế nhận diện thương hiệu và poster sự kiện sinh viên 🎨",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "CLB Nhiếp ảnh & Media HUIT",
        interests: ["UI/UX Design", "Nhiếp ảnh", "Âm nhạc"]
      }
    },
    {
      _id: "usr_127",
      username: "trongnghia",
      email: "nghia.do@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Đỗ Trọng Nghĩa",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        bio: "Sinh viên An toàn Thông tin HUIT • Thích săn lỗ hổng bảo mật và lập trình bảo mật 🛡️",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "CLB Tin học HUIT",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_128",
      username: "camtu",
      email: "tu.le@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Lê Cẩm Tú",
        avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
        bio: "Thành viên ban truyền thông Đoàn trường HUIT • Đam mê viết content và chụp ảnh sự kiện 🎤",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Đoàn Thanh Niên HUIT",
        interests: ["Nhiếp ảnh", "Tiếng Anh & Sách", "Ẩm thực Sài Gòn"]
      }
    },
    {
      _id: "usr_129",
      username: "quoctoan",
      email: "toan.vu@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Vũ Quốc Toàn",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
        bio: "Cầu thủ phong trào CLB Cầu lông HUIT • Đam mê thể thao, gym và leo núi 🏔️",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "CLB Cầu lông & Thể thao HUIT",
        interests: ["Thể thao & Cầu lông", "Bóng đá", "Du lịch"]
      }
    },
    {
      _id: "usr_130",
      username: "thanhtruc",
      email: "truc.phan@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Phan Thanh Trúc",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        bio: "Sinh viên Tài chính Ngân hàng HUIT • Thích đọc sách kinh doanh, đầu tư và cà phê một mình ☕",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Khoa Tài chính - HUIT",
        interests: ["Tiếng Anh & Sách", "Ẩm thực Sài Gòn"]
      }
    },
    {
      _id: "usr_131",
      username: "tanphat",
      email: "phat.nguyen@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Nguyễn Tấn Phát",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        bio: "Data Analyst thực tập sinh • Chuyên phân tích xu hướng thị trường và dự báo dữ liệu 📈",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Fintech Lab",
        interests: ["Công nghệ", "AI & Data"]
      }
    },
    {
      _id: "usr_132",
      username: "thaonhi",
      email: "nhi.huynh@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Huỳnh Thảo Nhi",
        avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
        bio: "Vlogger ẩm thực học đường • Chia sẻ địa điểm ăn uống ngon bổ rẻ khu Tân Phú cho sinh viên 🍜",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Food Blogger",
        interests: ["Ẩm thực Sài Gòn", "Du lịch", "Nhiếp ảnh"]
      }
    },
    {
      _id: "usr_133",
      username: "minhtri",
      email: "tri.cao@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Cao Minh Trí",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        bio: "Frontend Developer • Đam mê trải nghiệm người dùng, web accessibility và tối ưu hiệu năng ⚡",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Cộng đồng Dev Sài Gòn",
        interests: ["Công nghệ", "UI/UX Design"]
      }
    },
    {
      _id: "usr_134",
      username: "dieulinh",
      email: "linh.dinh@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Đinh Diệu Linh",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        bio: "Phó chủ nhiệm CLB Tiếng Anh HUIT • IELTS 8.0 • Thích diễn thuyết và lan tỏa văn hóa đọc 📚",
        city: "Hồ Chí Minh",
        school: "Đại học Công Thương TP.HCM (HUIT)",
        workplace: "Hội Tiếng Anh & Du Học HUIT",
        interests: ["Tiếng Anh & Sách", "Âm nhạc", "Du lịch"]
      }
    },
    {
      _id: "usr_135",
      username: "giabao",
      email: "bao.vuong@gmail.com",
      passwordHash: "123456",
      role: "user",
      profile: {
        fullName: "Vương Gia Bảo",
        avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
        bio: "Nhiếp ảnh gia phim và tư liệu đường phố • Thích lùng sục góc phố Sài Gòn xưa 🎞️",
        city: "Hồ Chí Minh",
        school: "Đại học Kiến Trúc",
        workplace: "CLB Nhiếp ảnh & Media HUIT",
        interests: ["Nhiếp ảnh", "Du lịch", "Âm nhạc"]
      }
    }
  ];

  await UserModel.insertMany(users);

  // 3. Nạp 6 Câu Lạc Bộ Sinh Viên
  await GroupModel.insertMany([
    {
      _id: "grp_301",
      name: "CLB Tin học HUIT",
      description: "Câu lạc bộ học thuật & nghiên cứu công nghệ thông tin khoa CNTT HUIT",
      coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
      creatorId: "usr_101",
      memberCount: 22,
      privacy: "public"
    },
    {
      _id: "grp_302",
      name: "Cộng đồng Dev Sài Gòn",
      description: "Diễn đàn kết nối lập trình viên Fullstack, Backend & DevOps tại TP.HCM",
      coverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
      creatorId: "usr_103",
      memberCount: 28,
      privacy: "public"
    },
    {
      _id: "grp_303",
      name: "CLB Nhiếp ảnh & Media HUIT",
      description: "Không gian giao lưu nhiếp ảnh, quay dựng video ngắn và nghệ thuật thị giác cho sinh viên",
      coverUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      creatorId: "usr_113",
      memberCount: 19,
      privacy: "public"
    },
    {
      _id: "grp_304",
      name: "UI/UX Design Vietnam",
      description: "Cộng đồng chia sẻ kiến thức thiết kế giao diện, trải nghiệm người dùng và Design System",
      coverUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600",
      creatorId: "usr_102",
      memberCount: 16,
      privacy: "public"
    },
    {
      _id: "grp_305",
      name: "CLB Cầu lông & Thể thao HUIT",
      description: "Giao lưu thể thao, rèn luyện sức khỏe và tổ chức giải đấu nội bộ sinh viên trường HUIT",
      coverUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600",
      creatorId: "usr_114",
      memberCount: 24,
      privacy: "public"
    },
    {
      _id: "grp_306",
      name: "Hội Tiếng Anh & Du Học HUIT",
      description: "Luyện phản xạ tiếng Anh giao tiếp, chia sẻ tài liệu IELTS và săn học bổng du học",
      coverUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
      creatorId: "usr_116",
      memberCount: 20,
      privacy: "public"
    }
  ]);

  // 4. Nạp 16 Stories Khoảnh khắc 24h
  // 4. Nạp 18 Stories Khoảnh khắc 24h (Bao gồm cả Ảnh & Video ngắn)
  await StoryModel.insertMany([
    {
      _id: "story_01",
      authorId: "usr_102",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
      caption: "Cuối tuần dạo phố Tân Phú và lên ý tưởng thiết kế mới 🌿",
      viewers: [{ userId: "usr_101", viewedAt: now }],
      viewCount: 38,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_01_v",
      authorId: "usr_102",
      mediaType: "video",
      mediaUrl: "/videos/story_coffee.mp4",
      caption: "Tách cà phê sáng và góc làm việc của Designer ☕🌿",
      viewers: [],
      viewCount: 45,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_admin_v",
      authorId: "usr_101",
      mediaType: "video",
      mediaUrl: "/videos/reel_classroom.mp4",
      caption: "Chạy thử nghiệm hệ thống mạng xã hội NoSQL thành công 🚀💻",
      viewers: [],
      viewCount: 89,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_02",
      authorId: "usr_104",
      mediaType: "video",
      mediaUrl: "/videos/story_campus.mp4",
      caption: "Không khí sinh viên HUIT giờ tan trường náo nhiệt 🎓✨",
      viewers: [],
      viewCount: 52,
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
      viewCount: 52,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_04",
      authorId: "usr_113",
      mediaType: "video",
      mediaUrl: "/videos/reel_walking.mp4",
      caption: "Góc phố Sài Gòn chiều tan tầm qua ống kính điện ảnh 📸🌇",
      viewers: [],
      viewCount: 64,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_05",
      authorId: "usr_114",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      caption: "Trận giao hữu cầu lông chiều thứ 7 quá cháy cùng hội bạn 🏸",
      viewers: [],
      viewCount: 35,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_06",
      authorId: "usr_115",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      caption: "Setup góc làm việc mới, sẵn sàng chiến đồ án tốt nghiệp 💻",
      viewers: [],
      viewCount: 41,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_07",
      authorId: "usr_116",
      mediaType: "video",
      mediaUrl: "/videos/story_party.mp4",
      caption: "Khoảnh khắc chúc mừng CLB Tiếng Anh đạt giải xuất sắc 🎉🥳",
      viewers: [],
      viewCount: 72,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_08",
      authorId: "usr_118",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      caption: "Khám phá quán bánh tráng nướng ngon đỉnh chóp gần cổng trường 🍜",
      viewers: [],
      viewCount: 68,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_08_v",
      authorId: "usr_118",
      mediaType: "video",
      mediaUrl: "/videos/reel_student_vlog.mp4",
      caption: "Chia sẻ kinh nghiệm làm thêm và học tập của sinh viên năm 3 🌸📖",
      viewers: [],
      viewCount: 88,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_09",
      authorId: "usr_121",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      caption: "Khởi động nhẹ trước trận cầu đỉnh cao chiều chủ nhật ⚽🔥",
      viewers: [],
      viewCount: 33,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_09_v",
      authorId: "usr_103",
      mediaType: "video",
      mediaUrl: "/videos/reel_coding_lab.mp4",
      caption: "Buổi thực hành lập trình Backend phân tán cùng giảng viên 💻🔥",
      viewers: [],
      viewCount: 76,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_10",
      authorId: "usr_122",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      caption: "Giai điệu acoustic nhẹ nhàng xoa dịu một ngày học tập bận rộn 🎶",
      viewers: [],
      viewCount: 29,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_11",
      authorId: "usr_124",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      caption: "Chuyến phượt Đà Lạt mùa hoa dã quỳ ngập tràn nắng vàng 🌼",
      viewers: [],
      viewCount: 75,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_12",
      authorId: "usr_126",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
      caption: "Phác thảo màu poster chuẩn bị cho hội trại truyền thống HUIT 🎨",
      viewers: [],
      viewCount: 44,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_13",
      authorId: "usr_129",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800",
      caption: "Mồ hôi ướt áo nhưng tinh thần thể thao sảng khoái cực kỳ 🏸💪",
      viewers: [],
      viewCount: 31,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_14",
      authorId: "usr_132",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      caption: "Nồi lẩu bò nghi ngút khói giữa đêm se lạnh Sài Gòn 🍲🤤",
      viewers: [],
      viewCount: 82,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_15",
      authorId: "usr_134",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
      caption: "Chuẩn bị tài liệu ôn luyện IELTS Speaking cho buổi sinh hoạt tới 📖✨",
      viewers: [],
      viewCount: 39,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_16",
      authorId: "usr_135",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800",
      caption: "Góc ảnh phim màu ấm chụp tại chợ Bến Thành chiều tan tầm 🎞️📸",
      viewers: [],
      viewCount: 56,
      createdAt: now,
      expiresAt: in24h
    },
    {
      _id: "story_16_v",
      authorId: "usr_135",
      mediaType: "video",
      mediaUrl: "/videos/reel_campus_tour.mp4",
      caption: "Dạo quanh một vòng giảng đường và thư viện trường HUIT 🏫🌿",
      viewers: [],
      viewCount: 95,
      createdAt: now,
      expiresAt: in24h
    }
  ]);

  // 5. Nạp 18 Reels Video Đa Dạng và Phong Phú (TikTok / Facebook Reels style)
  await ReelModel.insertMany([
    {
      _id: "reel_01",
      authorId: "usr_102",
      videoUrl: "/videos/reel_classroom.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
      caption: "Một ngày thực hành lập trình và thiết kế giao diện tại phòng máy HUIT 💻✨",
      musicTitle: "Lofi Coding Beats - HUIT Studio",
      likes: ["usr_101", "usr_103", "usr_104", "usr_115", "usr_126"],
      likeCount: 248,
      comments: [
        { authorId: "usr_101", content: "Màu video đẹp và góc quay mượt mà quá!", createdAt: now },
        { authorId: "usr_115", content: "Cực kỳ thích phong cách làm việc này luôn", createdAt: now }
      ],
      commentCount: 32,
      createdAt: now
    },
    {
      _id: "reel_02",
      authorId: "usr_113",
      videoUrl: "/videos/reel_campus.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      caption: "Khuôn viên trường HUIT giờ ra chơi tấp nập và tràn đầy sức trẻ 🏫🌿",
      musicTitle: "Sunset Melodies 2026",
      likes: ["usr_101", "usr_102", "usr_114", "usr_135"],
      likeCount: 312,
      comments: [
        { authorId: "usr_102", content: "Góc chụp nghệ thuật quá Long ơi!", createdAt: now }
      ],
      commentCount: 24,
      createdAt: now
    },
    {
      _id: "reel_03",
      authorId: "usr_114",
      videoUrl: "/videos/reel_walking.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500",
      caption: "Dạo phố Sài Gòn cuối tuần nạp năng lượng sau tuần học căng thẳng 🚶‍♂️✨",
      musicTitle: "Energy Street Beat",
      likes: ["usr_101", "usr_108", "usr_110", "usr_129"],
      likeCount: 284,
      comments: [
        { authorId: "usr_108", content: "Góc quay phố thị nhìn chill thật sự!", createdAt: now }
      ],
      commentCount: 26,
      createdAt: now
    },
    {
      _id: "reel_04",
      authorId: "usr_108",
      videoUrl: "/videos/reel_animation.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500",
      caption: "Thước phim hoạt hình 3D đồ án tốt nghiệp sinh viên xuất sắc 🐰🎨",
      musicTitle: "Big Buck Cinematic Audio",
      likes: ["usr_101", "usr_103", "usr_112"],
      likeCount: 415,
      comments: [
        { authorId: "usr_112", content: "Kỹ xảo 3D mượt mà và chuyển động đỉnh cao quá!", createdAt: now }
      ],
      commentCount: 38,
      createdAt: now
    },
    {
      _id: "reel_05",
      authorId: "usr_118",
      videoUrl: "/videos/reel_portrait.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
      caption: "Vlog chia sẻ bí quyết cân bằng giữa việc học đại học và làm thêm 🌸📖",
      musicTitle: "Tasty Acoustic Vlog",
      likes: ["usr_101", "usr_102", "usr_132"],
      likeCount: 420,
      comments: [
        { authorId: "usr_132", content: "Cách chia sẻ tự nhiên và truyền cảm hứng lắm bạn!", createdAt: now }
      ],
      commentCount: 45,
      createdAt: now
    },
    {
      _id: "reel_06",
      authorId: "usr_121",
      videoUrl: "/videos/reel_1.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500",
      caption: "Góc hoa rực rỡ bên thềm giảng đường HUIT vào sáng sớm 🌸☕",
      musicTitle: "Nature Bloom Harmony",
      likes: ["usr_101", "usr_103", "usr_108"],
      likeCount: 350,
      comments: [
        { authorId: "usr_101", content: "Thước phim timelapse hoa nở đỉnh quá!", createdAt: now }
      ],
      commentCount: 38,
      createdAt: now
    },
    {
      _id: "reel_07",
      authorId: "usr_116",
      videoUrl: "/videos/reel_club_party.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
      caption: "Party chúc mừng câu lạc bộ hoàn thành xuất sắc kỳ học mới 🥳🎉",
      musicTitle: "Celebration Dance Beats",
      likes: ["usr_101", "usr_122", "usr_134"],
      likeCount: 275,
      comments: [
        { authorId: "usr_134", content: "Hôm ấy vui quá trời vui luôn cả nhà ơi!", createdAt: now }
      ],
      commentCount: 29,
      createdAt: now
    },
    {
      _id: "reel_08",
      authorId: "usr_135",
      videoUrl: "/videos/reel_coding_lab.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500",
      caption: "Hội thảo học thuật phân tích kiến trúc dữ liệu Polyglot NoSQL MongoDB & Neo4j 🎓💡",
      musicTitle: "Academic Tech Lecture",
      likes: ["usr_101", "usr_102", "usr_113"],
      likeCount: 390,
      comments: [
        { authorId: "usr_113", content: "Nội dung báo cáo thực chiến và rất thuyết phục!", createdAt: now }
      ],
      commentCount: 42,
      createdAt: now
    },
    {
      _id: "reel_09",
      authorId: "usr_103",
      videoUrl: "/videos/reel_student_vlog.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      caption: "Phỏng vấn nhanh các bạn sinh viên năm 3 HUIT về định hướng nghề nghiệp ngành IT 🎤💼",
      musicTitle: "Inspiring Chillhop Podcast",
      likes: ["usr_101", "usr_104", "usr_105", "usr_111"],
      likeCount: 365,
      comments: [
        { authorId: "usr_105", content: "Rất thực tế và nhiều lời khuyên bổ ích!", createdAt: now }
      ],
      commentCount: 28,
      createdAt: now
    },
    {
      _id: "reel_10",
      authorId: "usr_105",
      videoUrl: "/videos/reel_campus_tour.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
      caption: "Check-in khuôn viên và góc học tập yên tĩnh tại thư viện HUIT mùa thi cử 📚☕",
      musicTitle: "Study Vibes Ambient Piano",
      likes: ["usr_101", "usr_102", "usr_107", "usr_120"],
      likeCount: 430,
      comments: [
        { authorId: "usr_102", content: "Thư viện trường mình nhìn lúc nào cũng hiện đại!", createdAt: now }
      ],
      commentCount: 36,
      createdAt: now
    },
    {
      _id: "reel_11",
      authorId: "usr_111",
      videoUrl: "/videos/reel_morning_coffee.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
      caption: "Buổi sáng thiết kế giao diện Figma cùng tách Latte nóng hổi nạp năng lượng sáng tạo ☕🎨",
      musicTitle: "Coffee Shop Acoustic Guitar",
      likes: ["usr_101", "usr_102", "usr_103", "usr_118"],
      likeCount: 512,
      comments: [
        { authorId: "usr_118", content: "Nhìn góc làm việc chill quá chị ơi!", createdAt: now }
      ],
      commentCount: 49,
      createdAt: now
    },
    {
      _id: "reel_12",
      authorId: "usr_112",
      videoUrl: "/videos/reel_3d_project.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
      caption: "Demo chuyển động nhân vật 3D trên Unity Engine cho đồ án Game Design 🎮👾",
      musicTitle: "Cyberpunk Synthwave 80s",
      likes: ["usr_101", "usr_108", "usr_115", "usr_125"],
      likeCount: 478,
      comments: [
        { authorId: "usr_108", content: "Animation mượt mà quá Kiên ơi, đỉnh!", createdAt: now }
      ],
      commentCount: 39,
      createdAt: now
    },
    {
      _id: "reel_13",
      authorId: "usr_115",
      videoUrl: "/videos/reel_street_sunset.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      caption: "Đạp xe ngắm hoàng hôn quận Tân Phú sau ca thực hành vi mạch điện tử 🚲🌅",
      musicTitle: "Sunset Chillhop Beat",
      likes: ["usr_101", "usr_104", "usr_114"],
      likeCount: 295,
      comments: [
        { authorId: "usr_104", content: "Hoàng hôn hôm nay đẹp xuất sắc!", createdAt: now }
      ],
      commentCount: 22,
      createdAt: now
    },
    {
      _id: "reel_14",
      authorId: "usr_107",
      videoUrl: "/videos/reel_2.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
      caption: "Khoảnh khắc nhảy Flashmob chào đón tân sinh viên HUIT cực kỳ bùng nổ 💃🔥",
      musicTitle: "High Energy Dance EDM",
      likes: ["usr_101", "usr_116", "usr_118", "usr_130"],
      likeCount: 620,
      comments: [
        { authorId: "usr_116", content: "Năng lượng tuổi trẻ HUIT đỉnh của chóp!", createdAt: now }
      ],
      commentCount: 58,
      createdAt: now
    },
    {
      _id: "reel_15",
      authorId: "usr_104",
      videoUrl: "/videos/reel_classroom.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
      caption: "Buổi diễn tập phòng chống tấn công mạng và khai thác lỗ hổng bảo mật CTF 🛡️💻",
      musicTitle: "Cyber Threat Lab Music",
      likes: ["usr_101", "usr_103", "usr_106"],
      likeCount: 388,
      comments: [
        { authorId: "usr_101", content: "Kịch bản tấn công - phòng thủ rất sắc nét!", createdAt: now }
      ],
      commentCount: 31,
      createdAt: now
    },
    {
      _id: "reel_16",
      authorId: "usr_110",
      videoUrl: "/videos/reel_walking.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500",
      caption: "Thử thách 10.000 bước chân mỗi ngày duy trì sức khỏe cho dân Lập trình 👟🏃‍♂️",
      musicTitle: "Fitness Motivation Beat",
      likes: ["usr_101", "usr_105", "usr_114", "usr_128"],
      likeCount: 334,
      comments: [
        { authorId: "usr_105", content: "Thói quen quá tốt cần duy trì nè!", createdAt: now }
      ],
      commentCount: 25,
      createdAt: now
    },
    {
      _id: "reel_17",
      authorId: "usr_101",
      videoUrl: "/videos/reel_campus.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
      caption: "Chào đón thành viên mới tham gia mạng xã hội học thuật HUIT Goonly! Chúc các bạn học tập tốt 🌟🤝",
      musicTitle: "Inspirational Future Bass",
      likes: ["usr_102", "usr_103", "usr_104", "usr_105", "usr_108", "usr_111"],
      likeCount: 780,
      comments: [
        { authorId: "usr_102", content: "Admin tâm huyết quá, giao diện và tính năng mượt mà lắm!", createdAt: now }
      ],
      commentCount: 88,
      createdAt: now
    },
    {
      _id: "reel_18",
      authorId: "usr_106",
      videoUrl: "/videos/reel_portrait.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500",
      caption: "Kinh nghiệm ôn thi chứng chỉ quốc tế CCNA và AWS Cloud cho sinh viên IT 🌐☁️",
      musicTitle: "Focus Lo-fi Study Session",
      likes: ["usr_101", "usr_103", "usr_115"],
      likeCount: 445,
      comments: [
        { authorId: "usr_115", content: "Tài liệu chia sẻ chi tiết và dễ hiểu lắm bạn!", createdAt: now }
      ],
      commentCount: 41,
      createdAt: now
    }
  ]);

  // 6. Nạp 25 Bài viết Bảng tin phong phú và thực tế
  await PostModel.insertMany([
    {
      _id: "post_01",
      authorId: "usr_101", // BÀI VIẾT CỦA ADMIN
      content: "Chào mừng toàn thể sinh viên và giảng viên HUIT đến với mạng xã hội Goonly! Hệ thống đã hoàn thiện cả phân hệ cơ sở dữ liệu hướng tài liệu MongoDB và đồ thị phân tích liên kết Neo4j. Mọi người cùng trải nghiệm và đóng góp ý kiến nhé! 🚀🌟",
      mediaUrls: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      ],
      privacy: "public",
      likes: ["usr_102", "usr_103", "usr_104", "usr_108", "usr_109", "usr_114", "usr_115"],
      likeCount: 298,
      comments: [
        { authorId: "usr_109", content: "Chúc mừng Khánh Duy và nhóm đồ án đã hoàn thiện sản phẩm rất xuất sắc!", createdAt: now },
        { authorId: "usr_102", content: "Giao diện trải nghiệm mượt mà và màu sắc ấm cúng lắm Duy ơi!", createdAt: now },
        { authorId: "usr_104", content: "Hiệu năng phân hệ đồ thị đạt dưới 8ms, cực kỳ ấn tượng!", createdAt: now }
      ],
      commentCount: 38,
      createdAt: new Date(now.getTime() - 5 * 60000)
    },
    {
      _id: "post_02",
      authorId: "usr_102",
      content: "Cuối tuần bình yên bên tách cà phê ấm và những bản phác thảo thiết kế mới 🌿 Chuẩn bị thật chu đáo cho buổi báo cáo đồ án mạng xã hội sắp tới cùng team!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_103", "usr_104", "usr_115"],
      likeCount: 168,
      comments: [
        { authorId: "usr_101", content: "Ảnh chụp góc này nghệ thuật và ấm cúng quá Bình!", createdAt: now },
        { authorId: "usr_104", content: "Chúc nhóm mình đạt điểm tuyệt đối nhé!", createdAt: now },
        { authorId: "usr_115", content: "Tone màu ảnh nhìn thích mắt thật sự", createdAt: now }
      ],
      commentCount: 28,
      createdAt: new Date(now.getTime() - 25 * 60000)
    },
    {
      _id: "post_03",
      authorId: "usr_104",
      content: "Vừa hoàn thiện xong phân hệ gợi ý kết bạn thông minh kết hợp lưu trữ kép! Tốc độ tìm bạn chung và đo độ tương đồng sở thích phản hồi siêu tốc dưới 8ms 🚀⚡",
      mediaUrls: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_103", "usr_108"],
      likeCount: 125,
      comments: [
        { authorId: "usr_103", content: "Kiến trúc này chạy mượt mà và tối ưu rất tốt đấy Đức!", createdAt: now },
        { authorId: "usr_101", content: "Sơ đồ mạng lưới trực quan nhìn trực diện rất thuyết phục!", createdAt: now }
      ],
      commentCount: 19,
      createdAt: new Date(now.getTime() - 60 * 60000)
    },
    {
      _id: "post_04",
      authorId: "usr_103",
      content: "Chiều nay CLB Tin học HUIT tổ chức buổi chia sẻ kỹ năng thực chiến dành cho sinh viên năm 3 và năm cuối. Mọi người ghé phòng máy lầu 4 tham gia giao lưu và nhận quà nhé! 💻☕",
      mediaUrls: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_104", "usr_108", "usr_112"],
      likeCount: 215,
      comments: [
        { authorId: "usr_101", content: "Em có mặt đúng giờ anh Cường nhé!", createdAt: now },
        { authorId: "usr_112", content: "Em đăng ký một chỗ ngồi hàng đầu ạ!", createdAt: now }
      ],
      commentCount: 42,
      createdAt: new Date(now.getTime() - 120 * 60000)
    },
    {
      _id: "post_05",
      authorId: "usr_113",
      content: "Bộ ảnh chụp nhanh hoàng hôn tại sân trường HUIT chiều hôm qua. Ánh nắng vàng buông xuống toà nhà đẹp như một thước phim thanh xuân 📸🌇",
      mediaUrls: [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_114", "usr_118"],
      likeCount: 185,
      comments: [
        { authorId: "usr_118", content: "Trường mình lên ảnh nhìn thơ mộng quá anh Long ơi!", createdAt: now }
      ],
      commentCount: 22,
      createdAt: new Date(now.getTime() - 180 * 60000)
    },
    {
      _id: "post_06",
      authorId: "usr_114",
      content: "CLB Cầu lông HUIT mở đợt tuyển thành viên mới cho kỳ học này! Bạn nào yêu thích thể thao, muốn rèn luyện sức khỏe sau giờ học căng thẳng thì đăng ký cùng team mình nha 🏸✨",
      mediaUrls: [
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_108", "usr_110", "usr_129"],
      likeCount: 140,
      comments: [
        { authorId: "usr_101", content: "Cuối tuần này giao hữu một trận đơn nha Ngọc!", createdAt: now },
        { authorId: "usr_110", content: "Cho mình đăng ký tham gia với nhé!", createdAt: now }
      ],
      commentCount: 18,
      createdAt: new Date(now.getTime() - 240 * 60000)
    },
    {
      _id: "post_07",
      authorId: "usr_105",
      content: "Một góc làm việc đầy cảm hứng tại văn phòng chiều nay. Làm việc với các tập dữ liệu người dùng lớn đem lại rất nhiều góc nhìn thú vị về hành vi cộng đồng ☀️📊",
      mediaUrls: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_107"],
      likeCount: 155,
      comments: [
        { authorId: "usr_102", content: "Văn phòng tràn ngập ánh sáng tự nhiên thích quá chị Dung ơi", createdAt: now }
      ],
      commentCount: 15,
      createdAt: new Date(now.getTime() - 320 * 60000)
    },
    {
      _id: "post_08",
      authorId: "usr_115",
      content: "Giao diện phong cách tối giản với tông màu ấm áp lấy cảm hứng từ các nền tảng hiện đại. Từng nút bấm, hiệu ứng chuyển trang đều được chau chuốt kỹ càng để mang lại cảm giác thân thiện nhất!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_104"],
      likeCount: 138,
      comments: [
        { authorId: "usr_101", content: "Trải nghiệm mượt và màu sắc dễ chịu lắm Huy!", createdAt: now }
      ],
      commentCount: 14,
      createdAt: new Date(now.getTime() - 400 * 60000)
    },
    {
      _id: "post_09",
      authorId: "usr_109",
      content: "Khoa Công nghệ Thông tin - HUIT đánh giá cao đồ án tốt nghiệp Đề tài 11 về Mạng xã hội và phân hệ gợi ý kết bạn thông minh. Các bạn sinh viên đã thể hiện sự đầu tư chỉn chu cả về mô hình kỹ thuật lẫn trải nghiệm người dùng!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_103", "usr_104", "usr_108", "usr_112"],
      likeCount: 340,
      comments: [
        { authorId: "usr_101", content: "Dạ chúng em cảm ơn cô Hạnh đã tận tình hướng dẫn ạ!", createdAt: now },
        { authorId: "usr_104", content: "Cảm ơn cô và các thầy cô trong khoa ạ!", createdAt: now }
      ],
      commentCount: 52,
      createdAt: new Date(now.getTime() - 480 * 60000)
    },
    {
      _id: "post_10",
      authorId: "usr_116",
      content: "Buổi sinh hoạt cuối tuần của CLB Tiếng Anh HUIT với chủ đề 'Thuyết trình tự tin trước đám đông'. Chúc mừng các bạn thành viên mới đã có màn thể hiện rất xuất sắc 👏🗣️",
      mediaUrls: [
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_120", "usr_122", "usr_134"],
      likeCount: 165,
      comments: [
        { authorId: "usr_120", content: "Buổi sinh hoạt bổ ích và mọi người năng nổ lắm!", createdAt: now }
      ],
      commentCount: 16,
      createdAt: new Date(now.getTime() - 560 * 60000)
    },
    {
      _id: "post_11",
      authorId: "usr_118",
      content: "Một buổi chiều la cà hàng quán quanh trường HUIT cùng hội bạn. Món bún đậu mắm tôm và chè bưởi ở đường Chế Lan Viên vẫn là chân ái của sinh viên Tân Phú! 🍜😋",
      mediaUrls: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_114", "usr_132"],
      likeCount: 198,
      comments: [
        { authorId: "usr_114", content: "Hôm nào rủ team cầu lông đi ăn chung nữa nha Chi!", createdAt: now }
      ],
      commentCount: 29,
      createdAt: new Date(now.getTime() - 640 * 60000)
    },
    {
      _id: "post_12",
      authorId: "usr_121",
      content: "Trận chung kết giải bóng đá khoa CNTT diễn ra vô cùng kịch tính! Cảm ơn toàn thể cổ động viên đã cháy hết mình trên khán đài tiếp lửa cho đội bóng 🏆⚽",
      mediaUrls: [
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_108", "usr_110"],
      likeCount: 220,
      comments: [
        { authorId: "usr_108", content: "Chúc mừng đội bóng đã giành cúp vô địch xứng đáng!", createdAt: now }
      ],
      commentCount: 30,
      createdAt: new Date(now.getTime() - 720 * 60000)
    },
    {
      _id: "post_13",
      authorId: "usr_122",
      content: "Một buổi sáng chủ nhật thư thái bên cuốn sách song ngữ và bản tình ca êm dịu. Nạp đầy năng lượng tích cực cho tuần học mới đầy thử thách ☕📚",
      mediaUrls: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"
      ],
      privacy: "public",
      likes: ["usr_102", "usr_116", "usr_124"],
      likeCount: 112,
      comments: [
        { authorId: "usr_116", content: "Gu âm nhạc của Như lúc nào cũng rất tinh tế!", createdAt: now }
      ],
      commentCount: 11,
      createdAt: new Date(now.getTime() - 800 * 60000)
    },
    {
      _id: "post_14",
      authorId: "usr_123",
      content: "Vừa hoàn thành bản demo game indie 2D đầu tay viết bằng Unity. Bạn nào đam mê phát triển game ghé qua phòng lab lầu 3 test thử và góp ý giúp mình nhé! 🕹️👾",
      mediaUrls: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_103", "usr_115"],
      likeCount: 145,
      comments: [
        { authorId: "usr_115", content: "Hiệu ứng va chạm và âm thanh nghe sống động lắm Khôi!", createdAt: now }
      ],
      commentCount: 17,
      createdAt: new Date(now.getTime() - 900 * 60000)
    },
    {
      _id: "post_15",
      authorId: "usr_124",
      content: "Chuyến dã ngoại cuối tuần tại rừng cao su Dầu Tiếng cùng CLB Du lịch HUIT. Không khí trong lành và cây cối xanh mướt làm tan biến mọi âu lo học tập 🌿🚲",
      mediaUrls: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
      ],
      privacy: "public",
      likes: ["usr_105", "usr_118", "usr_132"],
      likeCount: 230,
      comments: [
        { authorId: "usr_105", content: "Ảnh chụp góc rộng đẹp mê ly luôn Yến ơi!", createdAt: now }
      ],
      commentCount: 25,
      createdAt: new Date(now.getTime() - 1000 * 60000)
    },
    {
      _id: "post_16",
      authorId: "usr_126",
      content: "Thiết kế bộ nhận diện thương hiệu cho Tuần lễ Công nghệ Sinh viên HUIT 2026. Màu sắc chủ đạo kết hợp giữa tone xanh công nghệ và vàng ấm năng động 🎨✨",
      mediaUrls: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"
      ],
      privacy: "public",
      likes: ["usr_102", "usr_107", "usr_113"],
      likeCount: 178,
      comments: [
        { authorId: "usr_102", content: "Bố cục chữ và cách phối màu hài hòa lắm Tuyết!", createdAt: now }
      ],
      commentCount: 14,
      createdAt: new Date(now.getTime() - 1100 * 60000)
    },
    {
      _id: "post_17",
      authorId: "usr_127",
      content: "Một buổi thảo luận chuyên sâu về bảo mật cơ sở dữ liệu NoSQL trước các cuộc tấn công NoSQL Injection. Bảo vệ an toàn dữ liệu luôn là ưu tiên số một trong mọi hệ thống! 🛡️💻",
      mediaUrls: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_104", "usr_111"],
      likeCount: 160,
      comments: [
        { authorId: "usr_101", content: "Rất chuẩn xác, việc kiểm tra và lọc tham số truy vấn cực kỳ quan trọng!", createdAt: now }
      ],
      commentCount: 16,
      createdAt: new Date(now.getTime() - 1200 * 60000)
    },
    {
      _id: "post_18",
      authorId: "usr_128",
      content: "Tổng kết chiến dịch tình nguyện Mùa hè xanh trường HUIT tại tỉnh Bến Tre. Những nụ cười của các em nhỏ là món quà vô giá nhất đối với sinh viên chúng mình ❤️🌸",
      mediaUrls: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_109", "usr_114"],
      likeCount: 290,
      comments: [
        { authorId: "usr_109", content: "Tự hào về tinh thần cống hiến vì cộng đồng của sinh viên trường mình!", createdAt: now }
      ],
      commentCount: 36,
      createdAt: new Date(now.getTime() - 1300 * 60000)
    },
    {
      _id: "post_19",
      authorId: "usr_129",
      content: "Giao lưu cầu lông đôi nam nữ chiều nay cùng các bạn sinh viên Khoa Ngoại ngữ. Đánh xong 3 set mệt nhoài nhưng tinh thần đồng đội lên cao vút 🏸🔥",
      mediaUrls: [
        "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800"
      ],
      privacy: "public",
      likes: ["usr_114", "usr_121", "usr_124"],
      likeCount: 125,
      comments: [
        { authorId: "usr_114", content: "Hôm nay cặp Toàn - Yến phối hợp ăn ý ghê!", createdAt: now }
      ],
      commentCount: 15,
      createdAt: new Date(now.getTime() - 1400 * 60000)
    },
    {
      _id: "post_20",
      authorId: "usr_131",
      content: "Ứng dụng thuật toán phân tích mạng xã hội để phát hiện các nhóm cộng đồng ẩn. Nhìn dữ liệu chuyển động trực quan qua sơ đồ mạng lưới thật sự rất lôi cuốn 📊🌐",
      mediaUrls: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_104", "usr_106"],
      likeCount: 148,
      comments: [
        { authorId: "usr_104", content: "Neo4j hỗ trợ các thuật toán Community Detection chạy rất mượt mà!", createdAt: now }
      ],
      commentCount: 13,
      createdAt: new Date(now.getTime() - 1500 * 60000)
    },
    {
      _id: "post_21",
      authorId: "usr_132",
      content: "Top 3 quán trà sữa ngon và có view ngắm máy bay hạ cánh cực chill gần trường HUIT. Sinh viên nào chưa đi thì lưu lại ngay nhé 🧋✈️",
      mediaUrls: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
      ],
      privacy: "public",
      likes: ["usr_118", "usr_122", "usr_124"],
      likeCount: 260,
      comments: [
        { authorId: "usr_118", content: "Quán thứ 2 trà đào dầm ngon xỉu luôn bạn ơi!", createdAt: now }
      ],
      commentCount: 34,
      createdAt: new Date(now.getTime() - 1600 * 60000)
    },
    {
      _id: "post_22",
      authorId: "usr_133",
      content: "Chia sẻ bộ UI kit miễn phí cho sinh viên HUIT làm đồ án Web. Toàn bộ icon, typography và card layout đều chuẩn mực theo xu hướng thiết kế tối giản hiện đại 💻🎨",
      mediaUrls: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_102", "usr_115"],
      likeCount: 195,
      comments: [
        { authorId: "usr_101", content: "Cảm ơn Trí đã chia sẻ tài nguyên hữu ích cho các bạn!", createdAt: now }
      ],
      commentCount: 21,
      createdAt: new Date(now.getTime() - 1700 * 60000)
    },
    {
      _id: "post_23",
      authorId: "usr_134",
      content: "Chia sẻ cẩm nang 50 chủ đề IELTS Speaking Part 2 thường gặp nhất quý này. Chúc các bạn sinh viên chuẩn bị thi tốt nghiệp đạt band điểm mong ước! 🇬🇧📖",
      mediaUrls: [
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
      ],
      privacy: "public",
      likes: ["usr_116", "usr_120", "usr_122"],
      likeCount: 240,
      comments: [
        { authorId: "usr_120", content: "Tài liệu trình bày rõ ràng và dễ học lắm Linh ơi!", createdAt: now }
      ],
      commentCount: 28,
      createdAt: new Date(now.getTime() - 1800 * 60000)
    },
    {
      _id: "post_24",
      authorId: "usr_135",
      content: "Sài Gòn sau cơn mưa chiều rực rỡ dưới ánh đèn đường. Bấm máy bằng cuộn phim Kodak Gold 200 cho màu hoài niệm đậm chất thơ 🎞️🌧️",
      mediaUrls: [
        "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800"
      ],
      privacy: "public",
      likes: ["usr_102", "usr_113", "usr_126"],
      likeCount: 210,
      comments: [
        { authorId: "usr_113", content: "Hạt film lên đều và ánh sáng phản chiếu mặt đường rất nghệ!", createdAt: now }
      ],
      commentCount: 19,
      createdAt: new Date(now.getTime() - 1900 * 60000)
    },
    {
      _id: "post_25",
      authorId: "usr_110",
      content: "Triển khai thành công cụm máy chủ MongoDB Replica Set và phân tầng cơ sở dữ liệu đồ thị Neo4j. Hệ thống hoạt động mượt mà và chịu tải xuất sắc! 🐳🚀",
      mediaUrls: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
      ],
      privacy: "public",
      likes: ["usr_101", "usr_103", "usr_104"],
      likeCount: 180,
      comments: [
        { authorId: "usr_101", content: "Hạ tầng ổn định là điểm tựa vững chắc cho toàn bộ ứng dụng!", createdAt: now }
      ],
      commentCount: 23,
      createdAt: new Date(now.getTime() - 2000 * 60000)
    }
  ]);

  // 7. Nạp Messages Đầy Đủ (nhiều cuộc trò chuyện phong phú)
  await MessageModel.insertMany([
    // Chat với usr_102 (Trần Thị Bình)
    {
      _id: "msg_01",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_102",
      receiverId: "usr_101",
      text: "Chào Duy! Cậu kiểm tra xong phần giao diện bảng tin và gợi ý bạn bè chưa?",
      isRead: true,
      createdAt: new Date(now.getTime() - 7200000)
    },
    {
      _id: "msg_02",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_101",
      receiverId: "usr_102",
      text: "Chào Bình! Tớ vừa hoàn thiện xong, font chữ và màu sắc phong cách Goonly tone ấm nhìn rất êm mắt!",
      isRead: true,
      createdAt: new Date(now.getTime() - 5400000)
    },
    {
      _id: "msg_03",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_102",
      receiverId: "usr_101",
      text: "Tuyệt vời, tớ thấy phần story và reels chạy cũng rất mượt mà 👍",
      isRead: true,
      createdAt: new Date(now.getTime() - 3600000)
    },
    {
      _id: "msg_04",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_101",
      receiverId: "usr_102",
      text: "Chiều mai nhóm mình hẹn cà phê ở Highland đối diện trường duyệt lại lần cuối nhé!",
      isRead: true,
      createdAt: new Date(now.getTime() - 1800000)
    },
    {
      _id: "msg_05",
      conversationId: "conv_usr_101_usr_102",
      senderId: "usr_102",
      receiverId: "usr_101",
      text: "Okie Duy, 2h chiều mai tớ có mặt nha!",
      isRead: true,
      createdAt: new Date(now.getTime() - 900000)
    },

    // Chat với usr_103 (Lê Văn Cường)
    {
      _id: "msg_06",
      conversationId: "conv_usr_101_usr_103",
      senderId: "usr_103",
      receiverId: "usr_101",
      text: "Duy ơi, slide thuyết trình đồ án tốt nghiệp thứ 6 tuần này nhóm chuẩn bị ổn chưa em?",
      isRead: true,
      createdAt: new Date(now.getTime() - 8600000)
    },
    {
      _id: "msg_07",
      conversationId: "conv_usr_101_usr_103",
      senderId: "usr_101",
      receiverId: "usr_103",
      text: "Dạ em đã chuẩn bị xong cả đề cương chi tiết lẫn kịch bản demo tính năng rồi anh Cường!",
      isRead: true,
      createdAt: new Date(now.getTime() - 6200000)
    },
    {
      _id: "msg_08",
      conversationId: "conv_usr_101_usr_103",
      senderId: "usr_103",
      receiverId: "usr_101",
      text: "Tốt lắm, nhớ nhấn mạnh sự khác biệt giữa mô hình quan hệ SQL và đồ thị khi tính bạn chung nhé.",
      isRead: true,
      createdAt: new Date(now.getTime() - 3100000)
    },

    // Chat với usr_104 (Phạm Minh Đức)
    {
      _id: "msg_09",
      conversationId: "conv_usr_101_usr_104",
      senderId: "usr_104",
      receiverId: "usr_101",
      text: "Đức vừa tối ưu thuật toán tìm bạn 6 bậc xong, cậu vào bấm thử xem đường kết nối nhé!",
      isRead: true,
      createdAt: new Date(now.getTime() - 4000000)
    },
    {
      _id: "msg_10",
      conversationId: "conv_usr_101_usr_104",
      senderId: "usr_101",
      receiverId: "usr_104",
      text: "Đã thử rồi Đức ơi, thuật toán tìm ra đường đi ngắn nhất chỉ trong vài miligiây!",
      isRead: true,
      createdAt: new Date(now.getTime() - 2000000)
    },

    // Chat với usr_108 (Trịnh Quốc Bảo)
    {
      _id: "msg_11",
      conversationId: "conv_usr_101_usr_108",
      senderId: "usr_108",
      receiverId: "usr_101",
      text: "Duy ơi, chủ nhật này sân bóng Tân Thắng đá giao hữu lúc 5h chiều, tham gia được không?",
      isRead: true,
      createdAt: new Date(now.getTime() - 5000000)
    },
    {
      _id: "msg_12",
      conversationId: "conv_usr_101_usr_108",
      senderId: "usr_101",
      receiverId: "usr_108",
      text: "Chắc chắn rồi Bảo, tớ rủ thêm Cường và Đức đi cùng luôn cho đủ đội!",
      isRead: true,
      createdAt: new Date(now.getTime() - 2500000)
    },

    // Chat với usr_114 (Lê Bảo Ngọc)
    {
      _id: "msg_13",
      conversationId: "conv_usr_101_usr_114",
      senderId: "usr_114",
      receiverId: "usr_101",
      text: "Duy ơi, tuần này CLB Cầu lông trường mình có buổi sinh hoạt thứ 5, nhớ mang vợt nha!",
      isRead: true,
      createdAt: new Date(now.getTime() - 3500000)
    },
    {
      _id: "msg_14",
      conversationId: "conv_usr_101_usr_114",
      senderId: "usr_101",
      receiverId: "usr_114",
      text: "Okie Ngọc! Chiều thứ 5 học xong ca 2 tớ qua nhà thi đấu liền.",
      isRead: true,
      createdAt: new Date(now.getTime() - 1500000)
    },

    // Chat với usr_115 (Trương Gia Huy)
    {
      _id: "msg_15",
      conversationId: "conv_usr_101_usr_115",
      senderId: "usr_115",
      receiverId: "usr_101",
      text: "Anh Duy ơi, phần component chuyển đổi tài khoản phân quyền Admin - User em thấy chạy rất mượt!",
      isRead: true,
      createdAt: new Date(now.getTime() - 2800000)
    },
    {
      _id: "msg_16",
      conversationId: "conv_usr_101_usr_115",
      senderId: "usr_101",
      receiverId: "usr_115",
      text: "Cảm ơn Huy! Thầy cô xem demo sẽ thấy rõ ngay sự khác biệt quyền hạn giữa Admin và User thông thường.",
      isRead: true,
      createdAt: new Date(now.getTime() - 1200000)
    }
  ]);

  // 8. Nạp Thông báo mẫu (Notifications)
  await NotificationModel.insertMany([
    {
      _id: "notif_01",
      recipientId: "usr_101",
      senderId: "usr_104",
      type: "FRIEND_REQUEST",
      message: "Phạm Minh Đức đã gửi lời mời kết bạn cùng bạn",
      link: "/friends",
      isRead: false,
      createdAt: new Date(now.getTime() - 15 * 60 * 1000)
    },
    {
      _id: "notif_02",
      recipientId: "usr_101",
      senderId: "usr_102",
      type: "POST_LIKED",
      message: "Trần Thị Bình đã thích bài viết của bạn",
      link: "/feed",
      isRead: false,
      createdAt: new Date(now.getTime() - 60 * 60 * 1000)
    },
    {
      _id: "notif_03",
      recipientId: "usr_101",
      senderId: "usr_103",
      type: "POST_COMMENT",
      message: "Lê Văn Cường đã bình luận vào bài viết của bạn",
      link: "/feed",
      isRead: true,
      createdAt: new Date(now.getTime() - 3 * 3600 * 1000)
    },
    {
      _id: "notif_04",
      recipientId: "usr_101",
      senderId: "usr_114",
      type: "GROUP_INVITE",
      message: "Lê Bảo Ngọc đã mời bạn tham gia CLB Cầu lông & Thể thao HUIT",
      link: "/friends",
      isRead: true,
      createdAt: new Date(now.getTime() - 10 * 3600 * 1000)
    },
    {
      _id: "notif_05",
      recipientId: "usr_101",
      senderId: "usr_115",
      type: "POST_LIKED",
      message: "Trương Gia Huy đã thích bài viết của bạn",
      link: "/feed",
      isRead: true,
      createdAt: new Date(now.getTime() - 18 * 3600 * 1000)
    }
  ]);

  // 9. Nạp Đồ thị mạng lưới quan hệ vào Neo4j (Graph)
  const cypherScript = `
    MATCH (n) DETACH DELETE n;

    // Tạo 10 Sở thích (Interests)
    CREATE (i1:Interest {id: "int_1", name: "Công nghệ"})
    CREATE (i2:Interest {id: "int_2", name: "Bóng đá"})
    CREATE (i3:Interest {id: "int_3", name: "Du lịch"})
    CREATE (i4:Interest {id: "int_4", name: "Âm nhạc"})
    CREATE (i5:Interest {id: "int_5", name: "AI & Data"})
    CREATE (i6:Interest {id: "int_6", name: "UI/UX Design"})
    CREATE (i7:Interest {id: "int_7", name: "Nhiếp ảnh"})
    CREATE (i8:Interest {id: "int_8", name: "Thể thao & Cầu lông"})
    CREATE (i9:Interest {id: "int_9", name: "Ẩm thực Sài Gòn"})
    CREATE (i10:Interest {id: "int_10", name: "Tiếng Anh & Sách"});

    // Tạo 6 Câu lạc bộ (Groups)
    CREATE (g1:Group {id: "grp_301", name: "CLB Tin học HUIT", privacy: "public"})
    CREATE (g2:Group {id: "grp_302", name: "Cộng đồng Dev Sài Gòn", privacy: "public"})
    CREATE (g3:Group {id: "grp_303", name: "CLB Nhiếp ảnh & Media HUIT", privacy: "public"})
    CREATE (g4:Group {id: "grp_304", name: "UI/UX Design Vietnam", privacy: "public"})
    CREATE (g5:Group {id: "grp_305", name: "CLB Cầu lông & Thể thao HUIT", privacy: "public"})
    CREATE (g6:Group {id: "grp_306", name: "Hội Tiếng Anh & Du Học HUIT", privacy: "public"});

    // Tạo 35 Users trong đồ thị Neo4j (Định danh rõ vai trò)
    CREATE (u1:User {id: "usr_101", username: "khanhduy_it", fullName: "Nguyễn Khánh Duy", role: "admin", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT"})
    CREATE (u2:User {id: "usr_102", username: "thibinh", fullName: "Trần Thị Bình", role: "user", city: "Hồ Chí Minh", workplace: "Goonly Studio"})
    CREATE (u3:User {id: "usr_103", username: "vancuong", fullName: "Lê Văn Cường", role: "user", city: "Hồ Chí Minh", workplace: "FPT Software"})
    CREATE (u4:User {id: "usr_104", username: "minhduc", fullName: "Phạm Minh Đức", role: "user", city: "Hồ Chí Minh", workplace: "Khoa CNTT - HUIT"})
    CREATE (u5:User {id: "usr_105", username: "thudung", fullName: "Hoàng Thu Dung", role: "user", city: "Hồ Chí Minh", workplace: "VNG Corporation"})
    CREATE (u6:User {id: "usr_106", username: "hoangnam", fullName: "Đỗ Hoàng Nam", role: "user", city: "Hà Nội", workplace: "Zalo AI Lab"})
    CREATE (u7:User {id: "usr_107", username: "thuylinh", fullName: "Vũ Thùy Linh", role: "user", city: "Hồ Chí Minh", workplace: "MoMo Fintech"})
    CREATE (u8:User {id: "usr_108", username: "quocbao", fullName: "Trịnh Quốc Bảo", role: "user", city: "Hồ Chí Minh", workplace: "Tiki Tech"})
    CREATE (u9:User {id: "usr_109", username: "myhanh", fullName: "Đinh Mỹ Hạnh", role: "user", city: "Hồ Chí Minh", workplace: "Đại học Công Thương TP.HCM"})
    CREATE (u10:User {id: "usr_110", username: "tuananh", fullName: "Bùi Tuấn Anh", role: "user", city: "Hồ Chí Minh", workplace: "Shopee Vietnam"})
    CREATE (u11:User {id: "usr_111", username: "ngoclan", fullName: "Phan Ngọc Lan", role: "user", city: "Hà Nội", workplace: "Viettel Cyber Security"})
    CREATE (u12:User {id: "usr_112", username: "thanhtung", fullName: "Mai Thanh Tùng", role: "user", city: "Hồ Chí Minh", workplace: "HUIT"})
    CREATE (u13:User {id: "usr_113", username: "hoanglong", fullName: "Nguyễn Hoàng Long", role: "user", city: "Hồ Chí Minh", workplace: "Freelance Photographer"})
    CREATE (u14:User {id: "usr_114", username: "baongoc", fullName: "Lê Bảo Ngọc", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Sports Club"})
    CREATE (u15:User {id: "usr_115", username: "giahuy", fullName: "Trương Gia Huy", role: "user", city: "Hồ Chí Minh", workplace: "Tech Startup"})
    CREATE (u16:User {id: "usr_116", username: "phuongthao", fullName: "Võ Phương Thảo", role: "user", city: "Hồ Chí Minh", workplace: "English Club HUIT"})
    CREATE (u17:User {id: "usr_117", username: "quangkhai", fullName: "Lâm Quang Khải", role: "user", city: "Hồ Chí Minh", workplace: "Data Platform Team"})
    CREATE (u18:User {id: "usr_118", username: "quynhchi", fullName: "Dương Quỳnh Chi", role: "user", city: "Hồ Chí Minh", workplace: "GenZ Media"})
    CREATE (u19:User {id: "usr_119", username: "ducthang", fullName: "Hồ Đức Thắng", role: "user", city: "Đà Nẵng", workplace: "SmartHome Lab"})
    CREATE (u20:User {id: "usr_120", username: "ngocbich", fullName: "Nguyễn Ngọc Bích", role: "user", city: "Hồ Chí Minh", workplace: "Student Startup HUIT"})
    CREATE (u21:User {id: "usr_121", username: "dinhtrong", fullName: "Trần Đình Trọng", role: "user", city: "Hồ Chí Minh", workplace: "CLB Bóng Đá Sinh Viên HUIT"})
    CREATE (u22:User {id: "usr_122", username: "quynhnhu", fullName: "Phạm Quỳnh Như", role: "user", city: "Hồ Chí Minh", workplace: "Hội Tiếng Anh & Du Học HUIT"})
    CREATE (u23:User {id: "usr_123", username: "minhkhoi", fullName: "Đặng Minh Khôi", role: "user", city: "Hồ Chí Minh", workplace: "Game Studio"})
    CREATE (u24:User {id: "usr_124", username: "haiyen", fullName: "Nguyễn Hải Yến", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Tourism"})
    CREATE (u25:User {id: "usr_125", username: "quochuy", fullName: "Bùi Quốc Huy", role: "user", city: "Hồ Chí Minh", workplace: "HUIT Network Center"})
    CREATE (u26:User {id: "usr_126", username: "anhtuyet", fullName: "Hoàng Ánh Tuyết", role: "user", city: "Hồ Chí Minh", workplace: "CLB Nhiếp ảnh & Media HUIT"})
    CREATE (u27:User {id: "usr_127", username: "trongnghia", fullName: "Đỗ Trọng Nghĩa", role: "user", city: "Hồ Chí Minh", workplace: "CLB Tin học HUIT"})
    CREATE (u28:User {id: "usr_128", username: "camtu", fullName: "Lê Cẩm Tú", role: "user", city: "Hồ Chí Minh", workplace: "Đoàn Thanh Niên HUIT"})
    CREATE (u29:User {id: "usr_129", username: "quoctoan", fullName: "Vũ Quốc Toàn", role: "user", city: "Hồ Chí Minh", workplace: "CLB Cầu lông & Thể thao HUIT"})
    CREATE (u30:User {id: "usr_130", username: "thanhtruc", fullName: "Phan Thanh Trúc", role: "user", city: "Hồ Chí Minh", workplace: "Khoa Tài chính - HUIT"})
    CREATE (u31:User {id: "usr_131", username: "tanphat", fullName: "Nguyễn Tấn Phát", role: "user", city: "Hồ Chí Minh", workplace: "Fintech Lab"})
    CREATE (u32:User {id: "usr_132", username: "thaonhi", fullName: "Huỳnh Thảo Nhi", role: "user", city: "Hồ Chí Minh", workplace: "Food Blogger"})
    CREATE (u33:User {id: "usr_133", username: "minhtri", fullName: "Cao Minh Trí", role: "user", city: "Hồ Chí Minh", workplace: "Cộng đồng Dev Sài Gòn"})
    CREATE (u34:User {id: "usr_134", username: "dieulinh", fullName: "Đinh Diệu Linh", role: "user", city: "Hồ Chí Minh", workplace: "Hội Tiếng Anh & Du Học HUIT"})
    CREATE (u35:User {id: "usr_135", username: "giabao", fullName: "Vương Gia Bảo", role: "user", city: "Hồ Chí Minh", workplace: "CLB Nhiếp ảnh & Media HUIT"});

    // Liên kết sở thích INTERESTED_IN
    CREATE (u1)-[:INTERESTED_IN]->(i1), (u1)-[:INTERESTED_IN]->(i2), (u1)-[:INTERESTED_IN]->(i5), (u1)-[:INTERESTED_IN]->(i8)
    CREATE (u2)-[:INTERESTED_IN]->(i1), (u2)-[:INTERESTED_IN]->(i4), (u2)-[:INTERESTED_IN]->(i6), (u2)-[:INTERESTED_IN]->(i7)
    CREATE (u3)-[:INTERESTED_IN]->(i1), (u3)-[:INTERESTED_IN]->(i2), (u3)-[:INTERESTED_IN]->(i5)
    CREATE (u4)-[:INTERESTED_IN]->(i1), (u4)-[:INTERESTED_IN]->(i2), (u4)-[:INTERESTED_IN]->(i5)
    CREATE (u5)-[:INTERESTED_IN]->(i3), (u5)-[:INTERESTED_IN]->(i4), (u5)-[:INTERESTED_IN]->(i5), (u5)-[:INTERESTED_IN]->(i9)
    CREATE (u6)-[:INTERESTED_IN]->(i1), (u6)-[:INTERESTED_IN]->(i5)
    CREATE (u7)-[:INTERESTED_IN]->(i3), (u7)-[:INTERESTED_IN]->(i4), (u7)-[:INTERESTED_IN]->(i6)
    CREATE (u8)-[:INTERESTED_IN]->(i1), (u8)-[:INTERESTED_IN]->(i2), (u8)-[:INTERESTED_IN]->(i3)
    CREATE (u10)-[:INTERESTED_IN]->(i1), (u10)-[:INTERESTED_IN]->(i2), (u10)-[:INTERESTED_IN]->(i8)
    CREATE (u12)-[:INTERESTED_IN]->(i1), (u12)-[:INTERESTED_IN]->(i2), (u12)-[:INTERESTED_IN]->(i3)
    CREATE (u13)-[:INTERESTED_IN]->(i6), (u13)-[:INTERESTED_IN]->(i7), (u13)-[:INTERESTED_IN]->(i3)
    CREATE (u14)-[:INTERESTED_IN]->(i8), (u14)-[:INTERESTED_IN]->(i3), (u14)-[:INTERESTED_IN]->(i9)
    CREATE (u15)-[:INTERESTED_IN]->(i1), (u15)-[:INTERESTED_IN]->(i6), (u15)-[:INTERESTED_IN]->(i4)
    CREATE (u16)-[:INTERESTED_IN]->(i10), (u16)-[:INTERESTED_IN]->(i3), (u16)-[:INTERESTED_IN]->(i4)
    CREATE (u17)-[:INTERESTED_IN]->(i1), (u17)-[:INTERESTED_IN]->(i5)
    CREATE (u18)-[:INTERESTED_IN]->(i9), (u18)-[:INTERESTED_IN]->(i7), (u18)-[:INTERESTED_IN]->(i3)
    CREATE (u19)-[:INTERESTED_IN]->(i1), (u19)-[:INTERESTED_IN]->(i5)
    CREATE (u20)-[:INTERESTED_IN]->(i10), (u20)-[:INTERESTED_IN]->(i9), (u20)-[:INTERESTED_IN]->(i6)
    CREATE (u21)-[:INTERESTED_IN]->(i2), (u21)-[:INTERESTED_IN]->(i8)
    CREATE (u22)-[:INTERESTED_IN]->(i10), (u22)-[:INTERESTED_IN]->(i4)
    CREATE (u23)-[:INTERESTED_IN]->(i1), (u23)-[:INTERESTED_IN]->(i6)
    CREATE (u24)-[:INTERESTED_IN]->(i3), (u24)-[:INTERESTED_IN]->(i7)
    CREATE (u25)-[:INTERESTED_IN]->(i1), (u25)-[:INTERESTED_IN]->(i2)
    CREATE (u26)-[:INTERESTED_IN]->(i6), (u26)-[:INTERESTED_IN]->(i7)
    CREATE (u27)-[:INTERESTED_IN]->(i1), (u27)-[:INTERESTED_IN]->(i5)
    CREATE (u28)-[:INTERESTED_IN]->(i7), (u28)-[:INTERESTED_IN]->(i10)
    CREATE (u29)-[:INTERESTED_IN]->(i8), (u29)-[:INTERESTED_IN]->(i2)
    CREATE (u30)-[:INTERESTED_IN]->(i10), (u30)-[:INTERESTED_IN]->(i9)
    CREATE (u31)-[:INTERESTED_IN]->(i1), (u31)-[:INTERESTED_IN]->(i5)
    CREATE (u32)-[:INTERESTED_IN]->(i9), (u32)-[:INTERESTED_IN]->(i3)
    CREATE (u33)-[:INTERESTED_IN]->(i1), (u33)-[:INTERESTED_IN]->(i6)
    CREATE (u34)-[:INTERESTED_IN]->(i10), (u34)-[:INTERESTED_IN]->(i3)
    CREATE (u35)-[:INTERESTED_IN]->(i7), (u35)-[:INTERESTED_IN]->(i4);

    // Liên kết tham gia câu lạc bộ MEMBER_OF
    CREATE (u1)-[:MEMBER_OF {role: "admin"}]->(g1)
    CREATE (u2)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u3)-[:MEMBER_OF {role: "admin"}]->(g2)
    CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u4)-[:MEMBER_OF {role: "member"}]->(g2)
    CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u8)-[:MEMBER_OF {role: "member"}]->(g2)
    CREATE (u12)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u13)-[:MEMBER_OF {role: "admin"}]->(g3)
    CREATE (u2)-[:MEMBER_OF {role: "member"}]->(g3)
    CREATE (u2)-[:MEMBER_OF {role: "admin"}]->(g4)
    CREATE (u7)-[:MEMBER_OF {role: "member"}]->(g4)
    CREATE (u15)-[:MEMBER_OF {role: "member"}]->(g4)
    CREATE (u1)-[:MEMBER_OF {role: "member"}]->(g5)
    CREATE (u14)-[:MEMBER_OF {role: "admin"}]->(g5)
    CREATE (u10)-[:MEMBER_OF {role: "member"}]->(g5)
    CREATE (u16)-[:MEMBER_OF {role: "admin"}]->(g6)
    CREATE (u20)-[:MEMBER_OF {role: "member"}]->(g6)
    CREATE (u21)-[:MEMBER_OF {role: "member"}]->(g5)
    CREATE (u22)-[:MEMBER_OF {role: "member"}]->(g6)
    CREATE (u23)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u24)-[:MEMBER_OF {role: "member"}]->(g3)
    CREATE (u25)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u26)-[:MEMBER_OF {role: "member"}]->(g3)
    CREATE (u27)-[:MEMBER_OF {role: "member"}]->(g1)
    CREATE (u29)-[:MEMBER_OF {role: "member"}]->(g5)
    CREATE (u33)-[:MEMBER_OF {role: "member"}]->(g2)
    CREATE (u34)-[:MEMBER_OF {role: "member"}]->(g6)
    CREATE (u35)-[:MEMBER_OF {role: "member"}]->(g3);

    // Liên kết bạn bè FRIENDS_WITH (Hai chiều)
    // 1. Bạn bè trực tiếp (Bậc 1) của usr_101 (Khánh Duy)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u2), (u2)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u3), (u3)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u8), (u8)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u12), (u12)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u14), (u14)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u15), (u15)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u25), (u25)-[:FRIENDS_WITH {since: datetime()}]->(u1)
    CREATE (u1)-[:FRIENDS_WITH {since: datetime()}]->(u27), (u27)-[:FRIENDS_WITH {since: datetime()}]->(u1)

    // 2. Bạn của bạn (Bậc 2 - Ứng viên FoAF phong phú)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u3)
    CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u4), (u4)-[:FRIENDS_WITH {since: datetime()}]->(u8)
    CREATE (u8)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u8)
    CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u5), (u5)-[:FRIENDS_WITH {since: datetime()}]->(u14)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u7), (u7)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u3)
    CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u10), (u10)-[:FRIENDS_WITH {since: datetime()}]->(u14)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u13), (u13)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u15)-[:FRIENDS_WITH {since: datetime()}]->(u13), (u13)-[:FRIENDS_WITH {since: datetime()}]->(u15)
    CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u18), (u18)-[:FRIENDS_WITH {since: datetime()}]->(u14)
    CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u21), (u21)-[:FRIENDS_WITH {since: datetime()}]->(u14)
    CREATE (u15)-[:FRIENDS_WITH {since: datetime()}]->(u23), (u23)-[:FRIENDS_WITH {since: datetime()}]->(u15)
    CREATE (u2)-[:FRIENDS_WITH {since: datetime()}]->(u26), (u26)-[:FRIENDS_WITH {since: datetime()}]->(u2)
    CREATE (u14)-[:FRIENDS_WITH {since: datetime()}]->(u29), (u29)-[:FRIENDS_WITH {since: datetime()}]->(u14)
    CREATE (u3)-[:FRIENDS_WITH {since: datetime()}]->(u33), (u33)-[:FRIENDS_WITH {since: datetime()}]->(u3)

    // 3. Bậc 3, 4, 5 (Đường đi đồ thị dài kiểm thử tính năng 6 bậc)
    CREATE (u4)-[:FRIENDS_WITH {since: datetime()}]->(u6), (u6)-[:FRIENDS_WITH {since: datetime()}]->(u4)
    CREATE (u6)-[:FRIENDS_WITH {since: datetime()}]->(u11), (u11)-[:FRIENDS_WITH {since: datetime()}]->(u6)
    CREATE (u11)-[:FRIENDS_WITH {since: datetime()}]->(u9), (u9)-[:FRIENDS_WITH {since: datetime()}]->(u11)
    CREATE (u9)-[:FRIENDS_WITH {since: datetime()}]->(u17), (u17)-[:FRIENDS_WITH {since: datetime()}]->(u9)
    CREATE (u17)-[:FRIENDS_WITH {since: datetime()}]->(u19), (u19)-[:FRIENDS_WITH {since: datetime()}]->(u17)
    CREATE (u18)-[:FRIENDS_WITH {since: datetime()}]->(u16), (u16)-[:FRIENDS_WITH {since: datetime()}]->(u18)
    CREATE (u16)-[:FRIENDS_WITH {since: datetime()}]->(u20), (u20)-[:FRIENDS_WITH {since: datetime()}]->(u16)
    CREATE (u20)-[:FRIENDS_WITH {since: datetime()}]->(u22), (u22)-[:FRIENDS_WITH {since: datetime()}]->(u20)
    CREATE (u22)-[:FRIENDS_WITH {since: datetime()}]->(u34), (u34)-[:FRIENDS_WITH {since: datetime()}]->(u22)
    CREATE (u18)-[:FRIENDS_WITH {since: datetime()}]->(u32), (u32)-[:FRIENDS_WITH {since: datetime()}]->(u18)
    CREATE (u13)-[:FRIENDS_WITH {since: datetime()}]->(u35), (u35)-[:FRIENDS_WITH {since: datetime()}]->(u13)
    CREATE (u17)-[:FRIENDS_WITH {since: datetime()}]->(u31), (u31)-[:FRIENDS_WITH {since: datetime()}]->(u17)
    CREATE (u24)-[:FRIENDS_WITH {since: datetime()}]->(u28), (u28)-[:FRIENDS_WITH {since: datetime()}]->(u24)
    CREATE (u28)-[:FRIENDS_WITH {since: datetime()}]->(u30), (u30)-[:FRIENDS_WITH {since: datetime()}]->(u28);
  `;

  await Neo4jService.runCypher(cypherScript);
  console.log("✅ [Seed] Nạp toàn bộ 35 Users, 25 Bài viết, 19 Stories, 18 Reels & Đồ thị Neo4j thành công!");
};
