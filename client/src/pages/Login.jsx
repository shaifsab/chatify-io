// src/pages/Login.jsx
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { authServices } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../store/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css"; 

function Login() {
  const user = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.loginUser(loginData);
      toast.success(res.success);
      dispatch(loggedUser(res.user));
      setTimeout(() => {
        navigate("/chat");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
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
        <h2 className="auth-card__subtitle">Login</h2>

        <form onSubmit={handleLogin} className="auth-card__form">
          <div className="auth-card__form-group">
            <label htmlFor="email" className="auth-card__label">Email</label>
            <input
              onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              id="email"
              className="auth-card__input"
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-card__form-group">
            <label htmlFor="password" className="auth-card__label">Password</label>
            <input
              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
              type="password"
              id="password"
              className="auth-card__input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-card__button">Login</button>
        </form>

        <p className="auth-card__link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
