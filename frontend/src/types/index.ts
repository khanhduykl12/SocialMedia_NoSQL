export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profile: {
    fullName: string;
    avatarUrl: string;
    bio: string;
    city: string;
    school: string;
    workplace: string;
    interests: string[];
  };
}

export interface Post {
  _id: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  content: string;
  mediaUrls: string[];
  privacy: string;
  likes: string[];
  likeCount: number;
  comments: {
    authorId: string;
    content: string;
    createdAt: string;
  }[];
  commentCount: number;
  createdAt: string;
}

export interface Story {
  _id: string;
  authorId: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  caption?: string;
  createdAt: string;
}

export interface StoryGroup {
  authorId: string;
  authorName: string;
  authorAvatar: string;
  stories: Story[];
}

export interface Reel {
  _id: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  musicTitle: string;
  tags: string[];
  likes: string[];
  likeCount: number;
  commentCount: number;
  viewsCount: number;
  createdAt: string;
}

export interface FriendRecommendation {
  id: string;
  fullName: string;
  avatarUrl?: string;
  city: string;
  workplace: string;
  mutualCount?: number;
  sampleMutuals?: string[];
  commonGroupsCount?: number;
  commonGroups?: string[];
  commonInterests?: string[];
  matchScore?: number;
  matchPercentage?: number;
  score?: number;
}

export interface GraphNode {
  id: string;
  label: string;
  group: string;
  city?: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}
