import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { sendPromptToGemini } from '../../utils/gemini';

const commonSymptoms = [
  { id: 'headache', label: 'Headache' },
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'dizziness', label: 'Dizziness' },
  { id: 'pain', label: 'Pain' },
  { id: 'rash', label: 'Rash' }
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const getSelectedSymptomLabels = () => {
    return selectedSymptoms.map(id => 
      commonSymptoms.find(symptom => symptom.id === id).label
    );
  };
  
  const handleNext = () => {
    if (selectedSymptoms.length === 0) return;
    setStep(2);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) return;
    
    setLoading(true);
    
    try {
      const symptoms = getSelectedSymptomLabels();
      
      const prompt = `
        I'm experiencing the following symptoms: ${symptoms.join(', ')}. 
        ${additionalInfo ? `Additional information: ${additionalInfo}` : ''}
        
        Based on these symptoms, what could be potential causes? 
        What should I do next? Should I seek medical attention?
        
        Please format your response with the following sections:
        1. Possible causes
        2. Recommended actions
        3. When to seek immediate medical attention
      `;
      
      const response = await sendPromptToGemini(prompt);
      
      setResult(response);
      setStep(3);
    } catch (error) {
      console.error('Error in symptom checker:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setSelectedSymptoms([]);
    setAdditionalInfo('');
    setResult(null);
    setStep(1);
  };
  
  return (
    <div className="bg-white dark:bg-darkSurface rounded-xl shadow-md overflow-hidden transition-colors duration-300">
      <div className="bg-primary text-white p-4">
        <h2 className="text-xl font-semibold">Symptom Checker</h2>
        <p className="text-sm opacity-80">
          Select your symptoms to get preliminary guidance
        </p>
      </div>
      
      <div className="p-6">
        <div className="flex mb-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-12 ${
              step > 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              2
            </div>
            <div className={`h-1 w-12 ${
              step > 2 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                Select your symptoms
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleNext}
                disabled={selectedSymptoms.length === 0}
                className={`flex items-center justify-center w-full px-4 py-2 rounded-lg ${
                  selectedSymptoms.length === 0
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                Next <FiChevronRight className="ml-1" />
              </button>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                You selected: {getSelectedSymptomLabels().join(', ')}
              </h3>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Any additional details? (optional)
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows="4"
                  placeholder="When did symptoms start? Any recent changes in medication, diet, or routine?"
                ></textarea>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Check Symptoms'}
                </button>
              </div>
            </motion.form>
          )}
          
          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <FiCheck className="text-green-500 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Analysis Complete
                </h3>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <FiAlertCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={20} />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    This is an AI-generated assessment based on your symptoms. 
                    It is not a medical diagnosis. Always consult with a healthcare professional.
                  </p>
                </div>
              </div>
              
              <div className="mb-6 prose dark:prose-invert prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {result}
                </div>
              </div>
              
              <button
                onClick={resetForm}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Check New Symptoms
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SymptomChecker; 