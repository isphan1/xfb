import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";

import {
  Drawer,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
  CssBaseline,
  Grid,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import {
  Settings,
  ArrowForwardIos,
  People,
  PersonAdd,
  GroupAdd,
  CardGiftcard,
  Group,
  Person,
} from "@material-ui/icons";

import { connect } from "react-redux";
import {
  accpetAddRequest,
  addFriendRequest,
  allFriends,
  friendRequests,
  myFriends,
  removeFriend,
} from "../../redux/post/action";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // display: "flex",
    // height: "100vh",
    marginLeft: "320px",
    padding: "0 20px",
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    "& .MuiTab-root": {
      maxWidth: "100%",
      padding: "0",
    },
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
    borderRight: "1px solid #ccc",
    backgroundColor: "#fff",
    border: "none",
    padding: "10px",
  },
  drawerContainer: {
    overflow: "auto",
  },
  friendsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px",
  },
  friendsBoxTitle: {
    fontSize: "24px",
    fontWeight: "700",
  },
  friendsBoxItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "5px",
    padding: "10px 7.5px",
    cursor: "pointer",

    "&:hover": {
      background: "#e9ebee",
      borderRadius: "7.5px",
    },
  },
  friendsBoxItemActive: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px",
    width: "100%",
    padding: "12.5px 7.5px",
    cursor: "pointer",
    background: "#cbe6f7",
    borderRadius: "7.5px",
  },
  paper: {
    color: theme.palette.text.secondary,
    // whiteSpace: 'nowrap',
    // marginBottom: theme.spacing(1),
  },
  friendsTitleBox: {
    display: "flex",
    alignItems: "center",
  },
  friendsBoxItemIcon: {
    backgroundColor: "#ccc",
    color: "#000",
  },
  friendsBoxItemIconActive: {
    backgroundColor: "#0068c8",
    color: "#fff",
  },
  friendsBoxItemTitle: {
    marginLeft: "10px",
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  friendsWrapper: {
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    padding: "0px 30px",
    marginLeft: "320px",
    marginTop: "-48px",
  },
  friendsHeaderLink: {
    color: "#0068c8",
    fontWeight: "400",
    cursor: "pointer",
  },
  friendsImage: {
    width: "100%",
    height: "240px",
    borderTopLeftRadius: "7.5px",
    borderTopRightRadius: "7.5px",
  },
  friendsInfo: {
    padding: "10px 15px 0px 15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "7.5px",
    borderBottomRightRadius: "7.5px",
  },
  friendsInfoTitle: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#000",
  },
  friendsInfoButton1: {
    margin: "20px 0 10px 0",
    backgroundColor: "#cbe6f7",
    "&:hover": {
      backgroundColor: "#d0e0ea",
    },
    textTransform: "capitalize",
  },
  friendsInfoButton2: {
    marginBottom: "15px",
    textTransform: "capitalize",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ marginTop: "48px" }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const friendsLink = [
  { icon: <People size="small" />, title: "Home", more: "" },
  {
    icon: <Person size="small" />,
    title: "Friend Requests",
    more: <ArrowForwardIos size="small" />,
  },
  {
    icon: <GroupAdd size="small" />,
    title: "Suggestions",
    more: <ArrowForwardIos size="small" />,
  },
  {
    icon: <Group size="small" />,
    title: "All Friends",
    more: <ArrowForwardIos size="small" />,
  },
  { icon: <CardGiftcard size="small" />, title: "Birthdays", more: "" },
];

