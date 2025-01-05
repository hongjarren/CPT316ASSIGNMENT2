import React, { useState } from 'react';
import { Building2, Search, MapPin, TrendingUp } from 'lucide-react';
import { getRecommendations } from '../lib/api';
import { PROPERTY_TYPES } from '../lib/constants';

interface Recommendation {
  location: string;
  reason: string;
  priceRange: string;
  trend: string;
}

export default function RecommendationsPage({ onBack }: { onBack: () => void }) {
  const [budget, setBudget] = useState<number>(500000);
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getRecommendations({ 
        budget, 
        location: 'any', 
        propertyType 
      });
      setRecommendations(data.recommendations);
    } catch (err) {
      setError('Unable to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        <div className="text-center mb-12">
          <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Ideal Property Area
          </h1>
          <p className="text-lg text-gray-600">
            Enter your budget and preferences to discover the best locations for you
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget (RM)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                min="100000"
                step="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Find Recommendations
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {rec.location}
                    </h3>
                    <p className="text-gray-600 mb-4">{rec.reason}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="font-medium text-blue-600">{rec.priceRange}</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{rec.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 