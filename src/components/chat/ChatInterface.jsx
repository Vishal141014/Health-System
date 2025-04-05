import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FiSend, FiUser, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceInput from './VoiceInput';
import { useGemini } from '../../utils/gemini';
import { useLanguage } from '../../utils/LanguageContext';

const ChatInterface = ({ user }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const MAX_MESSAGES = 10; // Limit for demo purposes
  const { sendPrompt } = useGemini();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // If user is authenticated, fetch their chat history
    if (user) {
      const chatRef = collection(db, 'chats', user.uid, 'messages');
      const q = query(chatRef, orderBy('timestamp', 'asc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ id: doc.id, ...doc.data() });
        });
        setMessages(fetchedMessages);
        setMessageCount(fetchedMessages.length);
        scrollToBottom();
      });
      
      return () => unsubscribe();
    } else {
      // For non-authenticated users, set welcome message in current language
      let welcomeMessage = "Hello! I'm your AI health assistant. How can I help you today?";
      
      if (currentLanguage.code.startsWith('hi')) {
        welcomeMessage = "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?";
      } else if (currentLanguage.code.startsWith('es')) {
        welcomeMessage = "¡Hola! Soy tu asistente de salud con IA. ¿Cómo puedo ayudarte hoy?";
      } else if (currentLanguage.code.startsWith('fr')) {
        welcomeMessage = "Bonjour! Je suis votre assistant de santé IA. Comment puis-je vous aider aujourd'hui?";
      }
      
      setMessages([
        {
          id: 'welcome',
          content: welcomeMessage,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [user, currentLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setInput('');
    
    // Add user message to state immediately for UI
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Check if user has reached message limit
      if (messageCount >= MAX_MESSAGES) {
        let limitMessage = {
          id: 'limit-' + Date.now().toString(),
          content: "You've reached the maximum number of messages for this demo. Please contact us to upgrade!",
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        
        // Translate limit message based on language
        if (currentLanguage.code.startsWith('hi')) {
          limitMessage.content = "आपने इस डेमो के लिए अधिकतम संदेशों तक पहुंच गए हैं। अपग्रेड करने के लिए कृपया हमसे संपर्क करें!";
        } else if (currentLanguage.code.startsWith('es')) {
          limitMessage.content = "Has alcanzado el número máximo de mensajes para esta demostración. ¡Póngase en contacto con nosotros para actualizar!";
        } else if (currentLanguage.code.startsWith('fr')) {
          limitMessage.content = "Vous avez atteint le nombre maximum de messages pour cette démo. Veuillez nous contacter pour mettre à niveau!";
        }
        
        setMessages(prev => [...prev, limitMessage]);
        setLoading(false);
        return;
      }
      
      // Call Gemini API with language support
      const response = await sendPrompt(input);
      
      const aiMessage = {
        id: 'ai-' + Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      // Add to state
      setMessages(prev => [...prev, aiMessage]);
      setMessageCount(prev => prev + 1);
      
      // If user is authenticated, save to Firestore
      if (user) {
        const chatRef = collection(db, 'chats', user.uid, 'messages');
        await addDoc(chatRef, userMessage);
        await addDoc(chatRef, aiMessage);
      }
    } catch (error) {
      console.error('Error in chat interaction:', error);
      
      let errorMessage = {
        id: 'error-' + Date.now().toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      // Translate error message based on language
      if (currentLanguage.code.startsWith('hi')) {
        errorMessage.content = "क्षमा करें, आपके अनुरोध को संसाधित करने में एक त्रुटि हुई थी। कृपया पुनः प्रयास करें।";
      } else if (currentLanguage.code.startsWith('es')) {
        errorMessage.content = "Lo sentimos, ha ocurrido un error al procesar su solicitud. Por favor, inténtelo de nuevo.";
      } else if (currentLanguage.code.startsWith('fr')) {
        errorMessage.content = "Désolé, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer.";
      }
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-darkSurface rounded-xl shadow-md transition-colors duration-300">
      {/* Chat header */}
      <div className="bg-primary text-white p-4 rounded-t-xl">
        <h2 className="text-xl font-semibold">AI Health Assistant</h2>
        <p className="text-sm">Ask me anything about your health concerns</p>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-tl-none'
                }`}
              >
                <div className="text-sm">
                  {message.content}
                </div>
                <div className={`text-xs mt-1 flex items-center ${
                  message.sender === 'user' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  <FiClock className="mr-1" size={10} />
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce delay-150"></div>
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health question here..."
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            disabled={loading || messageCount >= MAX_MESSAGES}
          />
          <VoiceInput 
            onResult={handleVoiceInput} 
            disabled={loading || messageCount >= MAX_MESSAGES} 
          />
          <button
            type="submit"
            className={`bg-primary text-white p-2 rounded-lg ${
              loading || !input.trim() || messageCount >= MAX_MESSAGES
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary/90'
            }`}
            disabled={loading || !input.trim() || messageCount >= MAX_MESSAGES}
          >
            <FiSend size={20} />
          </button>
        </div>
        {messageCount >= MAX_MESSAGES && (
          <p className="text-xs text-red-500 mt-2">
            You've reached the maximum number of messages for the demo.
          </p>
        )}
        {!user && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Sign in to save your chat history and access more features.
          </p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface; 