const index = ({
  user,
  friends,
  addFriendRequest,
  fRequests,
  accpetAddRequest,
  allFriendsF,
  friendRequestsF,
  getMyFriends,
  removeFriend,
}) => {
  const classes = useStyles();

  const [active, setActive] = React.useState("Home");

  const [users, setUsers] = React.useState([]);

  const [friendRequests, setFirendRequest] = React.useState([]);

  const [myFriends, setMyfriends] = React.useState([]);

  React.useEffect(() => {
    allFriendsF({ user_id: user.user_id });
    friendRequestsF({ user_id: user.user_id });
  }, []);

  React.useEffect(() => {
    setUsers(friends);
  }, [friends]);

  React.useEffect(() => {
    setFirendRequest(fRequests);
  }, [fRequests]);

  React.useEffect(() => {
    setMyfriends(getMyFriends);
  }, [getMyFriends]);

  const addRequest = (id) => {
    addFriendRequest({ user_id: user.user_id, id: id });
  };

  const addAccpet = (id, item) => {
    accpetAddRequest({ user_id: user.user_id, id: id, user: item });
  };

  const addRemove = (id) => {
    removeFriend({ user_id: user.user_id, id: id });
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>Facebook | Friends</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/fa.ico" />
      </Head>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar variant="dense" />
        <div className={classes.friendsBox}>
          <Typography className={classes.friendsBoxTitle}>Friends</Typography>
          <IconButton size="small">
            <Settings size="small" />
          </IconButton>
        </div>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {friendsLink.map((item, id) => (
            <Tab
              key={item.title}
              {...a11yProps(id)}
              label={
                <div
                  onClick={() => setActive(item.title)}
                  className={
                    item.title == active
                      ? classes.friendsBoxItemActive
                      : classes.friendsBoxItem
                  }
                >
                  <div className={classes.friendsTitleBox}>
                    <IconButton
                      size="small"
                      className={
                        item.title == active
                          ? classes.friendsBoxItemIconActive
                          : classes.friendsBoxItemIcon
                      }
                    >
                      {item.icon}
                    </IconButton>
                    <Typography className={classes.friendsBoxItemTitle}>
                      {item.title}
                    </Typography>
                  </div>
                  {item.more != "" ? (
                    <IconButton size="small">{item.more}</IconButton>
                  ) : (
                    ""
                  )}
                </div>
              }
            />
          ))}
        </Tabs>
      </Drawer>

      <div className={classes.root}>
        <TabPanel value={value} index={0}>
          <div className={classes.friendsBox} style={{ padding: "20px 0" }}>
            <Typography className={classes.friendsBoxTitle}>
              People you may know
            </Typography>
            <Typography className={classes.friendsHeaderLink}>
              See All
            </Typography>
          </div>
          <Grid container spacing={2}>
            {users.map((item) => (
              <Grid
                key={item.id}
                item
                md={3}
                container
                direction="column"
                style={{
                  borderRadius: "7.5px",
                }}
              >
                <Paper className={classes.paper}>
                  <img
                    src={"http://localhost:8000/media/" + item.profile_photo}
                    className={classes.friendsImage}
                  />
                  <div className={classes.friendsInfo}>
                    <Typography className={classes.friendsInfoTitle}>
                      {item.user__first_name}
                    </Typography>
                    <Button
                      onClick={() => addRequest(item.user__id)}
                      className={classes.friendsInfoButton1}
                      variant="contained"
                    >
                      Add Friend
                    </Button>
                    <Button
                      className={classes.friendsInfoButton2}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {friendRequests.length <= 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "20%",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
                height="112px"
              />
              <Typography>
                When you have friend requests or suggestions, you'll see them
                here.{" "}
              </Typography>
            </div>
          ) : (
            <>
              <div className={classes.friendsBox} style={{ padding: "20px 0" }}>
                <Typography className={classes.friendsBoxTitle}>
                  Make new friend
                </Typography>
                {/* <Typography className={classes.friendsHeaderLink}>
              See All
            </Typography> */}
              </div>
              <Grid container spacing={2}>
                {friendRequests.map((item) => (
                  <Grid
                    key={item.id}
                    item
                    md={3}
                    container
                    direction="column"
                    style={{
                      borderRadius: "7.5px",
                    }}
                  >
                    <Paper className={classes.paper}>
                      <img
                        src={
                          "http://localhost:8000/media/" + item.profile_photo
                        }
                        className={classes.friendsImage}
                      />
                      <div className={classes.friendsInfo}>
                        <Typography className={classes.friendsInfoTitle}>
                          {item.user__first_name}
                        </Typography>
                        <Button
                          onClick={() => addAccpet(item.user__id, item)}
                          className={classes.friendsInfoButton1}
                          style={{ color: "red" }}
                          variant="contained"
                        >
                          Accpet Request
                        </Button>
                        <Button
                          className={classes.friendsInfoButton2}
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20%",
              alignItems: "center",
              height: "100vh",
              fontSize: "24px",
            }}
          >
            <img
              src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
              height="112px"
            />
            <Typography>
              Select people's names to preview their profile.
            </Typography>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {myFriends.length <= 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "20%",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src="https://www.facebook.com/images/comet/empty_states_icons/people/null_states_people_gray_wash.svg"
                height="112px"
              />
              <Typography style={{ fontSize: "18px" }}>
                {" "}
                No Friends to Show
              </Typography>
              <Typography>
                When you become friends with people on Facebook, they'll appear
                here.
              </Typography>
            </div>
          ) : (
            <>
              <div className={classes.friendsBox} style={{ padding: "20px 0" }}>
                <Typography className={classes.friendsBoxTitle}>
                  My friends list
                </Typography>
                {/* <Typography className={classes.friendsHeaderLink}>
              See All
            </Typography> */}
              </div>
              <Grid container spacing={2}>
                {myFriends.map((item) => (
                  <Grid
                    key={item.id}
                    item
                    md={3}
                    container
                    direction="column"
                    style={{
                      borderRadius: "7.5px",
                    }}
                  >
                    <Paper className={classes.paper}>
                      <img
                        src={
                          "http://localhost:8000/media/" + item.profile_photo
                        }
                        className={classes.friendsImage}
                      />
                      <div className={classes.friendsInfo}>
                        <Typography className={classes.friendsInfoTitle}>
                          {item.user__first_name}
                        </Typography>
                        <Button
                          onClick={() => addRemove(item.user__id)}
                          className={classes.friendsInfoButton1}
                          style={{ color: "red" }}
                          variant="contained"
                        >
                          Remove
                        </Button>
                        {/* <Button
                      className={classes.friendsInfoButton2}
                      variant="contained"
                    >
                      Remove
                    </Button> */}
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20%",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fbirthday-8%2F512%2Fcupcake_candle_birthday_celebration_cake-512.png&f=1&nofb=1"
              height="112px"
              style={{ marginBottom: "20px" }}
            />
            <Typography>
              When your friends have birthdays, they will appear here.
            </Typography>
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

index.layout = "L1";

// export const getServerSideProps = async (res,req) => {

// const BASE_URL = "https://dummyapi.io/data/api";
// const APP_ID = "60cfe9b13605e4b79763dfc0";

//   const users = await axios
//     .get(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
//     .then(({ data }) => data.data)
//     .catch((e) => ({}));

//   axiosInstance({
//     method:"post",

//   })

// return {
//   props: {
//     users:users,
//   },
// };

// };

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    friends: state.posts.friends,
    fRequests: state.posts.fRequests,
    getMyFriends: state.posts.myFriends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriendRequest: (data) => dispatch(addFriendRequest(data)),
    accpetAddRequest: (data) => dispatch(accpetAddRequest(data)),
    removeFriend: (data) => dispatch(removeFriend(data)),
    allFriendsF: (data) => dispatch(allFriends(data)),
    friendRequestsF: (data) => dispatch(friendRequests(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
