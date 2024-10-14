import React, { useEffect, useState } from 'react';
import RequestCard from '../Components/RequestCard';
import axios from 'axios';
import DriverHeader from '../Components/DriverHeader';
import nothing from '../assets/Image/nothing.svg';

const Request = () => {
  const token = localStorage.getItem('drivertoken');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <DriverHeader />
      <h1 className="text-3xl font-bold text-blue-950 mt-8 mb-6">My Requests</h1>

      <div className="flex flex-wrap justify-center  px-4 w-full ">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <RequestCard key={index} request={request} />
          ))
        ) : (
          <div className="flex flex-col items-center mt-12">
            <img src={nothing} className="w-60 h-60 mb-4" alt="No Requests" />
            <p className="text-center font-semibold text-2xl text-blue-950">
              No Requests Found...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
