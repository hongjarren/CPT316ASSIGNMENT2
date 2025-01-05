import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Building, Building2, Home, Hotel, Castle } from 'lucide-react';

// Property type icons mapping
const PROPERTY_ICONS: Record<string, Icon> = {
  'Condominium': new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
  }),
  'Apartment': new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
  }),
  'Landed': new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
  })
};

// Complete KL area coordinates for all locations
const LOCATION_COORDINATES: Record<string, [number, number]> = {
  'KLCC': [3.1577, 101.7114],
  'Bangsar': [3.1340, 101.6787],
  'Mont Kiara': [3.1657, 101.6571],
  'Cheras': [3.0619, 101.7446],
  'Ampang': [3.1488, 101.7620],
  'Ampang Hilir': [3.1577, 101.7514],
  'Bandar Damai Perdana': [3.0369, 101.7530],
  'Bandar Menjalara': [3.1897, 101.6283],
  'Bandar Tasik Selatan': [3.0671, 101.7089],
  'Bangsar South': [3.1107, 101.6634],
  'Batu Caves': [3.2372, 101.6833],
  'Brickfields': [3.1301, 101.6866],
  'Bukit Bintang': [3.1488, 101.7137],
  'Bukit Jalil': [3.0549, 101.6918],
  'Bukit Kiara': [3.1505, 101.6426],
  'City Centre': [3.1478, 101.6953],
  'Damansara': [3.1562, 101.6231],
  'Damansara Heights': [3.1504, 101.6600],
  'Desa Pandan': [3.1651, 101.7397],
  'Desa ParkCity': [3.1897, 101.6283],
  'Desa Petaling': [3.0671, 101.6989],
  'Dutamas': [3.1762, 101.6673],
  'Federal Hill': [3.1397, 101.6773],
  'Gombak': [3.2285, 101.7505],
  'Jalan Ipoh': [3.1778, 101.6897],
  'Jalan Klang Lama': [3.1039, 101.6673],
  'Jalan Kuching': [3.1897, 101.6897],
  'Jalan U-Thant': [3.1651, 101.7397],
  'KL City': [3.1478, 101.6953],
  'KL Eco City': [3.1107, 101.6734],
  'KL Sentral': [3.1340, 101.6866],
  'Kepong': [3.2087, 101.6341],
  'Keramat': [3.1762, 101.7397],
  'Kota Damansara': [3.1505, 101.5856],
  'Kuchai Lama': [3.0849, 101.6673],
  'Mid Valley City': [3.1178, 101.6778],
  'OUG': [3.0671, 101.6789],
  'Pandan Indah': [3.1397, 101.7620],
  'Pandan Jaya': [3.1397, 101.7514],
  'Pandan Perdana': [3.1397, 101.7726],
  'Pantai': [3.1107, 101.6634],
  'Petaling Jaya': [3.1067, 101.6056],
  'Puchong': [3.0471, 101.6170],
  'Salak Selatan': [3.0771, 101.6989],
  'Segambut': [3.1897, 101.6673],
  'Sentul': [3.1897, 101.7089],
  'Seputeh': [3.1178, 101.6778],
  'Setapak': [3.2087, 101.7189],
  'Setiawangsa': [3.1897, 101.7514],
  'Sri Hartamas': [3.1562, 101.6571],
  'Sri Petaling': [3.0671, 101.6889],
  'Sungai Besi': [3.0771, 101.7189],
  'Taman Desa': [3.1107, 101.6889],
  'Taman Duta': [3.1562, 101.6673],
  'Taman Melawati': [3.2087, 101.7620],
  'Taman Tun Dr Ismail': [3.1505, 101.6283],
  'Titiwangsa': [3.1762, 101.7089],
  'Wangsa Maju': [3.2087, 101.7397]
};

interface LocationMapProps {
  location: string;
  propertyType: string;
  size: number;
}

function MapUpdater({ coordinates }: { coordinates: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(coordinates, 14);
  }, [coordinates, map]);

  return null;
}

function getPropertyIcon(propertyType: string): Icon {
  if (propertyType.includes('Terrace') || propertyType.includes('Bungalow') || propertyType.includes('Semi-detached')) {
    return PROPERTY_ICONS['Landed'];
  }
  return PROPERTY_ICONS[propertyType] || PROPERTY_ICONS['Condominium'];
}

function getPropertyTypeIcon(propertyType: string) {
  if (propertyType.includes('Condominium') || propertyType.includes('Serviced')) return Building2;
  if (propertyType.includes('Apartment')) return Building;
  if (propertyType.includes('Hotel')) return Hotel;
  if (propertyType.includes('Bungalow')) return Castle;
  return Home;
}

export default function LocationMap({ location, propertyType, size }: LocationMapProps) {
  const coordinates = LOCATION_COORDINATES[location] || [3.1390, 101.6869];
  const PropertyIcon = getPropertyTypeIcon(propertyType);

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={coordinates}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="bottomright" />
        <Marker position={coordinates} icon={getPropertyIcon(propertyType)}>
          <Popup>
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <PropertyIcon className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{propertyType}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Location: {location}</p>
                <p>Size: {size.toLocaleString()} sq ft</p>
              </div>
            </div>
          </Popup>
        </Marker>
        <MapUpdater coordinates={coordinates} />
      </MapContainer>
    </div>
  );
} 