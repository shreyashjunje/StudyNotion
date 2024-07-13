import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLink from "../../core/Dashboard/SidebatLink"
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from "../../common/ConfirmationModal"

const Sidebar = () => {

    const{user,loading:profileLoading}=useSelector(state=>state.profile)
    const{loading:authLoading}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [ConfirmationModal,setConfirmationModal]=useState(null);

    if(authLoading || profileLoading){
        return(
            <div className='spinner mt-10'>
                Loading...
            </div>
        )
    }



  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-richblack-700
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link)=>{
                        if(link.type && user?.accountType != link.type) return null;
                        return(
                            <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>


            <div className='mx-auto mt-6 mb-6 h-[1px] w-11/12 bg-richblack-600'></div>

            <div className='flex flex-col'>
                <SidebarLink
                    link={{name:"Settings",path:"dashboard/settings"}}
                    iconName="VscSettingsGear"
                />

                <button
                    onClick={()=>{
                        setConfirmationModal({
                            text1:"Are You Sure ?",
                            text2:"You will be logged out of your account",
                            btn1Text:"",
                            btn2Text:"",
                            btn1Handler: ()=> dispatch(logout(navigate)),
                            btn2Handler:  ()=>setConfirmationModal(null),
                        })
                    }

                    }
                >
                    <div className='flex items-center gap-x-2'>
                        //import icon
                        <span>LogOut</span>
                    </div>

                </button>
            </div>
        </div>
        {consfirmationModal && <ConfirmationModal modalData={ConfirmationModal}/>}
    </div>
  )
}

export default Sidebar