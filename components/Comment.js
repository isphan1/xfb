import React from "react";
import {
  Card,
  CardContent,
  makeStyles,
  Divider,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  InputBase,
  Tooltip,
  Grid,
} from "@material-ui/core";
import {
  MoreHoriz,
  Public,
  ThumbUpSharp,
  Favorite,
  ChatBubbleOutline,
  ThumbUp,
  ReplyOutlined,
  ArrowDropDown,
  InsertEmoticon,
  CameraAlt,
  GifSharp,
  PhotoSharp,
  EmojiEmotionsSharp,
} from "@material-ui/icons";
import SubComment from "../components/SubComment";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addSubComment } from "../redux/post/action";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  customWidth: {
    minWidth: "40px",
    minHeight: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginTop: "5px",
  },
  postInput: {
    marginLeft: "5px",
    padding: "2.5px 10px",
    backgroundColor: "#f5f5f7",
    borderRadius: "20px",
    width: "89.5%",
  },
}));

const postIconButton = [
  "",
  { icon: <InsertEmoticon size="small" />, title: "Insert an emoji" },
  { icon: <CameraAlt size="small" />, title: "Add a photo or video" },
  { icon: <GifSharp size="small" />, title: "Comment with a GIF" },
  { icon: <PhotoSharp size="small" />, title: "Commet with a sticker" },
];

const reactionList = [
  <img src="/icons/likeb.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/love.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/laughing.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/wow.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/angry.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/sad.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />
]

const Comment = ({
  text,
  subComments,
  comment_id,
  name,
  profile_photo,
  post_id,
  addSubComment,
  created_at,
  user,
  posts
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState("");

  const handleReplyBox = (id) => {
    var elem = document.getElementById(`${id}`);
    elem.style.display === "none"
      ? (elem.style.display = "block")
      : (elem.style.display = "none");
  };

  // React.useEffect(() => {
  //   posts.map(i=>{
  //     if(post_id === i.post.id){
  //       setTimeout(() => {
  //         console.log(i.post)
  //       }, 3000);
  //     }
  //   })
  // },[posts])
    

  const handleAddSubComment = (id) => {
    var elem = document.getElementById(`${id}`);
    elem.onkeypress = function (e) {
      if (e.key === "Enter" && !e.shiftKey && value.trim().length > 0) {
        e.preventDefault();
        addSubComment({
          text: value,
          post_id: post_id,
          comment_id: comment_id,
          user_id: user.user_id,
          profile_photo: user.profile_photo,
          name: user.name,
          id: uuidv4(),
        });
        e.target.value = "";
        setValue("");
        handleReplyBox(id);
      }
    };
  };

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "5px",
          position: "relative",
          marginTop: "15px",
        }}
      >
        <Grid item xs={1}>
          <img
            src={profile_photo}
            width="36px"
            height="36px"
            style={{ borderRadius: "46px" }}
          />
        </Grid>
        <Grid item xs={11}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "7.5px",
                marginRight: "2.5px",
                backgroundColor: "#f5f5f7",
                borderRadius: "10px",
                padding: "10px",
                paddingBottom: "0px",
              }}
            >
              <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>
                {name}
              </Typography>
              <Typography style={{ fontSize: "14px", marginBottom: "-3px" }}>
                {text}
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginBottom: "-28px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Like
                  </span>
                  <span
                    onClick={() => handleReplyBox(comment_id)}
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      margin: "0 5px",
                      cursor: "pointer",
                    }}
                  >
                    Reply
                  </span>
                  <span style={{ fontSize: "12px" }}>{moment(created_at).fromNow()}</span>
                </div>
                <Tooltip
                  title={
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <ThumbUpSharp
                        size="small"
                        style={{
                          fontSize: "18px",
                          padding: "2.5px",
                          background: "#009cde",
                          color: "#fff",
                          borderRadius: "20px",
                          marginBottom: "5px",
                        }}
                      />
                      <Favorite
                        size="small"
                        style={{
                          fontSize: "18px",
                          padding: "2.5px",
                          background: "#e03251",
                          color: "#fff",
                          borderRadius: "20px",
                        }}
                      />
                    </div>
                  }
                  classes={{ tooltip: classes.customWidth }}
                  placement="bottom"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: "2px 2.5px",
                      borderRadius: "50px",
                      border: "1px solid #ccc",
                      marginBottom: "-10px",
                      // boxShadow: "1px 1px 1px #ccc",
                      cursor: "pointer",
                    }} >
                      {
                      reactionList[Math.floor((Math.random() * 5) + 1)]
                      // console.log(Math.floor((Math.random() * 5) + 1))
                      }
                      {
                      reactionList[Math.floor((Math.random() * 5) + 1)]
                      }
                    <span style={{ fontSize: "13px", marginLeft: "2.5px" }}>
                      {Math.ceil(Math.random(1,999)*100)}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </div>
            <IconButton size="small">
              <MoreHoriz size="small" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <div
        style={{ margin: "25px 0 15px 40px", display: "none" }}
        id={comment_id}
      >
        <div style={{ display: "flex" }}>
          <img
            src={user.profile_photo}
            width="36px"
            height="36px"
            style={{ borderRadius: "46px" }}
          />
          <InputBase
            placeholder="Write a reply..."
            multiline
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={() => handleAddSubComment(comment_id)}
            className={classes.postInput}
            endAdornment={
              <div style={{ display: "flex" }}>
                {postIconButton.map((item, id) => (
                  <Tooltip
                    key={item.title + id}
                    title={item.title}
                    classes={{ tooltip: classes.customWidth }}
                    placement="top"
                  >
                    <IconButton size="small">{item.icon}</IconButton>
                  </Tooltip>
                ))}
              </div>
            }
          />
        </div>
      </div>
      <div style={{ margin: "10px 0 15px 40px" }}>
        {subComments.map((subComment) => (
          <SubComment key={subComment.id} subComment={subComment} comment_id={comment_id} post_id={post_id} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    posts:state.posts.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubComment: (data) => dispatch(addSubComment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
