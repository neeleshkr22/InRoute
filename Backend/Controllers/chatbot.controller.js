// import { detectLanguage } from '../Utils/languageDetector.js';

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

import { OpenAI } from "openai";
import { detectLanguage } from '../Utils/languageDetector.js';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessage = async (req, res) => {
  const { message, isVoice } = req.body;

  if (!message.trim()) {
    return res.status(400).json({ reply: "Message cannot be empty." });
  }

  try {
    // Detect the language of the incoming message
    const languageCode = detectLanguage(message);

    if (!languageCode) {
      return res.status(400).json({ reply: "Unable to detect language." });
    }

    // Generate a response using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const botReply = response.choices[0].message.content;

    res.status(200).json({
      reply: botReply,
      languageCode,
    });
  } catch (error) {
    console.error("Error processing the message:", error);
    res.status(500).json({ reply: "An error occurred. Please try again later." });
  }
};