import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInstructorCourses } from '../../../../server/controllers/Course'
import { IconBase } from 'react-icons/lib'

const MyCourses = () => {

    const {token}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    const [courses,setCourses]=useState([])


    useEffect(()=>{
        const fetchCourses=async ()=>{
            const result=await getInstructorCourses(token);
            if(result){
                setCourses(result);
            }

        }

        fetchCourses()
    },[])


  return (
    <div>

        <div>
            <h1>My Courses</h1>
            <IconBtn
                text="Add Course"
                onClick={()=>navigate("/dashboard/add-course")}
            />

        </div>

        {courses && <CourseTable courses={courses} setCourses={setCourses}  />}
        
    </div>
  )
}

export default MyCourses