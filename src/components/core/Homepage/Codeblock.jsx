import React from 'react'
import CTAButton from "../Homepage/Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';




const Codeblock = ({
    position,heading,subHeading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-betwenn gap-10`}>

        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-2 '>

                <div className=''>
                    {heading}
                    <div className='text-richblack-300 font-bold'>
                        {subHeading}
                    </div>
                </div>
                

        
           

            <div className='flex gap-7 mt-20'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn2.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
            </div>
        </div>

        {/* section 2 */}
        <div className={`flex flex-row h-fit text-[10px] w-[100%] py-4 lg:w-[500px]`}>
            {/* {HW : create backgrund code gradient}/  */}
            <div className='text-[14px] text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
6               <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[100%] text-[14px] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation  
                sequence={[codeblock,2000,""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",
                    }
                }
                />
            </div>
        </div>
 
    </div>
  )
}

export default Codeblock
