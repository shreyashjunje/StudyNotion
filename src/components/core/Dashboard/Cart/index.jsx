import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from "./RenderCartCourses" 
import RenderTotalAmount from "./RenderTotalAmount"

const Cart = () => {

    const {total,  totalItems}=useSelector((state)=>state.state.auth)



  return (
    <div>
        <h1>Your Cart</h1>
        <p>{totalItems}</p>
        {
            total>0 ? (<div>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>)
            : (<p>Yourt cart is empty</p>) 
        }
    </div>
  )
}

export default Cart;