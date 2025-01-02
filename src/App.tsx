import React from 'react';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            House Price Prediction
          </h1>
          <p className="text-lg text-gray-600">
            Enter house details below to get an estimated price based on our trained model
          </p>
        </div>
        <PredictionForm />
      </div>
    </div>
  );
}

export default App;