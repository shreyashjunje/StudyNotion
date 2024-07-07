import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/common/Navbar";
import Contact from "./pages/Contact"
import Footer from "./components/common/Footer"

 
function App() {
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
