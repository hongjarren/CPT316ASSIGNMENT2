import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import { Building2, TrendingUp } from 'lucide-react';

function App() {
  const [showPrediction, setShowPrediction] = useState(false);

  if (!showPrediction) {
    return <LandingPage onGetStarted={() => setShowPrediction(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header onHomeClick={() => setShowPrediction(false)} />
      
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576428085638-5f8b1fc9c025?auto=format&fit=crop&q=80&w=2000')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Building2 className="w-12 h-12 text-blue-600" />
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              KL Property Price Predictor
            </h1>
            <p className="text-lg text-gray-600">
              Enter property details below to get an estimated price based on our trained model
            </p>
          </div>
          <PredictionForm />
        </div>
      </div>
    </div>
  );
}

export default App;