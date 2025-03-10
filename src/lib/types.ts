export interface HouseFeatures {
  location: string;
  propertyType: string;
  rooms: number;
  bathrooms: number;
  carParks: number;
  size: number;
  furnished: string;
}

export interface PredictionResponse {
  price: number;
  confidence: number;
  range: {
    low: number;
    high: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}