import React from 'react'
import "./rightbar.css"
import api from '../../api.js'

export default function Rightbar({ profile }) {
    const HomeRightbar = () => {
      return (
        <>
          {/* <div className="birthdayContainer">
            <img className="birthdayImg" src="" alt="" />
            <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
            </span>
          </div> */}
          <img className="rightbarAd" src="" alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {/* {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))} */}
          </ul>
        </>
      );
    };
  
    const ProfileRightbar = (profile) => {
      console.log(profile);
      return (
        <>
        <div className="heading">
        <h4 className="rightbarTitle" style={{fontWeight: 900}}>User information</h4>
        </div>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">EMAIL:</span>
              <span className="rightbarInfoValue">{profile.props.Email}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Contact NO:</span>
              <span className="rightbarInfoValue">{profile.props.PhoneNumber}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Website:</span>
              <span className="rightbarInfoValue">{profile.props.Website}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">DOB:</span>
              <span className="rightbarInfoValue">{profile.props.Dob}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Gender:</span>
              <span className="rightbarInfoValue">{profile.props.Gender}</span>
            </div>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src=""
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">John Carter</span>
            </div>
          </div>
        </>
      );
    };
    return (
      <div className="rightbar">
        <div className="rightbarWrapper">
          {profile ? <ProfileRightbar props={profile} /> : <HomeRightbar />}
        </div>
      </div>
    );
  }
