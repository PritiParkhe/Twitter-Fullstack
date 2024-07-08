import express from "express";
import upload from "../config/multer.js";
import {
  addLikeController,
  createStoryController,
  deleteStoryController,
  getAllStoriesController,
  getStoryByIdController,
  incrementViewsController,
  updateStoryController,
} from "../controllers/storyController.js";
const router = express.Router();

router.post("/stories", upload.single("media"), createStoryController);
router.get("/stories", getAllStoriesController);
router.get("/stories/:id", getStoryByIdController);
router.put("/stories/:id", updateStoryController);
router.delete("/stories/:id", deleteStoryController);
router.patch("/stories/:id/views", incrementViewsController);
router.post("/stories/:id/likes", addLikeController);
export default router;
