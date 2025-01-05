import React, { useState } from 'react';
import { Home, DollarSign } from 'lucide-react';
import type { HouseFeatures } from '../lib/types';
import { predictPrice } from '../lib/api';
import { INITIAL_FEATURES, LOCATIONS, PROPERTY_TYPES, FURNISHED_OPTIONS } from '../lib/constants';
import LocationMap from './LocationMap';

export default function PredictionForm() {
  const [features, setFeatures] = useState<HouseFeatures>(INITIAL_FEATURES);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await predictPrice(features);
      setPrediction(result.price);
      setConfidence(result.confidence);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Prediction failed');
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeatures(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="w-full backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-gray-100">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Home className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Enter Property Details</h2>
          </div>
          <LocationMap 
            location={features.location} 
            propertyType={features.propertyType}
            size={features.size}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                name="location"
                value={features.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={features.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <optgroup label="High Rise">
                  <option value="Condominium">Condominium</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Serviced Residence">Serviced Residence</option>
                  <option value="Flat">Flat</option>
                </optgroup>
                <optgroup label="Landed">
                  <option value="Bungalow">Bungalow</option>
                  <option value="Semi-detached House">Semi-detached House</option>
                  <option value="1-sty Terrace/Link House">1 Storey Terrace House</option>
                  <option value="2-sty Terrace/Link House">2 Storey Terrace House</option>
                  <option value="3-sty Terrace/Link House">3 Storey Terrace House</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="Cluster House">Cluster House</option>
                  <option value="Townhouse">Townhouse</option>
                </optgroup>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Basic property types shown. Variants (Corner, Intermediate, etc.) are handled automatically.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rooms
              </label>
              <input
                type="number"
                name="rooms"
                value={features.rooms}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={features.bathrooms}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Parks
              </label>
              <input
                type="number"
                name="carParks"
                value={features.carParks}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size (sq ft)
              </label>
              <input
                type="number"
                name="size"
                value={features.size}
                onChange={handleInputChange}
                min="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Furnished Status
              </label>
              <select
                name="furnished"
                value={features.furnished}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {FURNISHED_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl
              hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Calculating...
              </span>
            ) : (
              'Get Price Estimate'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {prediction !== null && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">
                Estimated Price
              </h3>
            </div>
            <p className="text-4xl font-bold text-green-700 mb-4">
              RM {prediction.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {(confidence * 100).toFixed(1)}% Confidence
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Based on current market data and similar properties in {features.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}