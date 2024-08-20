import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { fetchCourseDetails, getAllCourses } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import Error from "../pages/Error"

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {loading}=useSelector((state)=>state.profile);
    const {paymentLoading}=useSelector((state)=>state.course)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();
    
    const [courseData,setCourseData]=useState(null)
    const [confirmationModal,setConfirmationModal]=useState(null)
    const [isActive,setIsActive]=useState(Array[0])

    const handleActive=(id)=>{
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filer((e)=>e!=id)
        )
    }


    useEffect(()=>{
        const getFullCourseDetails=async ()=>{
            try{
                const result=await fetchCourseDetails(courseId)
                setCourseData(result)


            }
            catch(error){
                console.log("could not fetch course details")
            }
        }
        getFullCourseDetails()
    },[courseId])

    const [avgRating,setAvgRating]=useState(0)
    useEffect(()=>{
        const count=GetAvgRating(courseData?.data?.CourseDetails.ratingAndReviews)
        setAvgRating(count)
    },[courseData])

    const [totalNoOfLectures,setTotalNoOfLectures]=useState(0)
    useEffect(()=>{
        let lectures=0;
        courseData?.data?.CourseDetails?.courseContent?.forEach((sec)=>{
            lectures+=sec.subSection.length||0
        })
        setTotalNoOfLectures(lectures)
    },[courseData])

    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }

    if(!loading || !courseData){
        return (
            <div>
                Loding...
            </div>
        )
    }

    if(!courseData.success){
        return(
            <div>
                <Error/>
            </div>
        )
    }

    const {_id:course_id,courseName,courseDescription,thumbnail,price,whatYouWillLearn,courseContent,
        ratingAndReviews,instructor,studentEnrolled,createdAt,
    }=courseData?.data?.CourseDetails


  return (
    <div className='flex items-center text-white'>

        <div className='relative flex justify-start'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div>
                <span>{avgRating}</span>
                <RatingStars Review_Count={avgRating} Star_Size={24}/>
                <span>{`(${ratingAndReviews.length} reviews )`}</span>
                <span>{`(${studentEnrolled.legnth} stuents enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div>
                <p>
                    CreatedAt {formatDate(createdAt)}
                </p>

                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailsCard 
                    course={courseData?.data?.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>
        </div>

        <div>
            <p>What you will learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content :</p>
            </div>
           <div>
                
                    <span>{courseContent.length} Section(s)</span>
              
                    <span>{totalNoOfLectures} lectures</span> 

                    <span>{courseData.data?.totalDuration} total length</span>       
           </div>

           <div>
                <button onClick={()=>setIsActive([])}>Collapse all sections</button>
           </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
