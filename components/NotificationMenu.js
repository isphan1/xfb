import {
  Menu,
  MenuItem,
  Divider,
  makeStyles,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { More, MoreHoriz } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "9999",
    "& .MuiMenu-paper": {
      width: "360px",
      padding: "10px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      right: "0 !important",
      top: "50px !important",
    },
  },
  notificationBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5px",
  },
  notificationTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  notificationSubTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "5px 0 10px 0",
    padding: "0 5px",
    display: "flex",
    alignItems: "center",
  },
  notification: {
    display: "flex",
    alignItems: "flex-start",
    padding: "5px",
    borderRadius: "7.5px",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e4e6eb",
      "& button": {
        display: "block",
        backgroundColor: "#fff",
        zIndex: "1200",
      },
    },
  },
  notificationImage: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
  },
  onlineNow: {
    width: "19px",
    height: "12px",
    borderRadius: "20px",
    backgroundColor: "#0068c8",
  },
  notificationWrapper: {
    display: "flex",
    alignItems: "center",
  },
  notificationTextWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "0 5px",
  },
  notificationText: {
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "justify",
  },
  notificationIcon: {
    display: "none",
  },
}));

export default function NotificationMenu(props) {
  const { notificationAnchor, handleCloseNotification } = props;

  const classes = useStyles();

  return (
    <Menu
      className={classes.root}
      anchorEl={notificationAnchor}
      // keepMounted
      open={Boolean(notificationAnchor)}
      onClose={handleCloseNotification}
    >
      <div className={classes.notificationBox}>
        <Typography className={classes.notificationTitle}>
          Notifications
        </Typography>
        <IconButton size="small">
          <MoreHoriz />
        </IconButton>
      </div>

      <Typography className={classes.notificationSubTitle}>
        New
        <span
          style={{
            marginLeft: "auto",
            fontSize: "15px",
            fontWeight: "400",
            color: "#1983ff",
            cursor: "pointer",
          }}
        >
          See All
        </span>
      </Typography>

      <div className={classes.notification}>
        <img src="/lo.jpeg" className={classes.notificationImage} />
        <div className={classes.notificationWrapper}>
          <div className={classes.notificationTextWrapper}>
            <Typography className={classes.notificationText}>
              Next time you log in on this browser, just click your profile
              picture.
            </Typography>
            <Typography style={{ fontSize: "12px", fontWeight: "500" }}>
              2 hours
            </Typography>
          </div>
          <div className={classes.onlineNow} />
        </div>
      </div>

      <Typography className={classes.notificationSubTitle}>Earlier</Typography>

      {[1, 2, 3, 4].map((item) => (
        <div className={classes.notification} key={item}>
          <IconButton
            className={classes.notificationIcon}
            size="small"
            style={{
              position: "absolute",
              right: "25px",
              top: "23px",
            }}
          >
            <MoreHoriz />
          </IconButton>

          <img src="/lo.jpeg" className={classes.notificationImage} />
          <div className={classes.notificationWrapper}>
            <div className={classes.notificationTextWrapper}>
              <Typography className={classes.notificationText}>
                Next time you log in on this browser, just click your profile
                picture.
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "#0068c8",
                  fontWeight: "700",
                }}
              >
                2 days ago
              </Typography>
            </div>
            {item % 2 != 0 ? <div className={classes.onlineNow} /> : ""}
          </div>
        </div>
      ))}
    </Menu>
  );
}
