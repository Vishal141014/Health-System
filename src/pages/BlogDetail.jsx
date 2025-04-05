import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiArrowLeft, FiCalendar, FiUser, FiShare2, FiBookmark, FiClock } from 'react-icons/fi';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setBlog({
            id: docSnap.id,
            ...docSnap.data()
          });
        } else {
          // If no document found in Firebase, check local fallback data
          const fallbackBlog = getFallbackBlog(id);
          if (fallbackBlog) {
            setBlog(fallbackBlog);
          } else {
            setError('Blog post not found');
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        // Try fallback data
        const fallbackBlog = getFallbackBlog(id);
        if (fallbackBlog) {
          setBlog(fallbackBlog);
        } else {
          setError('Failed to load blog post');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  // Fallback data if Firebase fetch fails
  const getFallbackBlog = (blogId) => {
    const fallbackBlogs = {
      '1': {
        id: '1',
        title: 'Understanding Mental Health in the Modern World',
        summary: 'Mental health affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.',
        author: 'Dr. Jane Smith',
        authorTitle: 'Clinical Psychologist',
        createdAt: new Date('2023-04-15'),
        imageUrl: 'https://via.placeholder.com/800x400?text=Mental+Health',
        category: 'Mental Health',
        readTime: '8 min read',
        content: `
          <p>Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.</p>
          
          <h2>Why Mental Health Matters</h2>
          <p>Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:</p>
          <ul>
            <li>Biological factors, such as genes or brain chemistry</li>
            <li>Life experiences, such as trauma or abuse</li>
            <li>Family history of mental health problems</li>
          </ul>
          
          <h2>Common Mental Health Challenges</h2>
          <p>Mental health problems are common but help is available. People with mental health problems can get better and many recover completely.</p>
          
          <p>Here are some common mental health issues:</p>
          <ul>
            <li><strong>Anxiety Disorders:</strong> More than occasional worry or fear. Anxiety disorders can interfere with daily activities and relationships.</li>
            <li><strong>Depression:</strong> More than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding and treatment.</li>
            <li><strong>Post-Traumatic Stress Disorder (PTSD):</strong> Developing after experiencing a shocking, scary, or dangerous event.</li>
            <li><strong>Bipolar Disorder:</strong> Causing unusual shifts in mood, energy, activity levels, and the ability to carry out day-to-day tasks.</li>
          </ul>
          
          <h2>Promoting Mental Wellbeing</h2>
          <p>Positive mental health allows people to:</p>
          <ul>
            <li>Realize their full potential</li>
            <li>Cope with the stresses of life</li>
            <li>Work productively</li>
            <li>Make meaningful contributions to their communities</li>
          </ul>
          
          <p>Ways to maintain positive mental health include:</p>
          <ul>
            <li>Getting professional help if you need it</li>
            <li>Connecting with others</li>
            <li>Staying positive</li>
            <li>Getting physically active</li>
            <li>Helping others</li>
            <li>Getting enough sleep</li>
            <li>Developing coping skills</li>
          </ul>
          
          <h2>Seeking Help</h2>
          <p>If you're concerned about your mental health or that of someone you care about, don't hesitate to seek advice. Consult with a healthcare professional who can connect you with the right resources.</p>
          
          <p>Remember, mental health is an essential component of overall health. Taking care of your mental health is just as important as taking care of your physical health.</p>
        `
      },
      '2': {
        id: '2',
        title: '10 Simple Habits for a Healthier Lifestyle',
        summary: 'Small changes in your daily routine can lead to significant improvements in your overall health. This article explores simple habits that can make a big difference.',
        author: 'Dr. Mark Johnson',
        authorTitle: 'Preventive Medicine Specialist',
        createdAt: new Date('2023-04-10'),
        imageUrl: 'https://via.placeholder.com/800x400?text=Healthy+Habits',
        category: 'Wellness',
        readTime: '6 min read',
        content: `
          <p>Establishing healthy habits doesn't have to be overwhelming. Small, consistent changes can lead to significant improvements in your overall well-being. Here are ten simple habits you can incorporate into your daily routine for a healthier lifestyle.</p>
          
          <h2>1. Stay Hydrated</h2>
          <p>Drinking enough water is essential for nearly every bodily function. Aim for at least 8 glasses per day, and more if you're active or in hot weather. Consider starting your day with a glass of water before anything else.</p>
          
          <h2>2. Prioritize Sleep</h2>
          <p>Quality sleep is fundamental to good health. Most adults need 7-9 hours of sleep per night. Establish a regular sleep schedule and create a relaxing bedtime routine to improve sleep quality.</p>
          
          <h2>3. Move Regularly</h2>
          <p>You don't need intense workouts to benefit from physical activity. Simply avoiding prolonged sitting by taking short walking breaks throughout the day can significantly impact your health. Aim for at least 30 minutes of moderate activity most days.</p>
          
          <h2>4. Eat More Plants</h2>
          <p>Increasing your intake of fruits, vegetables, whole grains, and legumes provides essential nutrients and fiber. Try adding one extra serving of vegetables to each meal.</p>
          
          <h2>5. Practice Mindful Eating</h2>
          <p>Slow down and pay attention to your food. Turn off screens, sit at a table, and savor each bite. This helps improve digestion and can prevent overeating.</p>
          
          <h2>6. Connect Socially</h2>
          <p>Strong social connections are linked to better health and longevity. Make time to nurture relationships with family and friends, even if it's just a quick check-in call or text.</p>
          
          <h2>7. Manage Stress</h2>
          <p>Chronic stress takes a toll on physical and mental health. Find healthy coping mechanisms that work for you, such as deep breathing, meditation, journaling, or spending time in nature.</p>
          
          <h2>8. Limit Processed Foods</h2>
          <p>Highly processed foods often contain excessive sugar, salt, and unhealthy fats. Try to prepare more meals at home using whole ingredients.</p>
          
          <h2>9. Practice Gratitude</h2>
          <p>Taking time to acknowledge the positive aspects of your life can improve mental well-being. Consider keeping a gratitude journal or simply reflecting on three things you're thankful for each day.</p>
          
          <h2>10. Regular Health Check-ups</h2>
          <p>Preventive care is crucial for maintaining good health. Stay current with recommended screenings and don't ignore concerning symptoms.</p>
          
          <p>Remember, the goal isn't perfection but progress. Implementing even a few of these habits can lead to meaningful improvements in your health and quality of life.</p>
        `
      }
    };
    
    return fallbackBlogs[blogId] || null;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp instanceof Date 
      ? timestamp 
      : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="flex space-x-4 mb-6">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error}
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for might have been removed or is temporarily unavailable.
          </p>
          <Link 
            to="/blog"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-primary"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </button>
        </div>
        
        {/* Blog header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <FiUser className="mr-2" />
              <span>{blog.author || 'HealthAssist Team'}</span>
              {blog.authorTitle && (
                <span className="ml-2 text-sm text-gray-500">({blog.authorTitle})</span>
              )}
            </div>
            <div className="flex items-center mr-6 mb-2">
              <FiCalendar className="mr-2" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            {blog.readTime && (
              <div className="flex items-center mb-2">
                <FiClock className="mr-2" />
                <span>{blog.readTime}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              {blog.category && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {blog.category}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full">
                <FiBookmark />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full">
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>
        
        {/* Featured image */}
        <div className="mb-8">
          <img 
            src={blog.imageUrl || 'https://via.placeholder.com/800x400?text=Health+Article'}
            alt={blog.title}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
        
        {/* Blog content */}
        <div className="prose prose-lg max-w-none">
          {/* Using dangerouslySetInnerHTML to render HTML content */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        
        {/* Author bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src={`https://via.placeholder.com/64?text=${blog.author?.charAt(0) || 'A'}`}
                  alt={blog.author}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {blog.author || 'HealthAssist Team'}
              </h3>
              {blog.authorTitle && (
                <p className="text-gray-600">{blog.authorTitle}</p>
              )}
              <p className="mt-2 text-gray-600">
                Health professional dedicated to providing accurate and helpful information on {blog.category || 'healthcare'} topics.
              </p>
            </div>
          </div>
        </div>
        
        {/* Related articles would go here */}
        
        {/* Comments section would go here */}
      </div>
    </div>
  );
};

export default BlogDetail; 