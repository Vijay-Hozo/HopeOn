import React, { useState } from 'react'
import Button from '../assets/Button'
import Signupimage from '../assets/Image/driversign.svg'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { driverlogin } from '../Redux/driverSlice'
import DriverHeader from '../Components/DriverHeader'

const UserRegister = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [governmentid, setgovernmentid] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')

  const handleregister = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/registerdriver`, {
        driver_name: name,
        driver_email: email,
        driver_password: password,
        driver_phone: phone,
        driver_age: age,
        government_id: governmentid,
        vehicle_number: vehicle,
        profile_photo: profilePhoto
      })
      toast.success('driver registered')
      dispatch(driverlogin(res.data.drivertoken))
      localStorage.setItem('drivertoken', res.data.drivertoken)
      navigate('/driverride')
      toast.success('driver registered')
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-blue-950"u>
      <DriverHeader />
      <div className='flex bg-blue-950 text-white'>
      <div>
        <img src={Signupimage} alt='Sign up' className='w-[700px] h-[678px]' />
      </div>

      <form
        className='flex flex-col items-center text-xl gap-4 max-h-full w-full text-white  py-5'
        onSubmit={handleregister}
      >
        <div>
          <span className='text-3xl font-bold text-yellow-400'>Welcome to</span>
          <span className='text-3xl font-bold text-green-600'> HopeON</span>
        </div>
        <div className='flex justify-around gap-20 my-2'>
          <div>
            <input
              type='text'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Your Sweet Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Precious Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-around gap-20 my-4'>
          <div>
            <input
              type='number'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Secret Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type='number'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Youthful Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-around gap-20 my-4'>
          <div>
            <input
              type='text'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Government Id'
              value={governmentid}
              onChange={(e) => setgovernmentid(e.target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
              placeholder='Vehicle Number'
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor='profile' className='text-white font-semibold'>Profile Photo</label>
            <input
              type='file'
              className='text-white p-2 rounded-xl'
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
        </div>

        <div>
          <input
            type='password'
            className='p-2 rounded-xl bg-gray-600 bg-opacity-10'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mt-4'>
          <Button type='submit'>Register</Button>
        </div>

        <div>
          <h1 className='text-center mb-2 text-black'>or</h1>
          <button
            type='button'
            className='text-white bg-[#043e9a] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
          >
            <svg
              className='w-4 h-4 mr-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 19'
            >
              <path
                fillRule='evenodd'
                d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
                clipRule='evenodd'
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        <div>
          <span className='text-white'>Already a member?</span>
          <span className='text-yellow-400'>
            <Link to='/driverlogin'>Login</Link>
          </span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UserRegister
