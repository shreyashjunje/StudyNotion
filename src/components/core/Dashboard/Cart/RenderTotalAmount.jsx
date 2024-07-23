import React from 'react'
import IconBtn from '../../../common/IconBtn'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {

    const {total,cart}=useSelector((state)=>state.cart);

    const handleBuyCourse=()=>{
        const courses = cart.map((course)=>course._id);
        console.log("Brought these course",courses);
        // todo: api integrate -> payment gateway tak leke jayega
    }


  return (
    <div>
        <p>Total: </p>
        <p>RS {total}</p>

        <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount