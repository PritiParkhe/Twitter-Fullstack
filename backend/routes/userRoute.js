import express from "express";
import { userSignupController } from "../controllers/User/userSignupController.js";
import { userLoginController } from "../controllers/User/userLoginController.js";
import { userLogoutController } from "../controllers/User/userLogout.js";
import { createTweetController } from "../controllers/Tweet/tweetController.js";
import isAuthenticated from "../middleware/auth.js";
import { deleteTweetController } from "../controllers/Tweet/deleteTweetController.js";
import { likeOrDislikeTweetController } from "../controllers/Tweet/likeOrDislikeTweetController.js";
import { bookmarkController } from "../controllers/Tweet/tweetBokmarkController.js";
import { getMyProfileController } from "../controllers/User/getUserProfile.js";
import { getOtherUserProfileController } from "../controllers/User/getOtherUserProfileController.js";
import { followController } from "../controllers/User/followController.js";
import { unfollowController } from "../controllers/User/unfollowControllers.js";
import { getAllTweetControllers } from "../controllers/Tweet/getAllTweets.js";
import { getFollowingTweets } from "../controllers/Tweet/getFollowingTweets.js";
import { UpdateUserController } from "../controllers/User/updateUser.js";
import { freezeAccount } from "../controllers/User/freezeAccount.js";
import { commentController } from "../controllers/Tweet/commentsController.js";
import { getCommentListController } from "../controllers/Tweet/getCommentList.js";
import { getOtherUserProfile } from "../controllers/User/getOtherUserProfile.js";

const router = express.Router();

//user Routes
router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/logout", userLogoutController);
router.get("/profile/:id", isAuthenticated, getMyProfileController);
router.get(
  "/others-profile/:id",
  isAuthenticated,
  getOtherUserProfileController
);
router.post("/follow/:id", isAuthenticated, followController);
router.post("/unfollow/:id", isAuthenticated, unfollowController);
router.get("/all-tweets/:id", isAuthenticated, getAllTweetControllers);
router.get("/following-tweets/:id", isAuthenticated, getFollowingTweets);
router.put("/update", isAuthenticated, UpdateUserController);
router.put("/freeze", isAuthenticated, freezeAccount);
router.get("/getprofile/:query", getOtherUserProfile);

// tweet routes
router.post("/create-tweet", isAuthenticated, createTweetController);
router.delete("/delete-tweet/:id", isAuthenticated, deleteTweetController);
router.put("/like/:id", isAuthenticated, likeOrDislikeTweetController);
router.post("/bookmarks/:id", isAuthenticated, bookmarkController);
router.post("/comment/:_id", isAuthenticated, commentController);
router.get("/commentList/:_id", isAuthenticated, getCommentListController);

export default router;
