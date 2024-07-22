import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

import Home from "../../pages/Home";
const arr = [
  {
    title: "python",
    link: "/catalog/python",
  },
  {
    title: "web-dev",
    link: "/catalog/web-devlopment",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublinks result", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("do not fetch categories list");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname);
    };

  return (
    <div className="flex h-14 m-2  items-center justify-center border-b-[1pxborder-b-richblack-700] border-b-2 border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <GiHamburgerMenu className="visible md:hidden lg:hidden text-white w-6 h-6" /> */}

          {/* LOGO */}
          <Link to="/">
                    <img src={logo} width={160} height={42} alt="study notion logo" />
          </Link>
        </div>
        

        {/* //navlinks */}
        <nav className="hidden md:block lg:flex">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex flex-row gap-2  group ">
                    <p>{link.title}</p>
                    <RiArrowDropDownLine />

                    <div
                      className=" absolute  left-[-80%] 
                                        traslate-x-[-50%]
                                        traslate-y-[60%]
                                         top-[100%]
                                        flex felx-col rounded-md bg-richblack-5 p-4 text-richblue-900
                                        opacity-0 transition-all duration-200 group-hover:visible
                                        group-hover:opacity-100 lg:w-[200px]"
                    >
                      <div
                        className="absolute left-[-10%] top-0 
                                            translate-x-[80%] translate-y-[-50%] h-6 w-6 ratate-45 rounded bg-richblack-5"
                      ></div>
                      {arr?.length ? (
                        arr.map((a, index) => (
                          <Link to={`${a.link}`} key={index}>
                            <p>{a.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div>No data</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login section  */}
        <div className="visible flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor " && (
            <Link to="/dashboard/cart" className="relative">
              <CiShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md"
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md"
              >
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
          {/* /??/here instead of home =>profiledropdown component */}
        </div>

       
        
      </div>
    </div>
  );
};

export default Navbar;
