import React from 'react';
import Button from '../assets/Button';
import axios from "axios"
import fromicon from "../assets/Image/from.svg"
import toicon from "../assets/Image/to.svg"
import dateicon from "../assets/Image/datesvg.svg"
import timeicon from "../assets/Image/time.svg"
import status from "../assets/Image/status.svg"


const RideCard = ({ ride }) => {

  const handleRequest = (e)=>{
    e.preventDefault();
    try{
    const payload = {
      ride_id : "8d9568b3-528d-4f28-8cda-68cf297c75fc"
    }
    const res = axios.post("http://localhost:3000/request",payload,{
      headers:{
        Authorization : " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjczZWQ4NDQyYTc2NjdjNjIzNGU2YiIsImlhdCI6MTcyMzM4NDY5MSwiZXhwIjoxNzIzNDEzNDkxfQ.ht8BI0p5zdpnu4B-z6UnKplKRGfSCB7_PeePlX5CYac"
      }
    })
    console.log(res);
    console.log("Requested Successfullly");
  }
  catch(err){
    console.log(err);
  }
  }

  

  return (
    <div className='flex flex-col items-center bg-slate-200 w-[500px] p-8 h-auto m-8 rounded-xl gap-4 text-black'>
    <div className='flex flex-col text-center text-xl w-full text-blue-950 font-semibold'>
      <div className='flex justify-around mb-5'>
        <div className='flex items-center gap-2'>
          <img src={fromicon} alt="Departure Icon" className='w-12' />
          <span>{ride.departure}</span>
        </div>
        <div className='flex items-center gap-2'>
          <img src={toicon} alt="Arrival Icon" className='w-12' />
          <span>{ride.arrival}</span>
        </div>
      </div>

      <div className='flex justify-around mb-5'>
        <div className='flex items-center gap-2'>
          <img src={dateicon} alt="Date Icon" className='w-9' />
          <span>{ride.date}</span>
        </div>
        <div className='flex items-center gap-2'>
          <img src={timeicon} alt="Time Icon" className='w-9' />
          <span>{ride.time}</span>
        </div>
      </div>

      <div className='flex flex-col items-center mb-5'>
        <h1 className='text-2xl mb-2'>₹{ride.fare}</h1>
        <div className='bg-green-600 w-[100px] p-2 rounded-2xl flex items-center'>
          <img src={status} alt="Status Icon" className='w-10' />
          <span className='ml-2'>{ride.status}</span>
        </div>
      </div>
    </div>

    <div className='flex justify-center'>
      <Button onClick={handleRequest}>Send Request</Button>
    </div>
  </div>
  );
}

export default RideCard;
