import {
  Menu,
  MenuItem,
  Divider,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  ArrowForwardIos,
  Brightness3,
  ExitToApp,
  Help,
  Settings,
  SmsFailed,
} from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import {useRouter} from 'next/router'
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "9999",
    "& .MuiMenu-paper": {
      width: "345px",
      padding: "10px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      right: "0 !important",
      top: "50px !important",
    },
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
  },
  menuItem2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "7.5px",
  },
  menuTitle: {
    fontSize: "15px",
    marginLeft: "10px",
    fontWeight: "300",
  },
  image: {
    borderRadius: "50px",
  },
  postInfo: {
    marginLeft: "10px",
    borderRadius: "7.5px",
  },
  postUser1: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  postUser2: {
    fontSize: "15px",
    fontWeight: "400",
  },
  postTimeSection: {
    display: "flex",
    alignItems: "center",
  },
  postTime: {
    fontSize: "13px",
    fontWeight: "100",
  },
  menuItem: {
    borderRadius: "7.5px",
  },
  menuIcon: {
    backgroundColor: "#e4e6eb",
    padding: "5px",
    borderRadius: "20px",
    fontSize: "35px",
  },
  menuIconArrow: {
    fontSize: "35px",
    padding: "7px",
    color:"#606770"
  },
}));
import {authConsumer} from '../components/authContext'
import {uLogout} from '../redux/auth/action'

const AccountMenu = (props) =>{
  const { accountAnchor, handleCloseAccount } = props;

  const classes = useStyles();

  const router = useRouter()

  const logout = () =>{

    props.logout()
    router.push("/")
  }

  return (
    <Menu
      className={classes.root}
      anchorEl={accountAnchor}
      // keepMounted
      open={Boolean(accountAnchor)}
      onClose={handleCloseAccount}
    >
      <MenuItem className={classes.menuItem}>
        <div className={classes.postHeader}>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AyVv06KRxDIdsjyaJeD34QAAAA%26pid%3DApi&f=1"
            width="60px"
            height="60px"
            className={classes.image}
          />
          <div className={classes.postInfo}>
            <Typography className={classes.postUser1}>Alex morano</Typography>
            <div className={classes.postTimeSection}>
              <Typography className={classes.postTime}>
                See your profile
              </Typography>
            </div>
          </div>
        </div>
      </MenuItem>
      <Divider style={{ margin: "10px 0" }} />
      <MenuItem style={{
        borderRadius:"7.5px"
      }}>
        <div className={classes.postHeader}>
          <SmsFailed className={classes.menuIcon} />

          <div className={classes.postInfo}>
            <Typography className={classes.postUser2}>Give Feedback</Typography>
            <div className={classes.postTimeSection}>
              <Typography className={classes.postTime}>
                Help us to improve the new Facebook
              </Typography>
            </div>
          </div>
        </div>
      </MenuItem>
      <Divider style={{ margin: "10px 0" }} />
      <MenuItem className={classes.menuItem2}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Settings className={classes.menuIcon} />
          <Typography className={classes.menuTitle}>
            Settings & Privacy
          </Typography>
        </div>
        <ArrowForwardIos
          className={classes.menuIconArrow}
          />
      </MenuItem>
      <MenuItem className={classes.menuItem2}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Help className={classes.menuIcon} />
          <Typography className={classes.menuTitle}>Help & Support</Typography>
        </div>
        <ArrowForwardIos
          className={classes.menuIconArrow}
          />
      </MenuItem>
      <MenuItem className={classes.menuItem2}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Brightness3 className={classes.menuIcon} />
          <Typography className={classes.menuTitle}>
            Display & Accessibility
          </Typography>
        </div>
        <ArrowForwardIos
          className={classes.menuIconArrow}
          />
      </MenuItem>
      <MenuItem className={classes.menuItem2} onClick={()=>{logout();handleCloseAccount()}} >
        <div style={{ display: "flex", alignItems: "center" }}>
          <ExitToApp className={classes.menuIcon} />
          <Typography className={classes.menuTitle}>Log Out </Typography>
        </div>
        <ArrowForwardIos
          className={classes.menuIconArrow}
        />
      </MenuItem>
    </Menu>
            
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLogin,
  };
};


const mapDispatchToProps = dispatch =>{
  return{
      logout: () => dispatch(uLogout),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountMenu)