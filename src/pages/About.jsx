import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiShield, FiUsers, FiHelpCircle } from 'react-icons/fi';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About HealthAssist</h1>
            <p className="text-xl mb-8">
              We're on a mission to make reliable health information accessible to everyone through the power of AI.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-6">
              At HealthAssist, we believe that everyone deserves access to reliable health information when they need it. 
              Our mission is to leverage artificial intelligence to provide accurate, accessible, and personalized health 
              guidance to people worldwide.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              We understand that navigating health concerns can be overwhelming. That's why we've created a platform that 
              combines cutting-edge AI technology with trusted medical information to help you make informed decisions 
              about your health.
            </p>
            <p className="text-gray-600 text-lg">
              While our AI assistant provides valuable guidance, we always emphasize the importance of consulting with 
              healthcare professionals for personalized medical advice. We aim to complement traditional healthcare, not 
              replace it.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Core Values</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              These principles guide everything we do at HealthAssist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <FiAward className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
              <p className="text-gray-600">
                We are committed to providing reliable, evidence-based health information based on current medical knowledge.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <FiShield className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy</h3>
              <p className="text-gray-600">
                We respect your privacy and maintain strict confidentiality with all personal health information shared on our platform.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <FiUsers className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make quality health information accessible to everyone, regardless of location or background.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <FiHelpCircle className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empathy</h3>
              <p className="text-gray-600">
                We approach health concerns with compassion, understanding that seeking health information can be stressful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How HealthAssist Works</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our AI-powered platform is designed to provide you with reliable health information quickly and easily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Ask a Question</h3>
              <p className="text-gray-600">
                Type your health-related question or concern into our AI health assistant.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Get an Answer</h3>
              <p className="text-gray-600">
                Our AI processes your question and provides an informative, evidence-based response.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Take Action</h3>
              <p className="text-gray-600">
                Use our guidance to make informed decisions about your health or seek appropriate professional care.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/chat" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try the AI Assistant <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We're a dedicated team of healthcare professionals, AI specialists, and technologists committed to improving health access
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://via.placeholder.com/300x200?text=Team+Member" 
                  alt="Dr. Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
                <p className="text-primary">Chief Medical Officer</p>
                <p className="text-gray-600 mt-2">
                  Board-certified physician with 15+ years of experience in family medicine and preventive healthcare.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://via.placeholder.com/300x200?text=Team+Member" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">Michael Chen</h3>
                <p className="text-primary">AI Research Lead</p>
                <p className="text-gray-600 mt-2">
                  AI specialist with expertise in natural language processing and healthcare applications of machine learning.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src="https://via.placeholder.com/300x200?text=Team+Member" 
                  alt="Lisa Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">Lisa Rodriguez</h3>
                <p className="text-primary">Product Director</p>
                <p className="text-gray-600 mt-2">
                  Product leader specializing in healthcare technology with a passion for creating accessible digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-primary rounded-2xl text-white p-8 md:p-12 max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust HealthAssist for reliable health guidance and resources.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/signup" 
                  className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link 
                  to="/chat" 
                  className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 