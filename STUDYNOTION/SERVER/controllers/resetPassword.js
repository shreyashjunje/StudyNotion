const User=require("../models/User");
const mailSeder=require("../utils/mailSender");
const bcrypt=require('bcrypt')


//resetPassword token

exports.resetPasswordToken= async (req,res)=>{

    try{
            // get email from requestbody
            const email=req.body.email;
            // check user for this email ,email validation
            const user=await User.findOne({email:email});
            if(!user){
                return res.json({
                    success:false,
                    message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
                });
            }

            // generate token
            // const token=crypto.randomUUID();
            const token = crypto.randomBytes(20).toString("hex");

            // update user by adding token and expiry time
            const updateDetails=await user.findOneAnsUpdate(
                {
                    email:email,
                },
                {
                    token:token,
                    resetPasswordExpires:Date.now() + 3600000,

                },{
                    new:true,
                }
            );
            console.log("DETAILS", updatedDetails);
            // create url 
            const url=`https://localhost:3000/update-password/${token}`

            // send email containing url
            await mailSeder(email,
                "password reset link",
                `Your Link for email verification is ${url}. Please click this url to reset your password.`
            );
            // return restponse

            return res.status.json({
                success:true,
                message:"email sent successfully, please check email and change password  ",
            });

            


    }
    catch(eror){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while sending reset password mail"
        })

    }
   


}

//resetPASSWORD

exports.resetPassword=async (req,res)=>{
  try{
      //data fetch
      const {password,confirmPassword,token}=req.body;

      //validation
      if(password!==confirmPassword){
          return res.json({
              success:false,
              message:"password does not matching"
          })
      }
  
      //get user details from db using token
      const userDetail=await User.findOne({token:token});
      // if no entry - invalid token
      if(!userDetail){
          return res.json({
              success:false,
              message:'token is invalid',
          });
      }
      // token time check
      if(userDetails.resetPasswordExpires < Date.now()){
          return res.json({
              success:false,
              message:'token expired , please regenrate',
          });
      }
      // hash Pass
      const hashedPassword= await bcrypt.hash(password,10)
      // pass update
      await User.findOneAndUpdate(
          {token:token},
          {password:hashedPassword},
          {new:true},
      )
      // retrun res
      return res.status(200).json({
          success:true,
          message:'password reset successfully'
      })

  }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"something went wrong while sending reset password mail"
    })

  }
}