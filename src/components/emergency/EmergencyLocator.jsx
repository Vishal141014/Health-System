import { useState } from 'react';
import { FiMapPin, FiSearch, FiPhone, FiAlertCircle } from 'react-icons/fi';

const EmergencyLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Dummy hospital data (in a real app, this would come from Google Maps API)
  const nearbyHospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Medical Dr, Health City',
      phone: '(123) 456-7890',
      distance: '1.2 miles',
      emergency: true
    },
    {
      id: 2,
      name: 'St. Mary\'s Medical Center',
      address: '456 Wellness Ave, Health City',
      phone: '(123) 456-7891',
      distance: '2.3 miles',
      emergency: true
    },
    {
      id: 3,
      name: 'Valley Urgent Care',
      address: '789 Care Lane, Health City',
      phone: '(123) 456-7892',
      distance: '0.8 miles',
      emergency: false
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary text-white p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FiAlertCircle className="mr-2" /> Emergency Medical Locator
        </h2>
        <p className="text-sm">Find hospitals and urgent care centers near you</p>
      </div>
      
      {/* Search bar */}
      <div className="p-4 border-b">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2.5 pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Enter your location or zip code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <FiSearch className="mr-2" />
            )}
            Find
          </button>
        </form>
      </div>
      
      {/* Map placeholder */}
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <FiMapPin size={32} className="mx-auto mb-2 text-primary" />
          <p className="text-gray-600">Google Maps would be displayed here</p>
          <p className="text-xs text-gray-500">API integration required</p>
        </div>
      </div>
      
      {/* Nearby facilities */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-3">Nearby Medical Facilities</h3>
        
        <div className="space-y-3">
          {nearbyHospitals.map((hospital) => (
            <div 
              key={hospital.id}
              className="border rounded-lg p-3 hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium flex items-center">
                    {hospital.name}
                    {hospital.emergency && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        ER
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{hospital.address}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-primary font-medium">{hospital.distance}</span>
                    <span className="mx-2">•</span>
                    <a 
                      href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center text-gray-700 hover:text-primary"
                    >
                      <FiPhone size={12} className="mr-1" />
                      {hospital.phone}
                    </a>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90">
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary font-medium hover:underline">
            Show More Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLocator; 