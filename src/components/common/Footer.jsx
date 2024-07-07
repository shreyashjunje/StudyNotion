import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import FooterList from '../core/Footer/FooterList'
import { FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";





const Footer = () => {
  return (
    <div className='w-full h-screen bg-richblack-800 flex flex-col justify-evenly items-center gap-15  border-1'>
        {/* //top div */}
        <div className='flex justify-center h-[538px] gap-12 m-6 w-[1200px] '>
            {/* div1 */}
            {/* <div className='flex flex-row  '> */}

                {/* //part 1 */}
                <div className='text-richblack-5 flex flex-row gap-9'>
                    <div className='flex flex-col gap-3  '>
                        <Link to="/">
                            <img src={logo} alt="this is studynotion logo" />
                        </Link>
                        <h2 className='text-md text-richblack-100'>Company</h2>
                        <ul className='text-richblack-500 text-sm flex flex-col gap-2'>
                            <li>About</li>
                            <li>Careers</li>
                            <li>Affiliates</li>
                        </ul>
                        <div className='flex flex-row gap-2'>
                          <FaFacebook />
                          <ImGoogle3 />
                          <FaTwitter />
                          <FaYoutube />
                        </div>
                    </div>

                    {/* <div className='flex flex-col '> */}
                        <div className='flex flex-col gap-9'>
                            <div className='flex flex-col gap-3'>
                                <h2 className='text-md text-richblack-100'>Resources</h2>
                                <ul className='text-richblack-500 flex flex-col gap-2'>
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

                            <div className='flex flex-col gap-3'>
                                <h2 className='text-md text-richblack-100'>Support</h2>
                                <ul className='text-richblack-500 flex flex-col gap-2'>
                                    <li>Help Center</li>
                                </ul>
                            </div>
                        </div>
                    {/* </div> */}

                    <div className='flex flex-col gap-9'>
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-md text-richblack-100'>Plans</h3>
                            <ul className='text-richblack-500 flex flex-col gap-2'>
                                <li>Paid memberships</li>
                                <li>For students</li>
                                <li>Business solutions </li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <h3 className='text-md text-richblack-100'>Community</h3>
                            <ul className='text-richblack-500 flex flex-col gap-2'>
                                <li>Forums </li>
                                <li>Chapters</li>
                                <li>Events</li>
                            </ul>
                        </div>
                    </div>

                </div>
            {/* </div> */}

            {/* di2 */}
            <div className='border-2 border-richblack-700'></div>

            {/* div3 */}
            <div className='flex flex-row'>
                <FooterList/>
            </div>
        </div>

        <div className='w-[1200px] text-richblack-700 border-2 my-3'></div>

        {/* //bottom div  */}
        <div className=' flex flex-row gap-4 mb-2 w-[1200px] justify-between'>
            <div className='flex flex-row text-richblack-500'>
                <ul className='flex flex-row gap-6'>
                    <Link to={"/privacypolicy"}>
                        <li>Privacy Policy</li>
                    </Link>
                    <Link to={"/cookiepolicy"}>
                        <li>Privacy Policy</li>
                    </Link>
                    <Link to={"/terms"}>
                        <li>Terms</li>
                    </Link>
                </ul>
            </div>

            <div className='flex'>
                <p className='text-richblack-500'>Made with ♥ CodeHelp © 2023 Studynotion</p>
            </div>

        </div>
    </div>
  )
}

export default Footer