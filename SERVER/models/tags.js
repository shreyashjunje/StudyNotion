const mongoose=require('mongoose')

const tagsSchema= new mongoose.Schema(
    {
        tagName:{
            type:String,
            required:true,
        },
        tagDescription:{
            type:String,
            trim:true,
        },
        tagCourse:{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    }
)

module.exports=mongoose.model("Tag",tagsSchema)