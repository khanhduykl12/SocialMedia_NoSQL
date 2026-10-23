import React, { useState } from "react";
import { CreatePostModal } from "../components/CreatePostModal";
import { PostCard } from "../components/PostCard";
import { User, Post, StoryGroup } from "../types";

interface Props {
  currentUser: User | null;
  posts: Post[];
  stories: StoryGroup[];
  onLikePost: (id: string) => void;
  onCreatePost: (content: string, mediaUrls?: string[]) => void;
  onOpenStory: (group: StoryGroup) => void;
  onViewProfile?: (userId: string) => void;
  isDark: boolean;
}

export const FeedPage: React.FC<Props> = ({
  currentUser,
  posts,
  stories,
  onLikePost,
  onCreatePost,
  onOpenStory,
  onViewProfile,
  isDark
}) => {
  const [timelineTab, setTimelineTab] = useState<"recent" | "foryou" | "following">("foryou");

  // Dynamic filter for posts
  const filteredPosts = React.useMemo(() => {
    if (timelineTab === "recent") {
      return [...posts].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    if (timelineTab === "following") {
      return posts.filter((p) => p.authorId !== "usr_101");
    }
    return posts;
  }, [posts, timelineTab]);

  return (
    <div className="w-full max-w-[620px] xl:max-w-[660px] mx-auto py-5 px-3 space-y-5">
      {/* 1. Header: Timeline Title & Filter Tabs */}
      <div className="flex items-center justify-between pb-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1713] dark:text-[#FAF7F2] font-['Outfit']">
          Timeline
        </h1>

        <div className="flex items-center space-x-6 text-xs font-semibold">
          <button
            onClick={() => setTimelineTab("recent")}
            className={`transition py-1 cursor-pointer ${
              timelineTab === "recent"
                ? "text-[#1C1713] dark:text-[#FAF7F2] font-extrabold border-b-2 border-[#786450]"
                : "text-[#5A4D3E] dark:text-[#C5B8A8] hover:text-[#1C1713] dark:hover:text-[#FAF7F2]"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setTimelineTab("foryou")}
            className={`transition py-1 cursor-pointer ${
              timelineTab === "foryou"
                ? "text-[#1C1713] dark:text-[#FAF7F2] font-extrabold border-b-2 border-[#786450]"
                : "text-[#5A4D3E] dark:text-[#C5B8A8] hover:text-[#1C1713] dark:hover:text-[#FAF7F2]"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setTimelineTab("following")}
            className={`transition py-1 cursor-pointer ${
              timelineTab === "following"
                ? "text-[#1C1713] dark:text-[#FAF7F2] font-extrabold border-b-2 border-[#786450]"
                : "text-[#5A4D3E] dark:text-[#C5B8A8] hover:text-[#1C1713] dark:hover:text-[#FAF7F2]"
            }`}
          >
            Following
          </button>
        </div>
      </div>

      {/* 2. What's Happening Card */}
      <CreatePostModal
        currentUser={currentUser}
        onSubmit={onCreatePost}
        isDark={isDark}
      />

      {/* 3. Feed Posts List */}
      <div className="space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-xs font-medium text-[#5A4D3E] dark:text-[#C5B8A8] bg-white dark:bg-[#231F1A] rounded-3xl border border-[#E5DCD0] dark:border-[#383127]">
            Chưa có bài viết nào trong mục này.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={currentUser?._id}
              onLike={onLikePost}
              onAuthorClick={onViewProfile}
              isDark={isDark}
            />
          ))
        )}
      </div>
    </div>
  );
};
