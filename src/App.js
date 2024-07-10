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
import ResetPassword from "./pages/ResetPassword"
// import ForgotPasswod from "./pages/ForgotPasswod";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
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
          path="/update-password"
          element={
            <OpenRoute>
              {" "}
              <UpdatePassword />
            </OpenRoute>
          }
        />
      </Routes>

      <ReviewSection />

      <Footer />
    </div>
  );
}

export default App;
