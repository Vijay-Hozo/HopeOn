import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../assets/Button';

// Fix for marker icon issue with default React Leaflet setup
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to update the map's view
const SetMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 13); 
  return null;
};

const MapComponent = () => {
  const [position, setPosition] = useState(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          setPosition([11.0168, 76.9558]); 
        }
      );
    } else {
      setPosition([11.0168, 76.9558]); 
    }
  }, []);

  const [inputLocation, setInputLocation] = useState('');

  const handleLocationChange = () => {
    let newCoords;
    switch (inputLocation.toLowerCase()) {
      case 'chennai':
        newCoords = [13.0827, 80.2707];
        break;
      case 'bangalore':
        newCoords = [12.9716, 77.5946];
        break;
      case 'mumbai':
        newCoords = [19.0760, 72.8777];
        break;
      default:
        alert('Location not recognized. Please enter a valid city name.');
        return;
    }
    setPosition(newCoords);
  };

  return (
    <div className='w-[1000px]  text-black bg-gradient-to-b from-background-primary to-background-secondary rounded-3xl'>
      <div className="flex gap-5 justify-center p-3">
        <input
          type="text"
          placeholder="Enter location"
          className='p-2 rounded-xl bg-blue-500 text-black font-semibold '
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
        />
        <Button onClick={handleLocationChange}>Go</Button>
      </div>
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Location: {position[0]}, {position[1]}
            </Popup>
          </Marker>
          <SetMapView coords={position} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
