import React from "react";
import Comment from "../components/Comment";
import RelaventMenu from "./RelaventMenu";
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

const useStyles = makeStyles((theme) => ({
  root: {},
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
    backgroundColor: "#e9ebee",
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
    cursor: "pointer",
  },
  postCommentFilterTitle: {
    fontSize: "14px",
    fontWeight: "500",
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
      transform:"scale(1.15)"
    },
  },
}));

const postReviewIcon = [
  {
    icon: (
      <ThumbUpSharp
        size="small"
        style={{
          fontSize: "18px",
          padding: "2.5px",
          background: "#009cde",
          color: "#fff",
          borderRadius: "20px",
        }}
      />
    ),
    title: "Like",
  },
  {
    icon: (
      <Favorite
        size="small"
        style={{
          fontSize: "18px",
          padding: "2px",
          background: "#e03251",
          color: "#fff",
          borderRadius: "20px",
        }}
      />
    ),
    title: "Love",
  },
];
// const postReactionTooltipIcon = [
//   {icon:<ThumbUpSharp

//     className={classes.iconDesign}
//     // style={{
//     //   fontSize: "35px",
//     //   padding: "2.5px",
//     //   background: "#009cde",
//     //   color: "#fff",
//     //   borderRadius: "20px",
//     //   marginRight: "5px",
//     //   cursor:"pointer",

//     // }}
//   />},
//   {icon:<Favorite
//     style={{
//       fontSize: "35px",
//       padding: "2.5px",
//       background: "#e03251",
//       color: "#fff",
//       borderRadius: "20px",
//       marginRight: "5px",
//       cursor:"pointer",
//     }}
//       />},
//   {icon:<EmojiEmotionsSharp
//     style={{
//       fontSize: "35px",
//       padding: "2.5px",
//       background: "#ffbb00",
//       color: "#fff",
//       borderRadius: "20px",
//       marginRight: "5px",
//       cursor:"pointer",
//     }}
//   />},
//   {icon:<MoodBad
//     style={{
//       fontSize: "35px",
//       padding: "2.5px",
//       background: "#ffbb00",
//       color: "#000",
//       borderRadius: "20px",
//       marginRight: "5px",
//       cursor:"pointer",
//     }}
//   />},
// ];

const buttons = [
  // {
  //   icon: <ThumbUpOutlined size="small" style={{ marginRight: "10px" }} />,
  //   title: "Like",
  //   tooltip: postReactionTooltipIcon,
  // },
  {
    icon: <ChatBubbleOutline size="small" style={{ marginRight: "10px" }} />,
    title: "Comment",
  },
  {
    icon: (
      <ReplyOutlined
        size="small"
        style={{ marginRight: "10px", transform: "rotate(90deg)" }}
      />
    ),
    title: "Share",
  },
];

const postIconButton = [
  { icon: <InsertEmoticon size="small" />, title: "Insert an emoji" },
  { icon: <CameraAlt size="small" />, title: "Add a photo or video" },
  { icon: <GifSharp size="small" />, title: "Comment with a GIF" },
  { icon: <PhotoSharp size="small" />, title: "Commet with a sticker" },
];

const comments = [
  {
    text: "Israel launches air raids on Gaza, first since truce with Hamas",
    subComments: [{ text: "Trauma and mental health in Gaza" }],
  },
  {
    text: "The overnight air strikes gave way to calm by morning, and there were no reports of casualties on either sidemThe raids, the military said, came in response to the launching of the balloons, which caused 20 blazes in open fields in communities near Gaza ",
    subComments: [
      { text: "Gaza: The families left behind" },
      {
        text: "It was not immediately clear if there were casualties in Gaza as a result of the bombings.",
      },
    ],
  },
];

