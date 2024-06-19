import express from 'express';
import { userSignupController } from '../controllers/userSignupController.js';
import { userLoginController } from '../controllers/userLoginController.js';
import { userLogoutController } from '../controllers/userLogout.js';

const router = express.Router();

router.post('/signup', userSignupController);
router.post('/login', userLoginController);
router.get('/logout', userLogoutController)

export default router;
