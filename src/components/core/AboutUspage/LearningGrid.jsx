import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import CTAButton from '../Homepage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];



const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 text-richblack-5 py-20 px-32'>
    {
        LearningGridArray.map((card,index)=>{
            return(
                <div
                key={index}
                className={
                    `${index===0 && "lg:col-span-2"}
                    ${
                        card.order%2===1 ? "bg-richblack-700":"bg-richblack-800"
                    }
                    ${
                        card.order==3 && "lg:col-start-2"
                    }
                    ${
                        card.order <0 && "bg-transparent"
                    }
                    `}
                >

                {
                    card.order < 0 
                    ? (
                        <div className=' w-full max-w-[559px] h-auto md:h-[268px] ml-16'>
                          <div className=' flex flex-col justify-end gap-6 px-12 py-0  gap-3'>
                            <div className=" text-4xl font-semibold ">
                                    {card.heading}
                                    <HighlightText  text={card.highlightText}/>
                                </div>
                                <p className='text-richblack-300' >
                                    {card.description}
                                </p>
                                <div className='flex items-start mt-4'>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                      {card.BtnText}
                                    </CTAButton>
                                </div>
                          </div>
                        </div>
                    )
                    : (
                        <div className='flex flex-col items-center p-8 gap-8 w-full max-w-[294.5px] h-[294px]   '>
                            <h2 className='font-semibold'>{card.heading}</h2>
                            <p  className='text-richblack-300 ' >{card.description}</p>
                        </div>
                    )
                }

                </div>
            )
        })
    }
    </div>
  )
}

export default LearningGrid