import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';

const Profile = () => {
    const [Profile, setProfile] = useState(null); // Initialize as null

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/user', {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjhkMTE1OGUzNjVmYTY0YWVhNzliNiIsImlhdCI6MTcyMzM4ODE5MywiZXhwIjoxNzIzNDE2OTkzfQ.FH2CJ4IPP7PySufyp2GhKXjQ2uXyw4YK71YlpHP_TAA"
                }
            });
            console.log(res);
            setProfile(res.data.user); // Assuming res.data.user is an object
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div>
            {Profile ? (
                <ProfileCard Profile={Profile} /> // Pass the profile object to ProfileCard
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
