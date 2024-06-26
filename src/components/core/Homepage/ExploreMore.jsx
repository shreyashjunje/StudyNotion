import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import Home from '../../../pages/Home';
import HighlightText from './HighlightText';



const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths "
];

export const ExploreMore = () => {
    const[currentTab,setCurrentTab]=useState(tabsName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses.heading)

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses[0].heading);
        setCurrentCard(result[0].courses.heading);
    }

  return (
    <div>

        <div className='4xl font-semibold text-center'>
            Unlock the
            <HighlightText text={"Power of Code"}/>
        </div>
        <p className='text-center text-richblack-300 text-[16px] mt-3 '>
            Learn to build anything you can imagine
        </p>

        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 py-1 px-1'> 
            {
                tabsName.map((tab,index)=>{
                    return(
                        <div
                        className={`text-[16px] flex flex-row items-center gap-2
                            ${currentTab === tab ?
                                 "bg-richblack-900 text-richblack-5 font-medium"
                                 :
                                 "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                                 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `}
                                 key={index}
                                 onClick={()=>setMyCards(tab)}
                            >
                            {tab}
                         </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[150px]'></div>
        {/* course card group */}
        <div className='flex flex-row absolute gap-10 justify-between w-full '>
            {
                courses.map((card,index)=>{
                    return(
                        <CourseCard
                        key={index}
                        cardData={card}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}

                        />
                    )
                })
            }
        </div>
    </div>
  )
}
