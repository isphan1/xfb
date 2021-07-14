import Head from "next/head";
// import Link from "next/link";
import ImagePost from "../components/ImagePost";
import axiosInstance from "../components/axios";
import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Hidden,
  CssBaseline,
  CardContent,
  Grid,
  InputBase,
  makeStyles,
  Divider,
  Button,
  Typography,
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@material-ui/core";
import SideNav from "../components/SideNav";
import {
  InsertEmoticon,
  InsertPhoto,
  VideoCall,
  Videocam,
  Add,
  Search,
  MoreHoriz,
  KeyboardBackspace,
  Public,
  ThumbUpSharp,
  Favorite,
  ChatBubbleOutline,
  ThumbUpOutlined,
  ReplyOutlined,
  MessageSharp,
} from "@material-ui/icons";
import Post from "../components/Post";
import CustomPostDialog from "../components/CustomPostDialog";
import axios from "axios";
import Cookie from "js-cookie";
import Layout1 from "./Layout1";
import {
  addPost,
  allFriends,
  allPosts,
  friendRequests,
  myFriends,
} from "../redux/post/action";
import LOADING from "../common/Loading";
import MessageBox from "./MessageBox";
import { getMessageInfo } from "../redux/auth/action";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    backgroundColor: "#f5f5f7",
    "@media (max-width: 510px)": {
      padding: "20px 0",
    },
  },
  story: {
    height: "200px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
  storyBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "120px",
    height: "100%",
    borderRadius: "10px",
    backgroundColor: "#fff",
    marginRight: "10px",
    position: "relative",
    alignItems: "center",
    cursor: "pointer",
    opacity: "1",

    "&:hover": {
      opacity: ".7",
      "& img": {
        transform: "scale(1.01)",
      },
    },
  },
  postBoxInput:{
    marginLeft: "5px",
    backgroundColor: "#f5f5f7",
    borderRadius: "20px",
    width: "100%",
    cursor: "pointer",
    outline: "none",
    border: "none",
    padding: "7.5px 10px",
    fontSize: "18px",
    "@media (max-width: 400px)": {
      fontSize: "14px",
    },
  },
  storyBoxAdd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1200",
    position: "absolute",
    background: "#fff",
    height: "45px",
    width: "45px",
    borderRadius: "50px",
    top: "60%",
    left: "35%",
  },
  storyBoxSlide: {
    width: "120px",
    height: "100%",
    borderRadius: "10px",
    backgroundColor: "#ccc",
    marginRight: "10px",
    position: "relative",
    cursor: "pointer",
    opacity: "1",

    "&:hover": {
      opacity: ".7",
      "& img": {
        transform: "scale(1.01)",
      },
    },
  },
  storyBoxSlideTitle: {
    position: "absolute",
    bottom: "2.5px",
    color: "#fff",
    padding: "2.5px 5px",
    textAlign: "start",
    fontWeight: "bold",
  },
  storyBoxSlideImage: {
    position: "absolute",
    background: "#e9ebee",
    zIndex: "1200",
    height: "40px",
    width: "40px",
    border: "4px solid #0068c8",
    borderRadius: "30px",
    top: "15px",
    left: "15px",
  },
  wrapper: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    padding: "0 30%",
    [theme.breakpoints.down("md")]: {
      padding: "0 25%",
    },
    "@media (max-width: 960px)": {
      padding: "0 15%",
    },
    "@media (max-width: 700px)": {
      padding: "0 5%",
    },
    "@media (max-width: 500px)": {
      padding: "0 2.5px",
    },
  },
  floatButton: {
    position: "absolute",
    background: "#fff",
    height: "50px",
    border: "1px solid #efe9e9",
    width: "50px",
    borderRadius: "50%",
    top: "38%",
    zIndex: "1202",
    marginLeft: "630px",
    "&:hover": {
      backgroundColor: "#f7f8fb",
    },
    "@media (max-width: 1200px)": {
      marginLeft: "370px",
    },
    "@media (max-width: 990px)": {
      marginLeft: "630px",
    },
    "@media (max-width: 960px)": {
      marginLeft: "630px",
    },
    "@media (max-width: 710px)": {
      marginLeft: "370px",
    },
    "@media (max-width: 420px)": {
      marginLeft: "80%",
    },
    "@media (max-width: 410px)": {
      marginLeft: "62.5%",
    },
  },
  postBox: {
    marginTop: "20px",
    "& .MuiCardContent-root:last-child": {
      padding: "15px 0 10px 0",
    },
  },
  createRoom: {
    margin: "20px 0",
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "15px",
    },
  },
  viewPost: {},
  drawer: {
    width: drawerWidth,
    zIndex: "10",
    flexShrink: 0,
    "@media (max-width: 990px)": {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f5f5f7",
    border: "none",
  },
  drawerContainer: {
    overflow: "auto",
  },

  hoverIcon:{
    position: "fixed",
    cursor: "pointer",
    top: "85vh",
    right: "30px",
    border: "1px solid #ccc",
    zIndex: "1300",
    width: "50px",
    height: "50px",
    backgroundColor: "#fff",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 700px)": {
      display:"none"
    }
    }
}));

