import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'


const CourseReviewModal = ({setReviewModal}) => {

  const {user}=useSelector(state=>state.profile)
  const {token}=useSelector(state=>state.auth) 
  const {courseEntireData}=useSelector(state=>state.viewCourse) 
 
  const {register,handleSubmit,setValue,formState:{errors}}=useForm()
  useEffect(()=>{
    setValue("courseExperience","")
    setValue("cousreRating",0)
  },[])

  const ratingChanged=(newRating)=>{
    setValue("courseRating",newRating)
  }
  const onSubmit=async(data)=>{
      await createRating(
        {
          courseId:courseEntireData._id,
          rating:data.courseRating,
          review:data.courseExperience,


        },
        token
      );

      setReviewModal(false)


  }

  return (
    <div>
        <div>
          {/* modal header */}
          <div>
            <p>Add review</p>
            <button onClick={setReviewModal(false)}>
              Close
            </button>
          </div>

          {/* modal body */}
          <div>
              <div>
                <img src={user?.image} alt="this is profile photo" className='aspect-square w-[50px] rounded-full object-cover'/>
                <div>
                  <p>{user?.firstName} {user?.lastName}</p>
                  <p>Posting Publicly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
                <RatingStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor='#ffd700'
                />

                <div>
                    <label htmlFor="courseExperience">
                      Add Your Experience
                    </label>
                    <textarea
                      id='courseExperience'
                      placeholder='Add your experience here'
                      {...register("courseExperience",{required:true})}
                      className='form-style min-h-[130px] w-full'
                    />
                    {
                      errors.courseExperience && (
                        <span>
                          Please add your experience
                        </span>
                      )
                    }
                </div>

                    {/* cancelnand saving button */}
                <div>
                   <button onClick={()=>setReviewModal(false)}>Cancel</button> 
                   <IconBtn text='Save'/> 
                </div>
              </form>
          </div>


        </div>
    </div>
  )
}

export default CourseReviewModal