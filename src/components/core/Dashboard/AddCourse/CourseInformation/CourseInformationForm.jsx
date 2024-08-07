import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPT';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {setStep,setCourse} from "../../../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../../../utils/constants"
import {toast } from 'react-hot-toast';
import IconBtn from "../../../../common/IconBtn"
import RequirementField from './RequirementField';


const CourseInformationForm = () => {

    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState:{errors},
    }=useForm();

    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth)
    const [course,editCourse]=useSelector((state)=>state.course)
    const [loading,setLoading]=useState(false);
    const [courseCategories,setCourseCategories]=useState([]);

    useEffect(()=>{
      const getCategories=async()=>{
        setLoading(true);
        const courseCategory=await fetchCourseCategories();
        if(courseCategory.length>0){
          setCourseCategories(courseCategory);
        }
        setLoading(false);
      }


      if(editCourse){
        setValue("courseTitle",course.courseName);
        setValue("courseShortDesc",course.courseDescription);
        setValue("coursePrice",course.price);
        setValue("courseTags",course.tag);
        setValue("courseBenefits",course.whatYouWillLearn);
        setValue("courseCategory",course.category);
        setValue("courseRequirements",course.instructions);
        setValue("courseImages",course.thumbnail);  
      }
      getCategories();
    },[])

    const isFormUpdated=async ()=>{
      const currentValues=getValues();
      if(currentValues.courseTitle!==course.courseName || 
         currentValues.courseShortDesc!==course.courseDescription || 
         currentValues.coursePrice!==course.price || 
        //  currentValues.courseTags.toString()!==course.tag.toString() || 
         currentValues.courseBenefits!==course.whatYouWillLearn || 
         currentValues.courseCategory._id!==course.category._id || 
         currentValues.courseRequirements.toString()!==course.instructions.toString() 
        //  currentValues.courseImages!==course.thumbnail|| 
        ){
        return true;
      }
      else{
        return false;
      }

    }

    const onSubmit=async(data)=>{
        if(editCourse){
          if(isFormUpdated()){
            const currentValues=getValues();
          const formData=new FormData();
          formData.append("courseId",course._id)

          if(currentValues.courseTitle !== course.courseName){
            formData.append("courseName",data.courseTitle);
          }
          
          if(currentValues.courseShortDesc !== course.courseDescription){
            formData.append("courseDescription",data.courseShortDesc);
          }
          if(currentValues.coursePrice !== course.Price){
            formData.append("Price",data.coursePrice);
          }
          if(currentValues.courseTags !== course.tag){
            formData.append("tag",data.courseTags);
          }
          if(currentValues.courseBenefits !== course.whatYouWillLearn){
            formData.append("whatYouWillLearn",data.courseBenefits);
          }
          if(currentValues.courseCategory._id !== course.category._id){
            formData.append("category",data.courseCategory);
          }

          if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
            formData.append("instructions",JSON.stringify(data.courseRequirements))
          }
          setLoading(true);
          const result = await editCourseDetails(formData, token);
          setLoading(false)
          if(result){
            setStep(2);
            dispatch(setCourse(result));
          }

          }else{
            toast.error("No changes made to the form");
          }
          return;

        }
        // create a new course
        const formData=new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("WhatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        formData.append("instructions",JSON.stringify(data.courseRequirements));
        formData.append("courseName",data.courseTitle);
        formData.append("status",COURSE_STATUS.DRAFT);

        setLoading(true); 
        const result=await addCourseDetails(formData,token);
        if(result){
          setStep(2);
          dispatch(setCourse(result));
        }
        setLoading(false);
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-48'>

            <div>
              <label htmlFor="courseTitle">Course Title <sup>*</sup></label>
              <input 
              type="text"
              id='courseTitle'
              placeholder='Enter Course Title'
              {...register("courseTitle",{required:true})}
              className=''
               />
               {
                  errors.courseTitle&&(
                    <span>Course Ttile is required**</span>
                  )
               }
            </div>

            <div>
              <label htmlFor="courseShortDesc">Course Short Description<sup>*</sup></label>
              <textarea 
              type="text"
              id='courseShortDesc'
              placeholder='Enter Course Short Description'
              {...register("courseShortDesc",{required:true})}
               />
               {
                errors.courseShortDesc&&(
                  <span>Course short description is required**</span>
                )
               }
            </div>

            <div>
              <label htmlFor="coursePrice">Price<sup>*</sup></label>
              <div>
                <HiOutlineCurrencyRupee />
                <input 
                type="text"
                id='coursePrice'
                placeholder='Enter Price'
                {...register("coursePrice",{required:true,valueAsNumber:true})}
                />
              </div>
               {
                errors.Price&&(
                  <span>Course price is required**</span>
                )
               }
            </div>

            <div>
              <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
              <select 
              id="courseCategory"
              defaultValue=""
              {...register("courseCategory",{required:true})}

              >
                <option value="" disabled>Choose a Category</option>
                {
                  !loading&& courseCategories.map((category,index)=>{
                    return(
                      <option key={index} value={category?._id}>{category?.name}</option>
                    )
                  })
                }
              </select>
              {
                errors.courseCategory && (
                  <span>Course Category is required**</span>
                )
              }
            </div>

            {/* create a cutum category for tags */}
            {/* <ChitInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            /> */}

            {/* create a component  uploadinf and showing the thumbnai */}
            {/* <Upload
             name=
             label=
             register={}
             errors=
             setValue={}

            /> */}

            <div>
              <label htmlFor="courseBenefits">Benefits of the course<sup>*</sup></label>
              <textarea
              id='courseBenefits'
              placeholder='Enter Benefits of the course'
              {...register("courseBenefits",{required:true})}
              />
              {
                errors.courseBenefits&&(
                  <span>Course Benefits are required</span>
                )
              }
            </div>

            <RequirementField
              name="courseRequirements"
              label="Requirements/Instructions"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}

            />

            <div>
              {
                editCourse&&(
                  <button
                  onClick={()=>dispatch(setStep(2))}
                  className=''
                  >
                    Continue Without Saving
                  </button>
                )
              }
              <IconBtn
                text={!editCourse ? "Next" : "Save Changes"}
              />
            </div>


        </form>
    </div>
  )
}

export default CourseInformationForm