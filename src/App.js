import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/common/Navbar";
import Contact from "./pages/Contact";
import Footer from "./components/common/Footer";
import ReviewSection from "./components/common/ReviewSection";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
// import ForgotPasswod from "./pages/ForgotPasswod";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Cart from "./components/core/Dashboard/Cart"



function App() {
  const {user}=useSelector(state=>state.profile);
  const {cart}=useSelector(state=>state.cart)
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              {" "}
              <Login />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

        </Route>


        <Route
          path="/signup"
          element={
            <OpenRoute>
              {" "}
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              {" "}
              <ResetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              {" "}
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* <ReviewSection /> */}

      <Footer />
    </div>
  );
}

export default App;
