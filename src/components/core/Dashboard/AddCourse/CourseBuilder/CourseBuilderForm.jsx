import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import NestedView from "./NestedView";
import {
  setCourse,
  editCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

// import { isButtonElement } from 'react-router-dom/dist/dom';

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course, editCourse } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goback = () => {
    dispatch(setStep(1));
    dispatch(editCourse(true));
  };

  const gotoNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("please add atleast one section");
      return;
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("please add atleast one lection in each section");
      return;
    }

    // everything is ok
    dispatch(setStep(3));
  };

  const courseSectionSubmit = async (data) => {
    console.log(course?.courseContent?.length);

    setLoading(true);
    let result;

    if (editSectionName) {
      // we are editing section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    // value update
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // loading false
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    console.log("name of section" , sectionName)
    setEditSectionName(sectionId);
    // console.log("section id : ",sectionId)
    setValue("sectionName", sectionName);

  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <h1 className="text-2xl font-semibold text-richblack-5">Course Builder</h1>
      <form onSubmit={handleSubmit(courseSectionSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name<sup lassName="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            placeholder="Enter Section Name"
            id="sectionName"
            {...register("sectionName", { required: true })}
            className="form-style w-full"          />
          {errors.sectionName && <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>}
        </div>
        <div>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <IoMdAddCircleOutline
              className="text-xl"
              onClick={handleSubmit(courseSectionSubmit)}
            />
          </IconBtn>

          {editSectionName && (
            <button type="button" onClick={cancelEdit} className="text-sm text-richblack-300 underline">
              Cancel edit
            </button>
          )}
        </div>
      </form>
      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button onClick={goback} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
          <MdArrowBackIosNew /> Back
        </button>
        <IconBtn text="Next" onclick={gotoNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
