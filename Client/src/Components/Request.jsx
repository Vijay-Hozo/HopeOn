import React, { useEffect, useState } from 'react'
import RequestCard from '../Components/RequestCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Request = () => {
    const token = useSelector((state)=>state.user.token);
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        getRequest();
    }, []);

    const getRequest = async () => {
        try {
            const res = await axios.get("http://localhost:3000/request", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);

            setRequests(res.data.requests); // Set the requests array
            setUser(res.data.user);
        }
        catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            {
                requests.length > 0 ? (
                    requests.map((request, index) => (
                        <RequestCard key={index} request={request} user={user} />
                    ))
                ) : <p className="flex flex-col justify-center items-center text-center mt-20 w-full max-w-md p-6 rounded-3xl text-2xl text-blue-950 bg-slate-500">
                No requests found.
              </p>
              
            }
        </div>
    );
}

export default Request;
