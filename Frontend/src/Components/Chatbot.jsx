import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // Start voice recognition
  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  // Handle voice input
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    sendMessage(transcript);
    setIsListening(false);
  };

  recognition.onerror = () => setIsListening(false);
  recognition.onend = () => setIsListening(false);

  // Text-to-Speech
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // Send Message to Server
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { text: messageText, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: messageText });
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
      speak(response.data.reply);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error getting response", sender: "bot" }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
        AI Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender === "user" ? "bg-indigo-500 text-white self-end ml-auto" : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white shadow-md flex">
        <button onClick={startListening} className="bg-red-500 text-white px-4 py-2 rounded-l-lg">
          🎤
        </button>
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()} className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
