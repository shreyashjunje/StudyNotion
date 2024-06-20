const Course=require("../models/Course");
const Tag=require("../models/tags")
const User=require("../models/User")
const {uploadImageToCloudinary}=require("../utils/imageUploader")


// create course
exports.createCourse=async (req,res)=>{
    try{

        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;

        //get thumbnail 
        const thumbnail=req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail ){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }

        //check for instructor
         


    }catch(error){
        
    }
}





//get all course