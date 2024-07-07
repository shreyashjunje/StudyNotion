import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import FooterList from '../core/Footer/FooterList'

const Footer = () => {
  return (
    <div className='w-full bg-richblack-800'>
        {/* //top div */}
        <div>
            {/* div1 */}
            <div>
                <div>
                    <Link to="/">
                        <img src={logo} alt="this is studynotion logo" />
                    </Link>

                </div>
            </div>

            {/* di2 */}
            <div></div>

            {/* div3 */}
            <div>
                <FooterList/>
            </div>
        </div>

        {/* //bottom div  */}
        <div>
            <div>
                <ul>
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

            <div>
                <p>Made with ♥ CodeHelp © 2023 Studynotion</p>
            </div>

        </div>
    </div>
  )
}

export default Footer