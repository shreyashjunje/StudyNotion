import React, { useEffect, useState } from 'react'
import { BsDatabaseFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const VideoDetailsSlider = ({setReviewModal}) => {

    const [activeStatus,setActiveStatus]=useState("")
    const [videoBarActive,setVideoBarActive]=useState("")
    const navigate=useNavigate()
    const {sectionId,subSectionId}=useParams()
    const location=useLocation()
    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    }=useSelector((state)=>state.viewCourse)

    useEffect(()=>{
       const setActiveFlags=()=>{
        if(!courseSectionData.length){
            return;
        }
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
            (data)=>data._id ===subSectionId
        )

        const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId)
       }
       setActiveFlags()
    })



  return (
    <>
        <div>
            {/* for buttons and heading */}
            <div>
                {/* for buttons */}
                <div>
                    <div
                    onClick={()=>{
                        navigate("/dashboard/enrolled-courses")
                    }}
                    >
                        Back
                    </div>

                    <div>
                        <IconBtn
                            text="Add Review"
                            onclick={()=>setReviewModal(true)}
                        />
                    </div>
                </div>
                {/* for heading or titles */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* fornsections and subsectins */}
            <div>
                {
                    courseSectionData.map((course,index)=>{
                        <div onClick={()=>setActiveStatus(course?._id)} key={index}>
                            {/* section */}
                            <div>
                                <div>
                                    {course?.sectionName}
                                </div>
                                {/* hw -add arrow icon here handle rotate logic */}
                            </div>

                            {/* subsection */}
                            <div>
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic,index)=>{
                                                    <div
                                                    className={`flex gap-4 p-5 ${
                                                        videoBarActive === topic._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white"
                                                    }`}
                                                    key={index}
                                                    onClick={()=>{
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}}`)
                                                        setVideoBarActive(topic?._id)
                                                    }}
                                                    >
                                                        <input
                                                        type='checkbox'
                                                        checked={completedLectures.includes(topic?._id)}
                                                        />
                                                        <span>{topic.title}</span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        
    </>
  )
}

export default VideoDetailsSlider