const postbuttons = [
  {
    icon: <VideoCall style={{ color: "red", fontSize: "30px" }} />,
    title: "Live Video",
    titleShort: "Live",
  },
  {
    icon: <InsertPhoto style={{ color: "#37a000", fontSize: "30px" }} />,
    title: "Photo/Video",
    titleShort: "Upload",
  },
  {
    icon: <InsertEmoticon style={{ color: "#ffbb00", fontSize: "30px" }} />,
    title: "Feeling/Activity",
    titleShort: "Activity",
  },
];

const story = [
  {
    icon: "https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png",
    image:
      "https://www.nydailynews.com/resizer/CEEJYohg9VZAqlqB4WEg0wTz4LA=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/TAU2JU73A5HNVJO7IPO5J3XJOU.jpg",
    title: "ICC World Cricket",
  },
  {
    icon: "http://getdrawings.com/free-icon/cool-avatar-icons-72.png",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L83LSSctcvolscNP1IRo5QHaFj%26pid%3DApi&f=1",
    title: "Start Sports",
  },
  {
    icon: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png",
    image:
      "https://media.architecturaldigest.com/photos/56f06e46dc71add34a963eb8/master/pass/sasha-bikoff-paris-guide.jpg",
    title: "Discovery World",
  },
  {
    icon: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3rtkFfs9ZRYqAJTJPM1owQHaD4%26pid%3DApi&f=1",
    title: "Life in the Race",
  },
];

