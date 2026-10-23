import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { RightSidebar } from "./components/RightSidebar";
import { FeedPage } from "./pages/FeedPage";
import { ReelsPage } from "./pages/ReelsPage";
import { FriendsPage } from "./pages/FriendsPage";
import { GraphPage } from "./pages/GraphPage";
import { AdminPage } from "./pages/AdminPage";
import { MessagesPage } from "./pages/MessagesPage";
import { StoryModal } from "./components/StoryModal";
import { DegreesOfSeparation } from "./components/DegreesOfSeparation";
import { ChatBox } from "./components/ChatBox";
import { UserProfileModal } from "./components/UserProfileModal";
import { apiService } from "./services/api";
import { User, Post, StoryGroup, Reel, FriendRecommendation, GraphNode, GraphEdge } from "./types";

export function App() {
  const [activeTab, setActiveTab] = useState("feed");
  // Default to Warm Light Theme to match Goonly Dribbble design
  const [isDark, setIsDark] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<StoryGroup[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [recommendations, setRecommendations] = useState<FriendRecommendation[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({
    nodes: [],
    edges: []
  });

  // UI Modals & Floating Chat
  const [activeStoryGroup, setActiveStoryGroup] = useState<StoryGroup | null>(null);
  const [showDegreesModal, setShowDegreesModal] = useState(false);
  const [chatFriend, setChatFriend] = useState<any | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [recMode, setRecMode] = useState("hybrid");
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Initial Data Fetching
  const fetchAllData = async () => {
    try {
      const [u, us, p, s, r, f, g] = await Promise.all([
        apiService.getCurrentUser().catch(() => null),
        apiService.getAllUsers().catch(() => []),
        apiService.getFeed().catch(() => []),
        apiService.getStories().catch(() => []),
        apiService.getReels().catch(() => []),
        apiService.getFriends().catch(() => []),
        apiService.getGraphNetwork().catch(() => ({ nodes: [], edges: [] }))
      ]);

      if (u) setCurrentUser(u);
      setAllUsers(us);
      setPosts(p);
      setStories(s);
      setReels(r);
      setFriends(f);
      setGraphData(g);
    } catch (error) {
      console.error("Error fetching initial data", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Sync dark class on documentElement so Tailwind dark variant activates correctly
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Fetch recommendations whenever mode changes
  useEffect(() => {
    setLoadingRecs(true);
    apiService
      .getRecommendations(recMode)
      .then((data) => setRecommendations(data))
      .catch(console.error)
      .finally(() => setLoadingRecs(false));
  }, [recMode]);

  // Handlers
  const handleLikePost = async (id: string) => {
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: p.likes?.includes(currentUser?._id || "usr_101")
                ? p.likes.filter((u) => u !== (currentUser?._id || "usr_101"))
                : [...(p.likes || []), currentUser?._id || "usr_101"],
              likeCount: p.likes?.includes(currentUser?._id || "usr_101")
                ? Math.max(0, (p.likeCount || 1) - 1)
                : (p.likeCount || 0) + 1
            }
          : p
      )
    );
    try {
      await apiService.likePost(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeReel = async (id: string) => {
    try {
      const updated = await apiService.likeReel(id);
      setReels((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, likes: updated.likes, likeCount: updated.likeCount }
            : r
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async (content: string, mediaUrls?: string[]) => {
    const tempId = "post_" + Date.now();
    const optimisticPost: Post = {
      _id: tempId,
      authorId: currentUser?._id || "usr_101",
      authorName: currentUser?.profile.fullName || "Nguyễn Khánh Duy",
      authorAvatar: currentUser?.profile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      content,
      mediaUrls: mediaUrls || [],
      privacy: "public",
      likes: [],
      likeCount: 0,
      comments: [],
      commentCount: 0,
      createdAt: new Date().toISOString()
    };
    setPosts((prev) => [optimisticPost, ...prev]);

    try {
      const newPost = await apiService.createPost({ content, mediaUrls });
      setPosts((prev) =>
        prev.map((p) => (p._id === tempId ? { ...newPost, authorName: optimisticPost.authorName, authorAvatar: optimisticPost.authorAvatar } : p))
      );
    } catch (error) {
      console.error("Lỗi khi lưu bài viết lên server, giữ bài hiển thị cục bộ", error);
    }
  };

  const handleAddFriend = (id: string) => {
    setAddedFriends((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden transition-colors ${isDark ? "bg-[#14120F]" : "bg-[#FAF7F2]"}`}>
      {/* 1. TOP HEADER (Fixed Edge-to-Edge 64px) */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setChatFriend(friends[0] || { id: "usr_102", fullName: "Trần Thị Bình" })}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 2. BODY LAYOUT (Full Screen Edge-to-Edge 3-Column) */}
      <div className="w-full">
        {/* Left Fixed Navigation Column */}
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDegrees={() => setShowDegreesModal(true)}
          isDark={isDark}
        />

        {/* Center Main Scrollable Content */}
        <main className="pt-16 ml-0 lg:ml-[240px] xl:ml-[270px] mr-0 lg:mr-[280px] xl:mr-[320px] min-h-[calc(100vh-4rem)] flex justify-center">
          {activeTab === "feed" && (
            <FeedPage
              currentUser={currentUser}
              posts={posts}
              stories={stories}
              onLikePost={handleLikePost}
              onCreatePost={handleCreatePost}
              onOpenStory={(group) => setActiveStoryGroup(group)}
              onViewProfile={(id) => setViewingProfileId(id)}
              isDark={isDark}
            />
          )}

          {activeTab === "messages" && (
            <MessagesPage
              friends={friends}
              currentUser={currentUser}
              onViewProfile={(id) => setViewingProfileId(id)}
              initialChatFriend={chatFriend}
              isDark={isDark}
            />
          )}

          {activeTab === "reels" && (
            <ReelsPage
              reels={reels}
              onLikeReel={handleLikeReel}
              currentUserId={currentUser?._id}
            />
          )}

          {activeTab === "friends" && (
            <FriendsPage
              recommendations={recommendations}
              friends={friends}
              recMode={recMode}
              setRecMode={setRecMode}
              isLoading={loadingRecs}
              onAddFriend={handleAddFriend}
              addedFriends={addedFriends}
              onViewProfile={(id) => setViewingProfileId(id)}
              isDark={isDark}
            />
          )}

          {activeTab === "graph" && (
            <div className="w-full max-w-5xl py-4 px-2">
              <GraphPage
                nodes={graphData.nodes}
                edges={graphData.edges}
                isLoading={false}
                onRefresh={fetchAllData}
                onOpenDegrees={() => setShowDegreesModal(true)}
              />
            </div>
          )}

          {activeTab === "admin" && (
            <div className="w-full max-w-5xl py-4 px-2">
              <AdminPage />
            </div>
          )}
        </main>

        {/* Right Fixed Sidebar (Goonly Stories, Friend Suggestions & Online Contacts) */}
        <RightSidebar
          recommendations={recommendations}
          friends={friends}
          onAddFriend={handleAddFriend}
          addedFriends={addedFriends}
          onSelectFriendChat={(f) => setChatFriend(f)}
          onViewProfile={(id) => setViewingProfileId(id)}
          stories={stories}
          onOpenStory={(group) => setActiveStoryGroup(group)}
          isDark={isDark}
        />
      </div>

      {/* User Profile Modal when clicking any user avatar or name */}
      {viewingProfileId && (
        <UserProfileModal
          userId={viewingProfileId}
          onClose={() => setViewingProfileId(null)}
          onStartChat={(user) => {
            setChatFriend(user);
            setActiveTab("messages");
          }}
          onAddFriend={handleAddFriend}
          isFriend={friends.some((f) => f.id === viewingProfileId) || addedFriends.includes(viewingProfileId)}
          onViewGraph={() => setActiveTab("graph")}
          isDark={isDark}
        />
      )}

      {/* Facebook Floating Messenger Chat Box in Bottom-Right */}
      {chatFriend && (
        <ChatBox
          friend={chatFriend}
          onClose={() => setChatFriend(null)}
          isDark={isDark}
        />
      )}

      {/* Story Fullscreen Viewer Modal */}
      {activeStoryGroup && (
        <StoryModal
          group={activeStoryGroup}
          onClose={() => setActiveStoryGroup(null)}
        />
      )}

      {/* Degrees of Separation Shortest Path Modal */}
      {showDegreesModal && (
        <DegreesOfSeparation
          users={allUsers}
          onClose={() => setShowDegreesModal(false)}
        />
      )}
    </div>
  );
}

export default App;
