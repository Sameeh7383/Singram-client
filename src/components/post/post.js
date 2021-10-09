import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {Button,Grow,MenuList,Paper,TextField,Popper,ClickAwayListener,TextareaAutosize,MenuItem, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { format } from "timeago.js";
import ReactPlayer from "react-player";
import axios from "axios";
import api from '../../api.js'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Post({userData,userPost,renderPosts}) {
  console.log(userData)
  
const [user,setUser]= useState(JSON.parse(localStorage.getItem("userData")).userData)
const [name, setName] = useState("");
  const [sources, setSources] = useState("");
  const [category, setCategory] = useState("");
  const [description,setDescription] = useState("");

const[data,setData]=useState([])
const [like, setLike] = useState(userData.post.likes.length);
const [isLiked, setIsLiked] = useState(false);
const [view,setView]= useState(0)
const [popup,setPopup]=useState(false)
const [postData,setPostData]=useState("")
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);
const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  var result;
const deletePost=(id,url)=>{
  
  axios.put(api+"/api/v1/post/deletePost/"+id, { url:url}).then((data)=>{
        renderPosts()
        setOpen(false);
      });
}
const editPost=(id)=>{
  axios.get(api+"/api/v1/post/getPost/"+id).then((data)=>{
        result=data.data
      }).then(()=>{
        setName(result.name)
        setSources(result.sources)
        setCategory(result.category)
        setDescription(result.description)
        setOpen(false);
        setPopup(true)
      });
}
const handleFormSubmit= async (e) => {
  e.preventDefault ();
  var data={
    name,sources,category,description
  }
  axios.post(api+"/api/v1/post/editPost/"+userData.post._id,data).then(()=>{
    renderPosts()
   setPopup(false)
  })
}

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


const countView=()=>{
  try {
      axios.put(api+"/api/v1/post/countViews/"+userData.post._id, { userId:user._id}).then(()=>{
        setView(view+1)
      });
     } catch (err) {}
}

useEffect(() => {
  setIsLiked(userData.post.likes.includes((user._id)));
  setView(userData.post.views)
}, [user._id, userData.post.likes,userData.post.views]);


const likeHandler = () => {
  try {
    axios.put(api+"/api/v1/post/like/"+userData.post._id, { userId:user._id});
  } catch (err) {}
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};
 const commentHandler=(comment)=>{
try{
  axios.put(api+"/api/v1/post/comment/"+userData.post._id, { user:{userId:user._id,userName:user.UserName},comment:comment}).then((data)=>{
    console.log(data)
    document.getElementById(userData.post._id).value=""
    userData.post.comments.push(data.data.comments)
    console.log(data.data.comments)
   setData(data)
  // post.comments.push(data)
  
   
  });
}
catch(err){}

 }

  return (
    <div id={userData.post._id}>
      <div  className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={userData.propic != undefined ? userData.propic: "/assets/person/noAvatar.png"}
              />
              <Link to={`/profile/${userData._id}`} style={{ textDecoration: "none" }}>
                <span  style={{ color: "black"}}className="postUsername">{userData.UserName}</span>
              </Link>
              <span className="postDate">{format(userData.post.postedAt)}</span>
            </div>
            
            <div className="postTopRight">
              <MoreVert 
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}/>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  

                
                   { userPost==true?(
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                   <MenuItem onClick={()=>{editPost(userData.post._id)}}>Edit Post</MenuItem>
                    <MenuItem onClick={()=>{
                      let confirmation=window.confirm("Are You Sure To Delete This Post?");
                    if(confirmation==true)
                    deletePost(userData.post._id,userData.post.url)
                    else
                    setOpen(false);
                    }}>Delete Post</MenuItem>
                    </MenuList>):(
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                   
                    <MenuItem onClick={handleClose}>Report</MenuItem>
                    <MenuItem onClick={handleClose}>save</MenuItem>
                    </MenuList>)
                    }

                  
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
            </div>
          </div>
          <hr style={{marginBottom:"10px",marginTop:"10px"}}/>
          <div className="postCenter">
            <span className="postDescription">{userData.post.description}</span><br/>
            <span className="postText"><b>Song Name:  </b>{userData.post.name}</span><br/>
            <span className="postText"><b>Film/Source:  </b>{userData.post.sources}</span><br/>
            <span className="postText"><b>Category:   </b>{userData.post.category}</span><br/><hr style={{marginBottom:"10px"}}/>
            <ReactPlayer
              controls
              width="600px"
              height="300px"
              url={userData.post.url}
             onStart={countView}
              
              
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              {/* <img className="likeIcon" onClick={likeHandler}  src="assets/like.png" alt="" /> */}
            {(isLiked ? <ThumbUpIcon  className="likeIcon" onClick={likeHandler} /> : <ThumbUpAltOutlinedIcon className="likeIcon" onClick={likeHandler}/>)}
              {/* <img className="likeIcon" src="assets/heart.png" alt="" /> */}

              <span className="postLikeCounter">{like} people liked it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> {view} views</span>
            </div>
            {/*  */}
           
          </div>
      <div className="commentSection">
      <div className="postComments">
          {/* <span className="postCommentsMoreCount">View all 4 comments</span> */}
          {/* {posts1.map((p) => (
          <Post key={p._id} post={p} />
        ))} */}
        {
          userData.post.comments&&(
            userData.post.comments.map((comment) => (
              <div key={comment._id} className="postComment">

                <div className="comment-main-div">
                  <img src="/assets/person/noAvatar.png" alt="userLogo" />
                  <Link to={`/profile/${comment.postedBy.userId}`} style={{ textDecoration: "none" }}>
                    <span style={{ color: "black",fontWeight: "600",paddingBottom: "30px" }}>{comment.postedBy.userName}</span>
                  </Link>
                  <span>:  {comment.comment}</span>
                  <p className="replay-text" onClick={()=>{document.getElementById("replyComment").style.display="block"}}>Reply</p>
                  <div id="replyComment" className="reply-div">
                    <input type="text" value="data" />
                  </div>                            

                </div>
              
              </div>
            ))
          )
        }
        </div>
          
          <form onSubmit={(e)=>{
                e.preventDefault()
                commentHandler(e.target[0].value)
                                }}>
      <div className="postCommentInput">
          {/* <Smile /> */}
        
         
          <input id={userData.post._id} type="text" required className="commentInput"  placeholder="Add a comment" />
      
          <button type="submit" className="commentButton">Comment</button>
         
        </div>
        </form>
      </div>
        </div>
      </div>
      {popup && (
        <div className="channel-popup-main-div5" id="dropdown">
          <div className="channel-popup-inner-div5">
            <button
              onClick={() => {
                
                setPopup(false);
              }}
              className="close-btn"
            >
              x
            </button>
            <div className="user-registration-wrapper5">
              <div className="user-registration-sub-wrapper">
                <div className="heading-wrapper">
                  <h3>EDIT POST</h3>
                </div>

                <form
                 onSubmit={handleFormSubmit} 
                 className="loginBox">
                  <div className="field-wrapper">
                    <div className="user-registration-field-wrapper">
                      <TextField
                       value={name}
                        onChange={(e) =>setName(e.target.value)}
                        label="Song Name"
                        id="outlined-margin-dense"
                        helperText="Enter The Song Name"
                        margin="dense"
                        variant="outlined"
                        style={{ width: 440 }}
                      />

                     
                    </div>
                    <div className="user-registration-field-wrapper">
                    <TextField
                        value={sources}
                        onChange={(e) =>setSources(e.target.value)}
                        label="Film/Sources"
                        id="outlined-margin-dense"
                        helperText="Enter Film/Sources"
                        margin="dense"
                        variant="outlined"
                        style={{ width: 215 }}
                      />
                      <TextField
                        value={category}
                        onChange={(e) =>setCategory(e.target.value)}
                        required
                        name="PhoneNumber"
                        label="Phone Number"
                        id="outlined-margin-dense"
                        helperText="Enter Your Phone Number."
                        margin="dense"
                        variant="outlined"
                        style={{ width: 215 }}
                      />
                     
                    </div>
                 
                    <div className="user-registration-field-wrapper">
                      <TextareaAutosize
                        name="User Bio"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        label="Description"
                        helperText="Description"
                        placeholder="Description"
                        variant="outlined"
                        maxRows={4}
                        minRows={3}
                        style={{ width: 440 }}
                      />
                    </div>

                    <div className="button-wrapper">
                      <div className="button-inside-wrapper">
                        <button type="submit">Edit Post</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
