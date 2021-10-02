import Home from "./pages/HomePage/home";
import UserProfile from "./pages/UserProfile/UserProfile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Navbar from "./components/navbar/navbar"
import React, { useState } from "react";
import Chat from "./pages/chat/chat";
import JudgesPanel from "./pages/judgesPanel/judgesPanel.jsx"
// import {UserProvider} from '../src/context/authContext'
function App() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("userData")))
  return (
    <div>
      <BrowserRouter>
     
     {/* {user && <Navbar />}  */}
        <Switch>
          {/* <UserProvider> */}
          <Route path="/login" component={Login} />
          {/* </UserProvider> */}
          <Route exact path="/" component={user ? Home:Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/profile/:id" component={user ?UserProfile:Login} />
          <Route exact path="/chat" component={user ?Chat:Login} />
          <Route  path="/judge" component={user ?JudgesPanel:Login} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
