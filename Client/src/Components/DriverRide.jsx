import React,{useState} from 'react'
import Button from '../assets/Button'
// import { head } from '../../../Server/Routes/DriverRideRoute';
import axios from 'axios';
import image from "../assets/Image/BikeImag.jpg";

const DriverRide = () => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, newDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [fare, setFare] = useState('');
    const handleRide = async (e) => {
        e.preventDefault();
        try{
            const payload = {departure,arrival,date,time,fare}
            const response = await axios.post("http://localhost:3000/driverride",payload,{
                headers:{
                    Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjczZWQ4NDQyYTc2NjdjNjIzNGU2YiIsImlhdCI6MTcyMzM4NDY5MSwiZXhwIjoxNzIzNDEzNDkxfQ.ht8BI0p5zdpnu4B-z6UnKplKRGfSCB7_PeePlX5CYac"
                }
            })
            console.log(response)
            console.log("Ride Posted")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      <div className="relative flex justify-center items-center">
      <img src={image} alt="" className="w-full h-[800px] object-cover blur-sm" />
        <div className="absolute bg-slate-400 flex flex-col w-[400px] h-[700px] top-10 items-center justify-center gap-6 p-8  rounded-3xl">
        <h1 className="text-2xl font-semibold text-white">POST Ride</h1>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">From Location</label>
            <input
              type="text"
              placeholder="Departure"
              value={departure}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">To Location</label>
            <input
              type="text"
              placeholder="Arrival"
              value={arrival}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">Date</label>
            <input
              type="date"
              value={date}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => newDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">Time</label>
            <input
              type="time"
              value={time}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-lg">Fare</label>
            <input
              type="number"
              value={fare}
              className="rounded-xl p-3 text-black focus:outline-none"
              onChange={(e) => setFare(e.target.value)}
            />
          </div>
          
          
          <Button onClick={handleRide} className="mt-4 ">
            POST RIDE
          </Button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default DriverRide