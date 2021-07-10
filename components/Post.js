import React from "react";
import Comment from "../components/Comment";
import RelaventMenu from "./RelaventMenu";
import { reactionFilter } from "../common/reactionFilter";
import LOADING from "../common/Loading";
import moment from "moment";

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
  TextField,
  Tooltip,
  Grid,
} from "@material-ui/core";
import {
  MoreHoriz,
  Public,
  ThumbUpSharp,
  Favorite,
  ChatBubbleOutline,
  ThumbUpOutlined,
  ReplyOutlined,
  ArrowDropDown,
  InsertEmoticon,
  CameraAlt,
  GifSharp,
  PhotoSharp,
  EmojiEmotionsSharp,
  MoodBad,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { addComment, addPostReaction } from "../redux/post/action";
import { v4 as uuidv4 } from "uuid";
import Cookie, { set } from "js-cookie";
import axiosInstance from "./axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
  },
  customWidth: {
    minWidth: "40px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginBottom: "-0px",
  },
  customWidth1: {
    minWidth: "40px",
    minHeight: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginTop: "5px",
  },
  customWidth2: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "30px",
    color: "#000",
    marginBottom: "5px",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    borderRadius: "50px",
  },
  postInfo: {
    marginLeft: "5px",
  },
  postUser: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  postTimeSection: {
    display: "flex",
    alignItems: "center",
  },
  postTime: {
    fontSize: "14px",
    fontWeight: "300",
  },
  postTimeIcon: {
    fontSize: "16px",
    marginLeft: "5px",
  },
  postText: {
    fontSize: "15px",
    fontWeight:"500",
    margin: "10px 0",
    textAlign: "justify",
  },
  postHeaderHoriz: {
    marginLeft: "auto",
  },
  postReviewSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postReviewLeft: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  postReviewRight: {
    display: "flex",
  },
  postReactionSection: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  postReactionTooltips: {
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems:"center"
  },
  postReactionTitle: {
    fontSize: "15px",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  postInputSection: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
    position: "relative",
    marginBottom: "-12px",
  },
  postInput: {
    marginLeft: "5px",
    padding: "2.5px 10px",
    backgroundColor: "#f5f5f7",
    borderRadius: "20px",
    width: "100%",
  },
  postCommentSection: {
    display: "flex",
    flexDirection: "column",
  },
  postCommentFilter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // cursor: "pointer",
  },
  postCommentFilterTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  iconDesign: {
    fontSize: "35px",
    padding: "2.5px",
    background: "#009cde",
    color: "#fff",
    borderRadius: "20px",
    marginRight: "5px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.15)",
    },
  },
}));

const postReactionTooltipIcon = [
  {
    icon: (
      <img src="/icons/likeb.png" style={{ width: "35px", height: "35px", backgroundColor:"#4285F4", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px", marginLeft:"7.5px" }} />

    ),
    title: "LIKE",
  },
  {
    icon: (
      <img src="/icons/love.png" style={{ width: "35px", height: "35px", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px" }} />

    ),
    title: "LOVE",
  },
  {
    icon: (
      <img src="/icons/laughing.png" style={{ width: "35px", height: "35px", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px" }} />

    ),
    title: "HAHA",
  },
  {
    icon: (
      <img src="/icons/wow.png" style={{ width: "35px", height: "35px", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px" }} />

    ),
    title: "WOW",
  },
  {
    icon: (
      <img src="/icons/sad.png" style={{ width: "35px", height: "35px", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px" }} />

    ),
    title: "SAD",
  },
  {
    icon: (
      <img src="/icons/angry.png" style={{ width: "35px", height: "35px", marginRight:"7.5px", cursor:"pointer",marginTop:"2.5px" }} />

    ),
    title: "ANGRY",
  },

];

const reactionIconList = [
  <img src="/icons/likeb.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/love.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/laughing.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/wow.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/angry.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />,
  <img src="/icons/sad.png" style={{ width: "18px", height: "18px",zIndex:"110", borderRadius:"30px",}} />
]

const postReviewIcon = [
  {
    icon: (
      <img src="/icons/likeb.png" style={{ width: "20px", height: "20px" }} />

    ),
    title: "Like",
  },
  {
    icon:       <img src="/icons/love.png" style={{ width: "20px", height: "20px" }} />
    ,
    title: "Love",
  },
];

const postIconButton = [
  { icon: <InsertEmoticon size="small" />, title: "Insert an emoji" },
  { icon: <CameraAlt size="small" />, title: "Add a photo or video" },
  { icon: <GifSharp size="small" />, title: "Comment with a GIF" },
  { icon: <PhotoSharp size="small" />, title: "Commet with a sticker" },
];

const reactionList = {
  Like: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/like.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 400,
          marginLeft: "10px",
          textTransform:"capitalize"
        }}
      >
        Like
      </Typography>
    </div>
  ),

  LIKE: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/thumb-up.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#4285F4",
          textTransform:"capitalize"
        }}
      >
        Like
      </Typography>
    </div>
  ),
  LOVE: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/love.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#e03251",
          textTransform:"capitalize"
        }}
      >
        Love
      </Typography>
    </div>
  ),
  HAHA: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/laughing.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#ecb10f",
          textTransform:"capitalize"
        }}
      >
        HaHa
      </Typography>
    </div>
  ),
  WOW: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/wow.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#ecb10f",
          textTransform:"capitalize"
        }}
      >
        Wow
      </Typography>
    </div>
  ),

  SAD: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/sad.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#ecb10f",
          textTransform:"capitalize"
        }}
      >
        Sad
      </Typography>
    </div>
  ),
  ANGRY: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src="/icons/angry.png" style={{ width: "20px", height: "20px" }} />
      <Typography
        style={{
          fontSize: "15px",
          fontWeight: 500,
          marginLeft: "10px",
          color: "#f3573c",
          textTransform:"capitalize"
        }}
      >
        Angry
      </Typography>
    </div>
  ),
};

