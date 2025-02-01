// Components/Community/BlogCard.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlogCard({ blog, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-md transition-all duration-300 cursor-pointer border-2 ${
          isHovered ? 'border-purple-200 shadow-lg' : 'border-transparent'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={blog.avatar} 
            alt={blog.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{blog.author}</h3>
            <p className="text-sm text-purple-600">{blog.role}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          "{blog.excerpt}"
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 hover:text-purple-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {blog.comments.length}
            </button>
            <button className="flex items-center gap-1 hover:text-purple-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {blog.likes}
            </button>
          </div>
          <span className="text-xs text-gray-400">{blog.date}</span>
        </div>
      </div>

      {/* Glow effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl bg-purple-100 blur-2xl opacity-30 -z-10" />
      )}
    </motion.div>
  );
}