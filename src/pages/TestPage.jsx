import React from 'react';

const TestPage = () => {
  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-2xl font-bold text-primary mb-4">TailwindCSS Test Page</h1>
        <p className="text-gray-600 mb-4">
          If you can see this page styled correctly, TailwindCSS is working!
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 