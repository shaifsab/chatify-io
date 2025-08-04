// src/pages/OtpVerify.jsx
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { authServices } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../styles/OtpVerify.css";  

const OtpVerify = () => {
  const user = useSelector((state) => state.authSlice.user);
  const params = useParams().email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  // Handle theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Apply theme on page load
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.verifyOtp(params, otp);
      toast.success(res.success);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className={`otp-verify ${theme}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick={false} rtl={false} theme="dark" />
      <form className="otp-verify__form">
        <h1 className="otp-verify__title">Enter OTP</h1>
        <p className="otp-verify__subheading">We have sent a verification code to your mobile number.</p>
        <input
          type="text"
          value={otp}
          onChange={handleInputChange}
          maxLength="4"
          className="otp-verify__input"
          placeholder="Enter OTP"
        />
        <button onClick={handleVerify} className="otp-verify__button" type="submit">
          Verify
        </button>
        <p className="otp-verify__resend-note">
          Didn't receive the code?{" "}
          <button className="otp-verify__resend-btn">Resend Code</button>
        </p>
   
      </form>
    </div>
  );
};

export default OtpVerify;
