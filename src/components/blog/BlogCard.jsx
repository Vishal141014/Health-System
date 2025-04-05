import { Link } from 'react-router-dom';
import { FiClock, FiUser } from 'react-icons/fi';
import { useState } from 'react';

const BlogCard = ({ blog }) => {
  const { id, title, summary, author, createdAt, imageUrl } = blog;
  const [imgError, setImgError] = useState(false);
  
  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    const date = timestamp instanceof Date 
      ? timestamp 
      : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fallback image in case the primary one fails
  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="bg-white dark:bg-darkSurface rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={imgError ? 'https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg' : (imageUrl || 'https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg')} 
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <FiUser className="mr-1" />
            <span>{author || 'HealthAssist Team'}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {summary}
        </p>
        
        <Link 
          to={`/blog/${id}`}
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 