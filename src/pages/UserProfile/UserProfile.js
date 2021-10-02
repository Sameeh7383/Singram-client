import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import {Button,Grow,MenuList,Paper,TextField,Popper,ClickAwayListener,TextareaAutosize,MenuItem, IconButton } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/sidebar/sideBar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt'; 
import RenderCropper from "../../components/cropper/cropper";
import api from '../../api';

var b,c;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  cameraIcon:{
    height:'2rem',
    width:'2rem',
    position:'absolute',
    bottom:20,
    right:'410px',
    backgroundColor:'white'
  }
}));
//COMPONENT FUNCTION

export default  function Profile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [showCropper, setShowCropper] = React.useState(false);
  const handleCropper = () => setShowCropper((prevValue) => !prevValue);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const [LoginUser,setLoginUser]=useState(JSON.parse(localStorage.getItem("userData")))
  const [popup, setPopup] = useState(false);
  var [user, setUser] = useState("");
  // var [data,setData]=useState()
  var [Follow, setFollow] = useState(false);
  var UserId = useParams().id;
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] =useState(0);
  const [UserName,setUserName]=useState(user.UserName)
  const [Email,setEmail]=useState(user.Email)
  const [PhoneNumber,setPhone]=useState(user.PhoneNumber)
  const [Dob,setDob]=useState(user.Dob) 
  const [Gender,setGender]=useState(user.Gender)
  const [Website,setWebsite]=useState(user.Website)
  const [Bio,setBio]=useState(user.Bio)
  const [usersData,setUsersData]=useState("")
  const [popupHeading,setPopupHeading]=useState("")
  const [select,setSelect]=useState(false)

  const handleSubmit= async (e) => {
    e.preventDefault ();
    var data={
      UserName,Email,PhoneNumber,Dob,Gender,Website,Bio
    }
    axios.post("http://localhost:5000/api/v1/updateProfile/"+user._id,data).then((result)=>{
     setUser(result.data)
     setPopup(false)
    //  c=true
    })
  }
  const renderProfile=()=>{
    axios
    .get("http://localhost:5000/api/v1/UserProfile/"+UserId)
    .then(async (data) => {
      await setUser(data.data);
      setShowCropper(false)
      // handleCropper()

      b = data.data;
      
    })
    .then(() => {
      // alert((ObjectID(LoginUser.userData._id)))
      setFollow(b.followers.includes(LoginUser.userData._id));
      // console.log(LoginUser.userData._id)
      setFollowersCount(b.followers.length);
      setFollowingsCount(b.followings.length);
      setUserName(b.UserName)
      setEmail(b.Email)
      setPhone(b.PhoneNumber)
      setDob(b.Dob)
      setGender(b.Gender)
      setWebsite(b.Website)
      setBio(b.Bio)


    
    });
  }
  const removePropic=()=>{
   axios.put("http://localhost:5000/api/v1/deletePropic/"+user._id,{url:user.propic}).then(()=>{
    renderProfile()
   })
  }

  // USE EFFECT


  useEffect(async () => {
    const fetchUser = () => {
      try {
        axios
          .get("http://localhost:5000/api/v1/UserProfile/"+UserId)
          .then(async (data) => {
            await setUser(data.data);
           
            b = data.data;
            
          })
          .then(() => {
            // alert((ObjectID(LoginUser.userData._id)))
            setFollow(b.followers.includes(LoginUser.userData._id));
            // console.log(LoginUser.userData._id)
            setFollowersCount(b.followers.length);
            setFollowingsCount(b.followings.length);
            setUserName(b.UserName)
            setEmail(b.Email)
            setPhone(b.PhoneNumber)
            setDob(b.Dob)
            setGender(b.Gender)
            setWebsite(b.Website)
            setBio(b.Bio)


          
          });
      } catch (err) {}
    };
    await fetchUser();

  },[UserId]);

