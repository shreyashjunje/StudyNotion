import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState={
    token:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems") ) : 0,
}

const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.token=value.payload;
        },
    },
    //add to cat
    // remove from cartSlice
    // reset from cart
});

export const {setTotalItems} =cartSlice.actions;
export default cartSlice.reducer;