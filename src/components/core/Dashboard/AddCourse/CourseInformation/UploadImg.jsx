import React from 'react';

const UploadImg = ({ name, label, register, setValue, errors, editData }) => {
  // Handle file input change
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setValue(name, e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <input
        id={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="form-style"
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      {editData && <img src={editData} alt="Course Thumbnail" className="w-32 h-32 object-cover mt-2" />}
    </div>
  );
};

export default UploadImg;
