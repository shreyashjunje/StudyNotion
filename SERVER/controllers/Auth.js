const bcrypt=require('bcrypt');
require('dotenv').config();
const jwt=require('jsonwebtoken');
//send otp

// 1.Imports necessary modules: User model, otp-generator, and OTP model.
// 2.Defines the sendOTP function: Handles the process of sending an OTP.
// 3.Fetches email from request body.
// 4.Checks if the email is already registered: If yes, returns an error response.
// 5.Generates a 6-digit OTP: Ensures it consists of numbers only.
// 6.Checks for OTP uniqueness: Regenerates OTP if a duplicate is found.
// 7.Creates OTP payload and stores it in the database.
// 8.Returns a success response with the OTP: For demonstration purposes (usually, you wouldn't send the OTP in the response).
// 9.Handles any errors: Logs the error and returns a 500 error response.

const User=require("../models/user");
const otpGenerator=require('otp-generator');
const OTP=require("../models/otp");

exports.sendOTP=async (req,res)=>{
    try{

        //fetch the required data
        const {email}=req.body;

        //check if this email is already present or not
        const checkUserPresent=await User.findOne({email});

        //if user already exist then return a response
        if(checkUserPresent){
                return res.status(401).json({
                    success:false,
                    message:"user already registred",
                });
        }

        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        console.log("generated otp : ",otp);

        //check unique otp or not
        let result=await OTP.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })

            result=await OTP.findOne({otp:otp});
        }

        // const otpPayload: This creates an object containing the email and the unique OTP.
        const otpPayload={email,otp};

        //create entry for otp
        // const otpBody: This creates a new document in the OTP collection with the otpPayload (email and OTP).
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);


        //return resonse successfully
        res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
         success:false,
         message:error,
        })
    }
}

//sign UP

exports.signUp = async (req,res)=>{
    try{

        //fetch the data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        }=req.body;

        //validate the data 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        //2 password match karlo if the y are same or not 
        if(confirmPassword != password){
            return res.status(400).json({
                success:false,
                message:"password and confirm password values does not match, please try again",
            })
        }

        //check user already exist or not
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                sucess:false,
                message:"user is already registred"
            })
        }

        //find most recent otp stored for user
        const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validate otp
        if(recentOtp.length==0){
            //otp mot found
            return res.status(400).json({
                success:false,
                message:"otp not found",
            })
        }else if(otp!=recentOtp.otp){
            //invalid otp
            return res.status(400).json({
                success:false,
                message:"invalid otp"
            })
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,9);


        //entry in db
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/.x/initials/svg?seed=${firstName} ${lastName}`,
            
            
        })

        //send respojse
        return res.status(200).json({
            success:true,
            message:"user is registred successfully",
            user,
        })


    }catch(error){

        console.log(error)
        return res.status(500).json({
            success:false,
            message:"user can not registred, please try again"
        })

    }
}

//login

exports.login=async (req,res)=>{
    try{
        //fetch the data
        const {email,password}=req.body;

        //validate the data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all fields are required please enter the data",

            });
        }

        //user check if exist or npt
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registred,please sign up first",
            });
        }

        //generate jwt after password matching 
         if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.role,
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiredIn:"2h",
                 
            });
            user.token=token;
            user.password=undefined;

            // create cookie and send response
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully"

            })
         }  
         else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect",
            });
         }



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure, please try again",
        });

    }
}

//change password 

//get data from req body
//get oldpasswprd,newpassword,confirmnewpassword
//validation
//update in 