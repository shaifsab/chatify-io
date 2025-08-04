// src/pages/Register.jsx
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { authServices } from "../services/api";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Register.css"; 

function Register() {
  const user = useSelector((state) => state.authSlice.user);
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const handleReg = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.registration(regData);
      toast.success(res.success);
      setTimeout(() => {
        navigate(`/verify-otp/${regData.email}`);
      }, 2000);
    } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
          }
  };

  if (user) {
    return <Navigate to="/chat" replace />;
  }

 
  return (
    <div className="auth-container">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick={false} rtl={false} theme="dark" />
      <div className="auth-card">
        <h1 className="auth-card__title">Chatify</h1>
        <h2 className="auth-card__subtitle">Register</h2>

        <form onSubmit={handleReg} className="auth-card__form">
          <div className="auth-card__form-group">
            <label htmlFor="fullName" className="auth-card__label">Full Name</label>
            <input
              onChange={(e) => setRegData((prev) => ({ ...prev, fullName: e.target.value }))}
              type="text"
              id="fullName"
              className="auth-card__input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="auth-card__form-group">
            <label htmlFor="email" className="auth-card__label">Email</label>
            <input
              onChange={(e) => setRegData((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              id="email"
              className="auth-card__input"
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-card__form-group">
            <label htmlFor="password" className="auth-card__label">Password</label>
            <input
              onChange={(e) => setRegData((prev) => ({ ...prev, password: e.target.value }))}
              type="password"
              id="password"
              className="auth-card__input"
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="auth-card__button">Register</button>
        </form>

        <p className="auth-card__link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

    
      </div>
    </div>
  );
}

export default Register;
