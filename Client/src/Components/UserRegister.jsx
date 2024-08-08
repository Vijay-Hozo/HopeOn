import React, { useState } from 'react'
import Button from "../assets/Button"
import Signupimage from "../assets/Image/Sign up-rafiki.svg"

const UserRegister = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');
    const [profile,setProfile] = useState('');
  return (
    <div className='flex bg-background-primary bg-gradient-to-b from-background-primary to-background-secondary'>
        <div>
            <img src={Signupimage} alt="" className='w-[900px] h-[678px]' />
        </div>

        <div className='flex flex-col items-center text-xl gap-4 max-h-full w-full  text-white py-5'>
            <div className='my-4'>
                <span className='text-3xl font-bold text-yellow-400'>Welcome to</span>
                <span className='text-3xl font-bold text-green-600'> HopeON</span>
            </div>
            <div className='flex justify-around gap-20 my-2'>
                <div>
                    <input type="text" 
                    className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                        placeholder='Your Sweet Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input type="text" 
                    className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                        placeholder = "Precious Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex justify-around gap-20 my-4'>
                <div>
                    <input type="Number" 
                    className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                        placeholder='Secret Number'
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <input type="Number" 
                    className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                        placeholder='Youthful Age'
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex justify-around gap-20 my-4'>
                <div>
                    <select type="option"
                    className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                        value={gender}
                        onChange={(e)=>setGender(e.target.value)}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    {/* <lable for="profile">Profile Photo</lable> */}
                    <input type="file" 
                    className='text-white p-2 rounded-xl '
                        placeholder='Profile photo'
                        value={profile}
                        onChange={(e)=>setProfile(e.target.value)}
                    />
                </div>
            </div>


            <div>
                <input type="text" 
                className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
                    placeholder='Hashed Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className='mt-4'>
                <Button>Register</Button>
            </div>
            
            <div>
                <h1 className='text-center mb-4'>or</h1>
            <button type="button" class="text-white bg-[#043e9a] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                </svg>
                    Sign in with Google
                </button>
            </div>
            <div>
                <span>Already a member?</span>
                <span className='text-yellow-400'><a href="/userlogin"> Login</a></span>
            </div>
        </div>
    </div>     
  )
}

export default UserRegister