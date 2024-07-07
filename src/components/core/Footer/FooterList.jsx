import React from 'react'
import {FooterLink2} from "../../../data/footer-links"
import { Link } from 'react-router-dom'

const FooterList = () => {
  return (
    <div className='text-richblack-5'>
        {
            FooterLink2.map((part,index)=>{
                return(
                    <div key={index}>
                        <h2>{part.title}</h2>
                        <ul>
                           {
                             part.links.map((list,index)=>{
                                return(
                                    <Link to={list.link}>
                                        <li key={index}>{list.title}</li>
                                    </Link>
                                )
                            })
                           }
                        </ul>
                    </div>
                )
            })
        }
    </div>
  )
}

export default FooterList