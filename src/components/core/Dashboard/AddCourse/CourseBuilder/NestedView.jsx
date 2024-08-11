
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";


const NestedView = () => {
    const {course}=useSelector(state=>state.auth);
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch();

    const [addSubSection,setAddSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const {confirmationModal,setConfirmationModal}=useSelector(null);
    

    return(
    <div>
        <div>
            {
                course?.courseContent?.map((section)=>{
                    return(
                        <details key={section._id} open>
                            <summary>
                                <div className='flex items-center'>
                                  <RxDropdownMenu />
                                  <p>{section.sectionName}</p>
                                </div>
                            </summary>
                        </details>
                    )
                })
            }
        </div>
    </div>
  )
}

export default NestedView