const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60, // The document will be automatically deleted after 5 minutes of its creation time
    }

});

//  a function to send emails
async function sendVerificationEmail(email, otp){
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try{
        const mailResponse=await mailSender(email,"Verification email from StudyNotion",otp);
        console.log("Email send successfully : ",mailResponse);
    }catch(error){
        console.log("error occurred while sending an emails : ",error);
        throw eror;
    }
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports=mongoose.model("OTP",OTPSchema)