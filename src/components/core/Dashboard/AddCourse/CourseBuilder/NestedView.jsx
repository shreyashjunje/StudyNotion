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
        dispatch(setCourse(result))
      }

      setConfirmationModal(null);
  }

  const handleDeleteSubSection= async (sectionId,subsectionId)=>{
      const result = await deleteSubSection({
        sectionId,
        subsectionId,
        token
      })

      if(result){
        dispatch(setCourse(result))
      }

      setConfirmationModal(null);
  }

  return (
    <div className="text-white w-full bg-richblack-800 ">
      <div className="w-full bg-richblack-600 m-4"> 
        {course?.courseContent?.map((section) => {
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
                    section.subSection.map((data)=>(
                      <div
                        key={data?._id}
                        onClick={()=>setViewSubSection(data)}
                        className="flex items-center justify-between gap-x-3 border-b-2"
                      >

                          <div className="flex items-center gap-x-3" >
                            <RxDropdownMenu className="text-3xl"/>
                            <p>{data.title}</p>
                          </div>

                          <div className="flex items-center gap-x-3">

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
                                btn1Handler:()=>  handleDeleteSubSection(section._id,data._id),
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
