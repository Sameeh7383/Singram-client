import React from 'react'
import './message.css'
import { format } from "timeago.js";
import api from '../../api.js'
export default function Message({message,sender}) {
    // const senderPic=
    return (
        <div>
            <div className={sender ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
        //   src=""
          src={message.senderData && message.senderData.propic?message.senderData.propic:"/assets/person/noAvatar.png"}
          alt=""
        />
        <p className="messageText">
            {message.text}
            </p>
      </div>
      <div className="messageBottom">
          {format(message.time)}
          </div>
    </div>
        </div>
    )
}
