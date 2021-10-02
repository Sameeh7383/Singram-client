import React,{useState,createContext  }from 'react'

export const UserContext = createContext()

export const UserProvider=props=>{
//     const initialValues={
//         UserName:"",
//         _id:"",
//         Email:"",
//         password: "",
//         phoneNumber:""
//    }
    
    const [User,setUser]=useState()
    return(<UserContext.Provider value={[User,setUser]}>
        {props.children}
        </UserContext.Provider>)}