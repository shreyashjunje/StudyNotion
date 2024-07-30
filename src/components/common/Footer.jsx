import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import FooterList from "../core/Footer/FooterList";
import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];


const Footer = () => {
  return (
    <div className="relative overflow-hidden  flex flex-col  lg:h-screen bg-richblack-800  justify-between lg:justify-evenly  lg:items-center   border-1">
      {/* //top div */}

      <div className=" overflow-hidden  justify-evenly flex flex-col lg:flex-row gap-3 m-[3rem]  lg:gap-16 lg:m-6  ">
        


        {/* //part 1 */}
        <div className=" flex flex-col sm:w-1/2  text-richblack-5 gap-6  lg:flex-row  lg:gap-9">
          <div className="flex gap-16 lg:gap-9 ">
            <div className="flex sm:flex-wrap flex-col gap-3  ">
              <Link to="/">
                <img src={logo} alt="this is studynotion logo" />
              </Link>
              <h2 className="text-md text-richblack-100">Company</h2>
              <ul className="text-richblack-500 text-sm flex flex-col gap-2 ">
                <li>About</li>
                <li>Careers</li>
                <li>Affiliates</li>
              </ul>
              <div className="flex flex-row gap-2">
                <FaFacebook />
                <ImGoogle3 />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-3">
                <h2 className="text-md text-richblack-100">Resources</h2>
                <ul className="text-richblack-500 flex flex-col gap-2">
                  <li>Articles</li>
                  <li>Blog</li>
                  <li>Chart Sheet</li>
                  <li>Code challenges</li>
                  <li>Docs</li>
                  <li>Projects</li>
                  <li>Videos</li>
                  <li>Workspaces</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-md text-richblack-100">Support</h2>
                <ul className="text-richblack-500 flex flex-col gap-2">
                  <li>Help Center</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col gap-32  lg:gap-9">
            <div className="flex flex-col gap-3">
              <h3 className="text-md text-richblack-100">Plans</h3>
              <ul className="text-richblack-500 flex flex-col gap-2">
                <li>Paid memberships</li>
                <li>For students</li>
                <li>Business solutions </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-md text-richblack-100">Community</h3>
              <ul className="text-richblack-500 flex flex-col gap-2">
                <li>Forums </li>
                <li>Chapters</li>
                <li>Events</li>
              </ul>
            </div>
          </div>
        </div>
      

        {/* di2 */}
        <div className="visible border-2 opacity-[0.3] border-richblack-700"></div>

        {/* div3 */}
        
        <FooterList />
        

      </div>

      <div className="w-[1200px] text-richblack-700 border-2 my-3"></div>

      {/* //bottom div  */}
      <div className="flex justify-between flex-col lg:flex-row gap-4 w-[100%]">
          <div className="flex flex-row text-richblack-100 justify-center items-center mx-auto">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center text-richblack-100 flex justify-center items-center mx-auto">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      
    </div>
  );
};

export default Footer;
