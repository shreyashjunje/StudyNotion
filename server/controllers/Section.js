const Section = require("../models/Section");
const SubSection =require("../models/SubSection")
const Course = require("../models/Course");
// CREATE a new section
exports.createSection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    console.log(sectionName, courseId);

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // Create a new section with the given name
    const newSection = await Section.create({ sectionName });

    // Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE a section
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId,courseId } = req.body;
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    const course=await Course.findById(courseId)
    .populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    })
    .exec()



    res.status(200).json({
      success: true,
      data:course,
      message: section,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE a section
// exports.deleteSection = async (req, res) => {
// 	try {

// 		const { sectionId, courseId }  = req.body;
// 		await Course.findByIdAndUpdate(courseId, {
// 			$pull: {
// 				courseContent: sectionId,
// 			}
// 		})
// 		const section = await Section.findById(sectionId);
// 		console.log(sectionId, courseId);
// 		if(!section) {
// 			return res.status(404).json({
// 				success:false,
// 				message:"Section not Found",
// 			})
// 		}

// 		//delete sub section
// 		await SubSectionModal.deleteMany({_id: {$in: section.subSection}});

// 		await Section.findByIdAndDelete(sectionId);

// 		//find the updated course and return 
// 		const course = await Course.findById(courseId).populate({
// 			path:"courseContent",
// 			populate: {
// 				path: "subSection"
// 			}
// 		})
// 		.exec();

// 		res.status(200).json({
// 			success:true,
// 			message:"Section deleted",
// 			data:course
// 		});





// 	// 	//HW -> req.params -> test
// 	// 	const { sectionId } = req.params;
// 	// 	await Section.findByIdAndDelete(sectionId);
// 	// 	//HW -> Course ko bhi update karo
// 	// 	res.status(200).json({
// 	// 		success: true,
// 	// 		message: "Section deleted",
// 	// 	});
// 	// }
  
//  }
//  catch (error) {
//   console.error("Error deleting section:", error);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//   });
// }
// }
// exports.deleteSection = async (req, res) => {
// 	try {
// 		//HW -> req.params -> test
// 		const { sectionId } = req.params;
// 		await Section.findByIdAndDelete(sectionId);
// 		//HW -> Course ko bhi update karo
// 		res.status(200).json({
// 			success: true,
// 			message: "Section deleted",
// 		});
// 	} catch (error) {
// 		console.error("Error deleting section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

// exports.deleteSection = async (req, res) => {
// 	try {

//     console.log("printinng section id and course id")
// 		const { sectionId, courseId }  = req.body;
//     console.log("done")
// 		await Course.findByIdAndUpdate(courseId, {
// 			$pull: {
// 				courseContent: sectionId,
// 			}
// 		})
// 		const section = await Section.findById(sectionId);
// 		console.log(sectionId, courseId);
// 		if(!section) {
// 			return res.status(404).json({
// 				success:false,
// 				message:"Section not Found",
// 			})
// 		}

// 		//delete sub section
// 		await SubSection.deleteMany({_id: {$in: section.subSection}});

// 		await Section.findByIdAndDelete(sectionId);

// 		//find the updated course and return 
// 		const course = await Course.findById(courseId).populate({
// 			path:"courseContent",
// 			populate: {
// 				path: "subSection"
// 			}
// 		})
// 		.exec();

// 		res.status(200).json({
// 			success:true,
// 			message:"Section deleted",
// 			data:course
// 		});
// 	} catch (error) {
// 		console.error("Error deleting section:", error);
// 		res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };   

exports.deleteSection = async (req, res) => {
	try {

    console.log("printinng section id and course id")
		const { sectionId, courseId }  = req.body;
    console.log("done")
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   