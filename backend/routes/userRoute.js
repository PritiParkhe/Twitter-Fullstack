import express from 'express';
import { userSignupController } from '../controllers/User/userSignupController.js';
import { userLoginController } from '../controllers/User/userLoginController.js';
import { userLogoutController } from '../controllers/User/userLogout.js';
import { createTweetController } from '../controllers/Tweet/tweetController.js';
import isAuthenticated from '../middleware/auth.js';
import { deleteTweetController } from '../controllers/Tweet/deleteTweetController.js';
import { likeOrDislikeTweetController } from '../controllers/Tweet/likeorDislikeTweetController.js';
import { bookmarkController } from '../controllers/Tweet/tweetBokmarkController.js';
import { getMyProfileController } from '../controllers/User/getUserProfile.js';
import { getOtherUserProfileController } from '../controllers/User/getOtherUserProfileController.js';

const router = express.Router();

//user Routes
router.post('/signup', userSignupController);
router.post('/login', userLoginController);
router.get('/logout', userLogoutController);
router.get('/profile/:id',isAuthenticated, getMyProfileController);
router.get('/others-profile/:id',isAuthenticated, getOtherUserProfileController);

// tweet routes
router.post('/create-tweet', isAuthenticated, createTweetController);
router.delete('/delete-tweet/:id', isAuthenticated, deleteTweetController);
router.put('/like/:id',isAuthenticated,likeOrDislikeTweetController );
router.put('/bookmarks/:id', isAuthenticated, bookmarkController);



export default router;