export default function ImagePost({ data }) {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:360px)");
  const [open, setOpen] = React.useState(false);
  const [relaventAnchor, setRelaventAnchor] = React.useState(false);

  const [commentFilter,setCommentFilter] = React.useState("Most Recent")


  const postReactionTooltipIcon = [
    { icon: <ThumbUpSharp className={classes.iconDesign} /> },
    { icon: <Favorite className={classes.iconDesign} style={{backgroundColor:"#e03251"}}/> },
    { icon: <EmojiEmotionsSharp className={classes.iconDesign} style={{backgroundColor:"#ffbb00"}}/> },
    { icon: <MoodBad className={classes.iconDesign} style={{backgroundColor:"#ffbb00",color:"#000"}}/> },
  ];

  const handleOpenRelavent = (e) => {
    setRelaventAnchor(e.currentTarget)
  };

  const handleCloseRelavent = (val) => {
    setRelaventAnchor(null)
    setCommentFilter(val)
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className={classes.postHeader}>
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AyVv06KRxDIdsjyaJeD34QAAAA%26pid%3DApi&f=1"
              width="36px"
              height="36px"
              className={classes.image}
            />
            <div className={classes.postInfo}>
              <Typography className={classes.postUser}>Star Sports</Typography>
              <div className={classes.postTimeSection}>
                <Typography className={classes.postTime}>16 hours</Typography>
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
          <div className={classes.postReviewSection}>
            <div className={classes.postReviewLeft}>
              {postReviewIcon.map((item,id) => (
                <Tooltip
                key={item.title+id}
                  title={item.title}
                  classes={{ tooltip: classes.customWidth1 }}
                  placement="bottom"
                >
                  {item.icon}
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
                  24k
                </Typography>
              </Tooltip>
            </div>
            <div className={classes.postReviewRight}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "300",
                  marginRight: "7.5px",
                  textTransform: "capitalize",
                }}
              >
                <div style={{ display: "flex" }}>
                  534
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
                }}
              >
                <div style={{ display: "flex" }}>
                  104
                  <span
                    style={{
                      display: matches ? "none" : "block",
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
          </div>
          <Divider style={{ marginTop: "20px" }} />
                    <img src="/w.jpg" width="1000px" height="400px"/>
          <div className={classes.postReactionSection}>
            <Tooltip
              interactive
              title={
                <div className={classes.postReactionTooltips}>
                  {postReactionTooltipIcon.map((item,id) => (
                    <span key={id} onClick={() => alert("log............")}>
                      {item.icon}
                    </span>
                  ))}
                </div>
              }
              classes={{ tooltip: classes.customWidth2 }}
              placement="top"
            >
              <Button
                style={{
                  padding: "7.5px 30px",
                }}
              >
                <ThumbUpOutlined size="small" style={{ marginRight: "10px" }} />
                <Typography
                  className={classes.postReactionTitle}
                  style={{
                    display: matches ? "none" : "block",
                  }}
                >
                  Like
                </Typography>
              </Button>
            </Tooltip>
            {buttons.map((item) => (
              <Button
                key={item.title}
                style={{
                  padding: "7.5px 30px",
                }}
              >
                {item.icon}

                <Typography
                  className={classes.postReactionTitle}
                  style={{
                    display: matches ? "none" : "block",
                  }}
                >
                  {item.title}
                </Typography>
              </Button>
            ))}
          </div>
          <Divider style={{ marginBottom: "20px" }} />
          <div className={classes.postCommentSection}>
            <div className={classes.postCommentFilter}
              onClick={handleOpenRelavent}
            >
              <Typography className={classes.postCommentFilterTitle}>
                {commentFilter}
              </Typography>
              <ArrowDropDown size="small" />
            </div>
            <div className={classes.postInputSection}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png"
                width="40px"
                height="40px"
              />
              <InputBase
                placeholder="Write a comment..."
                multiline
                className={classes.postInput}
                endAdornment={
                  <div style={{ display: "flex" }}>
                    {postIconButton.map((item,id) => (
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
          <div>
            {data.comments.map((comment,id) => (
              <Comment
                key={comment.text}
                name={comment.name}
                text={comment.text}
                subComments={comment.subComments}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <RelaventMenu relaventAnchor={relaventAnchor} handleCloseRelavent={handleCloseRelavent}/>
    </>
  );
}