const Dashboard = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1200px)");
  const matches1 = useMediaQuery("(max-width:990px)");
  const matches2 = useMediaQuery("(max-width:710px)");
  const matches3 = useMediaQuery("(max-width:410px)");

  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [openMessageEl, setOpenMessageEl] = React.useState(false);
  const [messageUser, setMessageUser] = React.useState({});

  const handlePostDialogOpen = () => {
    setOpen(true);
  };

  const handlePostDialogClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    props.allPosts({ username: props.auth.username });
    props.myFriends({ user_id: props.auth.user.user_id });
    props.getMessageInfo({ sender: props.auth.username });
  }, []);

  React.useEffect(() => {
    setPosts(props.posts.posts);
  }, [props.posts.posts]);

  const handleOpenMessageBox = (user) => {
    setOpenMessageEl(true);
    setMessageUser(user);
  };

  return (
    <Layout1>
      <div>
        <Head>
          <title>Facebook</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/fa.ico" />
        </Head>
        <div className={classes.root}>
          <CssBaseline />

          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <Toolbar variant="dense" />
            <div
              className={classes.drawerContainer}
              style={{ marginLeft: "20px" }}
            >
              <SideNav />
            </div>
          </Drawer>

          <main style={{ flexGrow: 1, position: "relative" }}>
            <div
              // onClick={handleOpenMessageEl}
              className={classes.hoverIcon}
            >
              <MessageSharp />
            </div>
            <div className={classes.story}>
              <IconButton className={classes.floatButton}>
                <KeyboardBackspace
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "27%",
                    transform: "rotate(180deg)",
                  }}
                />
              </IconButton>

              <div className={classes.storyBox}>
                <div className={classes.storyBoxAdd}>
                  <Add
                    style={{
                      backgroundColor: "#009cde",
                      color: "#fff",
                      padding: "2.5px",
                      fontSize: "35px",
                      borderRadius: "40px",
                    }}
                  />
                </div>
                <img
                  src="w.jpg"
                  height="145px"
                  style={{
                    width: "100%",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                  }}
                />
                <Typography
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    marginBottom: "13px",
                  }}
                >
                  Create Story
                </Typography>
              </div>

              {story.map((item, i) => (
                <div
                  key={item.title}
                  className={classes.storyBoxSlide}
                  style={{
                    display: matches3
                      ? i % 4 != 0
                        ? "none"
                        : "flex"
                      : matches2
                      ? i % 2 == 0
                        ? "none"
                        : "flex"
                      : matches1
                      ? "flex"
                      : matches
                      ? i % 2 == 0
                        ? "none"
                        : "flex"
                      : "flex",
                  }}
                >
                  <img src={item.icon} className={classes.storyBoxSlideImage} />
                  <img
                    src={item.image}
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                  <Typography className={classes.storyBoxSlideTitle}>
                    {item.title}
                  </Typography>
                </div>
              ))}
            </div>

            <div className={classes.wrapper}>
              <Card className={classes.postBox}>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 10px",
                    }}
                  >
                    <img
                      src={props.auth.user.profile_photo}
                      width="40px"
                      height="40px"
                      style={{
                        borderRadius: "50px",
                      }}
                    />
                    <div
                      onClick={handlePostDialogOpen}
                      className={classes.postBoxInput}
                    >
                      What's on your mind, Abu
                    </div>
                  </div>
                  <Divider style={{ margin: "10px" }} />
                  <Grid
                    container
                    style={{
                      display: "flex",
                      justifyContent: matches ? "space-evenly" : "center",
                    }}
                  >
                    {postbuttons.map((item) => (
                      <Button key={item.title}>
                        {item.icon}
                        <Typography
                          style={{
                            textTransform: "capitalize",
                            fontSize: "14px",
                            marginLeft: "5px",
                            fontWeight: "bolder",
                          }}
                        >
                          <span
                            style={{ display: matches3 ? "block" : "none" }}
                          >
                            {item.titleShort}
                          </span>
                          <span
                            style={{ display: matches3 ? "none" : "block" }}
                          >
                            {item.title}
                          </span>
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card className={classes.createRoom}>
                <CardContent>
                  <Button
                    variant="outlined"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <VideoCall style={{ color: "#9a4bff", fontSize: "30px" }} />
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        fontSize: "14px",
                        marginLeft: "5px",
                        fontWeight: "bolder",
                        color: "#1da1f2",
                      }}
                    >
                      Create room
                    </Typography>
                  </Button>
                </CardContent>
              </Card>

              {props.posts.loading
                ? [1, 2, 3, 4, 5, 6].map((item) => <LOADING key={item} />)
                : posts.map((item) => <Post key={item.post.id} item={item} />)}
              {/* {props.posts.posts.map((item) => (
                  <ImagePost key={item.post.text} data={item} />
                ))} */}
            </div>
          </main>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="right"
            classes={{ paper: classes.drawerPaper }}
          >
            <Toolbar variant="dense" />
            <div
              className={classes.drawerContainer}
              style={{ marginRight: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 5px",
                  margin: "7.5px 0",
                }}
              >
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                  }}
                >
                  Contacts
                </Typography>
                <div>
                  <IconButton size="small">
                    <VideoCall />
                  </IconButton>
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                  <IconButton size="small">
                    <MoreHoriz />
                  </IconButton>
                </div>
              </div>
              <div>
                {props.getMyFriends.map((item) => (
                  <Button
                    key={item.id}
                    style={{
                      width: "100%",
                      position: "relative",
                      padding: "20px 0",
                    }}
                    onClick={() => handleOpenMessageBox(item)}
                  >
                    <div
                      style={{
                        display: "flex",
                        position: "absolute",
                        left: "5px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "12px",
                          height: "12px",
                          borderRadius: "20px",
                          backgroundColor: "#5ad01c",
                          left: "22px",
                          top: "22px",
                          border: "2px solid #eee",
                        }}
                      ></div>
                      <img
                        src={
                          item.profile_photo
                        }
                        width="33px"
                        height="33px"
                        style={{
                          borderRadius: "50px",
                        }}
                      />
                      <Typography
                        style={{
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: "300",
                          marginLeft: "10px",
                        }}
                      >
                        {item.user__first_name}
                      </Typography>
                    </div>
                  </Button>
                ))}
              </div>
              <Divider style={{ margin: "15px 0" }} />
              <div>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginBottom: "5px",
                    padding: "0 5px",
                    marginBottom: "7.5px",
                  }}
                >
                  Group Conversations
                </Typography>
                <Button
                  style={{
                    width: "100%",
                    padding: "20px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      alignItems: "center",
                      left: "5px",
                    }}
                  >
                    <Add
                      style={{
                        background: "#ccc",
                        borderRadius: "50px",
                        width: "22.5px",
                        height: "22.5px",
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      style={{
                        textTransform: "capitalize",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                    >
                      Create new Group
                    </Typography>
                  </div>
                </Button>
              </div>
            </div>
          </Drawer>
        </div>

        <CustomPostDialog
          open={open}
          handlePostDialogClose={handlePostDialogClose}
          addPost={props.addPost}
          user={{
            user_id: props.auth.user.user_id,
            profile_photo: props.auth.user.profile_photo,
            name: props.auth.user.name,
          }}
        />
        <MessageBox
          openMessageEl={openMessageEl}
          setOpenMessageEl={setOpenMessageEl}
          user={messageUser}
        />
      </div>
    </Layout1>
  );
};

export async function getStaticProps({ req, res }) {
  // const posts = await axiosInstance({
  //       method:"get",
  //       url:`posts/`,
  //       withCredentials:true,
  //       headers:{
  //         // Authorization: "JWT "+ req.cookies.access_token
  //       }
  // }).then(res=>{
  //     return res.data
  //     console.log(res.data)
  // }).catch(err=>{
  //   console.log(res.data)

  // })

  const posts = [];

  return {
    props: {
      posts,
    },
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    getMyFriends: state.posts.myFriends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allPosts: (data) => dispatch(allPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    myFriends: (data) => dispatch(myFriends(data)),
    getMessageInfo: (data) => dispatch(getMessageInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
