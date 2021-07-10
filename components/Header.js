import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import SearchMenu from "./SearchMenu";
import AccountMenu from "./AccountMenu";
import NotificationMenu from "./NotificationMenu";
import CreateMenu from "./CreateMenu";
import MessangerMenu from "./MessangerMenu";
import {
  Menu as MenuIcon,
  Add,
  Notifications,
  Search,
  Message,
  ArrowDropDown,
  OndemandVideoOutlined,
  StorefrontOutlined,
  Home,
  Flag,
  People
} from "@material-ui/icons";
import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  IconButton,
  Hidden,
  Button,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setTabValue } from "../redux/auth/action";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.appBar + 200,
  },
  tabLink: {
    color: "#1e1d80",
    fontSize: "15.5px",
    fontWeight: "bolder",
    padding: "0 20px",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    textTransform: "capitalize",
    "&:hover": {
      color: "#37a000",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  iconButton: {
    margin: "0 5px",
    backgroundColor: "#f0f2f5",
    color: "#000",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  button: {
    padding: "10px 20px",
    fontSize: "30px",
    fontWeight: "300",
    backgroundColor: "#ccc",
  },
  buttonTab: {
    padding: "10px 30px",
    fontSize: "30px",
    fontWeight: "300",
    color: "#65676b",
    "& .MuiButton-text": {
      padding: "10px 8px",
    },
    "&:hover": {
      color: "#009cde",
    },
  },
  buttonActive: {
    padding: "10px 30px",
    fontSize: "30px",
    fontWeight: "300",
    color: "#009cde",
    borderBottom: "3px solid #009cde",
    borderRadius: "0",
    "& .MuiButton-text": {
      padding: "10px 8px",
    },
  },
  fbButton: {
    fontSize: "15px",
    fontWeight: "bolder",
    color: "#fff",
    background: "linear-gradient(to bottom,#4285F4,#0068c8)",
  },
  buttonTabs: {
    display: "flex",
    borderRadius: "0px",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-evenly",
    },
    "& .MuiTab-root": {
      minWidth: "96px",
      [theme.breakpoints.down("md")]: {
        minWidth: "90px",
        justifyContent: "center",
        backgroundColor: "red",
      },
      padding: "2.5px 2.5px",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#1d181a",
    },
  },
  customWidth: {
    minWidth: "40px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    marginTop: "2px",
  },
  customWidth1: {
    minWidth: "40px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    marginTop: "9px",
  },
  tabButton: {
    fontWeight: "24px",
  },
  searchInput1: {
    marginLeft: "5px",
    marginTop: "-3px",
    borderRadius: "30px",
    backgroundColor: "#f0f2f5",
    width: "70%",
    padding: "7.5px 5px",
    cursor: "pointer",
    alignItems: "center",
    color: "#6d6969",
    fontSize: "16px",
  },
  searchInputIcon: {
    backgroundColor: "#f0f2f5",
    marginLeft: "2.5px",
    top: "-2px",
    padding: "7px",
  },
}));

