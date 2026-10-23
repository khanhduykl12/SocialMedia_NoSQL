import axios from "axios";
import { User, Post, StoryGroup, Reel, FriendRecommendation, GraphNode, GraphEdge } from "../types";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

export const apiService = {
  // Current user & profiles
  getCurrentUser: () => API.get<User>("/users/me").then((res) => res.data),
  getAllUsers: () => API.get<User[]>("/users").then((res) => res.data),
  getUserById: (id: string) => API.get<User>(`/users/${id}`).then((res) => res.data),
  getUserPosts: (id: string) => API.get<Post[]>(`/users/${id}/posts`).then((res) => res.data),

  // Posts
  getFeed: () => API.get<Post[]>("/posts/feed").then((res) => res.data),
  createPost: (data: { content: string; mediaUrls?: string[] }) => API.post<Post>("/posts", data).then((res) => res.data),
  likePost: (id: string) => API.post<Post>(`/posts/${id}/like`, {}).then((res) => res.data),

  // Stories
  getStories: () => API.get<StoryGroup[]>("/stories/feed").then((res) => res.data),
  createStory: (data: { mediaUrl: string; caption?: string }) => API.post("/stories", data).then((res) => res.data),

  // Reels
  getReels: () => API.get<Reel[]>("/reels/feed").then((res) => res.data),
  likeReel: (id: string) => API.post<Reel>(`/reels/${id}/like`, {}).then((res) => res.data),

  // Friends & Recommendations
  getFriends: () => API.get<any[]>("/friends").then((res) => res.data),
  getRecommendations: (mode = "hybrid") =>
    API.get<FriendRecommendation[]>(`/recommendations/friends?mode=${mode}`).then((res) => res.data),

  // Graph
  getGraphNetwork: () => API.get<{ nodes: GraphNode[]; edges: GraphEdge[] }>("/graph/network-data").then((res) => res.data),
  getShortestPath: (from: string, to: string) =>
    API.get<{ chain: { id: string; name: string }[]; degrees: number }>(`/graph/shortest-path?from=${from}&to=${to}`).then((res) => res.data),

  // Groups & Chat
  getGroups: () => API.get<any[]>("/groups").then((res) => res.data),
  getMessages: (friendId: string) => API.get<any[]>(`/chat/${friendId}`).then((res) => res.data),
  sendMessage: (friendId: string, text: string) => API.post(`/chat/${friendId}`, { text }).then((res) => res.data),

  // Analytics & Seed
  getAnalytics: () => API.get<any>("/analytics").then((res) => res.data),
  triggerSeed: () => API.post("/seed", {}).then((res) => res.data)
};
