import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load components
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Chat = lazy(() => import("../pages/Chat"));
const OtpVerify = lazy(() => import("../pages/OtpVerify"));
const Layout = lazy(() => import("../components/Layout"));
const UserProfile = lazy(() => import("../pages/Profile"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp/:email" element={<OtpVerify />} />
        <Route path="/chat" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="/chat/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
