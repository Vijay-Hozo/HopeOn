import React, { useState } from "react";
import Button from "../assets/Button";
import Signupimage from "../assets/Image/driversign.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { driverlogin } from "../Redux/driverSlice";
import DriverHeader from "../Components/DriverHeader";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [governmentid, setgovernmentid] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [otp, setOtp] = useState("");

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/registerdriver`,
        {
          driver_name: name,
          driver_email: email,
          driver_password: password,
          driver_phone: phone,
          driver_age: age,
          government_id: governmentid,
          vehicle_number: vehicle,
          profile_photo: profilePhoto,
          otp: otp,
        }
      );
      toast.success("Driver registered");
      dispatch(driverlogin(res.data.drivertoken));
      localStorage.setItem("drivertoken", res.data.drivertoken);
      navigate("/driverride");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/driverotp`,
        {
          driver_email: email,
        }
      );
      toast.success("OTP sent successfully! Check your email");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen w-ful">
      <DriverHeader />
      <div className="flex flex-col md:flex-row items-center justify-center  text-blue-950 p-4">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <img
            src={Signupimage}
            alt="Sign up"
            className="w-full h-auto max-w-md hidden md:block"
          />
        </div>

        <form
          className="flex flex-col items-center text-xl gap-4 max-h-full w-full md:w-1/2 text-blue-950 py-5 px-4"
          onSubmit={handleregister}
        >
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-yellow-400">
              Welcome to
            </span>
            <br />
            <span className="text-3xl font-bold text-green-600">HopeON</span>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-3/4 text-center items-center">
            <input
              type="text"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Secret Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Government Id"
              value={governmentid}
              onChange={(e) => setgovernmentid(e.target.value)}
            />
            <input
              type="text"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Vehicle Number"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
            <input
              type="file"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
            <input
              type="password"
              className="w-[350px] border-b-2 border-gray-400 focus:outline-none py-2 px-3 focus:border-black rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="p-3 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4 gap-10 flex justify-between">
          <Button onClick={handleVerify}>Verify Email</Button>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Register
            </Button>
          </div>
          <div className="text-center ">
            {/* <h1 className="text-white mb-2">or</h1>
            <button
              type="button"
              className="text-white bg-[#043e9a] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button> */}
          </div>
          <div className="">
            <span className="text-blue-950">Already a member?</span>
            <span className="text-yellow-500">
              <Link to="/driverlogin" className="underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
