const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    //The dotenv package loads environment variables from a .env file into process.env
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("DB connected successfully")
    })
    .catch((error)=>{
        console.log("Db connection failed");
        console.error(error);

        //process.exit(1): Exits the Node.js process with an error code of 1
        // . This is a convention to indicate that the process ended due to an error.
        process.exit(1);    
    })
}
