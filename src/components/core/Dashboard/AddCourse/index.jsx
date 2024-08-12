import React from "react";
import RenderSteps from "./RenderSteps";

const index = () => {
  return (
    <div className=" flex justify-between text-white w-full items-start gap-x-12">
        
      <div className="w-full">
        <h2>Add Courses</h2>
        <div>
          <RenderSteps />
        </div>
      </div>

      <div className=" bg-richblack-800 p-4 max-w-[400px] max-h-[400px]">
        <h2>⚡Course Upload Tips</h2>
        <ul>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>

    </div>
  );
};

export default index;
