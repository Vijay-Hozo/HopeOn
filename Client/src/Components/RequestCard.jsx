import React, { useState } from 'react';
import name from "../assets/Image/name.svg";
import email from "../assets/Image/mail.svg";
import phone from "../assets/Image/phone.svg";
import age from "../assets/Image/age.svg";
import gender from "../assets/Image/gender.svg";
// import fromlocation from "../assets/Image/from.svg";
// import tolocation from "../assets/Image/to.svg";
import statusimage from "../assets/Image/status.svg";
import axios from "axios";
import { useSelector } from 'react-redux';

const RequestCard = ({ request, user }) => {
    const token = useSelector((state=>state.user.token))
    const [requestStatus, setRequestStatus] = useState(request.status);
    const [status , setStatus] = useState("")

    const handleAccept = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ride_id: request.ride_id,
                status
            };
            const res = await axios.put("http://localhost:3000/request", payload, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjczZWQ4NDQyYTc2NjdjNjIzNGU2YiIsImlhdCI6MTcyMzQ0MTY1OCwiZXhwIjoxNzIzNDcwNDU4fQ.KnQpyzQN9EHnIODyR8FI_eA8IZp-ZPSknAboI-K45hw"
                }
            });
            console.log(res);
            console.log("Accepted successfully");
            setRequestStatus("accept"); 
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        const payload = {
            ride_id: request.ride_id
        };

        try {
            const res = await axios.delete("http://localhost:3000/request", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: payload
            });
            console.log("Request deleted");
            console.log(res);
            setRequestStatus("decline"); 
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-evenly items-center text-blue-950 font-semibold p-6 rounded-lg mb-4">
            <div className="space-y-4 w-[500px] bg-slate-100 p-10 rounded-3xl">
                {request.ride_id}
                {/* <div className='flex justify-between mb-10'>
                    <div className="flex items-center gap-4">
                        <img src={fromlocation} className="w-8 h-8" alt="Departure Icon" />
                        <p className="text-lg font-semibold">{request.ride.departure}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={tolocation} className="w-8 h-8" alt="Arrival Icon" />
                        <p className="text-lg font-semibold">{request.ride.arrival}</p>
                    </div>
                </div> */}

                <div className="flex items-center gap-20">
                    <img src={name} className="w-8 h-8" alt="Name Icon" />
                    <p className="text-lg font-semibold">{user.user_name}</p>
                </div>

                <div className="flex items-center gap-20">
                    <img src={email} className="w-8 h-8" alt="Email Icon" />
                    <p className="text-lg font-semibold">{user.user_email}</p>
                </div>

                <div className="flex items-center gap-20">
                    <img src={phone} className="w-8 h-8" alt="Phone Icon" />
                    <p className="text-lg font-semibold">{user.user_phone}</p>
                </div>

                <div className="flex items-center gap-20">
                    <img src={age} className="w-8 h-8" alt="Age Icon" />
                    <p className="text-lg font-semibold">{user.user_age}</p>
                </div>

                <div className="flex items-center gap-20">
                    <img src={gender} className="w-8 h-8" alt="Gender Icon" />
                    <p className="text-lg font-semibold">{user.user_gender}</p>
                </div>

                <div className="flex items-center gap-20">
                    <img src={statusimage} className="w-8 h-8" alt="Status Icon" />
                    {
                        requestStatus === "accept" ?
                            <p className="text-lg font-semibold bg-green-500 p-3 rounded"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >{requestStatus}</p>
                            :
                            <p className="text-lg font-semibold bg-red-500 p-3 rounded">{requestStatus}</p>
                    }
                </div>
            </div>
            <div className="flex gap-16 mt-4 md:mt-0">
                <button className='bg-green-600 p-4 rounded-2xl' onClick={handleAccept}>Accept</button>
                <button className='bg-red-500 p-4 rounded-2xl' onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
};

export default RequestCard;
