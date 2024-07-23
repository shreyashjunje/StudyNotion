import React from 'react'

const EnrolledCourses = () => {

    const {token}= useSelector((state)=>state.auth);

    const[enrolledCourses,setEnrolledCourses]=useState(null);

    const getEnrolledCourses=async()=>{
        try{
            const response=await getEnrolledCourses(token);
            setEnrolledCourses(response);

        }catch(error){
            console.log("Unable to fetched enrolled courses")
        }
    }

    useEfffect(()=>{
        getEnrolledCourses();
    },[])

  return (
    <div>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>Loading...</div>)
            : !enrolledCourses.length ? (<p>You have not enrolled in any of the courses yet</p>)
            :(
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {/* yaha sare cards show hote hai */}
                    {
                        enrolledCourses.map((course,index)=>{
                            <div>
                                <div>
                                    <img src={course.thumbnail} alt="this is course thumbnail" />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses