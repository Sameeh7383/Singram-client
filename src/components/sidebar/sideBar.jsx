import "./sideBar.css"
import React,{useState,useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button"
import axios from "axios";
import {Link} from "react-router-dom";
import api from '../../api.js'
export default function SideBar() {
  const[user,setUser]=useState(JSON.parse(localStorage.getItem("userData")))
  const[profile,setProfile]=useState("")
  const[followCount,setFollowCount]=useState(0)
  const[followingCount,setFollowingCount]=useState(0)
  useEffect(() => {
    axios
    .get(api+"/api/v1/UserProfileCard/"+user.userData._id)
    .then((data) => {
      setProfile(data.data)   
      setFollowCount(data.data.followers.length)
      setFollowingCount(data.data.followings.length)
      console.log(followCount);
      console.log(followingCount)

    })
  }, []);
    return (
        <div className="sidebar">
       <div className="main-wrap">
         <div className="top-wrapper">
          <div className="cover-photo-div"></div>
          <div className="top-content">
            <img className="profile-photo" src={profile.propic} alt="" />
            <h3 className="profile-name">{profile.UserName}</h3>
            
              <p className="profile-rating">rating</p>
              <div className="starts"> <Rating name="size-small" size="small" value={2} readOnly/></div>
           
          </div>
          <hr className="sidebar-hr" />
         </div>
         <div className="bottom-wrapper">
           <div className="follow-div">
             <p className="follow-title">Followers</p>
             <p className="follow-count">{followCount}</p>
           </div>
           <div className="follow-div">
             <p className="follow-title">Followings</p>
             <p className="follow-count">{followingCount}</p>
           </div>
           <div className="follow-div">
             <p className="follow-title">Posts</p>
             <p className="follow-count">{profile.posts}</p>
           </div>
           <Link to="/judge">
           <Button variant="contained" color="primary">Judges panel</Button>
           </Link>
         </div>
       </div>
      </div>
    )
}
