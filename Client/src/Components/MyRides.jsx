import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from './RideCard';

const MyRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getride", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWRlY2JiN2NhODFmYjExMDA3ZTllNyIsImlhdCI6MTcyMzEzMjA4OCwiZXhwIjoxNzIzMTYwODg4fQ.NmM987_4Mnb1I-_cgnNmeb1DNAXBUsy8O9JZ3gBHBeE"
        }
      });
      
      setRides(response.data.rides);
      
    } catch (error) {
      console.error('Error fetching ride data:', error);
    }
  };

  return (
    <div className='flex flex-wrap'>
      {rides.map((ride, index) => (
        <RideCard key={index} ride={ride} />
      ))}
    </div>
  );
}

export default MyRides;
