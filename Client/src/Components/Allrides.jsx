import React, { useState, useEffect } from 'react';
import axios from '../Helpers/axios-config';
import RideCard from '../Components/RideCard';
import errorimage from "../assets/Image/nothing.svg";
import Header from '../Components/Header';

const Allrides = () => {
  const [rides, setRides] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/driverrides`);
      setRides(response.data.rides || []); // Ensure rides is always an array
    } 
    catch (error) {
      console.error('Error fetching ride data:', error);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full text-center'>
      <div className='w-full p-2'>
          <Header />
      </div>
      <h1 className='text-3xl font-semibold text-blue-950 on hover:text-yellow-400'>All Rides</h1>
      <div className='flex flex-wrap justify-center items-center'>
      {loading ? (
        <div>
          <img src={errorimage} alt="Loading..." />
          <p>Searching For a Ride!!!</p>
        </div>
      ) : rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} ride={ride} />
        ))
      ) : (
        <div>
          <img src={errorimage} alt="No Rides Available" />
          <p className='text-3xl font-semibold text-blue-950'>Sorry!!! No Rides Available</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Allrides;
