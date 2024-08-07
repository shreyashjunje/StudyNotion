import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    
    const [requirement,setRequirement]=useState("")
    const [requirementList,setRequirementList]=useState([])

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[  ])

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList])

    const handleAddRequirement=()=>{
        if(requirement){
            setRequirementList({...requirementList,requirement});
            setRequirement("")
        }
    }

    //add simple login by own
    const handleRemoveRequirement=(index)=>{
        const updateRequirement={...requirement}
        updateRequirement.spice(index,1);
        setRequirementList(updateRequirement)
    }

    return (
    <div>
        <label htmlFor={name}>{label}<sup>*</sup></label>
        <div>
            <input
            type='text'
            placeholder='Enter Benefits of the course'
            id={name}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}
            
            />
            <button type='button' onClick={handleAddRequirement}>Add</button>

        </div>

        {
            requirementList.length > 0 && (
               <ul>
                    {
                        requirementList.map((requirement, index)=>{
                            return (
                                <li key={index}>
                                    <span>{requirement}</span>
                                    <button
                                    type='button'
                                    onClick={handleRemoveRequirement(index)}
                                    className='text-xs text-pure-greys-300'
                                    >
                                    clear
                                    </button>
                                </li>
                            )
                        })
                     }
               </ul>
            
            )
        }
        {
            errors[name] && (
                <span>
                    {label} is required
                </span>
            )
        }
    </div>
  )
}

export default RequirementField