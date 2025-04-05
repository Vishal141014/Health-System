// Import the language context
import { useLanguage } from './LanguageContext';

// Get API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

/**
 * Simple function to get response from Gemini API using the correct format
 */
export async function getGeminiResponse(prompt) {
  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.error("No API key found. Please set VITE_GEMINI_API_KEY in your environment variables.");
      throw new Error("API key missing");
    }

    console.log("Calling Gemini API with prompt:", prompt);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt }
              ]
            }
          ]
        }),
      }
    );

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log("API response data:", data);
    
    // Navigate through the response structure correctly
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/**
 * Function to format prompt with language preference
 */
export const sendPromptToGemini = async (prompt, languageCode = 'en-US') => {
  try {
    const language = languageCode.split('-')[0];
    const languageName = 
      language === 'en' ? 'English' : 
      language === 'hi' ? 'Hindi' : 
      language === 'es' ? 'Spanish' : 
      language === 'fr' ? 'French' : 'English';
    
    const formattedPrompt = `You are a helpful AI health assistant. Provide accurate, helpful advice but always clarify that you're not a doctor and serious concerns should be addressed by healthcare professionals. Please respond in ${languageName}. User query: ${prompt}`;
    
    return await getGeminiResponse(formattedPrompt);
  } catch (error) {
    console.error('Error with Gemini API:', error);
    
    // Provide a localized error message
    const language = languageCode.split('-')[0];
    if (language === 'hi') {
      return `क्षमा करें, AI सेवा के साथ संवाद करने में एक त्रुटि हुई। त्रुटि: ${error.message}`;
    } else if (language === 'es') {
      return `Lo siento, hubo un error al comunicarse con el servicio de IA. Error: ${error.message}`;
    } else if (language === 'fr') {
      return `Désolé, une erreur s'est produite lors de la communication avec le service d'IA. Erreur: ${error.message}`;
    } else {
      return `Sorry, there was an error communicating with the AI service. Error: ${error.message}`;
    }
  }
};

/**
 * Custom hook to use Gemini with current language
 */
export const useGemini = () => {
  const { currentLanguage } = useLanguage();
  
  return {
    sendPrompt: async (prompt) => {
      try {
        return await sendPromptToGemini(prompt, currentLanguage.code);
      } catch (error) {
        console.error("API failed:", error);
        
        // Return a fallback response with demo data
        const language = currentLanguage.code.split('-')[0];
        if (language === 'hi') {
          return "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। मुझे खेद है कि वर्तमान में API सेवा उपलब्ध नहीं है, लेकिन यह एक डेमो प्रतिक्रिया है। मैं एक डॉक्टर नहीं हूँ, लेकिन मैं आपके स्वास्थ्य प्रश्नों का उत्तर देने में मदद कर सकता हूँ।";
        } else if (language === 'es') {
          return "¡Hola! Soy tu asistente de salud. Lamento que el servicio de API no esté disponible actualmente, pero esta es una respuesta de demostración. No soy médico, pero puedo ayudarte a responder tus preguntas de salud.";
        } else if (language === 'fr') {
          return "Bonjour! Je suis votre assistant santé. Je regrette que le service API ne soit pas disponible actuellement, mais il s'agit d'une réponse de démonstration. Je ne suis pas médecin, mais je peux vous aider à répondre à vos questions de santé.";
        } else {
          return "Hello! I'm your health assistant. I'm sorry that the API service is currently unavailable, but this is a demo response. I'm not a doctor, but I can help answer your health questions.";
        }
      }
    }
  };
}; 