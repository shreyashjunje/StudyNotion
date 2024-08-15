import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from "../../Dashboard/AddCourse/RenderSteps"
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'

export default function EditCourse(){

    const dispatch=useDispatch()
    const {courseId}=useParams()
    const {course}=useSelector(state=>state.course)
    const {token}=useSelector(state=>state.auth)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        const populateCourseDetails=async ()=>{
            setLoading(true)
            const result=await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }

        populateCourseDetails() 
    },[courseId,token,dispatch])
    // useEffect(() => {
    //     ;(async () => {
    //       setLoading(true)
    //       const result = await getFullDetailsOfCourse(courseId, token)
    //       if (result?.courseDetails) {
    //         dispatch(setEditCourse(true))
    //         dispatch(setCourse(result?.courseDetails))
    //       }
    //       setLoading(false)
    //     })()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [])
    if(loading){
        return (
            <div>
                Loding...
            </div>
        )
    }



  return (
    <div className='text-white'>
        <h1>Edit Course</h1>
        <div>
            {
                course ? (<RenderSteps/>) : (<p>Course not found</p>)
            }
        </div>
    </div>
  )
}

