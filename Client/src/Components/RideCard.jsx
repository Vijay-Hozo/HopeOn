import React from 'react';
import Button from '../assets/Button';

const RideCard = ({ ride }) => {
  return (
    <div className='flex flex-col bg-background-secondary w-[300px] p-8 h-auto m-8  rounded-xl gap-2 text-white'>
      <div className='mb-5 gap-4 flex flex-col text-center'>
        <h1 className='mb-4'>Departure: {ride.departure}</h1>
        <h1>Arrival: {ride.arrival}</h1>
      </div>
      <div className='flex justify-center'> 
        <Button>Take Ride</Button>
      </div>
    </div>
  );
}

export default RideCard;
