import React, { useState } from "react";
import Button from "../assets/Button";
import Signupimage from "../assets/Image/Sign up-rafiki.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import Header from "../Components/Header";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/register`,
        {
          user_name: name,
          user_email: email,
          user_password: password,
          user_phone: phone,
          user_age: age,
          user_gender: gender,
          otp: otp,
        }
      );
      dispatch(login(res.data.user));
      localStorage.setItem("token", res.data.token);
      toast.success("User registered successfully!");
      navigate("/userlogin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/sendotp`,
        {
          user_email: email,
        }
      );
      toast.success("OTP sent successfully! Check your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row  text-white">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <img
            src={Signupimage}
            alt="Sign Up"
            className="w-full h-auto max-w-xl hidden md:block"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <form
            className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg text-blue-950 font-semibold"
            onSubmit={handleRegister}
          >
            <h2 className="text-3xl font-bold text-center text-blue-950 mb-6">
              Register
            </h2>
            <div className="mb-6">
              <input
                type="text"
                id="name"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="tel"
                id="phone"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                placeholder="Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="number"
                id="age"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <select
                id="gender"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4 flex justify-between">
              <Button onClick={handleVerify}>Verify Email</Button>
              <Button type="submit">Register</Button>
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-700">Already a member?</span>
              <Link to="/userlogin" className="text-blue-500 font-semibold">
                {" "}
                Login
              </Link>
            </div>
            <div className="text-center mt-4">
              {/* <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 me-2"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
