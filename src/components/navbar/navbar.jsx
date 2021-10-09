import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import React,{useState,useRef} from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import UserSearch from '../userSearch/userSearch'
import axios from "axios";
import { HashLink,NavHashLink } from 'react-router-hash-link';
import {subscription} from "../../subscription"
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../api'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));
export default function Navbar() {

  const history = useHistory();
  const[search,setSearch] = useState(false)
  const[user,setUser]=useState(JSON.parse(localStorage.getItem("userData")))
  const[userSearch,setUserSearch]=useState("")
  const[musicSearch,setMusicSearch]=useState("")
  const[searchKey,setSearchKey]=useState("")
  const[searchResult,setSearchResult]=useState([])
  const[searchUser,setSearchUser]=useState([])
  const[select,setSelect]=useState(false)

  let [searchCategory,setSearchCategory]=useState("music")
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  const logout = async () => {
    console.log(subscription)
    if(subscription){
      await axios.put(api+"/api/v1/logout/" + user.userData._id, {
        subscription: subscription,
      })
    } 
   
    localStorage.removeItem('userData')
    history.push('/login')
    // dispatch({ type:USER_LOGOUT })
} 
const blurEvent=() => {
  setTimeout(() => {
    setSearch(false)
   },300)
}
const follow=(id)=>{
  axios
    .put(api+"/api/v1/followUser/" + id, {
      userId: user.userData._id,
    }).then((data)=>{
      setSelect(false);
      if (data.data === "Unfollowed") {
      document.getElementById(id).innerHTML="Follow"}
      else{
        document.getElementById(id).innerHTML="Unfollow"
      }
    })
}

const handleSearch=() => {
  searchCategory=="music" ? axios.get(api+"/api/v1/post/searchPost/"+searchKey).then((response) =>{
    setSearchResult(response.data)
  }):
 axios.get(api+"/api/v1/searchProfile/"+searchKey).then((response) =>{
  setSearchUser(response.data)
  })
}

  return (
    
    <div className="topbarContainer">
      
      <div className="topbarLeft">
        <span className="logo">Singram</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput" value={searchKey} 
            onChange={(e) =>setSearchKey(e.target.value)} 
            onInput={()=>{
              setSearch(true)}}
           onKeyUp={handleSearch}
           onBlur={blurEvent}
          //  onBlur={()=> {
          //    if(select==false){
          //     setSearch(false)}}
          //    }
             ></input>
             
          <select onChange={
              (e)=>{
                console.log(e.target.value);
                setSearch(false)
                setSearchCategory(e.target.value)
                }} name="" id="" 
          className="search-filter-dropdown">
            <option  
              value="music">Music</option>
            <option 
              value="user">User</option>
            
          </select>
        </div>
        {search===true && searchResult !==[] && searchCategory=="music" &&( 
          <div className="channel-popup-main-div1" id="dropdown5">
            <div className="channel-popup-inner-div1">
            {searchResult.map((searchResult) => (
              <div  key={searchResult._id} className="comment-main-div1">
               
                    <div className="profileImg1">
                    <HashLink smooth to={`/profile/${searchResult.postedBy}`} style={{ textDecoration: "none" }}>
                    <img  onClick={()=>{setSearch(false)}} src={searchResult.postedUser.propic !=undefined ? searchResult.postedUser.propic : "/assets/person/noAvatar.png"}alt="userLogo" />
                    </HashLink>
                    </div>
                    
                     <div className="profileName">
                     <HashLink  smooth to={`/profile/${searchResult.postedBy}#${searchResult._id}`} style={{ textDecoration: "none" }}>
                     <span  onClick={()=>{setSearch(false)}} style={{ color: "black",fontWeight: "600" }}>{searchResult.name}</span><br></br>
                     
                     </HashLink>
                    <HashLink smooth to={`/profile/${searchResult.postedBy}`} style={{ textDecoration: "none" }}>

                     <span  onClick={()=>{setSearch(false)}} style={{ fontSize:"12px", color: "black",fontWeight: "600",paddingBottom: "20px" }}>Singer Name: </span>
                     <span  onClick={()=>{setSearch(false)}} style={{fontSize:"12px",textDecoration: "none"}} >{searchResult.postedUser.UserName}</span><br/>
                     </HashLink>

                     <HashLink  smooth to={`/profile/${searchResult.postedBy}#${searchResult._id}`} style={{ textDecoration: "none" }}>
                     <span  onClick={()=>{setSearch(false)}} style={{ fontSize:"12px", color: "black",fontWeight: "600",paddingBottom: "20px" }}>Source/film: </span>
                     </HashLink>
                     <span  onClick={()=>{setSearch(false)}} style={{fontSize:"12px",textDecoration: "none"}} >{searchResult.sources}</span><br/>
                    
          {/* <p>ATHIF IS SUNDHARAN</p> */}
                       </div>  
                       
                  </div>
            ))}
            
                  
      
            </div>
          </div>
          
        )}

        {search===true && searchUser !=[] && searchCategory=="user" &&(  
        <div className="channel-popup-main-div1" id="dropdown">
          <div className="channel-popup-inner-div1">
          {searchUser.map((searchResult) => (
            <div onClick={()=>{ setSelect(true)}} key={searchResult._id} className="comment-main-div1">
             
                  <div className="profileImg1">
                  <Link to={`/profile/${searchResult._id}`} style={{ textDecoration: "none" }}>
                  <img  onClick={()=>{setSearch(false)}} src={searchResult.propic ? searchResult.propic:"/assets/person/noAvatar.png"}alt="userLogo" />
                  </Link>
                  </div>
                   <div className="profileName">
                   <Link to={`/profile/${searchResult._id}`} style={{ textDecoration: "none" }}>
                   <span  onClick={()=>{setSearch(false)}} style={{ color: "black",fontWeight: "600",paddingBottom: "30px" }}>{searchResult.UserName}</span>
                   </Link>
        {/* <p>ATHIF IS SUNDHARAN</p> */}
                     </div>  
                     {searchResult._id!=user.userData._id &&(
                     <div className="followBtn1">
                    <button id={searchResult._id} onClick={()=>{follow(searchResult._id)}} > 
                     {searchResult.followers.includes(user.userData._id) ? "Unfollow" : "Follow"}
                    </button>
                  </div>)}
                  
                </div>
          ))}
          
                
    
          </div>
        </div>
      )}
            
        
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link style={{ textDecoration: "none" }} to="/">
          <span style={{color: "white"}} className="topbarLink">
            Homepage
          </span>
          </Link>
          <Link style={{ textDecoration: "none" }} to={`/profile/${user.userData._id}`}>
          <span style={{color: "white"}}  className="topbarLink">
            Profile
          </span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
           <Link to="/chat">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        

        <img
         
          src={user.userData.propic}
          alt=""
          className="topbarImg"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />
   <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Link style={{ textDecoration: "none" }} to={`/profile/${user.userData._id}`}>
                    <MenuItem style={{ textDecoration: "none" }} >Profile</MenuItem>
                  </Link>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      
      </div>
    </div>
  );
}
