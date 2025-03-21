import React, { useState } from "react";
import Title from "../assets/Title";
import Button from "../assets/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { driverlogin } from "../Redux/driverSlice";
import { useNavigate, Link } from "react-router-dom";
import DriverHeader from "../Components/DriverHeader";
import loginimage from "../assets/Image/new_login.svg";

const PasswordInput = ({ value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative rounded-2xl">
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        className="w-full border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

const DriverLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/logindriver`,
        {
          driver_email: email,
          driver_password: password,
        }
      );
      toast.success("Logged in successfully");
      dispatch(driverlogin(res.data.drivertoken));
      localStorage.setItem("drivertoken", res.data.drivertoken);
      navigate("/driverride");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/driverpassword`, {
        driver_email: email,
      });
      toast.success("OTP sent successfully! Check your email");
      navigate("/driverpasswordreset", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen">
      <DriverHeader />
      <div className="flex flex-col md:flex-row items-center justify-around w-full min-h-screen p-10 mr-20">
        <div className="w-1/2 flex justify-center">
          <img
            src={loginimage}
            alt="Sign Up"
            className="w-full h-auto max-w-lg md:max-w-[500px] md:h-[600px] object-cover hidden md:block"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-blue-950 text-lg py-4 h-[680px] bg-white font-semibold bg-gradient-to-b from-background-primary to-background-secondary">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl">Rider For</h1>
            <Title />
          </div>

          <form onSubmit={handlelogin} className="gap-4 my-4">
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="border-b-2 border-gray-400 focus:outline-none py-2 focus:border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-6">
              {/* <label>Password</label> */}
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-blue-900">
              <Link to="/driverpasswordreset" onClick={handleReset}>
                Forgot Password?
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <Button type="submit">Login</Button>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-center">or</h1>
              {/* <button
                type="button"
                className="text-white bg-[#043e9a] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
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
            <div className="flex items-center gap-3">
              <span className="text-2xl">New to?</span>
              <Title />
              <span className="text-white">
                <Link to="/driverregister">
                  {" "}
                  <button className="p-2 bg-blue-600 rounded-md">
                    Register
                  </button>{" "}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
