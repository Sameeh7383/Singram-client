import React,{useState,useEffect} from 'react'
import './conversation.css'
import axios from "axios";
import api from '../../api.js'
export default function Conversation({chat}) {
  const[loginUser,setLoginUser]=useState(useState(JSON.parse(localStorage.getItem("userData"))))
  const[user,setUser]=useState(null)
  useEffect(() => {
    const recieverId=chat.members.find(member=> member != loginUser[0].userData._id)
    console.log(recieverId)
    axios.get(api+"/api/v1/getUser/"+recieverId).then((result)=>{
     console.log(result.data);
     setUser(result.data)
    })
  },[loginUser,chat])

    return (
        <div className="conversation">
      <img
        className="conversationImg"
        src=
        {user && user.propic !=undefined?user.propic:
          "/assets/person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">
          {user?.UserName}
          </span>
    </div>
    )
}
