const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		const id = req.user.id;
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.userDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await user.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//updateDisplayPicture


























// const Profile=require("../models/Profile");
// const User=require("../models/User");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");


// exports.updateProfile=async (req,res)=>{
//     try{ 
        
//         //get data
//         const {dateOfBirth="",about="",contactNumber,gender}=req.body;
//         //get userId
//         const id=req.user.id;
//         //validation
//         if(!contactNumber || !gender || !id){
//             return res.status(400).json({
//                 success:false,
//                 message:"all fields are required",
//             })
//         }
//         //find profile
//         const userDetails=await User.findById(id);
//         const profileId=userDetails.additionalDetails;
//         const profileDetails=await Profile.findById(profileId);

//         //update profile
//         profileDetails.dateOfBirth=dateOfBirth,
//         profileDetails.about=about,
//         profileDetails.contactNumber=contactNumber,
//         profileDetails.gender=gender,
//         await profileDetails.save();
        
//         //return response
//         return res.status(200).json({
//             success:false,
//             message:"profile updated successfully",
//             profileDetails,
//         })

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:"profile can not update please try again",
            
//         })

//     }
// }

// //delete account
// exports.deleteAcoount=async (req,res)=>{
//       try{
//         //get id
//         const id=req.user.id;
//         //validation
//         const userDetails=await User.findById(id);

//         if(!userDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"user not found",
//             })
//         }
//         //profile delete
//          await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});
//                  //HW :ENROLLED USER FROM ALL ENROOLED COURSES
                                
//         //delte user
//         await User.findByIdAndDelete({_id:id});

//         //return response
//         return res.status(200).json({
//             success:false,
//             message:"profile updated successfully",
//             profileDetails,
//         })


//       }catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:"profile can not delete please try again",
            
//         })
//       }
// }