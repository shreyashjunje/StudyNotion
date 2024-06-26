import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../Homepage/Button";
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import play_with_lessons from "../../../assets/Images/Plan_your_lessons.png"

export const LearningLanguageSection = () => {
  return (
    <div>

        <div className='flex flex-col gap-5 items-center mb-32'>

            <div className='text-4xl font-semibold  text-center'>
                    Your swiss knife for 
                    <HighlightText text= {"learning any language "}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
                progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>

                <img src={know_your_progress} alt="knowyourprogrssIMG" className='object-contain -mr-32'/>
                <img src={compare_with_others} alt="comparewithothersIMG" className='object-contain ' />
                <img src={play_with_lessons} alt="playwithlessonsIMG" className='object-contain -ml-36'/>

            </div>

            <div> 
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                       Learn More
                    </div>
                </CTAButton>
            </div>


        </div>

    </div>
  )
}
