import "./feed.css"
import AddPost from "../addPost/addPost"
import Post from "../post/post"
import axios from "axios";
import React, { useState,useEffect } from "react";
import api from '../../api'
export default function Feed({props,userPost}) {
  console.log(props)
  // const[profile1,setProfile]=useState(profile.profile)
  const [posts1,setPosts]=useState([])
  const [user, setUser]= useState(JSON.parse(localStorage.getItem("userData")));
  var a
  const renderPosts =async ()=>{
    const posts=(props!="home"?(await axios.get(api+"/api/v1/post/userPosts/"+props)):(await axios.get(api+"/api/v1/post/explorePosts/"+user.userData._id)))
    // alert(posts.data)
    console.log(posts.data)
    setPosts(posts.data)
  }
  useEffect(() => {
    const fetchPosts = async () => {
      
     
      console.log(posts1)
    
        const posts=(props!="home"?(await axios.get(api+"/api/v1/post/userPosts/"+props)):(await axios.get(api+"/api/v1/post/explorePosts/"+user.userData._id)))
        // alert(posts.data)
        console.log(posts.data)
        setPosts(posts.data)
          a="added"
          
  
    };
    fetchPosts();
  },[props,user]);

    return (
        <div className="feed">
            <div className="feed-wrapper">
                <AddPost renderPosts={renderPosts}/>
                {posts1.map((p) => (
          <Post key={p._id} userData={p} userPost={userPost} renderPosts={renderPosts} />
        ))}
               

            </div>
        </div>
    )
}
