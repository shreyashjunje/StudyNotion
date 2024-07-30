import React from "react";
import HighlightText from "./HighlightText";
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButton from "./Button";
import Instructor from "../../../assets/Images/Instructor.png";
import { Link } from "react-router-dom";

const InstructorSection = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row items-center my-8 lg:my-auto justify-evenly h-screen overflow-hidden">

      <div className="hidden md:block lg:block shadow-white-shadow">
          <img src={Instructor} alt="this is img of instructor" className="lg:w-[616px] h-[545px] "/>
      </div>

      <div className="w-[486px] flex flex-col justify-start overflow-hidden">
        <h2 className="text-4xl font-bold text-richblack-5">Become an</h2>
        <HighlightText text={"Instructor"} />
        <p className="w-full my-4  text-md text-[#838894] font-semibold">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <img src={Instructor} alt="this is instructor image" className="block md:hidden lg:hidden w-auto h-auto object-cover"/>

        <Link to="/signup">
          <div className="flex items-center gap-3 justify-center  w-[45%]  text-[13px] mt-8 py-4 lg:py-3 rounded-lg font-bold bg-yellow-50 text-black">
            Start Teaching Today
            <FaArrowRightLong />

          </div>
        </Link>
      </div>
    </div>
  );
};

export default InstructorSection;
