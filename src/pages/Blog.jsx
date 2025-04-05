import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiSearch, FiFilter } from 'react-icons/fi';
import BlogCard from '../components/blog/BlogCard';
import BlogCardSkeleton from '../components/blog/BlogCardSkeleton';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mental Health', 'Nutrition', 'Fitness', 'Preventive Care', 'Wellness'];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedBlogs = [];
        querySnapshot.forEach((doc) => {
          fetchedBlogs.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setBlogs(fetchedBlogs);
        setFilteredBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback data if Firebase fetch fails
        const fallbackBlogs = [
          {
            id: '1',
            title: 'Understanding Mental Health in the Modern World',
            summary: 'Mental health affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.',
            author: 'Dr. Jane Smith',
            createdAt: new Date('2023-04-15'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Mental+Health',
            category: 'Mental Health'
          },
          {
            id: '2',
            title: '10 Simple Habits for a Healthier Lifestyle',
            summary: 'Small changes in your daily routine can lead to significant improvements in your overall health. This article explores simple habits that can make a big difference.',
            author: 'Dr. Mark Johnson',
            createdAt: new Date('2023-04-10'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Healthy+Habits',
            category: 'Wellness'
          },
          {
            id: '3',
            title: 'The Role of Nutrition in Preventive Healthcare',
            summary: 'Proper nutrition is a cornerstone of preventive healthcare. Learn how the foods you eat can help prevent disease and promote longevity.',
            author: 'Sarah Williams, RD',
            createdAt: new Date('2023-04-05'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Nutrition',
            category: 'Nutrition'
          },
          {
            id: '4',
            title: 'Exercise and Mental Health: The Connection',
            summary: 'Regular physical activity can have a profound positive impact on depression, anxiety, and more. Learn about the mental health benefits of staying active.',
            author: 'Michael Chen, PT',
            createdAt: new Date('2023-03-28'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Exercise',
            category: 'Fitness'
          },
          {
            id: '5',
            title: 'Preventive Screenings: What You Need to Know',
            summary: 'Regular health screenings are a key part of preventive care. This guide explains which screenings you need at different ages.',
            author: 'Dr. Lisa Rodriguez',
            createdAt: new Date('2023-03-20'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Screenings',
            category: 'Preventive Care'
          },
          {
            id: '6',
            title: 'Managing Stress in a Fast-Paced World',
            summary: 'Chronic stress can lead to serious health problems. Discover effective strategies for managing stress in your daily life.',
            author: 'Dr. Robert Wilson',
            createdAt: new Date('2023-03-15'),
            imageUrl: 'https://via.placeholder.com/400x200?text=Stress+Management',
            category: 'Mental Health'
          }
        ];
        
        setBlogs(fallbackBlogs);
        setFilteredBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Apply filters whenever searchTerm or activeCategory changes
    let results = blogs;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'All') {
      results = results.filter(blog => blog.category === activeCategory);
    }
    
    setFilteredBlogs(results);
  }, [searchTerm, activeCategory, blogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Health Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore our collection of articles on health, wellness, and medical topics
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-3 pl-10 bg-white dark:bg-darkSurface border border-gray-300 dark:border-gray-700 rounded-l-lg focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <FiSearch size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog; 