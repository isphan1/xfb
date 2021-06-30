import { Menu, Divider, makeStyles, Typography } from "@material-ui/core";
import {
  SmsFailed,
  ImportContacts,
  VideoCall,
  Flag,
  EventAvailable,
  Storefront,
  Create,
  Group,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "9999",
    "& .MuiMenu-paper": {
      width: "360px",
      padding: "10px 10px 0 10px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      right: "0 !important",
      top: "50px !important",
    },
  },

  menuIcon: {
    backgroundColor: "#dbdde2",
    padding: "5px",
    borderRadius: "20px",
    fontSize: "35px",
  },

  createBox: {
    display: "flex",
    padding: "5px",
    alignItems: "flex-start",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f2f7",
      borderRadius: "7.5px",
    },
  },

  createHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "5px",
    marginBottom: "5px",
  },
  createTitleBox: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
  },
  createTitle: {
    fontSize: "15px",
    fontWeight: "400",
  },
  createSubTitle: {
    fontSize: "13px",
    fontWeight: "300",
  },
}));

export default function CreateMenu(props) {
  const { createAnchor, handleCloseCreate } = props;
  const classes = useStyles();

  const icon1 = [
    {
      icon: <Create className={classes.menuIcon} />,
      title: "Post",
      subTitle: "Share a post on News Feed.",
    },
    {
      icon: <ImportContacts className={classes.menuIcon} />,
      title: "Story",
      subTitle: "Share a photo or write something.",
    },
    {
      icon: <VideoCall className={classes.menuIcon} />,
      title: "Room",
      subTitle:
        "Video chat with anyone, on or off Facebook, without time limit.",
    },
  ];
  const icon2 = [
    {
      icon: <Flag className={classes.menuIcon} />,
      title: "Page",
      subTitle: "Connect and share with customers or fans.",
    },
    {
      icon: <Group className={classes.menuIcon} />,
      title: "Group",
      subTitle: "Connect with people who share your interests.",
    },
    {
      icon: <EventAvailable className={classes.menuIcon} />,
      title: "Event",
      subTitle: "Bring people together with a public or private event.",
    },
    {
      icon: <Storefront className={classes.menuIcon} />,
      title: "Marketplace Listing",
      subTitle: "Sell items to people in your community.",
    },
  ];

  return (
    <Menu
      className={classes.root}
      anchorEl={createAnchor}
      // keepMounted
      open={Boolean(createAnchor)}
      onClose={handleCloseCreate}
    >
      <Typography className={classes.createHeader}>Create</Typography>

      {icon1.map((item) => (
        <div key={item.title} className={classes.createBox}>
          {item.icon}
          <div className={classes.createTitleBox}>
            <Typography className={classes.createTitle}>
              {item.title}
            </Typography>
            <Typography className={classes.createSubTitle}>
              {item.subTitle}
            </Typography>
          </div>
        </div>
      ))}
      <Divider style={{ margin: "10px 0" }} />
      {icon2.map((item) => (
        <div key={item.title} className={classes.createBox}>
          {item.icon}
          <div className={classes.createTitleBox}>
            <Typography className={classes.createTitle}>
              {item.title}
            </Typography>
            <Typography className={classes.createSubTitle}>
              {item.subTitle}
            </Typography>
          </div>
        </div>
      ))}
    </Menu>
  );
}
