import React from "react";
import {
  makeStyles,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Divider,
  InputBase,
  Button,
  Grid,
} from "@material-ui/core";
import {
  Settings,
  PersonAdd,
  ThumbUpSharp,
  ThumbUpOutlined,
  Assistant,
  Add,
  LiveTv,
  Bookmark,
  Videocam,
  Movie,
  Search,
  People,
  GroupAdd,
  Group,
  CardGiftcard,
  ArrowForwardIos,
  Person,
  MoreHoriz,
  Public,
  ReplyOutlined,
  ChatBubbleOutline,
  Favorite,
} from "@material-ui/icons";
import Head from "next/head";
const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginLeft: "320px",
    padding: "20px 40px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "@media (max-width: 990px)": {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#fff",
    border: "none",
    padding: "10px",
  },
  drawerContainer: {
    overflow: "auto",
  },
  watchHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
  watchHeaderTitle: {
    fontSize: "24px",
    fontWeight: "700",
  },
  watchList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
  watchListTitle: {
    fontSize: "18px",
    fontWeight: "500",
  },
  watchListLink: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#009cde",
  },
  watchCreateButton: {
    textTransform: "capitalize",
    width: "100%",
    backgroundColor: "#cbe6f7",
    "&:hover": {
      backgroundColor: "#d0e0ea",
    },
    margin: "5px 0px",
  },
  watchIconButton: {
    backgroundColor: "#f1eaea",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  watchIconButton1: {
    backgroundColor: "#f1eaea",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#f1eaea",
    },
  },
  watchLink: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    marginTop: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ccc",
      borderRadius: "7.5px",
    },
  },
  watchLinkTitle: {
    marginLeft: "10px",
    fontSize: "16px",
    fontWeight: "400",
    color: "#000",
  },
  watchSearchInput: {
    backgroundColor: "#f0f2f5",
    borderRadius: "50px",
    padding: "2.5px 5px",
    fontSize: "16px",
    alignItems: "center",
    color: "#6d6969",
    width: "100%",
    marginBottom: "10px",
  },
  watchBoxTitle: {
    fontSize: "24px",
    fontWeight: "700",
  },
  watchBoxItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    padding: "10px 7.5px",
    cursor: "pointer",

    "&:hover": {
      background: "#e9ebee",
      borderRadius: "7.5px",
    },
  },
  watchBoxItemActive: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    padding: "12.5px 7.5px",
    cursor: "pointer",
    background: "#cbe6f7",
    borderRadius: "7.5px",
  },
  watchTitleBox: {
    display: "flex",
    alignItems: "center",
  },
  watchBoxItemIcon: {
    backgroundColor: "#ccc",
    color: "#000",
  },
  watchBoxItemIconActive: {
    backgroundColor: "#0068c8",
    color: "#fff",
  },
  watchBoxItemTitle: {
    marginLeft: "10px",
    fontSize: "16px",
    fontWeight: "500",
  },
  videoWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
  },
  videoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "0px 20px",
  },
  videoUserImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
  },
  videoUserTitle: {
    fontSize: "16px",
    fontWeight: "700",
  },
  videoUserFollow: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#009cde",
    marginLeft: "10px",
  },
  videoUserBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
  },
  videoTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    padding: "0px 20px",
  },
  videoText: {
    fontSize: "14px",
    fontWeight: "300",
    padding: "0px 20px",
  },
  videoMediaBox: {
    width: "100%",
    height: "450px",
    margin: "10px 0px",
  },
  videoReaction: {
    display: "flex",
    padding: "0px 20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoUserIcon: {
    fontSize: "15px",
    marginLeft: "10px",
    color: "#615f5f",
  },
}));

const watchLink = [
  { icon: <LiveTv size="small" />, title: "Home" },
  {
    icon: <Videocam size="small" />,
    title: "Live",
  },
  {
    icon: <Movie size="small" />,
    title: "Shows",
  },
  {
    icon: <Bookmark size="small" />,
    title: "Saved Videos",
  },
];

const reactionButton = [
  { icon: <ThumbUpOutlined size="small" />, title: "Like" },
  { icon: <ChatBubbleOutline size="small" />, title: "Comment" },
  {
    icon: <ReplyOutlined size="small" style={{ transform: "rotate(90deg)" }} />,
    title: "Share",
  },
];

const postReviewIcon = [
  {
    icon: (
      <ThumbUpSharp
        size="small"
        style={{
          fontSize: "16px",
          padding: "2.5px",
          background: "#009cde",
          color: "#fff",
          borderRadius: "20px",
          marginTop: "7px",
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
          fontSize: "16px",
          padding: "2px",
          background: "#e03251",
          color: "#fff",
          borderRadius: "20px",
          marginTop: "7px",
        }}
      />
    ),
    title: "Love",
  },
];

const market = () =>{
  const classes = useStyles();
  const [active, setActive] = React.useState("Home");

  return (
    <div>
      <Head>
        <title>Watch | Facebook</title>
      </Head>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar variant="dense" />
        <div className={classes.watchHeader}>
          <Typography className={classes.watchHeaderTitle}>Watchs</Typography>
          <IconButton size="small" className={classes.watchIconButton}>
            <Settings size="small" />
          </IconButton>
        </div>
        <InputBase
          className={classes.watchSearchInput}
          placeholder="Search videos"
          startAdornment={
            <Search size="small" style={{ marginRight: "7.5px" }} />
          }
        />
        <div className={classes.drawerContainer}>
          {watchLink.map((item) => (
            <div
              key={item.title}
              onClick={() => setActive(item.title)}
              className={
                item.title == active
                  ? classes.watchBoxItemActive
                  : classes.watchBoxItem
              }
            >
              <div className={classes.watchTitleBox}>
                <IconButton
                  size="small"
                  className={
                    item.title == active
                      ? classes.watchBoxItemIconActive
                      : classes.watchBoxItemIcon
                  }
                >
                  {item.icon}
                </IconButton>
                <Typography className={classes.watchBoxItemTitle}>
                  {item.title}
                </Typography>
              </div>
              {item.more != "" ? (
                <IconButton size="small">{item.more}</IconButton>
              ) : (
                ""
              )}
            </div>
          ))}
          <Divider style={{ margin: "10px 0px" }} />

          <div className={classes.watchList}>
            <Typography className={classes.watchListTitle}>
              Your Watchlist
            </Typography>
            <Typography className={classes.watchListLink}>Manager</Typography>
          </div>

          {watchLink.map((item) => (
            <div key={item.title} className={classes.watchBoxItem}>
              <div className={classes.watchTitleBox}>
                <IconButton size="small" className={classes.watchBoxItemIcon}>
                  {item.icon}
                </IconButton>
                <Typography className={classes.watchBoxItemTitle}>
                  {item.title}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
      <main className={classes.root}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item md={4} key={item}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fafafa",
                }}
              >
                <img
                  src="https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg"
                  style={{
                    width: "100%",
                    height: "280px",
                  }}
                />
                <Typography style={{ fontSize: "16px", fontWeight: "500",marginTop:"10px" }}>
                  Free
                </Typography>
                <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
                  Online Official Job
                </Typography>
                <Typography style={{ fontSize: "12px", fontWeight: "300" }}>
                  Jessore,Khulna
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}

market.layout = "L1";

export default market