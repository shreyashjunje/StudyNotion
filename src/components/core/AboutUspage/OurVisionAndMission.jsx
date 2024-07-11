import React from "react";

const OurVisionAndMission = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto items-center justify-center gap-5 h-full p-20 lg:px-[120px] ">

      <div className="flex flex-col gap-8 lg:gap-[24px]">
        <h2 className="gradient-text-light-orange text-4xl font-bold">
          Our Vision
        </h2>
        <div className="flex flex-col text-start text-richblack-600 lg:px-10">
          With this vision in mind, we set out on a journey to create an
          e-learning platform that would revolutionize the way people learn. Our
          team of dedicated experts worked tirelessly to develop a robust and
          intuitive platform that combines cutting-edge technology with engaging
          content, fostering a dynamic and interactive learning experience.
        </div>
      </div>

      <div className="flex flex-col  gap-8">
        <h2 className="gradient-text-blue text-4xl font-bold">Our Mission</h2>
        <div className="flex flex-col text-start text-richblack-600 ">
          our mission goes beyond just delivering courses online. We wanted to
          create a vibrant community of learners, where individuals can connect,
          collaborate, and learn from one another. We believe that knowledge
          thrives in an environment of sharing and dialogue, and we foster this
          spirit of collaboration through forums, live sessions, and networking
          opportunities.
        </div>
      </div>
    </div>
  );
};

export default OurVisionAndMission;
