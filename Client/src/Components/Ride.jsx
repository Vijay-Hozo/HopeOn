import React, { useState } from 'react';
import Button from '../assets/Button';
import axios from 'axios';
import data from '../assets/data.json';  // Importing the JSON data
import { useDispatch, useSelector } from 'react-redux';
import { addRide } from '../Redux/createSlice';
import image from "../assets/Image/BikeImag.jpg";


const geocodeLocation = async (location) => {
  const zone = data.zones.find(
    (zone) => zone.zone_name.toLowerCase() === location.toLowerCase()
  );

  if (zone) {
    return { lat: zone.latitude, lng: zone.longitude };
  } else {
    return { lat: 0, lng: 0 }; // Default coordinates if location is not found
  }
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
  const token = useSelector((state) => state.user.token);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [date, newDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();

  const handlePlace = async () => {
    try {
      const depCoords = await geocodeLocation(departure);
      const arrCoords = await geocodeLocation(arrival);

      if (depCoords && arrCoords) {
        const dist = haversineDistance(depCoords, arrCoords);
        setDistance(dist.toFixed(2)); // Distance in kilometers

        let calculatedFare = 100;
        if (dist > 100) {
          calculatedFare = 200;
        }
        setFare(calculatedFare);

        const newRide = {
          departure,
          departureCoords: depCoords,
          arrival,
          arrivalCoords: arrCoords,
          passengers,
          date,
        };

        dispatch(addRide(newRide));
        console.log("Ride Placed", newRide);

        const payload = {
          departure,
          arrival,
          passengers,
          date,
        };

        const res = await axios.post("https://hopeon.onrender.com/user/addride", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(res);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <img src={image} alt="" className="w-full h-[800px] object-cover" />
      <div className="absolute bg-slate-400 flex flex-col w-[400px] h-[600px] top-10 items-center justify-center gap-6 bg-gradient-to-b from-background-primary to-background-secondary p-8  rounded-3xl">
        <h1 className="text-2xl font-semibold text-white">Place Ride</h1>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">From Location</label>
            <input
              type="text"
              placeholder="Departure"
              value={departure}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">To Location</label>
            <input
              type="text"
              placeholder="Arrival"
              value={arrival}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">Number of Passengers</label>
            <input
              type="number"
              value={passengers}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">Date</label>
            <input
              type="date"
              value={date}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => newDate(e.target.value)}
            />
          </div>
          <Button onClick={handlePlace} className="mt-4 ">
            PLACE RIDE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Ride;
