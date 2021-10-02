import React,{useState,useEffect,useRef} from 'react'
import Navbar from "../../components/navbar/navbar";
import Message from "../../components/message/message";
import OnlineChats from '../../components/onlineChats/onlineChats';
import Conversation from '../../components/conversation/conversation';
import api from '../../api'
import './chat.css'
import axios from "axios";
import {io} from 'socket.io-client'
export default function Chat() {
  const[chats,setChats]=useState([])
  const[currentChat,setCurrentChat]=useState(null)
  const[messages,setMessages]=useState([])
  var[sendMessage,setSendMessage]=useState("")
  const[arrivalMsg,setArrivalMsg]=useState("")
  const[socketUser,setSocketUser]=useState([])
  const[update,setUpdate]=useState(false)
  const[typingUpdate,setTypingUpdate]=useState(false)
  let senderPropic,recieverPropic
  // const[socket,setSocket]=useState(null)
  const socket =useRef()

var[loginUser,setLoginUser]=useState(JSON.parse(localStorage.getItem("userData")).userData)
const scrollRef=useRef()

useEffect(() => {
socket.current=io("ws://localhost:4000")
socket.current.on("getMessage",data=>{
setArrivalMsg(data)
  
}) 
socket.current.on("typingUpdate",data=>{
  if(data.typing==true){
    console.log(data)
    setUpdate(true)
  }
  }) 
  socket.current.on("typingUpdateOff",data=>{
    console.log(data)
    setUpdate(false)
    
    // if(data.typing==false){
    //   // currentChat && currentChat.members.includes(data.sender) && 
    //   setTypingUpdate(false)
      
    // }
   
   
    }) 
socket.current.on("getConnections",connections=>{setSocketUser(connections)
  console.log(connections)})  
},[])
useEffect(()=>{
  arrivalMsg&&
  currentChat?.members.includes(arrivalMsg.sender)
  setMessages((message)=>[...message,arrivalMsg])
},[arrivalMsg])
useEffect(()=>{
  if(update===false){
    setTypingUpdate(false)
  }
  else if(update===true)
  setTypingUpdate(true)
  // arrivalMsg&&
  // currentChat?.members.includes(arrivalMsg.sender)
  // setMessages((message)=>[...message,arrivalMsg])
},[update])
useEffect(() => {
  axios.get("http://localhost:5000/api/v1/chat/"+loginUser._id).then((result)=>{
    setChats(result.data)
  console.log(result)
  })
   
}, [loginUser])
useEffect(() => {
  axios.get("http://localhost:5000/api/v1/chat/chatMessage/"+currentChat?._id).then((result)=>{
    setMessages(result.data)
  // console.log(result)
  })
   
}, [currentChat])

const onTyping=()=>{
  const reciever=currentChat.members.find(member=>member!=loginUser._id)
  socket.current.emit("typing",{senderId:loginUser._id,recieverId:reciever})
}
const offTyping=()=>{
  const reciever=currentChat.members.find(member=>member!=loginUser._id)
  socket.current.emit("offTyping",{senderId:loginUser._id,recieverId:reciever})
}
console.log(socket)
useEffect(() => {
  socket.current.emit("connect1",loginUser._id)
  socket.current.on("getConnections",connections=>{setSocketUser(connections)
  console.log(connections)})
},[loginUser])



useEffect(() => {
 scrollRef.current?.scrollIntoView({behavior: 'smooth'})
   
}, [messages])
const messageSubmit=async()=>{
  
  const reciever=currentChat.members.find(member=>member!==loginUser._id)
  console.log(loginUser._id,reciever,sendMessage);
   await socket.current.emit("ping",{senderId:loginUser._id,recieverId:reciever,content:sendMessage})
   
  axios.post("http://localhost:5000/api/v1/chat/message",{sender:loginUser._id,chat:currentChat._id,text:sendMessage,senderName:loginUser.UserName}).then((data)=>{
    console.log(data.data)
    // data.data.senderData.propic=senderPropic
  setMessages([...messages,data.data])
  setSendMessage("")
  })
}
// console.log(currentChat)
    return (
        <>
        <Navbar />
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search for friends" className="chatMenuInput" />
              
              {chats.map((chat)=>(
                <div onClick={() => setCurrentChat(chat)} >
                  <Conversation chat={chat}  />
                   
                  
                  
                </div>
              ))}
                
             {/* ))} */}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((message) => 
                    // message.senderData !=undefined && message.sender === loginUser._id ? senderPropic=message.senderData.propic : recieverPropic=message.senderData.propic
                    (
                     
                      <div 
                      ref={scrollRef}
                      >
                        
                        <Message 
                        message={message} 
                        sender={message.sender === loginUser._id}
                         />
                  
                        
                      </div>
                    ))} 
                  </div>
                  {typingUpdate===true && (<p style={{color: 'green'}}>Typing...</p>)}
                  <div className="chatBoxBottom">
                   
                    <input
                      className="chatMessageInput"
                      placeholder="write something..."
                      onInput={onTyping}
                      onBlur={offTyping}
                      onChange={(e) => setSendMessage(e.target.value)}
                      value={sendMessage}
                    ></input>
                    <button className="chatSubmitButton"
                     onClick={messageSubmit}
                     >
                      Send
                    </button>
                  </div>
                </>
               ) : ( 
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
               )} 
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <OnlineChats
              socketUsers={socketUser} loginUser={loginUser._id} setCurrentChat={setCurrentChat}
              />
            </div>
          </div>
        </div>
      </>
    )
}
