import { Router } from "express";
import { ApiController } from "../controllers/api.controller";

const router = Router();

// User & Auth
router.get("/users/me", ApiController.getCurrentUser);
router.get("/users", ApiController.getAllUsers);
router.get("/users/:id", ApiController.getUserById);
router.get("/users/:id/posts", ApiController.getUserPosts);

// Posts (Feed)
router.get("/posts/feed", ApiController.getFeed);
router.post("/posts", ApiController.createPost);
router.post("/posts/:id/like", ApiController.likePost);

// Stories 24h
router.get("/stories/feed", ApiController.getStories);
router.post("/stories", ApiController.createStory);

// Reels (Video ngắn)
router.get("/reels/feed", ApiController.getReels);
router.post("/reels/:id/like", ApiController.likeReel);

// Friends & Recommendations (Neo4j)
router.get("/friends", ApiController.getFriends);
router.get("/recommendations/friends", ApiController.getRecommendations);

// Graph Network & Shortest Path (Vis-Network)
router.get("/graph/network-data", ApiController.getGraphNetwork);
router.get("/graph/shortest-path", ApiController.getShortestPath);

// Groups & Chat
router.get("/groups", ApiController.getGroups);
router.get("/chat/:friendId", ApiController.getMessages);
router.post("/chat/:friendId", ApiController.sendMessage);

// Analytics & Seed
router.get("/analytics", ApiController.getAnalytics);
router.post("/seed", ApiController.triggerSeed);

export default router;
