import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Emailverification2 = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            toast.error("Email is missing. Redirecting to Signup.");
            navigate("/driverregister");
        }
    }, [location.state, navigate]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || !email) {
            toast.error("Please enter a valid OTP.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/driverotpverify`, {
                driver_email: email,
                otp: otp
            });
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            navigate("/driverlogin");
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-10">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Verify Email</h2>
                <form onSubmit={handleVerifyOtp} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        // readOnly
                        className="bg-gray-100 border-b-2 border-gray-400 focus:outline-none py-2 cursor-not-allowed"
                    />
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="border-b-2 border-gray-400 focus:outline-none py-2 focus:border-purple-500"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg transition-all duration-300 shadow-lg"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Emailverification2;
