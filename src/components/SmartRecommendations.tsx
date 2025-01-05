import React, { useEffect, useState } from 'react';
import { Lightbulb, TrendingUp, MapPin, Loader2 } from 'lucide-react';
import { getRecommendations } from '../lib/api';

interface SmartRecommendationsProps {
  budget: number;
  currentLocation: string;
  propertyType: string;
}

interface Recommendation {
  location: string;
  reason: string;
  priceRange: string;
  trend: string;
}

export default function SmartRecommendations({ 
  budget, 
  currentLocation, 
  propertyType 
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getRecommendations({ budget, location: currentLocation, propertyType });
        setRecommendations(data.recommendations);
      } catch (err) {
        setError('Unable to load recommendations. Please try again later.');
        console.error('Recommendations error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [budget, currentLocation, propertyType]);

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h3 className="text-2xl font-bold text-gray-800">Smart Recommendations</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Based on your budget and preferences, here are some alternative areas you might want to consider:
      </p>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{rec.location}</h4>
                <p className="text-gray-600 mb-2">{rec.reason}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600 font-medium">{rec.priceRange}</span>
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
    </div>
  );
} 