import React from "react";
import HighlightText from "../components/core/Homepage/HighlightText";
import AboutUsPhotoframe from "../components/core/AboutUspage/AboutUsPhotoframe";
import OurFoundingStory from "../components/core/AboutUspage/OurFoundingStory";
import OurVisionAndMission from "../components/core/AboutUspage/OurVisionAndMission";
import ActiveStudentCount from "../components/core/AboutUspage/ActiveStudentCount";
import LearningGrid from "../components/core/AboutUspage/LearningGrid";
import ContactFormSection from "../components/core/AboutUspage/ContactFormSection";

const AboutUs = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col h-[618px]  items-center bg-richblack-800 justify-between text-white">
        <div className=" font-bold flex flex-col items-center w-11/12 mb-40 text-richblack-25 font-inter">
          <div className="w-full text-center mt-20 mb-8">About Us</div>

          <div className="text-center text-4xl font-semibold mt-7 mb-1">
            Driving Innovation in Online Education for a{" "}
            <span className="">
              {" "}
              <HighlightText text={"Brighter Future"} />
            </span>
          </div>

          <div></div>

          <div className="w-full lg:w-[65%] mt-8 text-center text-lg font-bold text-richblack-300 text-[16px]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </div>
        </div>

        <AboutUsPhotoframe />
      </div>

      {/* section 2 : highlighted text  */}
      <div className=" mt-60">
        <div className="text-richblack-500 font-bold w-full lg:w-[80%]  text-center mx-auto text-3xl lg:text-4xl ">
          <sup>
            <span className="inline-block text-richblack-300 text-3xl">"</span>
          </sup>{" "}
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlightText className="text]" text={"combines technology"} />,
          <span className="gradient-text-dark-orange"> expertise</span>,and
          community to create an{" "}
          <span className="gradient-text-light-orange">
            unparalleled educational experience.
          </span>
          <sup>
            <span className="text-richblack-300 text-3xl">"</span>
          </sup>
        </div>
      </div>

      {/* section 3 */}
      <OurFoundingStory />

      {/* {section4} */}
      <div className="w-full mb-60">
        <OurVisionAndMission />
      </div>

      <ActiveStudentCount />

      <section className="my-4">
        <LearningGrid />
      </section>

      <section>
        <ContactFormSection />
      </section>
    </div>
  );
};

export default AboutUs;
