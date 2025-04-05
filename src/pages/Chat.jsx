import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiDownload } from 'react-icons/fi';
import ChatInterface from '../components/chat/ChatInterface';

const Chat = ({ user }) => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          {user && (
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-600 hover:text-primary text-sm">
                <FiSave className="mr-1" />
                Save History
              </button>
              <button className="flex items-center text-gray-600 hover:text-primary text-sm">
                <FiDownload className="mr-1" />
                Export Chat
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ChatInterface user={user} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Health Disclaimer</h3>
              <p className="text-sm text-gray-600 mb-4">
                The AI Health Assistant provides general information and guidance, not professional medical advice. 
                Always consult a healthcare professional for medical concerns.
              </p>
              
              <h4 className="font-medium text-gray-800 mt-6 mb-2">Sample Questions:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                  "What are common symptoms of the flu?"
                </li>
                <li className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                  "How can I improve my sleep quality?"
                </li>
                <li className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                  "What exercises are good for lower back pain?"
                </li>
                <li className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                  "How to reduce stress and anxiety naturally?"
                </li>
              </ul>
              
              {!user && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    Sign in to save your chat history and access more features.
                  </p>
                  <Link 
                    to="/login" 
                    className="text-center w-full block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
