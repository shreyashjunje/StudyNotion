import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
function App() {
  return (
    <div className="  w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
    </div>
  );
}

export default App;
