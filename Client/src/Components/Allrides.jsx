import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from './RideCard';

const Allrides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/driverride", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjczZWQ4NDQyYTc2NjdjNjIzNGU2YiIsImlhdCI6MTcyMzM4NDY5MSwiZXhwIjoxNzIzNDEzNDkxfQ.ht8BI0p5zdpnu4B-z6UnKplKRGfSCB7_PeePlX5CYac"
        }
      });
      
      setRides(response.data.rides);
      
    } catch (error) {
      console.error('Error fetching ride data:', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {rides.map((ride, index) => (
        <RideCard key={index} ride={ride} />
      ))}
    </div>
  );
}

export default Allrides;
