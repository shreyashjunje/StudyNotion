import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";

const FooterList = () => {
  return (
    <div className="lg:w-[60%] flex  flex-row justify-between pl-3 lg:pl-5 gap-6 text-richblack-500"  >
     
        {FooterLink2.map((part, index) => {
          return (
            <div key={index} className="w-[48%]  lg:w-[30%] mb-7 lg:pl-0">
              <h2 className="font-bold text-md mb-2 text-richblack-100">
                {part.title}
              </h2>
              <div className="flex flex-col gap-2 mt-2">
                    {part.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
            </div>
          );
        })}
    </div>
    
  );
};

export default FooterList;
