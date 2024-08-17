import React from 'react'
import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { catalogData } from '../apis'
import { compose } from '@reduxjs/toolkit'


export const getCatalogPageData =async (categoryId) => {
    const toastId=toast.loading("Loading...")
    let result=[]

    try{
        console.log("categoryId hello",categoryId)
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
            {categoryId: categoryId,}
        )

        console.log("response hello",response)

        if(!response?.data?.success){
            throw new Error("could not fetch category page data")

        }

        result=response?.data;

    }catch(error){
        console.log("CATALOG PAGE DATA AP ERROR...",error)
        toast.error(error.message);
        result=error.response?.data;
    }

    toast.dismiss(toastId)
    return result
    
}

