import express from 'express';
import { sendMessage } from '../Controllers/chatbot.controller.js';

const chatbotRouter = express.Router();

// Route to handle chatbot message requests
chatbotRouter.post('/chat', sendMessage);

export default chatbotRouter;
