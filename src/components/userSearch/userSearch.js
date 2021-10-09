// import React from 'react';
// import "./userSearch.css";

// import { Link} from "react-router-dom";

// export default function UserSearch({searchData}) {
//   follow=()=>{
//     axios.get(api+"/api/v1/searchProfile/"+searchKey).then((data)=>{
      
//     })
//   }
//   console.log(searchData)
//     return (
//             <div className="channel-popup-main-div1" id="dropdown">
//           <div className="channel-popup-inner-div1">
//           {searchData.map((profile) => (
//             <div key={profile._id} className="comment-main-div1">
             
//                   <div className="profileImg">
//                   <Link to={`/profile/${profile._id}`} style={{ textDecoration: "none" }}>
//                   <img src="/assets/person/noAvatar.png"alt="userLogo" />
//                   </Link>
//                   </div>
//                    <div className="profileName">
//                    <Link to={`/profile/${profile._id}`} style={{ textDecoration: "none" }}>
//                    <span  style={{ color: "black",fontWeight: "600",paddingBottom: "30px" }}>{profile.UserName}</span>
//                    </Link>
//                      </div>  
        
//                   <div className="followBtn1">
//                     <button onClick={follow} >Follow</button>
//                   </div>
//                 </div>
//           ))}
          
                
    
//           </div>
//         </div>
      
//     )
// }

