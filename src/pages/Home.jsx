import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";

import CTAButton from "../components/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import Codeblock from "../components/core/Homepage/Codeblock";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import { LearningLanguageSection } from "../components/core/Homepage/LearningLanguageSection";
// import { BsSliders } from 'react-icons/bs';
import InstructorSection from "../components/core/Homepage/InstructorSection";
import { ExploreMore } from "../components/core/Homepage/ExploreMore";
import ReviewSlider from "../components/core/Homepage/ReviewSlider";
import { motion } from "framer-motion"


function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto fles flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div
            className="custom-inset
                     group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit"
          >
            <motion.div
              animate={{ x: [null, 100, 0] }}

              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                         transition-all duration-200 group-hover:bg-richblack-900 "
            >
              <p>Become an instructor</p>
              <FaArrowRight />
            </motion.div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="w-[90%] mt-4 text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row justify-center gap-7 mt-8">
          <CTAButton active={true} linkto="/signup">
            Learn more
          </CTAButton>

          <CTAButton active={false} linkto="/login">
            Book A demo
          </CTAButton>
        </div>

        <div className="relative mx-3 flex flex-col   my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay

            // src={Banner}
          >
            <source src={Banner} type="video/mp4" />
          </video>
          {/* <div className=" absolute lg:w-[1035px] h-[515px] top-[8px] left-[20px] gap-0 opacity-0 bg-richblack-5"></div> */}
        </div>



        {/* {code section 1} */}
        <div>
          <Codeblock
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"Coding Potentials"} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup ",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login ",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>
        {/* {code section 2 } */}
        <div>
          <Codeblock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }

            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup ",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login ",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><a href="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>
        `{/* just for responve!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        {/* <ExploreMore/> */}
      </div>

      {/* section 2 */}
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="felx items-center">Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-content flex flex-col  justify-between items-center gap-7">
          <div className="flex flex-row gap-5 nb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a{/* <div></div> */}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* <TimelineSection/> */}

          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div
        className=" mx-auto max-w-maxContent flex-col items-center justify-between gap-8
        first-letter bg-richblack-900 text-white"
      >
        <InstructorSection/>

        {/* {review secition } */}
        {/* <section> */}
        {/* <div className='flex flex-col gap-5 p-20'>
                    <h2 className='text-center text-4xl font-semibold mt-20 mb-10'>
                        Reviews from other learners
                    </h2>
                    
                </div> */}
        {/* </section> */}
      </div>

      {/* section 4 */}
    </div>
  );
}

export default Home;
