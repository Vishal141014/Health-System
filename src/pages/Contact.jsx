import { useState } from 'react';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or feedback? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            
            {formStatus.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <FiCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Please describe your question or feedback in detail..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className={`flex items-center justify-center w-full py-3 px-4 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiMapPin className="text-white/80" size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Address</p>
                    <address className="not-italic text-white/80 mt-1">
                      123 Health Street<br />
                      Wellness City, HC 12345<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiPhone className="text-white/80" size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Phone</p>
                    <p className="text-white/80 mt-1">
                      <a href="tel:+11234567890" className="hover:text-white">+1 (123) 456-7890</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiMail className="text-white/80" size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Email</p>
                    <p className="text-white/80 mt-1">
                      <a href="mailto:contact@healthassist.com" className="hover:text-white">contact@healthassist.com</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="font-medium mb-2">Hours of Operation</p>
                <div className="grid grid-cols-2 text-sm text-white/80">
                  <div>Monday - Friday</div>
                  <div>9:00 AM - 6:00 PM EST</div>
                  <div>Saturday</div>
                  <div>10:00 AM - 4:00 PM EST</div>
                  <div>Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">How accurate is the AI health assistant?</h3>
                  <p className="text-gray-600">
                    Our AI health assistant provides information based on current medical knowledge, but it's not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Is my health information kept private?</h3>
                  <p className="text-gray-600">
                    Yes. We take privacy seriously and follow strict security protocols to protect your data. Please review our Privacy Policy for more details.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">How can I provide feedback on the platform?</h3>
                  <p className="text-gray-600">
                    We welcome your feedback! Use this contact form or email us directly at feedback@healthassist.com with your suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 