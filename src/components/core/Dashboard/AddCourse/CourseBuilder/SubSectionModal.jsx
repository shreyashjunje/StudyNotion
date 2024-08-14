import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourseSectionData } from '../../../../../slices/viewCourseSlice';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn';
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast';
import Upload from "../../../../core/Dashboard/AddCourse/Upload"
import { setCourse } from '../../../../../slices/courseSlice';


const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {

    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const dispatch=useDispatch();
    const {course}=useSelector(state=>state.course)
    const {token}=useSelector(state=>state.auth)
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[]);

    const isFormUpdated=()=>{
        const currentValues=getValues()

        if(currentValues.lectureTitle!==modalData.title || 
            currentValues.lectureDesc!==modalData.description ||
            currentValues.lectureVideo!==modalData.videoUrl
        ){
            return true;
        }else{
            return false;
        }
    }

    const handleEditSubSection=async()=>{
        const currentValues=getValues()
        const formData=new FormData()
        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);
        
        if(currentValues.lectureTitle!==modalData.title){
            formData.append("title",currentValues.lectureTitle)
        }
        if(currentValues.lectureVideo!==modalData.videoUrl){
            formData.append("video",currentValues.lectureVideo)
        }
        if(currentValues.lectureDesc!==modalData.description){
            formData.append("description",currentValues.lectureDesc)
        }

        setLoading(true);

        const result =await updateSubSection(formData,token)
 
        if(result){
            // const updatedCourseContent=course.courseContent.map((section)=>
            // section._id===modalData.sectionId ? result:section);

            const updatedCourseContent = course.courseContent.map((section) => {
                if (section._id === modalData.sectionId) {
                    const updatedSubSections = section.subSection.map((sub) => {
                        if (sub._id === modalData._id) {
                            // Merge the existing subsection data with the updated result
                            return { ...sub, ...result };
                        }
                        return sub;
                    });
    
                    return { ...section, subSection: updatedSubSections };
                }
                return section;
            });
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null);
        setLoading(false);
        
    }

    const onSubmit=async (data)=>{
        if(view){
            return;
        }

        if(edit){
            if(!isFormUpdated()){
                toast.error("No changes made to the form")
            }else{
                handleEditSubSection();
            }
            
            return;
        }

        const formData=new FormData()
        formData.append("sectionId",modalData)
        formData.append("title",data.lectureTitle)
        formData.append("description",data.lectureDesc)
        formData.append("video",data.lectureVideo)

        setLoading(true)

        const result =await createSubSection(formData,token);

        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
            section._id === modalData ? result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null);
        setLoading(false);
    


    }
    


  return (
    <div>

        <div>

            <div>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "editing"} Lecture</p>
                <button onClick={() => { if (!loading) setModalData(null) }}>
                    <RxCross2 />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editDat={edit? modalData.videoUrl:null}
                />

                <div>
                    <label htmlFor="lectureTitle">Lecture Title</label>
                    <input 
                    type="text"
                    id='lectureTitle'
                    placeholder='Enter lecture title'
                    {...register("lectureTitle",{required:true})}
                    className='w-full'
                     />
                     {
                        errors.lectureTitle && (
                            <span>Lecture title is required</span>
                        )
                     }
                </div>

                <div>
                    <label htmlFor="lectureDesc">Lecture Description</label>
                    <input 
                    type="text"
                    id='lectureDesc'
                    placeholder='Enter lecture description'
                    {...register("lectureDesc",{required:true})}
                    className='w-full min-h-[130px]'
                     />
                     {
                        errors.lectureDesc && (
                            <span>Lecture description is required</span>
                        )
                     }
                </div>


                {
                    !view && (
                        <div>
                            <IconBtn
                                text={loading ? "Loading..." : edit ? "Save Chnages" : "Save"}
                            />
                        </div>
                    )
                }
            </form>

        </div>

    </div>  
  )
}

export default SubSectionModal