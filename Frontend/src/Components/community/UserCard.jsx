import { motion } from 'framer-motion';
import { useState } from 'react';

export default function UserCard({ user }) {
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const [showChat, setShowChat] = useState(false); // Track chatbot visibility

  // Handle Connect Button Click
  const handleConnect = () => {
    setIsConnected(true); // Set connection status to true
  };

  // Handle Chat Button Click
  const handleChat = () => {
    setShowChat(true); // Open chatbot modal
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade-in animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
        isConnected ? 'bg-green-50 border-2 border-green-100' : 'bg-white border-2 border-transparent'
      }`}
    >
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-purple-600">{user.role}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-2">
        <p className="text-gray-600"><span className="font-medium">Disability:</span> {user.disabilityType}</p>
        <p className="text-gray-600"><span className="font-medium">Location:</span> {user.location}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {user.interests.map((interest, index) => (
            <span 
              key={index} 
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium"
            >
              #{interest}
            </span>
          ))}
        </div>
      </div>

      {/* Connect Button */}
      <motion.button
        onClick={handleConnect}
        disabled={isConnected}
        className={`mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors ${
          isConnected 
            ? 'bg-green-100 text-green-600 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
        whileHover={!isConnected ? { scale: 1.05 } : {}}
        whileTap={!isConnected ? { scale: 0.95 } : {}}
      >
        {isConnected ? 'Connected' : 'Connect'}
      </motion.button>

      {/* Chat Button (Visible after connecting) */}
      {isConnected && (
        <motion.button
          onClick={handleChat}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
        >
          Chat
        </motion.button>
      )}

      {/* Chatbot Modal */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl w-full max-w-md p-6 relative"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chat with {user.name}</h2>
            <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <p className="text-gray-600">Start chatting with {user.name}!</p>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-purple-600"
            />
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}