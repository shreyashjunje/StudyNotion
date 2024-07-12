import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { Link } from "react-router-dom";

const FooterList = () => {
  return (
    <div className="overflow-hidden flex sm:flex-wrap sm:w-1/2 ">
      <div className=" flex sm:w-1/2 lg:flex-row gap-24 sm:mx-[6rem]  lg:gap-12">
        {FooterLink2.map((part, index) => {
          return (
            <div key={index}>
              <h2 className="font-bold text-md mb-2 text-richblack-100">
                {part.title}
              </h2>
              <ul className="flex gap-2 flex-col text-richblack-500">
                {part.links.map((list, index) => {
                  return (
                    <Link to={list.link}>
                      <li key={index}>{list.title}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterList;
