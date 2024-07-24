import express from "express";
import upload from "../config/multer.js";
import { addLikeController } from "../controllers/story/likeStory.js";
import isAuthenticated from "../middleware/auth.js";
import { getAllStoriesController } from "../controllers/story/getAllStories.js";
import { createStoryController } from "../controllers/story/createStory.js";
import { getStoryByIdController } from "../controllers/story/getStoryById.js";
import { deleteStoryController } from "../controllers/story/deleteStory.js";
import { incrementViewsController } from "../controllers/story/incrimentViews.js";
import { getMyStoriesController } from "../controllers/story/getMyStory.js";
const router = express.Router();

router.post(
  "/createstory",
  upload.single("media"),
  isAuthenticated,
  createStoryController
);
router.get("/allstories", isAuthenticated, getAllStoriesController);
router.get("/stories/:id", isAuthenticated, getStoryByIdController);
router.delete("/delete-story/:id", isAuthenticated, deleteStoryController);
router.patch("/views-stories/:id",isAuthenticated, incrementViewsController);
router.post("/likes-stories/:id",isAuthenticated, addLikeController);
router.get("/mystory", isAuthenticated, getMyStoriesController)
export default router;