const Header = (props) =>{
  const classes = useStyles();
  const router = useRouter();
  const username = "kamal";
  const tabs = [
    { icon: <Home className={classes.tabButton} />, href: "", title: "Home" },
    {
      icon: <People className={classes.tabButton} />,
      href: "friends",
      title: "Friends",
    },
    {
      icon: <Flag className={classes.tabButton} />,
      href: "page",
      title: "Pages",
    },
    {
      icon: <OndemandVideoOutlined className={classes.tabButton} />,
      href: "watch",
      title: "Watch",
    },
    {
      icon: <StorefrontOutlined className={classes.tabButton} />,
      href: "market",
      title: "Marketplace",
    },
  ];

  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const [createAnchor, setCreateAnchor] = React.useState(null);
  const [messangerAnchor, setMessangerAnchor] = React.useState(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);
  const [accountAnchor, setAccountAnchor] = React.useState(null);
  const [active, setActive] = React.useState("");
  const [results,setResults] = React.useState([])

  const matches = useMediaQuery("(min-width:1120px)");

  const matches1 = useMediaQuery("(max-width:1275px)");

  const handleOpenSearch = (e) => {
    setSearchAnchor(e.currentTarget);
    setTimeout(() => {
      document.getElementById("ab").focus();
    }, 300);
  };

  const handleCloseSearch = () => {
    setSearchAnchor(null);
    setSearch("");
    setResults([])
  };

  const handleOpenCreate = (e) => {
    setCreateAnchor(e.currentTarget);
  };

  const handleOpenMessanger = (e) => {
    setMessangerAnchor(e.currentTarget);
  };

  const handleOpenNotification = (e) => {
    setNotificationAnchor(e.currentTarget);
  };

  const handleOpenAccount = (e) => {
    setAccountAnchor(e.currentTarget);
  };

  const handleCloseCreate = () => {
    setCreateAnchor(null);
  };

  const handleCloseMessanger = () => {
    setMessangerAnchor(null);
  };

  const handleCloseNotification = () => {
    setNotificationAnchor(null);
  };

  const handleCloseAccount = () => {
    setAccountAnchor(null);
  };

  const addActiveClass = (val) => {
    props.setTabValue({'tab':val.title})
    setActive(props.tabValue);
    router.push(`/${val.href}`)
    // console.log(val.title, active);
  };


  React.useEffect(() => {
    setActive(props.tabValue);
  }, [])

  React.useEffect(() => {
    setActive(props.tabValue);
  }, [props.tabValue])

  const toolTipIcon = [
    { icon: <Add />, title: "Create", func: handleOpenCreate },
    { icon: <Message />, title: "Messanger", func: handleOpenMessanger },
    {
      icon: <Notifications />,
      title: "Notifications",
      func: handleOpenNotification,
    },
    { icon: <ArrowDropDown />, title: "Account", func: handleOpenAccount },
  ];

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <AppBar
        style={{ backgroundColor: "#fff" }}
        position="fixed"
        elevation={1}
        className={classes.appBar}
      >
        <Toolbar variant="dense">
          <Grid container spacing={3} alignItems="center">
            <Grid
              item
              sm={2}
              md={matches1 ? 2 : 3}
              xs={6}
              container
              alignItems="center"
            >
              <Link href="/">
                <span style={{ cursor: "pointer" }}>
                  <img src="/lo.jpeg" width="35px" height="35px" />
                </span>
              </Link>
              <div
                onClick={handleOpenSearch}
                className={classes.searchInput1}
                style={{ display: matches1 ? "none" : "flex" }}
              >
                <Search fontSize="small" style={{ margin: "0 5px" }} />
                Search Facebook
              </div>
              <IconButton
                onClick={handleOpenSearch}
                className={classes.searchInputIcon}
                style={{
                  display: matches1 ? "flex" : "none",
                }}
                size="small"
              >
                <Search fontSize="small" />
              </IconButton>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={9} md={matches1 ? 8 : 5} className={classes.buttonTabs}>
                {tabs.map((item) => (
                  // <Link key={item.title} href={`/${item.href}`}>
                    <Tooltip
                    key={item.title}
                      title={item.title}
                      classes={{ tooltip: classes.customWidth }}
                    >
                      <Button
                        onClick={()=>addActiveClass(item)}
                        className={

                          active == item.title ? classes.buttonActive : classes.buttonTab
                        }
                      >
                        {item.icon}
                      </Button>
                    </Tooltip>
                  // </Link>
                ))}
              </Grid>
            </Hidden>
            <Grid item sm={1} md={matches1 ? 2 : 4} xs={6} style={{ textAlign: "end" }}>
              <Hidden lgUp>
                {/* <Link
                  href="/user/[username]/settings"
                  as={`/user/${username}/settings`}
                > */}
                  <IconButton edge="start" onClick={(e)=>handleOpenAccount(e)}>
                    <MenuIcon />
                  </IconButton>
                {/* </Link> */}
              </Hidden>
              <Hidden mdDown>
                <Link href="/about">
                  <Button
                    style={{
                      padding: "5px 10px",
                      margin: "0 10px",
                      textTransform:"capitalize"
                    }}
                  >
                    <img
                      src={props.auth.profile_photo}
                      width="30px"
                      height="30px"
                      style={{
                        borderRadius:"40px",
                        marginRight: "5px",
                      }}
                    />
                    {props.auth.name}
                  </Button>
                </Link>
                {toolTipIcon.map((item) => (
                  <Tooltip
                    key={item.title}
                    title={item.title}
                    classes={{ tooltip: classes.customWidth1 }}
                  >
                    <IconButton
                      className={classes.iconButton}
                      onClick={item.func}
                      size="small"
                      style={{
                        padding: "5px",
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <SearchMenu
        searchAnchor={searchAnchor}
        handleCloseSearch={handleCloseSearch}
        search={search}
        setSearch={setSearch}
        results={results}
        setResults={setResults}
      />
      <AccountMenu
        accountAnchor={accountAnchor}
        handleCloseAccount={handleCloseAccount}
        user={props.auth}
      />
      <NotificationMenu
        notificationAnchor={notificationAnchor}
        handleCloseNotification={handleCloseNotification}
      />
      <MessangerMenu
        messangerAnchor={messangerAnchor}
        handleCloseMessanger={handleCloseMessanger}
      />
      <CreateMenu
        createAnchor={createAnchor}
        handleCloseCreate={handleCloseCreate}
      />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
    tabValue:state.auth.currentTab
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    setTabValue: (data) => dispatch(setTabValue(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)