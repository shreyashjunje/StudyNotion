import copy from 'copy-to-clipboard';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {

    const {user}=useSelector(state=>state.profile);
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {
        thumbnail:thumbnailImage,
        price:currentPrice,
    }=course

    const handleAddToCart=()=>{
        if(user && user?.ACCOUNT_TYPE === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are instructor, you can not buy course");
            return;
        }

        if(token){
            dispatch(addToCart(course));
            return
        }

        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please login to add to cart",
            btn1Text:"login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null)


        })

    }

    const handleShare=()=>{
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

  return (
    <div>
       <img src={thumbnailImage} alt="this is course thumbnail image"
       className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl' />

       <div>
        Rs.{currentPrice}
       </div>

       <div>
            <button
            onClick={
                user && course?.studentEnrolled.includes(user?._id) 
                ? (()=>navigate("/dashboard/enrolled-courses"))
            :(handleBuyCourse)}
            >
                {
                    user && course?.studentEnrolled.includes(user?._id) ? "Go to course " :  "Buy Now "
                }
            </button>

            {
                (
                    !course?.studentEnrolled.includes(user?._id) && (
                        <button onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    )
                )
            }
       </div>

       <div>
            <p>
                30-Days Money Back Guarantee
            </p>
            <p>
                This course Includes: 
            </p>
            <div>
                {
                    course?.instructions?.map((item,index)=>(
                        <p key={index}>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
       </div>

       <div>
            <button onClick={handleShare}>Share</button>
       </div>
    </div>
  )
}

export default CourseDetailsCard