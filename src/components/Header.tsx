import React from 'react';
import { Building2, Home } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

export default function Header({ onHomeClick }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <Building2 className="w-6 h-6" />
            <span className="font-semibold text-lg">KL Property Predictor</span>
          </button>
          
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </header>
  );
} 