import { useState } from 'react';
import UserCard from './UserCard';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

// Disability filter tags
const disabilityFilters = [
  { id: 'visual', label: 'Visual Impairment', color: 'bg-purple-100 text-purple-800' },
  { id: 'mobility', label: 'Mobility Impairment', color: 'bg-blue-100 text-blue-800' },
  { id: 'hearing', label: 'Hearing Impairment', color: 'bg-green-100 text-green-800' },
  { id: 'cognitive', label: 'Cognitive Disability', color: 'bg-yellow-100 text-yellow-800' }
];

// Mock data for users (Connect with Peers)
const mockUsers = [
  // Visual Impairment
  {
    id: 1,
    name: "Sarah Johnson",
    disabilityType: "visual",
    location: "London, UK",
    interests: ["Music", "Podcasts", "Accessibility Tech"],
    avatar: "https://placehold.co/100x100?text=SJ"
  },
  {
    id: 2,
    name: "Emma Watson",
    disabilityType: "visual",
    location: "Paris, France",
    interests: ["Books", "Technology", "Travel"],
    avatar: "https://placehold.co/100x100?text=EW"
  },

  // Mobility Impairment
  {
    id: 3,
    name: "Michael Chen",
    disabilityType: "mobility",
    location: "New York, USA",
    interests: ["Travel", "Gaming", "Urban Design"],
    avatar: "https://placehold.co/100x100?text=MC"
  },
  {
    id: 4,
    name: "David Smith",
    disabilityType: "mobility",
    location: "Berlin, Germany",
    interests: ["Sports", "Photography", "Cooking"],
    avatar: "https://placehold.co/100x100?text=DS"
  },

  // Hearing Impairment
  {
    id: 5,
    name: "Laura Brown",
    disabilityType: "hearing",
    location: "Sydney, Australia",
    interests: ["Art", "Dance", "Sign Language"],
    avatar: "https://placehold.co/100x100?text=LB"
  },
  {
    id: 6,
    name: "James Wilson",
    disabilityType: "hearing",
    location: "Toronto, Canada",
    interests: ["Music", "Technology", "Advocacy"],
    avatar: "https://placehold.co/100x100?text=JW"
  },

  // Cognitive Disability
  {
    id: 7,
    name: "Sophia Lee",
    disabilityType: "cognitive",
    location: "Tokyo, Japan",
    interests: ["Reading", "Writing", "Mindfulness"],
    avatar: "https://placehold.co/100x100?text=SL"
  },
  {
    id: 8,
    name: "Daniel Kim",
    disabilityType: "cognitive",
    location: "Seoul, South Korea",
    interests: ["Gaming", "Movies", "Social Work"],
    avatar: "https://placehold.co/100x100?text=DK"
  }
];

// Mock data for shared stories
const mockBlogs = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Visually Impaired Traveler",
    avatar: "https://placehold.co/100x100?text=SJ",
    excerpt: "InRoute's audio guidance helped me navigate Tokyo's subway system independently for the first time!",
    fullContent: `Being visually impaired, I always relied on others for navigation. With InRoute's detailed audio instructions and crowd-sourced accessibility reviews, I finally felt confident exploring Tokyo on my own. The real-time updates about elevator outages were particularly helpful!`,
    date: "2 days ago",
    likes: 45,
    comments: [
      { author: "Mike", text: "This is inspiring! Keep sharing your journeys!" },
      { author: "Laila", text: "Tokyo's subway can be overwhelming, great job!" }
    ]
  },
  {
    id: 2,
    author: "Michael Chen",
    role: "Wheelchair User",
    avatar: "https://placehold.co/100x100?text=MC",
    excerpt: "InRoute helped me find wheelchair-accessible routes in my city. It's a game-changer!",
    fullContent: `As a wheelchair user, I often struggle to find accessible routes. InRoute's detailed accessibility reviews and custom route planning made my daily commute so much easier. I highly recommend it to anyone with mobility challenges!`,
    date: "5 days ago",
    likes: 32,
    comments: [
      { author: "Emily", text: "This is amazing! Thanks for sharing." },
      { author: "John", text: "I had the same experience. InRoute is a lifesaver!" }
    ]
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('connect'); // Tabs: 'connect' or 'stories'
  const [selectedBlog, setSelectedBlog] = useState(null); // Selected blog for modal
  const [selectedFilter, setSelectedFilter] = useState(null); // Selected disability filter

  // Filter users based on selected disability
  const filteredUsers = selectedFilter
    ? mockUsers.filter(user => user.disabilityType === selectedFilter)
    : mockUsers;

  return (
    <div className="min-h-screen bg-white pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-purple-600 mb-8">Community Support</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('connect')}
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'connect' 
                ? 'border-b-2 border-purple-600 text-purple-600' 
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            Connect with Peers
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`pb-4 px-1 text-sm font-medium ${
              activeTab === 'stories' 
                ? 'border-b-2 border-purple-600 text-purple-600' 
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            Shared Stories
          </button>
        </div>

        {/* Disability Filters */}
        {activeTab === 'connect' && (
          <div className="flex flex-wrap gap-2 mb-8">
            {disabilityFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id === selectedFilter ? null : filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter.id === selectedFilter
                    ? `${filter.color} ring-2 ring-offset-2 ring-purple-500`
                    : `${filter.color} hover:opacity-80`
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {activeTab === 'connect' ? (
          // Connect with Peers Section
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl text-gray-700 mb-2">
                  No Users Found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different filter.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Shared Stories Section
          <div className="space-y-6">
            {mockBlogs.map(blog => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                onClick={() => setSelectedBlog(blog)}
              />
            ))}
          </div>
        )}

        {/* Blog Modal */}
        {selectedBlog && (
          <BlogModal 
            blog={selectedBlog} 
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </div>
    </div>
  );
}