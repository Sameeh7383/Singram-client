import React, { useState, useRef, useEffect } from "react";
import "./addPost.css";
import api from '../../api'
import {
  MusicVideo,
  Cancel,
  Label,
  Room,
  EmojiEmotions,
} from "@material-ui/icons";
import { TextField, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function AddPost({renderPosts}) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [sources, setSources] = useState("");
  const [category, setCategory] = useState("");
  const [description,setDescription] = useState("");
  const [valuation,setValuation]=useState(false);
  const postedBy = user.userData._id
  const postData = async (e) => {
    document.getElementById("postbtn").style.display = "none"
    e.preventDefault ();
    setLoader(true);
    // console.log(posts1);
    console.log(video);
    // const data={category,name,sources,description,video}
    var formData = new FormData();
    // console.log(data)
    // const data = new FormData();
    // var data1={name,sources,category,description}
    // var bio=JSON.stringify(description)
    console.log(description);
    formData.append("name", name);
    formData.append("sources", sources);
    formData.append("category", category);
    formData.append("description",(description));
    formData.append("file", video);
    formData.append("postedBy", postedBy);
    formData.append("valuation", valuation);
    
    console.log(formData, "dataaaaaaaaaaaaaaaaaaa");
    fetch("http://localhost:5000/api/v1/post/setProfilePic", {
      method: "POST",
      body: formData,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      // }
    })
      .then((res) => res.json())
      .then((data) => {
console.log(data);
        // posts1=posts1.push(data)
        // setPosts(posts1.push(data))
        renderPosts()
        setLoader(false);
        setVideo(null);
        setDescription("")
        setName("")
        setSources("")
        setCategory(" ")
      })
      .then(() => {})
      .catch((err) => alert(err));
  };
  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const postDetails = {
  //     postedBy: user.userData.UserName,
  //     postDescription: description,
  //   };

  // };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.userData.propic}
            alt=""
          />

          <input
            placeholder={"Welcome " + user.userData.UserName}
            className="shareInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {video && (
          <div
            id="sharevdo"
            // style={{ zIndex: 1 }}
            className="videoView"
          >
            <video width="600" height="300" controls>
              <source
                className="videoPreview"
                src={URL.createObjectURL(video)}
                type="video/mp4"
              />
            </video>
            <Cancel className="cancelVideo" onClick={() => setVideo(null)} />
            <form is="iron-form" onSubmit={postData}>
              <div className="field-wrapper">
                <div className="user-registration-field-wrapper">
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    name="name"
                    label="Name of the song"
                    id="outlined-margin-dense"
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    name="sources"
                    value={sources}
                    onChange={(e) => setSources(e.target.value)}
                    required
                    label="Film/Album/Other source"
                    id="outlined-margin-dense"
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    name="category"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    label="Category"
                    id="outlined-margin-dense"
                    margin="dense"
                    variant="outlined"
                  />
                 
                </div>
                <input value={valuation} onChange={(e)=>setValuation(e.target.checked)}  type="checkbox" id="valid-checkbox" />
                <label htmlFor="valid-checkbox">Send post for valuation</label>
                <div style={{ alignItems: "centre" }}>
                  {loader && <LinearProgress />}
                  <button
                    type="submit"
                    id="postbtn"
                    // onClick={() => postData()}
                    className="shareButton"
                  >
                    ADD POST
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <form className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="videoShare" className="shareOption">
              <MusicVideo htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Add Your Song</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="videoShare"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          {/* <button type="submit" className="shareButton">
            Share
          </button> */}
        </form>
      </div>
    </div>
  );
}
