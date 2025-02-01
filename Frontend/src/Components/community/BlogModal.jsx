// Components/Community/BlogModal.jsx
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function BlogModal({ blog, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img 
            src={blog.avatar} 
            alt={blog.author}
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{blog.author}</h2>
            <p className="text-purple-600">{blog.role}</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.fullContent}
          </p>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Comments ({blog.comments.length})
            </h3>
            
            <div className="space-y-4">
              {blog.comments.map((comment, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm text-purple-600">
                        {comment.author[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      {comment.author}
                    </p>
                    <p className="text-gray-600 text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}