const friendsView=(friends)=>{
setPopup("friends")
setPopupHeading(friends)
friends=="FOLLOWINGS"?(
  axios.get("http://localhost:5000/api/v1/userFollowings/"+user._id).then((result)=>{
     setUsersData(result.data)
     console.log(result.data);
     
    //  c=true
    })
):
axios.get("http://localhost:5000/api/v1/userFollowers/"+user._id).then((result)=>{
     setUsersData(result.data)
     console.log(result.data)
    })
}
  // FOLLOW FUNCTION
 

  const follow2=(id)=>{
    axios
      .put("http://localhost:5000/api/v1/followUser/" + id, {
        userId: LoginUser.userData._id,
      }).then((data)=>{
        setSelect(false);
        if (data.data === "Unfollowed") {
        document.getElementById(id).innerHTML="Follow"}
        else{
          document.getElementById(id).innerHTML="Unfollow"
        }
      })
  }

  const follow = () => {
    axios
      .put("http://localhost:5000/api/v1/followUser/" + UserId, {
        userId: LoginUser.userData._id,
      })
      .then((data) => {
        if (data.data === "Unfollowed") {
          setFollow(false);
          setFollowersCount(followersCount - 1);
        } else {
          setFollow(true);
          setFollowersCount(followersCount + 1);
        }
      });
  };



  return (
    
    <div>
      
       <Navbar />
      <div className="profile">
     
        <SideBar />
        
        <div className="profileRight">
          
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/person/noCover.jpg"
                alt=""
              />
              
              <div className="propic">
              <img
                className="profileUserImg"
                src={user.propic !=undefined ? user.propic : "/assets/person/noAvatar.png"}
                alt="/assets/person/noAvatar.png"
              />

             <IconButton
          className={classes.cameraIcon}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <CameraAltIcon/> 
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList
										autoFocusItem={open}
										id='menu-list-grow'
										onKeyDown={handleListKeyDown}
									>
										{/* <MenuItem onClick={handleClose}>View</MenuItem> */}
										<MenuItem
											onClick={(event) => {
												handleCropper();
												// handleClose(event);
											}}
										>
											Change
										</MenuItem>
										<MenuItem onClick={removePropic}>Remove</MenuItem>
									</MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {showCropper && <RenderCropper handleCropper={handleCropper} userId={user._id} proPic={user.proPic} renderProfile={renderProfile} />}
              </div>
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.UserName}</h4>

              <span className="profileInfoDesc">{user.Bio}</span>
              <span onClick={()=>friendsView("FOLLOWERS")} className="profileInfoDesc">
                {followersCount} followers
              </span><span onClick={()=>friendsView("FOLLOWINGS")} className="profileInfoDesc">
                {followingsCount} followings
              </span>
              {LoginUser.userData._id == user._id ? (
                <button
                  className="profilebtn"
                  onClick={() => {
                    setPopup("update")
                  }}
                >
                  Update Profile
                </button>
              ) : (
                <button className="profilebtn" onClick={follow}>
                  {Follow === true ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed props={user._id} userPost={LoginUser.userData._id == user._id ? true:false} />
            <Rightbar profile={user} />
          </div>
        </div>
      </div>
      
      {/* POPUP */}
      {popup=="update" ? (
        <div className="channel-popup-main-div" id="dropdown">
          <div className="channel-popup-inner-div">
            <button
              onClick={() => {
                
                setPopup(false);
              }}
              className="close-btn"
            >
              x
            </button>
            <div className="user-registration-wrapper">
              <div className="user-registration-sub-wrapper">
                <div className="heading-wrapper">
                  <h3>Update Profile</h3>
                </div>

                <form onSubmit={handleSubmit} className="loginBox">
                  <div className="field-wrapper">
                    <div className="user-registration-field-wrapper">
                      <TextField
                       value={UserName}
                        onChange={(e) =>setUserName(e.target.value)}
                        required
                        label="User Name."
                        id="outlined-margin-dense"
                        helperText="Enter your user name"
                        margin="dense"
                        variant="outlined"
                      />

                      <TextField
                        value={Email}
                        onChange={(e) =>setEmail(e.target.value)}
                        required
                        label="Email."
                        id="outlined-margin-dense"
                        helperText="We'll never share your email"
                        margin="dense"
                        variant="outlined"
                      />
                    </div>
                    <div className="user-registration-field-wrapper">
                      <TextField
                        value={PhoneNumber}
                        onChange={(e) =>setPhone(e.target.value)}
                        required
                        name="PhoneNumber"
                        label="Phone Number"
                        id="outlined-margin-dense"
                        helperText="Enter Your Phone Number."
                        margin="dense"
                        variant="outlined"
                      />
                      <TextField
                        name="dob"
                        value={Dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        type="date"
                        id="outlined-margin-dense"
                        helperText="Enter Your Date Of Birth"
                        // value={user.dob}
                        margin="dense"
                        variant="outlined"
                        style={{ width: 220 }}
                      />
                    </div>
                    <div className="user-registration-field-wrapper">
                      <TextField
                        value={Gender}
                        select
                        onChange={(e) => setGender(e.target.value)}
                        name="Gender"
                        label="Select"
                        id="outlined-margin-dense"
                        helperText="Gender"
                        margin="dense"
                        // value={user.gender}
                        variant="outlined"
                        style={{ width: 220 }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>

                      </TextField>
                      <TextField
                        name="website"
                        value={Website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                        label="Website"
                        id="outlined-margin-dense"
                        helperText="Website"
                        // value={user.website}
                        margin="dense"
                        variant="outlined"
                      />
                    </div>
                    <div className="user-registration-field-wrapper">
                      <TextareaAutosize
                        name="User Bio"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        required
                        label="Website"
                        
                        helperText="User Bio"
                        value={Bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="User Bio"
                        variant="outlined"
                        maxRows={4}
                        minRows={3}
                        style={{ width: 460 }}
                      />
                    </div>

                    <div className="button-wrapper">
                      <div className="button-inside-wrapper">
                        <button type="submit">Update Profile</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ): popup=="friends" && (

        
      
      <div className="followersPopupDiv" id="dropdown">
      <div className="followersPopupInnerDiv">
        <button
          onClick={() => {
            setPopup(null);
          }}
          className="close-btn"
        >
          x
        </button>
        <div className="popupHeading1">
               <h3>{popupHeading}</h3>
             </div>
             { usersData && usersData.slice(0).reverse().map((user)=>(
          <div 
          // onClick={()=>{ setSelect(true)}} 
          key={user.friends._id} 
          className="usersView">
               
               <div className="profileImg2">
               <Link to={`/profile/${user.friends._id}`} style={{ textDecoration: "none" }}>
               <img onClick={()=>{setPopup(false)}} src="/assets/person/noAvatar.png"alt="userLogo" />
               </Link>
               </div>
                <div className="profileName">
                <Link to={`/profile/${user.friends._id}`} style={{ textDecoration: "none" }}>
                <span   onClick={()=>{setPopup(false)}}
                 style={{ color: "black",fontWeight: "600",paddingBottom: "30px" }}>
                  {user.friends.UserName}
           
                  </span>
                </Link>
  
                  </div>  
                  {user.friends._id!=LoginUser.userData._id &&(<div className="followBtn2">
                    {/* {user.friends.followers.includes(LoginUser.userData._id) ? popupButton="Unfollow" : popupButton="Follow"} */}
                 <button id={user.friends._id} style={{margin:"0px 16px"}} onClick={()=>{
                   follow2(user.friends._id)
                 }}
                  >
                  { user.friends.followers.includes(LoginUser.userData._id) ? "Unfollow" : "Follow"}
                
                 </button>
               </div>)}
               
             </div>
          ))}
        
      </div>
    </div>)}

    </div>
  );
}
