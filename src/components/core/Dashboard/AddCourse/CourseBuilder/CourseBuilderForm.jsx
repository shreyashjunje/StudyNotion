import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import IconBtn from '../../../../common/IconBtn';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { MdNavigateNext } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import NestedView from './NestedView';
import { setCourse,editCourse ,setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection,updateSection } from '../../../../../services/operations/courseDetailsAPI';


// import { isButtonElement } from 'react-router-dom/dist/dom';


const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState:{errors} }=useForm();
  const [editSectionName,setEditSectionName]=useState(null);
  const {course,editCourse}=useSelector((state)=>state.course)
  
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");

  }

  const goback=()=>{
    dispatch(setStep(1))
    dispatch(editCourse(true));
  }

  const gotoNext=()=>{
    if(course?.courseContent?.length===0){
      toast.error("please add atleast one section");
      return;
    }

    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("please add atleast one lection in each section");
      return;
    }

    // everything is ok
    dispatch(setStep(3));
    
  }

  const courseSectionSubmit=async (data)=>{
    setLoading(true);
    let result;

    if(editSectionName){
      // we are editing section name
      result =await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,

        },token)
    }
    else{
      result=await createSection(
        {
          sectionName:data.sectionName,
          courseId:course._id,


        },token)
    }

    // value update
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }
   
    // loading false
    setLoading(false)
  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);

  }

  return (
    <div className='text-white'>
      <h1>Course Builder</h1>
      <form onSubmit={handleSubmit(courseSectionSubmit)}>
        <div>
          <label htmlFor="sectionName">Section Name<sup>*</sup></label>
          <input 
          type="text"
          placeholder='Enter Section Name'
          id='sectionName'
          {...register("sectionName",{required:true})}
          className=''
          />
          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>
        <div>
          <IconBtn
          type="submit"
          text={
            editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          customClasses={"text-white"}

          >
            <IoMdAddCircleOutline className='text-xl'/>


          </IconBtn>

          {
            editSectionName && (<button type='button' onClick={cancelEdit} className=''>Cancel edit</button>)
          }
        </div> 
      </form>

      {course?.courseContent?.length > 0 &&(
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}

      <div>
        <button onClick={goback}><MdArrowBackIosNew /> Back</button>
        <IconBtn text="Next" onclick={gotoNext}><MdNavigateNext /></IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm