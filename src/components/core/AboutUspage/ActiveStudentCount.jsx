import React from 'react'


const statsData=[
    {count:"5K",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"200K",label:"Courses"},
    {count:"50K",label:"Awards"},
]

const ActiveStudentCount = () => {

  return (
    <div className='flex flex-row justify-center itenms-center p-16 bg-richblack-800 text-richblack-5 gap-2'>
        {
            statsData.map((data,index)=>{
                return(
                    <div className='flex flex-col items-center mx-24 ' key={index}>
                        <p className='text-4xl font-bold '>{data.count}</p>
                        <p className='m-4 text-richblack-500'>{data.label}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ActiveStudentCount