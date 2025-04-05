import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="container py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-primary text-9xl font-bold mb-6">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FiHome className="mr-2" /> Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 