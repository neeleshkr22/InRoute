import { detectLanguage } from '../Utils/languageDetector.js';

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

    // For now, just echo back the message
    // In a real application, you would process the message and generate a response
    const botReply = `Received message in ${languageCode}: ${message}`;

    res.status(200).json({
      reply: botReply,
      languageCode
    });
  } catch (error) {
    console.error("Error processing the message:", error);
    res.status(500).json({ reply: "Hello how are you" });
  }
};

