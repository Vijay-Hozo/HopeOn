import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from '../Components/RideCard';

const Allrides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/driverrides");
      console.log(response.data);
      setRides(response.data.rides);
    } catch (error) {
      console.error('Error fetching ride data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {loading ? (
        <p>Loading rides...</p>
      ) : rides.length > 0 ? (
        rides.map((ride, index) => (
          <RideCard key={index} ride={ride} />
        ))
      ) : (
        <p>No rides available</p>
      )}
    </div>
  );
}

export default Allrides;
