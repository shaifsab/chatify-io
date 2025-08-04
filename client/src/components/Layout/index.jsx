// Import necessary libraries and hooks
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Layout component to check user authentication and render child routes
const Layout = () => {
  // Accessing the current user from the Redux store
  const user = useSelector((state) => state.authSlice.user);

  // Redirect to login page if the user is not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Render the child routes (content inside the <Layout />)
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
