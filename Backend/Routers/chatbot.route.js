import express from 'express';
import { sendMessage } from '../Controllers/chatbot.controller.js';

const chatbotRouter = express.Router();


chatbotRouter.post('/chat', sendMessage);

export default chatbotRouter;
