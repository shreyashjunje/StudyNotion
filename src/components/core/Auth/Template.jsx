import React, { useState } from "react";
import { useSelector } from "react-redux";
import bgframe from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Template = ({ title, description1, description2, Image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="Spinner">Loading...</div>
      ) : (
        <div className="flex flex-col gap-12 w-full mx-auto lg:flex-row items-center justify-evenly p-8">

          <div className="flex flex-col gap-7 w-full px-12 lg:w-[40%] order-2 lg:order-1">
            <div className="">
                <h1 className="text-white text-4xl my-2">{title}</h1>
                <p className="text-white">{description1}</p>
                <p className="font-edu-sa-beginner text-[#47A5C5]">{description2}</p>
            </div>
            
            {formType === "Login" ? <LoginForm /> : <SignUpForm />}
          </div>

          <div className="relative order-1 ">
            <img className="absolute top-4 left-4 w-full h-auto object-cover" src={bgframe} alt="this  is backgroud friend" />
            <img className="relative w-full h-auto object-cover" src={Image} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
