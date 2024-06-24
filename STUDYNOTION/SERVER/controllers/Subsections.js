const Section=require("../models/Section")
const SubSection=require("../models/SubSection")


//create subsection
exports.createSubSection=async (req,res)=>{
    try{
      //fetch data from body
      const {sectionsId,title,timeDuration,description}=req.body;
      //extract file/video 
      const video=req.files.videoFile;
      //validation
      if(!sectionId || !title || !timeDuration || !description || !video){
        return res.status(400).json({
            success:false,
            message:"all fields are required",
        });

      }
      //upload video to cloudinary
      const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
      //create a sub section
      const SubSectionDetails = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
      })
      //update section with this sub section objectId
      const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                            {
                                                $push:{
                                                    subSection:uploadDetails._id,
                                                },
                                                
                                            },
                                            {new:true},
      ).populate("subSection");

    //   HW:LOG UPDATED SECTION HERE AFTER ADDING POPULATE PTOPERTIES
      //return response
      return res.status(200).json({
        success:true,
        message:"sub section created successfully",
        updatedSection,
      })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"unable to create Subsection",
            updatedSection,
            
        })

    }
}


//HW SUBSECTION AND DELETE SUBSECTION