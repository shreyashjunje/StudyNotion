import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';

const Course_Card = ({course,height}) => {

    const [avgReviewCount,setAvgReviewCount]=useState(0);

    useEffect(()=>{
      const count=GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count)
    },[course])

  return (
    <div>
      <Link to={`/course/${course._id}`}>
          <div>

            <div>
              <img src={course?.thumbnail} alt="this is course thumbnail"
              className={`${height} w-full rounded-xl object-cover`}/>
            </div>
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
              <div>
                  <span>{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount}/>
                  <span>{course?.ratingAndReviews.length} Ratings</span>
              </div>
              <p>{course?.price}</p>
            </div>
          </div>
      </Link>
    </div>
  )
}

export default Course_Card