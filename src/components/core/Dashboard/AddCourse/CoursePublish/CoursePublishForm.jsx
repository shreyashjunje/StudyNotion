import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
const CoursePublishForm = () => {



  const {register,handleSubmit,setValue,getValues}=useForm()
  const {course}=useSelector(state=>state.course)
  const {token}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public",true);
    }
  },[]);

  const goBack=()=>{
     dispatch(setStep(2))
  }

  const gotoCourses=()=>{
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses");
  }

  const handleCoursePublish= async ()=>{

    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true || 
    (course.status === COURSE_STATUS.DRAFT && getValues("public")==false)
    ){
      //no updation inform 
      // so no need to api call
      gotoCourses();
      return
    }

    // if form updated
    const formData=new FormData()
    formData.append("courseId",course._id)
    const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status",courseStatus);

    setLoading(true);

    const result= await editCourseDetails(formData,token);
    if(result){
      gotoCourses()
    }
    setLoading(false);

  }

  const onSubmit=()=>{
      handleCoursePublish()
  }


  return (
    <div className='text-white'>
      <p>Public Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        
        <label htmlFor="public">
        <input 
          type="checkbox"
          id='public'
          {...register("public")}
          className=''
           />
          Make this course as Public</label>
         
        </div>

        <div>
          <button disabled={loading} type='button' onClick={goBack} className='flex items-center'>Back</button>
          <IconBtn disabled={loading} text="Save Changes"/>
        </div>
      </form>
      
    </div>
  )
}

export default CoursePublishForm