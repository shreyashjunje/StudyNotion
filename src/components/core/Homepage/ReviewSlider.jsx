import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { studentReviews } from "../../../data/review-data";
import ReviewBox from "./ReviewBox";

const ReviewSlider = () => {
  const [reviews,setReviews]=useState(0)

  function leftClickHandler(){
    if(reviews-4 >=0){
        setReviews(reviews-4)
    }
  }

  function rightClickHandler(){
   if(reviews + 4 < studentReviews.length){
        setReviews(reviews+4);
   }

  }

  return (
    <div className="flex flex-row gap-4 my-10 justify-center items-center">
      <button onClick={leftClickHandler}>
        <FaArrowLeft className="text-richblack-5"/>
      </button>

      <div className="flex gap-4">
       {
        studentReviews.slice(reviews,reviews+4).map((review,index)=>{
            return <ReviewBox review={review} key={index}/>
        })
       }
      </div>

      <button onClick={rightClickHandler}>
        <FaArrowRight className="text-richblack-5"/>
      </button>
    </div>
  );
};

export default ReviewSlider;
