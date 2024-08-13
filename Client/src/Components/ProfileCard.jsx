import React from 'react';
import age from '../assets/Image/age.svg';
import phone from '../assets/Image/phone.svg';
import email from '../assets/Image/mail.svg';
import gender from '../assets/Image/gender.svg';
import bike from "../assets/Image/bike.svg"
import ride from "../assets/Image/ride.svg"
import request from "../assets/Image/request.svg"
import security from "../assets/Image/password.svg"
import { Link } from 'react-router-dom';

const ProfileCard = ({ Profile }) => {
  return (
    <div className="flex justify-center  items-center">
      <div className="flex flex-col w-[500px] p-10 bg-slate-200 text-xl rounded-3xl text-blue-950 font-semibold gap-4">
        <div className="flex items-center gap-10">
          <img src={Profile.profile} className="w-16" alt="Name Icon" />
          <p>{Profile.user_name}</p>   
        </div>
        <input type="file" />Add Profile Picture
        <hr className="border-t-2 border-gray-500 w-full max-w-md mx-auto" />

        <div className="flex items-center gap-20">
          <img src={age} className="w-16" />
          <p>{Profile.user_age}</p>
        </div>

        <div className="flex items-center gap-20">
          <img src={phone} alt="Phone Icon" className="w-16" />
          <p>{Profile.user_phone}</p>
        </div>

        <div className="flex items-center gap-20">
          <img src={email} alt="Email Icon" className="w-16" />
          <p>{Profile.user_email}</p>
        </div>

        <div className="flex items-center gap-20">
          <img src={gender} alt="Gender Icon" className="w-16" />
          <p>{Profile.user_gender}</p>
        </div>
        <hr className="border-t-2 border-gray-500 w-full max-w-md mx-auto" />

        <div className="flex items-center gap-20">
          <img src={bike} alt="Gender Icon" className="w-16" />
          <p>My Drives</p>
        </div>

        <div className="flex items-center gap-20">
          <img src={ride} alt="Gender Icon" className="w-16" />
          <p>My Rides</p>
        </div>
        <hr className="border-t-2 border-gray-500 w-full max-w-md mx-auto" />

        <div className="flex items-center gap-20">
          <img src={request} alt="Gender Icon" className="w-16" />
          <Link to="/request">Request</Link>
        </div>

        <div className="flex items-center gap-20">
          <img src={security} alt="Gender Icon" className="w-16" />
          <p>Security</p>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileCard;
