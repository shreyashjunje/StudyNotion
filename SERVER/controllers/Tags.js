const Tag=require("../models/tags");


exports.createTag=async (req,res) => {
    try{
                //fetch all the data 
            const {name,description}=req.body;

            //validation
            if(!name || !description){
                return res.status(400).json({
                    success:false,
                    message:"ALL fields are required"
                });
            }

            // create tag entry in database 
            
            const tagDetails = await Tag.create({
                name:name,
                description:description,
            });
            console.log(tagDetails);

            //return response
            return res.status(200).jason(
                {
                    success:true,
                    message:"tag created successfully"
                }
            )

    }   catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });

    };


};

//get all tags handler function 
exports.showAlltags=async (req,res) => {
    try{
       
        
        //get all tags from db
        const alltags=await Tag.find({},{name:true,description:true});
        
        return res.status(200).json({
            success:true,
            message:"all tag return successfully",
            alltags,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}