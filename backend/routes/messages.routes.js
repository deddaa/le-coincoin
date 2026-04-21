import express from 'express';
import { getMessages , getConversation , sendMessage , removeMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/:ads_id", getMessages);
router.get("/:ads_id/:sender_id/:receiver_id", getConversation);
router.post("/send", sendMessage);
router.delete("/:id", removeMessage);

export default router;