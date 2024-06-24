const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
        courseName: {
            type: String,
            trim:true
        },

        courseDescription: {
            type:String,
            trim:true

        
        },
        instructor: 
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User", //cehck this is it working or not
            required:true,

            },
        
        whatYouWillLearn:{
            type:String,
            trim:true  
        }, 
        courseContent: [
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Section",
            
            },
        ],
        ratingAndReviews: [
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
            },
        ],

        price: {
            type: Number ,
        },
        thumbnail: {
            type:String,
        
        },

        tag: 
            {
            // type:mongoose.Schema.Types.ObjectId,
            // ref: "Tag",
            type: [String],
		    required: true,
            },  

        category: {
                type: mongoose.Schema.Types.ObjectId,
                // required: true,
                ref: "Category",
            },
    
        studentEnrolled: [
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
            }
        ],
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
});

module.exports = mongoose.model("Course", courseSchema);
