import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";





const NestedView = ({handleChangeEditSectionName}) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [ confirmationModal, setConfirmationModal ] = useState(null);

  const handleDeleteSection=async (sectionId)=>{
      const result=await deleteSection({
        sectionId,
        courseId:course._id,
        token,
      })

      if(result){
        const updatedCourseContent = course.courseContent.filter(
          (section) => section._id !== sectionId
        );
          const updatedCourse={...course,courseContent:updatedCourseContent}
          dispatch(setCourse(updatedCourse))
      }

      setConfirmationModal(null);
  }

  // const handleDeleteSubSection= async (sectionId,subsectionId)=>{

  //     try{
      

  //       console.log("Deleting subsection:", { sectionId, subsectionId });

  //       const result = await deleteSubSection(
  //         { sectionId, subsectionId },
  //         token
  //       );
    
  //       console.log("API call result:", result);

  //       console.log("result",result);
  
  //       if(result){
  //         const updatedCourseContent = course.courseContent.map((section) =>
  //           section._id === sectionId
  //             ? {
  //                 ...section,
  //                 subSection: section.subSection.filter(
  //                   (sub) => sub._id !== subsectionId
  //                 ),
  //               }
  //             : section
  //         );
  //         const updatedCourse={...course,courseContent:updatedCourseContent}
  //         dispatch(setCourse(updatedCourse))
  //       }

  //     }catch(error){
  //       console.error("Failed to delete section:", error);
  //     }finally {
  //       setConfirmationModal(null);
  //     }

     

  //     // setConfirmationModal(null);
  // }

  // const handleDeleteSubSection = async (subSectionId, sectionId) => {
  //   const result = await deleteSubSection({ subSectionId, sectionId, token })
  //   if (result) {
  //     // update the structure of course
  //     const updatedCourseContent = course.courseContent.filter((section) =>
  //       section._id !== sectionId 
  //     )
  //     const updatedCourse = { ...course, courseContent: updatedCourseContent }
  //     dispatch(setCourse(updatedCourse))
  //   }
  //   setConfirmationModal(null)
  // }

  // const handleDeleteSubSection = async (subSectionId, sectionId) => {
  //   const result = await deleteSubSection({ subSectionId, sectionId, token })
  //   if (result) {
  //     // Update the structure of the course
  //     const updatedCourseContent = course.courseContent.map((section) => {
  //       if (section._id === sectionId) {
  //         // Filter out the deleted subsection from the section's subsections
  //         const updatedSubsections = section.subsections.filter(
  //           (subsection) => subsection._id !== subSectionId
  //         )
  //         return { ...section, subsections: updatedSubsections }
  //       }
  //       return section
  //     })
  //     const updatedCourse = { ...course, courseContent: updatedCourseContent }
  //     dispatch(setCourse(updatedCourse))
  //   }
  //   setConfirmationModal(null)
  // }

  // Assuming you have the necessary imports and context setup for dispatch and setCourse

// const handleDeleteSubSection = async (subSectionId, sectionId) => {
//   try {
//     // Call the function to delete the subsection and pass the required data
//     const result = await deleteSubSection({ subSectionId, sectionId, token });
    
//     // Check if the deletion was successful
//     if (result) {
//       // Update the structure of the course
//       const updatedCourseContent = course.courseContent.subSection.filter(
//         (subSectionId) => subSectionId._id !== subSectionId
//       );
//       // Create an updated course object with the new course content
//       const updatedCourse = { ...course, courseContent: updatedCourseContent };
      
//       // Dispatch the updated course to update the state
//       dispatch(setCourse(updatedCourse));
//     }
    
//     // Close the confirmation modal
//     setConfirmationModal(null);
    
//   } catch (error) {
//     // Handle any errors that occur during the deletion process
//     console.error('Error deleting subsection:', error);
//   }
// };

const handleDeleteSubSection = async (subSectionId, sectionId) => {
  try {
    // Call the function to delete the subsection and pass the required data
    const result = await deleteSubSection({ subSectionId, sectionId, token });

    // Check if the deletion was successful
    if (result) {
      // Update the structure of the course
      const updatedCourseContent = course.courseContent.map((section) => {
        if (section._id === sectionId) {
          // Filter out the deleted subsection from the section's subsections
          const updatedSubSections = section.subSection.filter(
            (sub) => sub._id !== subSectionId
          );
          return { ...section, subSection: updatedSubSections };
        }
        return section;
      });

      // Create an updated course object with the new course content
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      // Dispatch the updated course to update the state
      dispatch(setCourse(updatedCourse));
    }

    // Close the confirmation modal
    setConfirmationModal(null);
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error('Error deleting subsection:', error);
  }
};


  


  return (
    <div className="text-white w-full bg-richblack-800 ">
      <div className="w-full bg-richblack-600 m-4"> 
          {course.courseContent.map((section) => {
            return (
              
              <details key={section._id} open>
                <summary className="flex justify-between m-2 p-2">
  
                  <div className="flex items-center" >
                    <RxDropdownMenu className="text-3xl"/>
                    <p>{section.sectionName}</p>
                  </div>
  
                  <div className="flex gap-1 text-2xl text-richblack-500">
                      <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                        <MdEdit />
                      </button>
  
                      <button onClick={()=>{
                        setConfirmationModal({
                          text1:"Delete this section",
                          text2:"All the lectures in this section will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:()=>  handleDeleteSection(section._id),
                          btn2Handler:()=>setConfirmationModal(null)
                        })
                      }}>
                      <MdDelete />
                      </button>
  
                      <span>|</span>
  
                  
                       <FaCaretDown className="text-3xl" />
                    
                  </div>
  
                </summary>
  
                <div>
                    {
                      section?.subSection?.map((data)=>(
                        <div
                          key={data?._id}
                          onClick={()=>setViewSubSection(data)}
                          className="flex items-center justify-between gap-x-3 border-b-2"
                        >
  
                            <div className="flex items-center gap-x-3" >
                              <RxDropdownMenu className="text-3xl"/>
                              <p>{data.title}</p>
                            </div>
  
                            <div
                            onClick={(e)=>e.stopPropagation()}
                             className="flex items-center gap-x-3">
  
                              <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                <MdEdit />
                              </button>
  
                              <button
                              onClick={()=>{
                                setConfirmationModal({
                                  text1:"Delete this subsection",
                                  text2:"Selected lecture will be deleted",
                                  btn1Text:"Delete",
                                  btn2Text:"Cancel",
                                  btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                  btn2Handler:()=>setConfirmationModal(null)
                                })
                              }}>
                                  <MdDelete />
                              </button>
  
                            </div>
  
  
  
  
  
                        </div>
                      ))
                    }
  
                    <button onClick={()=>setAddSubSection(section._id)} className="">
                       <FaPlus />
                       <p>Add Lecture</p>
                    </button>
  
                </div>
              </details>
        
            );
          })}
      </div>

      {addSubSection ? (<SubSectionModal
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
      />)
       : viewSubSection ? (<SubSectionModal
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view ={true}
       />)
       : editSubSection ? (<SubSectionModal
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
       />)
       : (<div></div>)
      }

      {confirmationModal ? 
        (
            <ConfirmationModal modalData={confirmationModal}/>
        )
        : (<div></div>)
      }

    </div>
  );
};

export default NestedView;
