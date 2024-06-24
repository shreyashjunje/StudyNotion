const Section=require("../models/Section");
const Course=require("../models/Course");


exports.createSection=async (req,res) =>{
    try{
        //data fetch
        const {sectionName,courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"missing properties",
                }
            )
        }
        //create section
        const newSection=await Section.create({sectionName});

        //update section in to the course objectID
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
                                                         $push:{
                                                            courseContent:newSection._id,
                                                           }
                                                        },
                                                        {new:true},
                                                    ).populate({
                                                        path: "courseContent",
                                                        populate: {
                                                            path: "subSection",
                                                        },
                                                    })
                                                    .exec();

        //how do i used so that i print section and subsection both at a time
        ///HW:use populate to replace section/subsection both in the updatedcourse detail

        //return response
        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updatedCourseDetails,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"unable to create section",
            
        })
    }
}

exports.updateSection=async (req,res)=>{
    try{
        //fetch data
        const {sectionName,sectionId}=req.body;

        //validate data
        if(!sectionName || !sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"missing properties",
                }
            )
        }

       
        
        //update in the section
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        //return res
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            section,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"unable to update section , please try again",
            
        });
    }
}


exports.deleteSection = async (req,res)=>{
    try{
        //fetch data
        const {sectionId}=req.params;

        //do we need to delete section from course
        
        //validate data
        if(!sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:"missing properties",
                }
            )
        }

        await Section.findByIdAndDelete(sectionId);

        //return res
        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
        
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"unable to delete section , please try again",
            
        });
    }
}



