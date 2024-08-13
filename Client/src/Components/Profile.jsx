import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [profile, setProfile] = useState(null); 
    const token = useSelector((state) => state.user.token);
    console.log(token);
    
    const drivertoken = useSelector((state) => state.driver.drivertoken);
    console.log(drivertoken);
    

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            if (token) {
                const res = await axios.get('http://localhost:3000/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(res);
                setProfile(res.data.user);
            } else if (drivertoken) {
                const response = await axios.get('http://localhost:3000/driver', {
                    headers: {
                        Authorization: `Bearer ${drivertoken}`,
                    }
                });
                console.log(response);
                setProfile(response.data.driver);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div>
            {profile ? (
                <ProfileCard profile={profile} /> 
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
