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
  const [confirmPass,setConfirmPass] = useState(false);

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
    const signupData = {
      ...formData,
      accountType,
    };
    console.log(signupData);

    // Setting signup data to state
    // To be used after otp verification
    dispatch(signUp(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

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
    <div className="text-richblack-5">
         {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={submithandler}>
        <div>
          <label>
            <p>First Name</p>
            <input
              required
              className="text-black"
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={changehandler}
            />
          </label>
          <label>
            <p>Last Name</p>
            <input
            required
            className="text-black"

              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastName}
              onChange={changehandler}
            />
          </label>
        </div>
        <label>
          <p>Email Address</p>
          <input
            required
            className="text-black"

            type="text"
            value={email}
            name="email"
            onChange={changehandler}
            placeholder="Enter Email Address"
          />
        </label>

        {/* phone number section */}
        <div>
          <label>
            <p>Phone Number</p>
            <select name="" id="" className="text-richblack-900">
              {countrycode.map((code, index) => {
                return (
                  <option key={index} value="code.code" className="text-richblack-900">
                    {code.code}-{code.country}
                  </option>
                );
              })}
            </select>
            <input
              required
              // maxLength={value=10 message="Invalid Phone Number"}
              // minLength={value=8 message="Invalid Phone Number"}
              className="text-richblack-900 [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
              type="number"
              maxLength={10}
              minLength={8}
              value={phoneNo}
              name="phoneNo"
              onChange={changehandler}
            />
          </label>
        </div>

        {/* password section */}
        <div>
          <label>
            <p>
              Create Password<sup>*</sup>
              <FaCircleInfo />{" "}
            </p>
            <input
              required
              className="text-black"

              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={changehandler}
              placeholder="Enter your password"
            />
            <span onClick={() => setShowpassword((prev) => !prev)}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </label>
          <label>
            <p>
              Confirm Password<sup>*</sup>
            </p>
            <input
              required
              className="text-black"

              type={confirmPass ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              onChange={changehandler}
              placeholder="Enter your password"
            />
            <span onClick={() => setConfirmPass((prev) => !prev)}>
              {confirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </label>
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
