import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyBB7QVQkF2u8F94UjHdxxsbg0h6098Laro'); // Replace with your API key
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    // Initialize the chat session
    const initChat = async () => {
      const newChat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });
      setChat(newChat);
    };
    initChat();
  }, []);

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = ""; // Auto-detect language

  // Initialize speech synthesis
  const synth = window.speechSynthesis;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const speakText = (text, languageCode) => {
    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    };

    synth.speak(utterance);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    sendMessage(transcript, true);
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  };
  
  recognition.onend = () => setIsListening(false);

  const detectLanguage = async (text) => {
    try {
      // You can implement language detection here using a library like 'franc' or 
      // Google Cloud Language API. For now, defaulting to 'en-US'
      return 'en-IN';
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en-IN';
    }
  };

  const sendMessage = async (messageText = input, isVoice = false) => {
    if (!messageText.trim() || !chat) return;

    const userMessage = { text: messageText, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      // Send message to Gemini
      const result = await chat.sendMessage(messageText);
      const response = await result.response;
      const botReply = response.text();
      
      // Detect language of the response
      const languageCode = await detectLanguage(botReply);
      
      const botMessage = { 
        text: botReply, 
        sender: "bot",
        languageCode: languageCode
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response if it's a voice interaction
      if (isVoice) {
        speakText(botReply, languageCode);
      }
      
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = "An error occurred. Please try again.";
      setMessages(prev => [...prev, { text: errorMessage, sender: "bot" }]);
      // Speak error message if it's a voice interaction
      if (isVoice) {
        speakText(errorMessage, 'en-US');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
        Multilingual AI Chatbot
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-indigo-500 text-white self-end ml-auto" : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.text}
              {msg.sender === "bot" && isSpeaking && (
                <span className="ml-2 text-xs opacity-75">🔊</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white shadow-md flex">
        <button 
          onClick={startListening}
          disabled={isSpeaking} 
          className={`${isListening ? 'bg-red-600' : 'bg-red-500'} text-white px-4 py-2 rounded-l-lg ${isSpeaking ? 'opacity-50' : ''}`}
        >
          🎤
        </button>
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
          placeholder="Type your message in any language..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isSpeaking && sendMessage()}
          disabled={isSpeaking}
        />
        <button 
          onClick={() => sendMessage()}
          disabled={isSpeaking} 
          className={`bg-indigo-600 text-white px-4 py-2 rounded-r-lg ${isSpeaking ? 'opacity-50' : ''}`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;