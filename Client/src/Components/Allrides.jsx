import React, { useState, useEffect } from 'react';
import axios from '../Helpers/axios-config';
import RideCard from '../Components/RideCard';
import errorimage from "../assets/Image/nothing.svg";
import Header from '../Components/Header';

const Allrides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/driverrides");
      setRides(response.data.rides);
    } 
    catch (error) {
      console.error('Error fetching ride data:', error);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full '>
      <div className='w-full p-2'>
          <Header />
      </div>
      <div className='flex flex-col justify-center items-center  overflow-y-scroll'>
        <h1 className='text-3xl font-semibold text-blue-950 on hover:text-yellow-400'>All Rides</h1>
      {loading ?
      (
        <div>
            <img src={errorimage} />
            <p>Searching For a Ride!!!</p>
        </div>
      ) : rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} ride={ride} />
        ))
      ) : (
        <div>
          <img src={errorimage} />
          <p className='text-3xl font-semibold text-blue-950'>Sorry!!! No Rides Available</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Allrides;
