import React from "react";

import SideBar from "../../components/sidebar/sideBar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import Navbar from "../../components/navbar/navbar";
import api from '../../api'
import "./home.css";
export default function Home() {
  return (
<>
         <Navbar />
      <div className="homePage">
        

        <SideBar />
        <Feed props={"home"}/>
        {/* <UserProvider> */}
          <Rightbar />
        {/* </UserProvider> */}
      </div>
</>
  );
}
