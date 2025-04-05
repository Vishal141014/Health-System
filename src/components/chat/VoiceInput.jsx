import { useState, useEffect } from 'react';
import { FiMic, FiMicOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const VoiceInput = ({ onResult, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const toggleListening = () => {
    if (disabled) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Setup speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      
      setTranscript(text);
      
      // If result is final, pass it to parent component
      if (result.isFinal) {
        onResult(text);
        setIsListening(false);
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      // If there's a transcript but it wasn't finalized
      if (transcript && isListening) {
        onResult(transcript);
      }
      setIsListening(false);
    };
    
    recognition.start();
    
    // Store recognition instance in window to be able to stop it later
    window.speechRecognition = recognition;
  };

  const stopListening = () => {
    if (window.speechRecognition) {
      window.speechRecognition.stop();
    }
    setIsListening(false);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <button
      onClick={toggleListening}
      disabled={disabled}
      className={`relative p-3 rounded-full focus:outline-none ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
    >
      {isListening ? (
        <div className="relative">
          <FiMicOff className="text-red-500" size={20} />
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-red-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      ) : (
        <FiMic className="text-primary" size={20} />
      )}
    </button>
  );
};

export default VoiceInput; 