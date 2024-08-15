import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Thead,Th,Td,Tr} from "react-super-responsive-table"
import { COURSE_STATUS } from '../../../../utils/constants'
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { useState } from 'react';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';



    const CourseTable = ({courses,setCourses}) => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {token}=useSelector(state=>state.auth)
    const [loading,setLoading]=useState(false)
    const [confirmationModal,setConfirmationModal]=useState(null)

    const handleCourseDelete=async (courseId)=>{
        setLoading(true)

        await deleteCourse({courseId:courseId},token)
        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }
        setConfirmationModal(null)
        setLoading(false)
    }

  return (
    <div className='text-white'>

        <Table> 
            <Thead>
                <Tr>
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price 
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length===0 ? (
                        <Tr>
                            <Td>
                                No courses found
                            </Td>
                        </Tr>
                    )
                    :(
                        courses?.map((course)=>{
                           return(
                            <Tr key={course._id}>
                            <Td className="flex">
                              <img src={course?.thumbnail} alt="" 
                              className='h-[150px] w-[220px] rounded-lg object-cover'/>

                              <div className='flex flex-col'>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                                <p>Created:</p>
                                {
                                    course.status=== COURSE_STATUS.DRAFT ? (
                                        <p>DRAFTED</p>
                                    ):(<p>PUBLISHED</p>)
                                }
                              </div>
                            </Td>  

                            <Td>
                                2hr 3min
                            </Td>   

                            <Td>
                                ${course.price}
                            </Td>

                            <Td>
                                <button disabled={loading} onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}><MdOutlineEdit /> </button>
                                <button disabled={loading}
                                onClick={()=>{
                                    setConfirmationModal({
                                        text1:"Do ypu want to delete this course ?",
                                        text2:"All the data related to this course will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:!loading ? ()=>handleCourseDelete(course._id):()=>{},
                                        btn2Handler:!loading ? ()=>setConfirmationModal(null):()=>{}
                                    })
                                }}
                                ><RiDeleteBin6Line /> </button>
                            </Td>

                        </Tr>
                           )
                        })
                    )
                }
            </Tbody>
        </Table>


        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        
    </div>
  )
}

export default CourseTable