import React,{useState} from 'react'
import landing from "../assets/Image/landing.png"
import Title from '../assets/Title'
import Signup from "../assets/Image/Signup.svg"
import bike from "../assets/Image/share.svg"
import search from "../assets/Image/search.svg"
import menu from "../assets/Image/menu.svg"
import Dropdown from '../assets/DropDown'
import about from "../assets/Image/about.svg"
import Footer from '../Components/Footer'
import developer from "../assets/Image/developers.svg"
import { Link } from 'react-router-dom'

const Landingpage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handlemenu = ()=> {
        setShowDropdown(!showDropdown);
    }
  return (
    <div className='flex flex-col justify-center items-center  mt-5'>
        <div className='flex justify-between gap-10 w-full'>
            <div className="ml-10">
                <Title />
            </div>
            <div className='flex'>
            <>
                <img src={menu} className='w-10 mr-20' onClick={handlemenu}/>
                {showDropdown && <Dropdown />}
            </>
            <>
                {/* <Link to="/footer" ><img src={about} className='w-10 mr-20' /></Link> */}
                <a href="https://avijay.tech/" target='blank'><img src={developer} className='w-10 h-10 mr-20' /> </a> 
            </>
            </div>
        </div>
        <div className='m-10 '>
            <span className='text-4xl text-yellow-500 font-bold text-center '>Share</span>
            <span className='text-4xl text-blue-950 font-bold text-center'> Rides with Your </span>
            <h1 className='text-3xl text-blue-950 font-bold text-center'>own community</h1>
        </div>
        <>
            <img src={landing} className='h-[700px]' />
        </>
        <div className='text-xl  font-semibold'>
            <h1 className='text-center text-3xl text-yellow-500 on hover:text-blue-950 '>Simple to Use</h1>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col items-center'>
                    <Link to="/userlogin"><img src={Signup} className="h-[300px] transform transition-transform duration-500 hover:scale-105"  /></Link>
                    <h1>Sign Up</h1>
                    <p>Sign up with your email and phone number</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Link to="/allrides"><img src={search} className="h-[300px] transform transition-transform duration-500 hover:scale-105"  /></Link>
                    <h1>Find Rides</h1>
                    <p>Find rides in your community</p>
                </div>
                <div className='flex flex-col items-center mb-10'>
                <Link to="/driverlogin"><img src={bike} className="h-[350px] transform transition-transform duration-500 hover:scale-105" /></Link> 
                    <h1>Share Rides</h1>
                    <p>Share rides with your community</p>
                </div>
            </div>
        </div>
        <div className='w-full mt-8'>
            <Footer />
        </div>
    </div>
  )
}

export default Landingpage