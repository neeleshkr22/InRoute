



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you today?", sender: "bot" }
//   ]);
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   // Initialize speech recognition
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false;
//   recognition.interimResults = false;
//   recognition.lang = ""; // Auto-detect language

//   // Initialize speech synthesis
//   const synth = window.speechSynthesis;

//   const startListening = () => {
//     setIsListening(true);
//     recognition.start();
//   };

//   const speakText = (text, languageCode) => {
//     // Cancel any ongoing speech
//     synth.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = languageCode;
    
//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = (error) => {
//       console.error('Speech synthesis error:', error);
//       setIsSpeaking(false);
//     };

//     synth.speak(utterance);
//   };

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setInput(transcript);
//     sendMessage(transcript, true);
//     setIsListening(false);
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     setIsListening(false);
//   };
  
//   recognition.onend = () => setIsListening(false);

//   const sendMessage = async (messageText = input, isVoice = false) => {
//     if (!messageText.trim()) return;

//     const userMessage = { text: messageText, sender: "user" };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/chatbot/chat", { 
//         message: messageText,
//         isVoice 
//       });
      
//       const botMessage = { 
//         text: response.data.reply, 
//         sender: "bot",
//         languageCode: response.data.languageCode
//       };
      
//       setMessages(prev => [...prev, botMessage]);
      
//       speakText(response.data.reply, response.data.languageCode);
      
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = error.response?.data?.message || "fetching error from server please try again";
//       setMessages(prev => [...prev, { text: errorMessage, sender: "bot" }]);
//       // Speak error message too
//       speakText(errorMessage, 'en-US');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
//         Multilingual AI Chatbot
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg, index) => (
//           <div key={index} className="flex flex-col">
//             <div
//               className={`max-w-xs px-4 py-2 rounded-lg ${
//                 msg.sender === "user" ? "bg-indigo-500 text-white self-end ml-auto" : "bg-gray-300 text-gray-800"
//               }`}
//             >
//               {msg.text}
//               {msg.sender === "bot" && isSpeaking && (
//                 <span className="ml-2 text-xs opacity-75">🔊</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 bg-white shadow-md flex">
//         <button 
//           onClick={startListening}
//           disabled={isSpeaking} 
//           className={`${isListening ? 'bg-red-600' : 'bg-red-500'} text-white px-4 py-2 rounded-l-lg ${isSpeaking ? 'opacity-50' : ''}`}
//         >
//           🎤
//         </button>
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
//           placeholder="Type your message in any language..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && !isSpeaking && sendMessage()}
//           disabled={isSpeaking}
//         />
//         <button 
//           onClick={() => sendMessage()}
//           disabled={isSpeaking} 
//           className={`bg-indigo-600 text-white px-4 py-2 rounded-r-lg ${isSpeaking ? 'opacity-50' : ''}`}
//         >
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
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = ""; // Auto-detect language

  // Initialize speech synthesis
  const synth = window.speechSynthesis;

  const startListening = () => {
    if (isProcessing || isSpeaking) return;
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

  const sendMessage = async (messageText = input, isVoice = false) => {
    if (!messageText.trim() || isProcessing) return;

    const userMessage = { text: messageText, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      const response = await axios.post("http://localhost:3000/chatbot/chat", { 
        message: messageText,
        isVoice 
      });
      
      const botMessage = { 
        text: response.data.reply, 
        sender: "bot",
        languageCode: response.data.languageCode
      };
      
      setMessages(prev => [...prev, botMessage]);
      speakText(response.data.reply, response.data.languageCode);
      
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.reply || "Server error. Please try again.";
      setMessages(prev => [...prev, { text: errorMessage, sender: "bot" }]);
      speakText(errorMessage, 'en-US');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white text-center py-4 text-xl font-semibold shadow-lg">
        AI Voice Chatbot
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
        {isProcessing && (
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 p-3 rounded-full animate-bounce">⋯</div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white shadow-md flex">
        <button 
          onClick={startListening}
          disabled={isProcessing || isSpeaking} 
          className={`${isListening ? 'bg-red-600' : 'bg-red-500'} text-white px-4 py-2 rounded-l-lg 
            ${(isProcessing || isSpeaking) ? 'opacity-50' : ''}`}
        >
          🎤
        </button>
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
          placeholder="Type your message in any language..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isProcessing && !isSpeaking && sendMessage()}
          disabled={isProcessing || isSpeaking}
        />
        <button 
          onClick={() => sendMessage()}
          disabled={isProcessing || isSpeaking} 
          className={`bg-indigo-600 text-white px-4 py-2 rounded-r-lg 
            ${(isProcessing || isSpeaking) ? 'opacity-50' : ''}`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;