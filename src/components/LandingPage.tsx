import React from 'react';
import { Building2, Calculator, Map, TrendingUp, ArrowRight, BarChart3, Users, Clock, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <img
            src="https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=80"
            alt="KL Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your Property's True Value in KL
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Leverage our AI-powered prediction model trained on extensive Kuala Lumpur real estate data
            </p>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl
                hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Properties Analyzed</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Prediction Accuracy</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <Map className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">60+</div>
              <div className="text-gray-400">KL Areas Covered</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Use Our Property Price Predictor?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Calculator className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Accurate Predictions</h3>
              <p className="text-gray-600">
                Advanced machine learning model trained on extensive KL property data
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Map className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Location-Specific</h3>
              <p className="text-gray-600">
                Detailed analysis based on specific KL neighborhoods and areas
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <TrendingUp className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
              <p className="text-gray-600">
                Stay informed with current market trends and valuations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl rotate-45 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white -rotate-45">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Enter Details</h3>
              <p className="text-gray-600 text-center">
                Provide property specifications including location, type, and size
              </p>
            </div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl rotate-45 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white -rotate-45">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our ML model analyzes current market data and trends
              </p>
            </div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl rotate-45 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white -rotate-45">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Get Results</h3>
              <p className="text-gray-600 text-center">
                Receive accurate price predictions with confidence scores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 