import {
  Menu,
  Grid,
  Divider,
  makeStyles,
  Typography,
  IconButton,
  InputBase,
  Tooltip
} from "@material-ui/core";
import React from "react";
import { Check, MoreHoriz, Search, OpenWith,VideoCall,Create } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "9999",
    position:"relative",
    "& .MuiMenu-paper": {
      width: "360px",
      padding: "10px 10px 0 10px",
      maxHeight:"450px",
      borderRadius: "5px",
    },
    "& .MuiPaper-root": {
      right: "0 !important",
      top: "50px !important",
    },
  },
  customWidth: {
    minWidth: "40px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    padding: "2.5px 10px",
    marginTop: "5px",
  },
  messangerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messangerHeaderIcon: {
    display: "flex",
    alignItems: "center",
  },
  messangerHeaderTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  messangerInput: {
    margin: "10px 0",
    padding: "0px 10px",
    borderRadius: "20px",
    backgroundColor: "#e4e6eb",
    width: "100%",
  },
  messangerBox: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "5px",
    borderRadius: "7.5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e4e6eb",
      "& button": {
        display: "block",
        backgroundColor: "#fff",
        zIndex: "1200",
        "&:hover": {
          backgroundColor: "#ccc",
        },
      },
    },
  },
  messangerImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
  },
  messangerMessage: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    justifyContent: "space-between",
  },
  messangerMessageUser: {
    fontSize: "15px",
    fontWeight: "400",
  },
  messangerBoxIcon: {
    display: "none",
  },
}));

const messangerMenus = [
  {icon:<MoreHoriz/>,title:"Options"},  
  {icon:<OpenWith />,title:"See All in Messanger"},
  {icon:<VideoCall />,title:"Create new room"},
  {icon:<Create />,title:"New message"},

]

export default function MessangerMenu(props) {
  const { messangerAnchor, handleCloseMessanger } = props;

  const userDisplay = (user) => {
    if (user.length > 35) {
      return user.substr(0, 33);
    }
    return user;
  };

  const messageDisplay = (msg) => {
    if (msg.length > 39) {
      return msg.substr(0, 39) + "...";
    }
    return msg + "...";
  };

  const classes = useStyles();

  return (
    <Menu
      className={classes.root}
      anchorEl={messangerAnchor}
      keepMounted
      open={Boolean(messangerAnchor)}
      onClose={handleCloseMessanger}
    >
      <div className={classes.messangerHeader}>
        <Typography className={classes.messangerHeaderTitle}>
          Messanger
        </Typography>
        {messangerMenus.map(item=>(
        <Tooltip
        key={item.title}
        title={item.title}
          classes={{tooltip:classes.customWidth}}
        >
        <div className={classes.messangerHeaderIcon}>
          <IconButton size="small">
            {item.icon}
          </IconButton>
        </div>
        </Tooltip>
        ))}
      </div>
      <InputBase
        className={classes.messangerInput}
        placeholder="Search Messanger"
        startAdornment={<Search style={{ marginRight: "5px" }} size="small" />}
      />
      {[1,2,3,4,5,6].map(item=>(
 <div className={classes.messangerBox} key={item}>
 <IconButton
   size="small"
   className={classes.messangerBoxIcon}
   style={{
     position: "absolute",
     right: "30px",
     top: "20px",
   }}
 >
   <MoreHoriz />
 </IconButton>
 <div
   style={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
   }}
 >
   <img src="/w.jpg" className={classes.messangerImage} />
   <div className={classes.messangerMessage}>
     <Typography className={classes.messangerMessageUser}>
       {userDisplay("Iranians vote to elect new president")}
     </Typography>

     <Grid container style={{ display: "flex" }}>
       <Grid item xs={11}>
         <Typography style={{ fontSize: "13px", fontWeight: "300" }}>
           {messageDisplay(
             "Nearly 60 million eligible voters in Iran will decide the fate of four candidates in the fray to succeed President Hassan Rouhani"
           )}
         </Typography>
       </Grid>
       <Grid item xs={1}>
         <Typography style={{ fontSize: "14px", fontWeight: "300" }}>
           8w
         </Typography>
       </Grid>
     </Grid>
   </div>
 </div>
 <Check
   style={{
     fontSize: "16px",
     color: "#ccc",
     border: "1px solid #ccc",
     borderRadius: "20px",
   }}
 />
</div>
      ))}
      <Divider/>
      <Typography style={{
        textAlign:"center",
        fontSize:"16px",
        fontWeight:"500",
        color:"#1da1f2",
        marginTop:"15px",
      }}>
        See all in Messanger 
      </Typography>
{/* 
      <div style={{
        position:"absolute",
        backgroundColor:"#000",
        zIndex:"1210",
        left:"0",
        bottom:"0px",
        width:"100%"
      }}>
        See all in Messanger 
      </div> */}
    </Menu>
  );
}
