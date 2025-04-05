import { useState, useEffect } from 'react';
import { FiInfo, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const healthTips = [
  {
    title: "Stay Hydrated",
    content: "Drink at least 8 glasses of water daily to maintain proper hydration, especially in hot weather or when exercising.",
    icon: <FiHeart />
  },
  {
    title: "Practice Mindful Eating",
    content: "Focus on your food, eat slowly, and enjoy each bite to improve digestion and prevent overeating.",
    icon: <FiHeart />
  },
  {
    title: "Take Regular Breaks",
    content: "For every 30 minutes of screen time, take a 5-minute break to rest your eyes and move your body.",
    icon: <FiHeart />
  },
  {
    title: "Sleep Matters",
    content: "Aim for 7-9 hours of quality sleep each night. Consistent sleep schedules improve overall health.",
    icon: <FiHeart />
  },
  {
    title: "Daily Movement",
    content: "Even 30 minutes of moderate physical activity each day can significantly improve your health and mood.",
    icon: <FiHeart />
  },
  {
    title: "Mind Your Posture",
    content: "Good posture reduces strain on your muscles and ligaments, preventing back pain and fatigue.",
    icon: <FiHeart />
  },
  {
    title: "Wash Your Hands",
    content: "Regular handwashing with soap and water for at least 20 seconds helps prevent illness.",
    icon: <FiHeart />
  }
];

const DailyTip = () => {
  const [tip, setTip] = useState(null);
  
  useEffect(() => {
    // Get today's date
    const today = new Date().toLocaleDateString();
    
    // Check if we have a tip saved for today
    const savedTip = localStorage.getItem('dailyTip');
    const savedDate = localStorage.getItem('dailyTipDate');
    
    if (savedTip && savedDate === today) {
      // Use the saved tip if it's from today
      setTip(JSON.parse(savedTip));
    } else {
      // Select a random tip and save it
      const randomIndex = Math.floor(Math.random() * healthTips.length);
      const todaysTip = healthTips[randomIndex];
      
      localStorage.setItem('dailyTip', JSON.stringify(todaysTip));
      localStorage.setItem('dailyTipDate', today);
      
      setTip(todaysTip);
    }
  }, []);
  
  if (!tip) return null;
  
  return (
    <motion.div 
      className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-primary p-4 rounded-r-lg shadow-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-primary mt-1">
          <FiInfo size={20} />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-primary">Daily Health Tip: {tip.title}</h3>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{tip.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyTip; 