import React from 'react'
import age from '../assets/Image/age.svg'
import phone from '../assets/Image/phone.svg'
import email from '../assets/Image/mail.svg'
import gender from '../assets/Image/gender.svg'
import bike from '../assets/Image/bike.svg'
import security from '../assets/Image/password.svg'

const ProfileCard = ({ profile }) => {
  const userProfile = profile;
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        userProfile.profile = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className='flex justify-center  items-center'>

      <div className='flex flex-col w-[500px] p-10 bg-slate-200 text-xl rounded-3xl text-blue-950 font-semibold gap-4'>

        <div className='flex items-center gap-10'>
          <img src={userProfile.profile} className='w-16'  />
          <p>{userProfile.user_name}</p>
        </div>
        <input type='file' onChange={handleImage}/>
        Add Profile Picture

        <hr className='border-t-2 border-gray-500 w-full max-w-md mx-auto' />

        <div className='flex items-center gap-20'>
          <img src={age} className='w-16' />
          <p>{userProfile.user_age}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={phone} alt='Phone Icon' className='w-16' />
          <p>{userProfile.user_phone}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={email} alt='Email Icon' className='w-16' />
          <p>{userProfile.user_email}</p>
        </div>

        <div className='flex items-center gap-20'>
          <img src={gender} alt='Gender Icon' className='w-16' />
          <p>{userProfile.user_gender}</p>
        </div>

        <hr className='border-t-2 border-gray-500 w-full max-w-md mx-auto' />
        <div className='flex items-center gap-20'>
          <img src={bike} alt='Gender Icon' className='w-16' />
          <p>My Rides</p>
        </div>
        
        <div className='flex items-center gap-20'>
          <img src={security} alt='Gender Icon' className='w-16' />
          <p>Security</p>
        </div>
        
      </div>
    </div>
  )
}

export default ProfileCard
