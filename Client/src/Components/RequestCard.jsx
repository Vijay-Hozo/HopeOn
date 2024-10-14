import React, { useState } from 'react';
import name from '../assets/Image/name.svg';
import email from '../assets/Image/mail.svg';
import phone from '../assets/Image/phone.svg';
import gender from '../assets/Image/gender.svg';
import statusimage from '../assets/Image/status.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

const RequestCard = ({ request }) => {
  const token = localStorage.getItem('drivertoken');
  const [requestStatus, setRequestStatus] = useState(request.status);
  const user = request.user_id;

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/acceptmail`, {
        ride_id: request.ride_id,
      });
      setRequestStatus('accept');
      toast.success('Request accepted');
    } catch (err) {
      console.error('Error sending email:', err.message);
      toast.error('Failed to send email');
    }
  };

  const handleDecline = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ride_id: request.ride_id,
        },
      });
      setRequestStatus('decline');
      toast.success('Request declined');
    } catch (err) {
      console.error('Error declining request:', err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-8 w-full max-w-2xl mx-auto mb-6 transition-transform transform hover:scale-105">
      <div className="space-y-6 w-full md:w-2/3">
        <div className="flex items-center gap-4">
          <img src={name} alt="Name Icon" className="w-8 h-8" />
          <p className="text-lg font-medium text-gray-800">{user.user_name}</p>
        </div>
        <div className="flex items-center gap-4">
          <img src={email} alt="Email Icon" className="w-8 h-8" />
          <p className="text-lg font-medium text-gray-800">{user.user_email}</p>
        </div>
        <div className="flex items-center gap-4">
          <img src={phone} alt="Phone Icon" className="w-8 h-8" />
          <p className="text-lg font-medium text-gray-800">{user.user_phone}</p>
        </div>
        <div className="flex items-center gap-4">
          <img src={gender} alt="Gender Icon" className="w-8 h-8" />
          <p className="text-lg font-medium text-gray-800">{user.user_gender}</p>
        </div>
        <div className="flex items-center gap-4">
          <img src={statusimage} alt="Status Icon" className="w-8 h-8" />
          <p
            className={`text-lg font-semibold p-2 rounded-md ${
              requestStatus === 'accept' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {requestStatus}
          </p>
        </div>
      </div>
      <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
