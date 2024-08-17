import React, { useState } from 'react'
import Button from "../assets/Button"
import Signupimage from "../assets/Image/Sign up-rafiki.svg"
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { login } from '../Redux/userSlice';
import Header from '../Components/Header';


const UserRegister = () => {
    
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');
    const [profile,setProfile] = useState('');
    const navigate = useNavigate()

    
    const handleregister = async(e) => {
        e.preventDefault();
        try{
        const res = await axios.post("https://hopeon.onrender.com/register",{
            user_name : name,
            user_email : email,
            user_password:password,
            user_phone : phone,
            user_age : age,
            user_gender : gender,
            profile : profile
        })
        console.log("user registered");
        console.log(res);
        dispatch(login(res.data.user));
        localStorage.setItem("token",res.data.token);
        toast.success("User registered")
        navigate("/allrides");
    }
    catch(err){
        toast.error(err.response.data.message)
    }   
    }

    const handleVerify = async(e) =>{
        e.preventDefault();
        try{
        const response = await axios.post("https://localhost:3000/sendotp",{
            user_email : email
        })
        console.log(response);
        toast.success("OTP sent successfully");
    }catch(err){
        console.log(err.response.message);
        toast.error(err.response.message);
    }
    }

  return (
    <div>
        <Header />
        <div className='flex bg-blue-950 text-white'>
        <div>
            <img src={Signupimage} alt="" className='w-[900px] h-[678px]' />
        </div>

        <form className='flex flex-col items-center text-xl gap-4 max-h-full w-full  text-black py-5' onSubmit={handleregister}>
            <div className='my-4'>
                <span className='text-3xl font-bold text-yellow-400'>Welcome to</span>
                <span className='text-3xl font-bold text-green-600'> HopeON</span>
            </div>
            <div className='flex justify-around gap-20 my-2'>
                <div>
                    <input type="text" 
                    className='p-2 rounded-xl bg-slate-300 '
                        placeholder='Your Sweet Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input type="text" 
                    className='p-2 rounded-xl bg-slate-300 '
                        placeholder = "Precious Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex justify-around gap-20 my-4'>
                <div>
                    <input type="Number" 
                    className='p-2 rounded-xl bg-slate-300 '
                        placeholder='Secret Number'
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input type="Number" 
                    className='p-2 rounded-xl bg-slate-300 '
                        placeholder='Youthful Age'
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex justify-around gap-20 my-4'>
                <div>
                    <select type="option"
                    className='p-2 rounded-xl text-black bg-slate-300 '
                        value={gender}
                        onChange={(e)=>setGender(e.target.value)}>
                        <option value="" className='text-black'>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    {/* <lable for="profile">Profile Photo</lable> */}
                    <input type="file" 
                    className='text-black p-2 rounded-xl '
                        placeholder='Profile photo'
                        value={profile}
                        onChange={(e)=>setProfile(e.target.value)}
                    />
                </div>
            </div>


            <div>
                <input type="text" 
                className='p-2 rounded-xl bg-slate-300'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <div>
                <input type="text"
                className='p-2 rounded-xl bg-slate-300 '
                placeholder='Enter OTP'
                />
            </div>
            
            <div className='mt-4'>
                <Button onClick={handleVerify}>Verify Email</Button>
                <Button type="submit">Register</Button>
            </div>
            
            <div>
                <h1 className='text-center mb-4 '>or</h1>
            <button type="button" className="text-white bg-[#043e9a] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                </svg>
                    Sign in with Google
                </button>
            </div>
            <div>
                <span className=''>Already a member?</span>
                <span className='text-yellow-500 font-semibold'><a href="/userlogin"> Login</a></span>
            </div>
        </form>
    </div>     
    </div>
  )
}

export default UserRegister