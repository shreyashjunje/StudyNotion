import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const VideoDetails = () => {

  const {courseId,sectionId,subSectionId}=useParams()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {token}=useSelector(state=>state.auth)
  const {cosurseSectionData,courseEntireData,completedLectures}=useSelector(state=>state.viewCourse)
  const location=useLocation()
  const [videoData,setVideoData]=useState([])
  const [vieoEnded,setVideoEnded]=useState(false)
  const [loading ,setLoading]=useState(false)

  useEffect(()=>{
    const setVideoSpecificDetails=async ()=>{
      if(!cosurseSectionData.length){
        return;
      }

      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }else{ 
        // lets assume all 3 fields are present
        const filteredData=courseSectionData.filter(
          (course)=>cousre._id === sectionId
        )

        const filteredVideoData=filteredData?.[0].subSection.filter(
          (data)=>data._id === subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false)
      }
    }
  },[courseSectionData,courseEntireData,loaction.pathname])


  const isFirstVideo=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (data)=>data._id === sectionId
    )

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )

    if(currentSubSectionIndex === 0 && currentSubSectionIndex===0){
      return true;
    }else{
      return false
    }



  }
  const isLastVideo=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (data)=>data._id === sectionId
    )

    const noOfSubSections=courseSectionData[curretnSectionIndex].subSection.length;

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )

    if(currentSectionIndex===courseSectionData.length-1 && 
      currentSubSectionIndex === noOfSubSections-1
    ){
      return true
    }else{
      return false
    }

  }
  
  const goToNext=()=>{

    const currentSectionIndex=courseSectionData.findIndex(
      (data)=>data._id === sectionId
    )

    const noOfSubSections=courseSectionData[curretnSectionIndex].subSection.length;

    const currentSubSectionIndex=courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data)=>data._id === subSectionId
    )

    if(currentSubSectionIndex!==noOfSubSections-1){
        // same section ki next video pe aa jao
        const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id

        // is video pr jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }else{
      // different setion ki first video
      const nextSectionId=courseSectionData[currentSectionIndex + 1]
      const nextSubSectionId=courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)

    }

  }

  const goToPrevVideo=()=>{
    

  }

  const handleLectureCompletion=()=>{

  }



  return (
    <div>VideoDetails</div>
  )
}

export default VideoDetails