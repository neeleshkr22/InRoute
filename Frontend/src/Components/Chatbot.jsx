// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you today?", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false;
//   recognition.interimResults = false;
//   // Remove fixed language to allow auto-detection
//   recognition.lang = ""; 

//   // Start voice recognition
//   const startListening = () => {
//     setIsListening(true);
//     recognition.start();
//   };

//   // Handle voice input
//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setInput(transcript);
//     sendMessage(transcript);
//     setIsListening(false);
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     setIsListening(false);
//   };
  
//   recognition.onend = () => setIsListening(false);

//   // Play audio response from server
//   const playAudioResponse = (base64Audio) => {
//     const audioBlob = new Blob(
//       [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
//       { type: 'audio/mp3' }
//     );
//     const audioUrl = URL.createObjectURL(audioBlob);
//     setAudioUrl(audioUrl);
//     const audio = new Audio(audioUrl);
//     audio.play();
//   };

//   // Send Message to Server
//   const sendMessage = async (messageText = input) => {
//     if (!messageText.trim()) return;

//     const userMessage = { text: messageText, sender: "user" };
//     setMessages([...messages, userMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/chatbot/chat", { message: messageText });
//       const botMessage = { text: response.data.reply, sender: "bot" };
//       setMessages((prev) => [...prev, botMessage]);
      
//       // Play audio response if available
//       if (response.data.audio) {
//         playAudioResponse(response.data.audio);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = error.response?.data?.message || "Error getting response. Please try again.";
//       setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
//     }
//   };

//   // Cleanup audio URL when component unmounts
//   useEffect(() => {
//     return () => {
//       if (audioUrl) {
//         URL.revokeObjectURL(audioUrl);
//       }
//     };
//   }, [audioUrl]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Chat Header */}
//       <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
//         Multilingual AI Chatbot
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-xs px-4 py-2 rounded-lg ${
//               msg.sender === "user" ? "bg-indigo-500 text-white self-end ml-auto" : "bg-gray-300 text-gray-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input Field */}
//       <div className="p-4 bg-white shadow-md flex">
//         <button 
//           onClick={startListening} 
//           className={`${isListening ? 'bg-red-600' : 'bg-red-500'} text-white px-4 py-2 rounded-l-lg`}
//         >
//           🎤
//         </button>
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
//           placeholder="Type your message in any language..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={() => sendMessage()} className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Speech recognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = ""; // Allow auto-detection of language

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

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => setIsListening(false);

  // Send Message to Server
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Send the message to the backend for processing
      const response = await axios.post("http://localhost:5000/chatbot/chat", {
        message: messageText,
      });
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

      // Use Web Speech API to speak the bot's reply
      speak(response.data.reply);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "Error getting response. Please try again.";
      setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
    }
  };

  // Speech synthesis using Web Speech API
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Default language, can be dynamically set based on detected language
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of speech
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Your browser does not support speech synthesis.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
        Multilingual AI Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-indigo-500 text-white self-end ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white shadow-md flex">
        <button
          onClick={startListening}
          className={`${
            isListening ? "bg-red-600" : "bg-red-500"
          } text-white px-4 py-2 rounded-l-lg`}
        >
          🎤
        </button>
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
          placeholder="Type your message in any language..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={() => sendMessage()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;