const Post = ({ item, addComment, user, addPostReaction, posts, looping }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:360px)");
  const [value, setValue] = React.useState("");
  const [relaventAnchor, setRelaventAnchor] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [commentFilter, setCommentFilter] = React.useState("Most Recent");
  const [loading, setLoading] = React.useState(true);
  const [reaction, setReaction] = React.useState("Like");
  const [totalReaction, setTotalReaction] = React.useState(0);
  const [totalComment, setTotalComment] = React.useState(0);
  const [openCommentBox, setOpenCommentBox] = React.useState(false);

  React.useEffect(() => {
    setData(item);
    setReaction(reactionFilter(item.post.reactions, user.user_id) ? reactionFilter(item.post.reactions, user.user_id) : "Like");
    setTotalReaction(item.post.total_reaction);
    setTotalComment(item.post.total_comment);
  }, []);

  React.useEffect(() => {
    posts.map((i) => {
      if (item.post.id === i.post.id) {
        setTimeout(() => {
          setData(i);
          setLoading(false);
        }, 100);
      }
    });
  }, [posts]);

  const handleOpenRelavent = (e) => {
    setRelaventAnchor(e.currentTarget);
  };

  const handleClickReaction = () => {
    if (reaction !== "Like" && reaction == "") {
      setReaction("LIKE");
      setTotalReaction(totalReaction + 1);
      addPostReaction({
        user_id: user.user_id,
        post_id: data.post.id,
        type: "LIKE",
      });
    } else if (reaction !== "Like") {
      setReaction("Like");
      setTotalReaction(totalReaction - 1);
      addPostReaction({
        user_id: user.user_id,
        post_id: data.post.id,
        type: reaction,
      });
    } else if (reaction === "Like") {
      setReaction("LIKE");
      setTotalReaction(totalReaction + 1);
      addPostReaction({
        user_id: user.user_id,
        post_id: data.post.id,
        type: "LIKE",
      });
    }
  };

  const handleCloseRelavent = (val) => {
    setRelaventAnchor(null);
    setCommentFilter(val);
  };

  const handleAddComment = (id) => {
    var elem = document.getElementById(`${id}`);
    elem.onkeypress = function (e) {
      if (e.key === "Enter" && !e.shiftKey && value.trim().length > 0) {
        e.preventDefault();
        setTotalComment(totalComment + 1);
        addComment({
          text: value,
          post_id: data.post.id,
          user_id: user.user_id,
          profile_photo: user.profile_photo,
          name: user.name,
          id: uuidv4(),
        });
        setValue("");
      }
    };
  };

  const handlePostReaction = (type) => {
    if (type == reaction) {
      setReaction("Like");
      setTotalReaction(totalReaction - 1);
    } else if (reaction == "" || reaction == "Like") {
      setReaction(type);
      setTotalReaction(totalReaction + 1);
    } else {
      setReaction(type);
      setTotalReaction(totalReaction);
    }

    addPostReaction({
      user_id: user.user_id,
      post_id: data.post.id,
      type: type,
    });
  };
  return (
    <div>
      {loading ? (
        <LOADING />
      ) : (
        <div>
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.postHeader}>
                <img
                  src={data.post.profile_photo}
                  width="36px"
                  height="36px"
                  style={{
                    borderRadius: "50px",
                  }}
                />
                <div className={classes.postInfo}>
                  <Typography className={classes.postUser}>
                    {data.post.name}
                  </Typography>
                  <div className={classes.postTimeSection}>
                    <Typography className={classes.postTime}>
                      {moment(data.post.created_at).fromNow()}
                    </Typography>
                    <Public size="small" className={classes.postTimeIcon} />
                  </div>
                </div>
                <IconButton size="small" className={classes.postHeaderHoriz}>
                  <MoreHoriz />
                </IconButton>
              </div>
              <Typography className={classes.postText}>
                {data.post.text}
              </Typography>

              <Grid container>
                <Grid item xs={6}>
                  <div
                    className={classes.postReviewLeft}
                    style={{ display: totalReaction > 0 ? "flex" : "none" }}
                  >
                    {postReviewIcon.map((item, id) => (
                      <Tooltip
                        key={item.title + id}
                        title={item.title}
                        classes={{ tooltip: classes.customWidth1 }}
                        placement="bottom"
                      >
                      {reactionIconList[Math.floor((Math.random() * 5) + 1)]}
                      </Tooltip>
                    ))}
                    <Tooltip
                      title="total"
                      classes={{ tooltip: classes.customWidth1 }}
                      placement="bottom"
                    >
                      <Typography
                        style={{
                          fontSize: "15px",
                          fontWeight: "300",
                          marginLeft: "2.5px",
                        }}
                      >
                        {totalReaction}
                      </Typography>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid xs={6} item container justify="flex-end">
                  <div className={classes.postReviewRight}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "300",
                        marginRight: "7.5px",
                        textTransform: "capitalize",
                        display: totalComment > 0 ? "flex" : "none",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        {totalComment}
                        <span
                          style={{
                            display: matches ? "none" : "block",
                            marginLeft: "5px",
                          }}
                        >
                          Comments
                        </span>
                        <ChatBubbleOutline
                          size="small"
                          style={{
                            marginLeft: "5px",
                            display: matches ? "block" : "none",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "300",
                        textTransform: "capitalize",
                        display: totalReaction > 0 ? "block" : "none",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        {totalReaction}
                        <span
                          style={{
                            display: matches ? "flex" : "block",
                            marginLeft: "5px",
                          }}
                        >
                          Shares
                        </span>
                        <ReplyOutlined
                          size="small"
                          style={{
                            marginLeft: "5px",
                            display: matches ? "block" : "none",
                            transform: "rotate(90deg)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Divider style={{ marginTop: "20px" }} />

              <div className={classes.postReactionSection}>
                <Tooltip
                  interactive
                  title={
                    <div
                      className={classes.postReactionTooltips}
                      id={data.post.id}
                    >
                      {postReactionTooltipIcon.map((item, id) => (
                        <span
                          key={id}
                          onClick={() => handlePostReaction(item.title)}
                        >
                          {item.icon}
                        </span>
                      ))}
                    </div>
                  }
                  classes={{ tooltip: classes.customWidth2 }}
                  placement="top"
                >
                  <Button
                    onClick={handleClickReaction}
                    style={{
                      display: "flex",
                      alignLtems: "center",
                      padding: "7.5px 30px",
                    }}
                  >
                    {reactionList[reaction]}
                    {/* <img src="/like.png"
                      style={{
                        width:"20px",
                        height:"20px",
                        marginRight:"10px"

                      }}
                    />
                    <Typography
                      className={classes.postReactionTitle}
                      style={{
                        display: matches ? "none" : "block",
                      }}
                    >
                      {reaction == "" ? "Like" : reaction}
                    </Typography> */}
                  </Button>
                </Tooltip>
                {/* {buttons.map((item) => ( */}
                <Button
                  key={item.title}
                  style={{
                    padding: "7.5px 30px",
                  }}
                  onClick={() => setOpenCommentBox(!openCommentBox)}
                >
                  <ChatBubbleOutline
                    size="small"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography
                    className={classes.postReactionTitle}
                    style={{
                      display: matches ? "none" : "block",
                    }}
                  >
                    Comment
                  </Typography>
                </Button>
                {/* ))} */}
                <Button
                  key={item.title}
                  style={{
                    padding: "7.5px 30px",
                  }}
                  // onClick={() => setOpenCommentBox(!openCommentBox)}
                >
                  <ReplyOutlined
                    size="small"
                    style={{ marginRight: "10px", transform: "rotate(90deg)" }}
                  />
                  <Typography
                    className={classes.postReactionTitle}
                    style={{
                      display: matches ? "none" : "block",
                    }}
                  >
                    Share
                  </Typography>
                </Button>
              </div>
              <Divider style={{ marginBottom: "10px" }} />
              <div
                className={classes.postCommentSection}
                style={{ display: openCommentBox ? "flex" : "none" }}
              >
                <div className={classes.postCommentFilter}>
                  <Typography
                    className={classes.postCommentFilterTitle}
                    onClick={handleOpenRelavent}
                  >
                    {commentFilter}
                    <ArrowDropDown size="small" />
                  </Typography>
                </div>
                <div className={classes.postInputSection}>
                  <img
                    src={user.profile_photo}
                    width="40px"
                    height="40px"
                    style={{
                      borderRadius: "50px",
                    }}
                  />
                  <InputBase
                    placeholder="Write a comment..."
                    onKeyDown={() => handleAddComment(data.post.id)}
                    id={data.post.id}
                    multiline
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
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
              <div style={{ display: openCommentBox ? "block" : "none" }}>
                {data.comments.map((comment, id) => (
                  <Comment
                    key={comment.id}
                    comment_id={comment.id}
                    name={comment.name}
                    text={comment.text}
                    profile_photo={comment.profile_photo}
                    subComments={comment.subComments}
                    created_at={comment.created_at}
                    post_id={data.post.id}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <RelaventMenu
            relaventAnchor={relaventAnchor}
            handleCloseRelavent={handleCloseRelavent}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    looping: state.auth.loading,
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => dispatch(addComment(data)),
    addPostReaction: (data) => dispatch(addPostReaction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
