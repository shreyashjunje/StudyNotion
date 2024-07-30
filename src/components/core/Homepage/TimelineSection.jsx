import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImg from "../../../assets/Images/TimelineImage.png";

const timelines = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-16  justify-center overflow-hidden m-10">

        <div className="w-full lg:w-[45%] flex flex-col gap-5 mt-6">

          {timelines.map((timeline, index) => {
            return (
              <div className="flex flex-row gap-6 m-4 " key={index}>

                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={timeline.Logo} alt="this is" />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-[1.2rem] font-semibold">
                    {timeline.Heading}
                  </h2>
                  <p className="text-base">{timeline.Description}</p>
                </div>
              </div>
            );
          })}

        </div>

        <div className="relative shadow-blue-100 ">
          <img src={TimelineImg} alt="this is timeline image" className="w-auto x`   object-cover" />

          <div
            className="abosolute lg:left-[50%]  lg:w-[70%]  bg-caribbeangreen-700 flex flex-row text-white uppercase py-6
                                   lg:translate-x-[22%] translate-y-[-50%]"
          >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">
                Types of Courses
              </p>
            </div>
          </div>
        </div>

      

    </div>
  );
};

export default TimelineSection;
