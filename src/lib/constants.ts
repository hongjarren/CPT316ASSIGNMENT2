import type { HouseFeatures } from './types';

export const INITIAL_FEATURES: HouseFeatures = {
  location: 'KLCC',
  propertyType: 'Condominium',
  rooms: 3,
  bathrooms: 2,
  carParks: 1,
  size: 1000,
  furnished: 'Fully Furnished'
};

export const LOCATIONS = ['KLCC', 'Cheras', 'Bangsar', 'Mont Kiara', 'Damansara'] as const;
export const PROPERTY_TYPES = ['Condominium', 'Apartment', 'Terrace House', 'Semi-D', 'Bungalow'] as const;
export const FURNISHED_OPTIONS = ['Fully Furnished', 'Partially Furnished', 'Unfurnished'] as const;