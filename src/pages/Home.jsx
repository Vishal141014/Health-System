import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiArrowRight, FiAward, FiUsers, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

import ChatInterface from '../components/chat/ChatInterface';
import BlogCard from '../components/blog/BlogCard';
import BlogCardSkeleton from '../components/blog/BlogCardSkeleton';
import EmergencyLocator from '../components/emergency/EmergencyLocator';
import DailyTip from '../components/health/DailyTip';
import SymptomChecker from '../components/health/SymptomChecker';

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const blogs = [];
        querySnapshot.forEach((doc) => {
          blogs.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setRecentBlogs(blogs);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
        // Set fallback data if Firebase fetch fails
        setRecentBlogs([
          {
            id: '1',
            title: 'Understanding Mental Health in the Modern World',
            summary: 'Mental health affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.',
            author: 'Dr. Jane Smith',
            createdAt: new Date('2023-04-15'),
            imageUrl: 'https://img.freepik.com/free-photo/world-mental-health-day-arrangement-with-copy-space_23-2148644908.jpg'
          },
          {
            id: '2',
            title: '10 Simple Habits for a Healthier Lifestyle',
            summary: 'Small changes in your daily routine can lead to significant improvements in your overall health. This article explores simple habits that can make a big difference.',
            author: 'Dr. Mark Johnson',
            createdAt: new Date('2023-04-10'),
            imageUrl: 'https://img.freepik.com/free-photo/healthy-lifestyle-concept-top-view_23-2148850281.jpg'
          },
          {
            id: '3',
            title: 'The Role of Nutrition in Preventive Healthcare',
            summary: 'Proper nutrition is a cornerstone of preventive healthcare. Learn how the foods you eat can help prevent disease and promote longevity.',
            author: 'Sarah Williams, RD',
            createdAt: new Date('2023-04-05'),
            imageUrl: 'https://img.freepik.com/free-photo/healthy-food-arrangement-top-view_23-2148427138.jpg'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your AI-Powered Health Assistant
              </h1>
              <p className="text-xl mb-8">
                Get instant answers to your health questions, find medical facilities, and access reliable health resources.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/chat" 
                  className="px-6 py-3 bg-white text-primary font-medium rounded-lg flex items-center hover:bg-gray-100 transition-colors"
                >
                  Try AI Assistant <FiArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <motion.img 
                src="https://img.freepik.com/free-vector/healthcare-background-with-medical-symbols-geometric-style_1017-26363.jpg" 
                alt="Healthcare Illustration"
                className="rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onError={(e) => {
                  e.target.src = "https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Daily Tip Section */}
      <section className="py-8 bg-white dark:bg-darkBg transition-colors duration-300">
        <div className="container">
          <DailyTip />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">How We Can Help You</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Our platform provides multiple resources to assist with your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white dark:bg-darkSurface p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiMessageCircle className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">AI Health Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ask health-related questions and get instant responses based on reliable medical information.
              </p>
              <Link to="/chat" className="text-primary font-medium flex items-center hover:underline">
                Chat Now <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white dark:bg-darkSurface p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Find Healthcare</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Locate nearby hospitals, clinics, and emergency care facilities when you need them most.
              </p>
              <Link to="/" className="text-primary font-medium flex items-center hover:underline">
                Find Now <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white dark:bg-darkSurface p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiAward className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Expert Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access a curated collection of health articles and resources written by healthcare professionals.
              </p>
              <Link to="/blog" className="text-primary font-medium flex items-center hover:underline">
                Read Articles <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Symptom Checker Section */}
      <section className="py-16 bg-white dark:bg-darkBg transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Symptom Checker</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Get preliminary guidance based on your symptoms
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SymptomChecker />
          </div>
        </div>
      </section>

      {/* Chat UI Preview Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI-Powered Health Chat</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Ask your health questions and get instant, reliable guidance
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ChatInterface user={null} />
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-white dark:bg-darkBg transition-colors duration-300">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Latest Health Articles</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Stay informed with our latest health insights and advice
              </p>
            </div>
            <Link to="/blog" className="text-primary font-medium flex items-center hover:underline">
              View All Articles <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Locator Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Find Emergency Care</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Quickly locate nearby emergency rooms, hospitals, and urgent care facilities
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <EmergencyLocator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 dark:bg-primary/5 py-16 transition-colors duration-300">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Sign up today to access all features, save your chat history, and get personalized health insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign Up Free
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3 bg-white dark:bg-gray-800 text-primary font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 