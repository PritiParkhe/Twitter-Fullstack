import express from "express";
import { sendMessageController } from "../controllers/message/message.js";
import isAuthenticated from "../middleware/auth.js";
import { getMessageController } from "../controllers/message/getMessage.js";
import { getConversationController } from "../controllers/message/getConversation.js";
const router = express.Router();

router.post("/", isAuthenticated, sendMessageController);
router.get("/getmessage/:otherUserId", isAuthenticated, getMessageController);
router.get("/conversation", isAuthenticated, getConversationController);

export default router;
