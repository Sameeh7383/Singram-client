import React,{useState,useEffect} from 'react'
import axios from "axios";
import './onlineChats.css'
import api from '../../api'
export default function OnlineChats({socketUsers,loginUser,currentChat}) {
  console.log(socketUsers)
  const[followings,setFollowings]=useState([])
  const[onlineFollowings,setOnlineFollowings]=useState([])
  const[online,setOnline]=useState(socketUsers)
  const[user,setUser]=useState(loginUser)
  useEffect(() => 
  axios.get(api+"/api/v1/userFollowings/"+user).then((response) => {
    setFollowings(response.data)
  }),[user])

  useEffect(async () => {
    let socketUsersId=[]
  await socketUsers.map((f) =>socketUsersId.push(f.user_id))
  console.log(socketUsersId)
  let onlineFriendsId=[]
  console.log(followings)
  await followings.map((f)=>(
    socketUsersId.includes(f.friends._id) && onlineFriendsId.push(f.friends))
  )
console.log(onlineFriendsId)
  setOnlineFollowings(onlineFriendsId)
}
,[followings,socketUsers])

  useEffect( () => {
    console.log(onlineFollowings)
}
  ,[onlineFollowings])

    return (
        <div>
            <div className="chatOnline">
      {onlineFollowings.map((user)=>{
        return(
 <div className="chatOnlineFriend" 
 // onClick={() => handleClick(o)}
 >
   <div className="chatOnlineImgContainer">
     <img
       className="chatOnlineImg"
       src="/assets/person/noAvatar.png"
       alt=""
     />
     <div className="chatOnlineBadge"></div>
   </div>
   <span className="chatOnlineName">
       {user.UserName}
       </span>
 </div>
       ) })}
    </div>
        </div>
    )
}
