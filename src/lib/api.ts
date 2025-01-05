import type { HouseFeatures, PredictionResponse } from './types';

export async function predictPrice(features: HouseFeatures): Promise<PredictionResponse> {
  try {
    const response = await fetch('http://localhost:8000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(features),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Prediction failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to prediction service. Please make sure the server is running.');
    }
    throw error;
  }
}