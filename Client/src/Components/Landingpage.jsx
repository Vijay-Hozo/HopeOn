import React, { useState } from 'react';
import landing from "../assets/Image/landing.png";
import Title from '../assets/Title';
import Signup from "../assets/Image/Signup.svg";
import bike from "../assets/Image/share.svg";
import search from "../assets/Image/search.svg";
import menu from "../assets/Image/menu.svg";
import Dropdown from '../assets/DropDown';
// import about from "../assets/Image/about.svg";
import Footer from '../Components/Footer';
import developer from "../assets/Image/developers.svg";
import { Link } from 'react-router-dom';

const Landingpage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handlemenu = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='flex flex-col justify-center items-center mt-5'>
            <div className='flex justify-between items-center w-full px-4 md:px-10'>
                <div className="ml-4 md:ml-10">
                    <Title />
                </div>
                <div className='flex items-center gap-6 text-xl font-semibold text-blue-950'>
                    <>
                        <Link to="/userlogin" className='ml-4 md:ml-10 '><button className='bg-blue-600 rounded-md p-2 text-white'>User Login</button></Link>
                        <Link to="/driverlogin"><button className='bg-blue-600 rounded-md p-2 text-white'>Driver Login</button></Link>
                    </>
                </div>
            </div>
            <div className='m-6 md:m-10 text-center'>
                <span className='text-2xl md:text-4xl text-yellow-500 font-bold'>Share</span>
                <span className='text-2xl md:text-4xl text-blue-950 font-bold'> Rides with Your </span>
                <h1 className='text-xl md:text-3xl text-blue-950 font-bold'>own community</h1>
            </div>
            <>
                <img src={landing} className='h-[200px] md:h-[400px] lg:h-[600px] xl:h-[700px] w-full object-cover' />
            </>
            <div className='text-lg md:text-xl font-semibold mt-6'>
                <h1 className='text-center text-2xl md:text-3xl text-yellow-500 hover:text-blue-950'>Simple to Use</h1>
                <div className='flex flex-col md:flex-row justify-between items-center mt-6'>
                    <div className='flex flex-col items-center mb-6 md:mb-0'>
                        <Link to="/userlogin">
                            <img src={Signup} className="h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] transform transition-transform duration-500 hover:scale-105" />
                        </Link>
                        <h1>Sign Up</h1>
                        <p className='text-center'>Sign up with your email and phone number</p>
                    </div>
                    <div className='flex flex-col items-center mb-6 md:mb-0'>
                        <Link to="/allrides">
                            <img src={search} className="h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] transform transition-transform duration-500 hover:scale-105" />
                        </Link>
                        <h1>Find Rides</h1>
                        <p className='text-center'>Find rides in your community</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link to="/driverlogin">
                            <img src={bike} className="h-[150px] md:h-[250px] lg:h-[300px] xl:h-[350px] transform transition-transform duration-500 hover:scale-105" />
                        </Link>
                        <h1>Share Rides</h1>
                        <p className='text-center'>Share rides with your community</p>
                    </div>
                </div>
            </div>
            <div className='w-full mt-8'>
                <Footer />
            </div>
        </div>
    );
};

export default Landingpage;
