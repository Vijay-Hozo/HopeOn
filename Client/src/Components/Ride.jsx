import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRide } from '../Redux/createSlice';
import Button from '../assets/Button';

const geocodeLocation = async (location) => {
  if (location.toLowerCase() === 'coimbatore') return { lat: 11.0168, lng: 76.9558 };
  if (location.toLowerCase() === 'chennai') return { lat: 13.0827, lng: 80.2707 };
  if (location.toLowerCase() === 'bangalore') return { lat: 12.9716, lng: 77.5946 };
  if (location.toLowerCase() === 'junction') return { lat: 10.9640914, lng: 76.9886998};
  return { lat: 0, lng: 0 }; 
};

const haversineDistance = (coords1, coords2) => {
  const cal = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371; // Radius of the Earth in km
  const dLat = cal(lat2 - lat1);
  const dLon = cal(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(cal(lat1)) * Math.cos(cal(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Ride = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureCoords, setDepartureCoords] = useState(null);
  const [arrivalCoords, setArrivalCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare,setFare] = useState(null);
  const dispatch = useDispatch();

  const handlePlace = async () => {
    try {
      const depCoords = await geocodeLocation(departure);
      const arrCoords = await geocodeLocation(arrival);

      setDepartureCoords(depCoords);
      setArrivalCoords(arrCoords);

      if (depCoords && arrCoords) {
        const dist = haversineDistance(depCoords, arrCoords);
        setDistance(dist.toFixed(2)); // Distance in kilometers
      }

      if(distance < 100){
        setFare(100);
      }
      else if(distance > 100){
        setFare(200);
      }

      const newRide = {
        departure,
        departureCoords: depCoords,
        arrival,
        arrivalCoords: arrCoords,
      };

      dispatch(addRide(newRide));
      console.log("Ride Placed", newRide);
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-3 text-white bg-gradient-to-b from-background-primary to-background-secondary w-[520px] h-[770px] rounded-r-3xl'>
      <h1 className='text-2xl font-bold'>Place Ride</h1>
      <div>
        <div className='mb-3 flex flex-col gap-4 text-2xl rounded-xl'>
          <label>From </label>
          <input 
            type="text"
            placeholder='Departure'
            value={departure}
            className='rounded-xl p-2  text-black'
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div className='mb-3 flex flex-col gap-2 text-2xl rounded-xl'>
          <h1>To</h1>
          <input 
            type="text"
            placeholder='Arrival'
            value={arrival}
            className='rounded-xl p-2 text-black'
            onChange={(e) => setArrival(e.target.value)}
          />
        </div>
      </div>
      <div>
          <Button>PLACE RIDE</Button>
      </div>

      {distance !== null && (
        <div className='mt-4'>
          <h2>Distance: {distance} km</h2>
          <h2>Fare:{fare}</h2>
        </div>
      )}
    </div>
  );
};

export default Ride;
