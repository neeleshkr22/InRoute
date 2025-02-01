// import { detectLanguage } from '../utils/languageDetector.js';

// export const sendMessage = async (req, res) => {
//   const { message, isVoice } = req.body;

//   if (!message.trim()) {
//     return res.status(400).json({ reply: "Message cannot be empty." });
//   }

//   try {
//     // Detect the language of the incoming message
//     const languageCode = detectLanguage(message);

//     if (!languageCode) {
//       return res.status(400).json({ reply: "Unable to detect language." });
//     }

//     // For now, just echo back the message
//     // In a real application, you would process the message and generate a response
//     const botReply = `Received message in ${languageCode}: ${message}`;

//     res.status(200).json({
//       reply: botReply,
//       languageCode
//     });
//   } catch (error) {
//     console.error("Error processing the message:", error);
//     res.status(500).json({ reply: "Hello how are you" });
//   }
// };

// controllers/chatbot.controller.js
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const sendMessage = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json(response);
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response?.status === 429) {
      return res.status(429).json({ 
        message: "Rate limit exceeded. Please try again later." 
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
