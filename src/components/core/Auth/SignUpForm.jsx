import React, { useState } from "react";
import countrycode from "../../../data/countrycode.json";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { signUp } from "../../../services/operations/authAPI";
import { sendOtp } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowpassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const { firstName, lastName, email, phoneNo, password, confirmPassword } =
    formData;

  function changehandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submithandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast("Password do not matched");
      return;
    }

    if (phoneNo.length < 8 || phoneNo.length > 10) {
      toast.error("Invalid Phone Number");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };
    console.log(signupData);

    // Setting signup data to state
    dispatch(sendOtp(formData.email, navigate));
    // To be used after otp verification
    dispatch(signUp(signupData, navigate));
    // // Send OTP to user for verification

    // dispatch(signUp(signupData)).then(() => {
    //   dispatch(sendOtp(formData.email, navigate));
    // });

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="text-richblack-5 px-4">
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={submithandler} className="flex flex-col gap-4">
        {/* first ans last name div */}
        <div className="flex gap-4">
          <label>
            <p>First Name <sup className='text-Red-400'>*</sup></p>
            <input
              required
              className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={changehandler}
            />
          </label>
          <label>
            <p>Last Name <sup className='text-Red-400'>*</sup></p>
            <input
              required
              className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={changehandler}
            />
          </label>
        </div>
        <label>
          <p>Email Address <sup className='text-Red-400'>*</sup></p>
          <input
            required
            className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
            type="text"
            value={email}
            name="email"
            onChange={changehandler}
            placeholder="Enter Email Address"
          />
        </label>

        {/* phone number section */}
        <div className="flex">
          <label className="">
            <p>Phone Number</p>
            <div className="flex gap-4">
              <select name="" id="" className=" w-[20%] bg-[#161D29] text-[#999DAA] p-3 rounded-lg">
                {countrycode.map((code, index) => {
                  return (
                    <option
                      key={index}
                      value={code.code}
                      className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
                      >
                      {code.code}-{code.country}
                    </option>
                  );
                })}
              </select>
              <input
                required
                // maxLength={value=10 message="Invalid Phone Number"}
                // minLength={value=8 message="Invalid Phone Number"}
                className="bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg  [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                type="number"
                maxLength={10}
                minLength={8}
                value={phoneNo}
                name="phoneNo"
                onChange={changehandler}
              />
            </div>
          </label>
        </div>

        {/* password section */}
        <div className="flex gap-5">
          <label>
            <p className="flex gap-1 items-center">
              Create Password <sup className='text-Red-400'>*</sup>
              <FaCircleInfo />{" "}   
            </p>
            <div className="flex relative">
              <input
                required
                className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={changehandler}
                placeholder="Enter your password"
              />
              <span className="absolute right-3 top-4 " onClick={() => setShowpassword((prev) => !prev)}>
                {showPassword ? <FaRegEyeSlash /> :  <FaRegEye />}
              </span>
            </div>
           
          </label>
          <label>
            <p>
              Confirm Password <sup className='text-Red-400'>*</sup>
            </p>
            <div className="relative">
                <input
                  required
                  className='bg-[#161D29] text-[#999DAA] p-3 w-full rounded-lg'
                  type={confirmPass ? "text" : "password"}
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={changehandler}
                  placeholder="Enter your password"
                />
                <span className="absolute right-3 top-4" onClick={() => setConfirmPass((prev) => !prev)}>
                  {confirmPass ? <FaRegEyeSlash /> :  <FaRegEye />}
                </span>
            </div>
           
          </label>
        </div>

        <button
          type="submit"
          className="flex flex-stretch bg-[#FFD60A] text-black p-3 my-4 rounded-lg w-full justify-center"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
