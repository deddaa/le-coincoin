import express from 'express';
import { getMessages , getConversation , sendMessage , removeMessage } from '../controllers/message.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get("/:ads_id", authMiddleware, getMessages);
router.get("/:ads_id/:sender_id/:receiver_id", authMiddleware, getConversation);
router.post("/send", authMiddleware, sendMessage);
router.delete("/:id", authMiddleware, removeMessage);

export default router;