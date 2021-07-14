import {
  makeStyles,
  Typography,
  IconButton,
  InputBase,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import {
  Call,
  Close,
  ExpandMore,
  Videocam,
  Remove,
  Add,
  AddPhotoAlternate,
  Gif,
  AddAPhoto,
  ThumbUpSharp,
  Photo,
  InsertEmoticon,
} from "@material-ui/icons";
import axiosInstance from "./axios";
import Cookie from "js-cookie";
import {
  addMessage,
  addMessageSocket,
  allMessages,
  getMessageRomm,
} from "../redux/auth/action";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    overflowY: "scroll",
    bottom: "10px",
    right: "30px",
    width: "320px",
    zIndex: "1500",
    padding: "0",
    minHeight: "400px",
    maxHeight: "400px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  },
}));

function MessageBox({
  openMessageEl,
  user,
  setOpenMessageEl,
  username,
  addMessage,
  allMessages,
  myMessages,
  addMessageSocket,
  messageInfo,
}) {
  const classes = useStyles();

  const [mySocket, setMySocket] = React.useState(io("ws://127.0.0.1:5000/"));

  const [infos, setInfos] = React.useState([]);

  const [messages, setMessages] = React.useState([]);

  const [msg, setMsg] = React.useState("");

  const [expandMsg, setExpandMsg] = React.useState(false);

  const [socketId, setSocketId] = React.useState("");

  const messageEl = React.useRef(null);

  const handleMessage = (e) => {
    setMsg(e.target.value);
    if (e.target.value.length > 0) {
      setExpandMsg(true);
    } else {
      setExpandMsg(false);
    }
  };

  React.useEffect(() => {
    if (openMessageEl) {
      infos.map((item) => {
        if (item.username === user.user__username) {
          mySocket.emit("join", { name: username, room: item.room });
        }
      });

      allMessages({
        sender: username,
        receiver: user.user__username,
      });
      setMessages(myMessages);
    }
  }, [openMessageEl, user]);

  React.useEffect(() => {
    mySocket.on("newMsg", (item) => {
      if (item.user.name !== username) {
        addMessageSocket({
          sender: username,
          receiver: user.user__username,
          text: item.msg,
          id: uuidv4(),
        });
      }
    });
    setInfos(messageInfo);
  }, []);

  const handleSubmitMsg = (e) => {
    if (e.key === "Enter" && !e.shiftKey && msg.trim().length > 0) {
      e.preventDefault();
      addMessage({
        sender: username,
        receiver: user.user__username,
        text: msg,
        id: uuidv4(),
      });
      mySocket.emit("chatMsg", { msg: msg, id: socketId });
      setExpandMsg(false);
      setMsg("");
    }
  };

  const handleAddLike = (e) => {
    e.preventDefault();
    addMessage({
      sender: username,
      receiver: user.user__username,
      text: ":D",
      id: uuidv4(),
    });
  };

  const handleCloseMessage = () => {
    setOpenMessageEl(false);
    mySocket.emit("end", socketId);
  };

  React.useEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        // inline: 'nearest'
      });
    }
  });

  React.useEffect(() => {
    setMessages(myMessages);
  }, [myMessages]);

  React.useEffect(() => {
    setInfos(messageInfo);
  }, [messageInfo]);

  return (
    <div
      className={classes.root}
      style={{
        display: openMessageEl ? "block" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "fixed",
          width: "318px",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 10px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
            src={user.profile_photo}
            style={{ width: "25px", height: "25px", borderRadius: "40px" }}
          />
          <Typography
            style={{ fontSize: "14px", marginLeft: "5px", fontWeight: "300" }}
          >
            {user.user__first_name}
          </Typography>
          <ExpandMore style={{ fontSize: "20px" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton size="small">
            <Videocam style={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton size="small">
            <Call style={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton size="small">
            <Remove style={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton size="small" onClick={() => handleCloseMessage()}>
            <Close style={{ fontSize: "20px" }} />
          </IconButton>
        </div>
      </div>
      <div
        // ref={messageEl}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "scroll",
          alignItems: "center",
          marginTop: "40px",
          overflow: "scroll",
          // marginBottom: "40px",
          padding: "0 5px 0 15px",
        }}
      >
        <img
          src={user.profile_photo}
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "75px",
            margin: "15px 0",
          }}
        />
        <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
          {user.user__first_name}
        </Typography>
        <Typography style={{ fontSize: "13px", fontWeight: "300" }}>
          Facebook
        </Typography>
        <Typography style={{ fontSize: "13px", fontWeight: "300" }}>
          You're not friends on Facebook
        </Typography>
        <Typography
          style={{ fontSize: "13px", fontWeight: "300", marginBottom: "10px" }}
        >
          Lives in Mirpur, Dhaka
        </Typography>

        {messages.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              // maxWidth: "200px",
              marginLeft: item.user.id == "u1" ? "auto" : "0px",
              marginRight: item.user.id != "u1" ? "auto" : "0px",
            }}
            key={item.id}
          >
            <img
              src={user.profile_photo}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "75px",
                marginRight: "10px",
                display: item.user.id == "u1" ? "none" : "block",
              }}
            />
            <div
              style={{
                maxWidth: "200px",
                // marginLeft: item.user.id == "u1" ? "auto" : "0px",
                // marginRight: item.user.id != "u1" ? "auto" : "0px",
                backgroundColor: item.user.id == "u1" ? "#1b8cf7" : "#eee",
                color: item.user.id == "u1" ? "#fff" : "#000",
                padding: "7.5px 10px",
                borderRadius: "20px",
                marginTop: "10px",
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
        <div ref={messageEl} style={{ marginTop: "50px" }} />
      </div>
      <div
        style={{
          display: "flex",
          position: "fixed",
          width: "318px",
          backgroundColor: "#fff",
          bottom: "10px",
          borderTop: "1px solid #ccc",
          padding: "5px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div
          style={{
            display: expandMsg ? "none" : "flex",
          }}
        >
          <IconButton size="small">
            <Add
              style={{
                fontSize: "20px",
                backgroundColor: "#1b8cf7",
                color: "#fff",
                borderRadius: "40px",
              }}
            />
          </IconButton>
          <IconButton size="small">
            <Photo
              style={{
                fontSize: "24px",
                color: "#1b8cf7",
                borderRadius: "40px",
              }}
            />
          </IconButton>
          <IconButton size="small">
            <Gif
              style={{
                fontSize: "20px",
                backgroundColor: "#1b8cf7",
                color: "#fff",
                borderRadius: "40px",
              }}
            />
          </IconButton>
          <IconButton size="small">
            <AddAPhoto
              style={{
                fontSize: "24px",
                color: "#1b8cf7",
                borderRadius: "40px",
              }}
            />
          </IconButton>
        </div>
        <InputBase
          value={msg}
          onChange={(e) => handleMessage(e)}
          style={{
            width: expandMsg ? "88%" : "50%",
            margin: "0 5px",
            backgroundColor: "#eee",
            padding: "0 10px",
            borderRadius: "30px",
          }}
          onKeyPress={(e) => handleSubmitMsg(e)}
          endAdornment={
            // <InsertEmoticon style={{fontSize:"20px", backgroundColor:"#1b8cf7",borderRadius:"40px"}} />

            <img
              src="https://img.icons8.com/emoji/48/000000/slightly-smiling-face.png"
              style={{
                width: "30px",
                cursor: "pointer",
              }}
            />
          }
          placeholder="Aa"
        />
        <IconButton size="small" onClick={(e) => handleAddLike(e)}>
          <ThumbUpSharp
            style={{ fontSize: "20px", color: "#1b8cf7", borderRadius: "40px" }}
          />
        </IconButton>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    currentUser: state.auth.user,
    myMessages: state.auth.messages,
    messageInfo: state.auth.info,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allMessages: (data) => dispatch(allMessages(data)),
    addMessage: (data) => dispatch(addMessage(data)),
    addMessageSocket: (data) => dispatch(addMessageSocket(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
