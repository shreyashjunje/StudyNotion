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

  }
  const isLastVideo=()=>{

  }
  
  const goToNext=()=>{

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