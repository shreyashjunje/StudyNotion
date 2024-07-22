import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-richblack-5">
      <div>
        <h1>My Profile</h1>

        {/* section 1 */}
        <div>
          <div>
            <img
              src={user?.image}
              alt={`profile-${user.firstName}`}
              className="aspect-square rounded-full object-cover w-[78px]"
            />
            <div>
              <p>{user?.firstName + " " + user?.lastName}</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          />
        </div>

        {/* sectino 2 */}
        <div>
            <div>
                <p>About</p>
                <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}
                />
            </div>
            <p>{user?.additionalDetails?.about ?? "write somthing about yourself "}</p>

        </div>

        {/* section 3 */}
        <div>
            <div>
                <p>Personal Details</p>
                <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}
                />
            </div>
            <div>
                <div>
                    <p>First Name</p>
                    <p>{user?.firstName}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p>Gender</p>
                    <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
                </div>
                <div>
                    <p>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
                <div>
                    <p>Phone Number</p>
                    <p>{user?.additionalDetails?.contactNumber ?? "Add contact Number"}</p>
                </div>
                <div>
                    <p>Data of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ?? "Add Data of birth"}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
