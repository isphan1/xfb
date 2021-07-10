import React from "react";
import Head from 'next/head'
import {
  Paper,
  makeStyles,
  InputBase,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { uSingIn } from "../../redux/auth/action";
import axios from "axios";
import Cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor:"#f0f2f5",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"70px 200px",
    height:"100vh"
  },
  paper: {
    width: "400px",
    display: "flex",
    padding:"40px 20px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: "4px",
  },
  submit: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#0068c8",
    color: "#fff",
    fontSize:"18px",
    fontWeight:"700",
    textTransform:"capitalize",
    "&:hover":{
        backgroundColor: "#0068c8",
    }
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "300",
    color: "#4285F4",
    textTransform: "uppercase",
  },
  logoTitle: {
    fontSize: "60px",
    fontWeight: "bolder",
    color: "#4285F4",
  },
  logoSubTitle: {
    fontSize: "26px",
    color:"#000",
    fontWeight:"300",
    padding:"0 80px 0 0"
  },
  forgotPassword:{
      color:"#4285F4",
      margin:"10px 0",
      fontSize:"14px",
      "&:hover":{
          textDecoration:"underline"
      }
  },
  createButton:{
      backgroundColor:"#37a000",
      color:"#fff",
      fontSize:"16px",
      fontWeight:"700",
      textTransform:"capitalize",
      "&:hover":{
        backgroundColor: "#13b24e",
    }
  },
  ads:{
      marginTop:"20px",
      fontSize:"14px",
      textAlign:"center"
  }
}));

const index = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    await props.login({username:username,password:password})
};

const handleLoginPress = async (e) => {
  if(e.key === 'Enter'){
  await props.login({username:username,password:password})
}
};

  return (
    <div className={classes.root}>
        <Head>
        <title>Facebook - log in or sing up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/fa.ico" />
      </Head>
      <div style={{marginTop:"-50px"}}>
        <Typography className={classes.logoTitle}>Facebook</Typography>
        <Typography className={classes.logoSubTitle}>
          Facebook helps you connect and share with the people in your life.
        </Typography>
      </div>
      <div>
        <Paper className={classes.paper}>
          <form autoComplete="off" 
            onKeyDown={handleLoginPress}
          >
            <InputBase
              placeholder="Email address or phone number"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              variant="outlined"
              className={classes.textField}
              label="username"
            />
            <InputBase
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              variant="outlined"
              className={classes.textField}
              label="password"
              type="password"
            />
            <Button
              variant="contained"
              className={classes.submit}
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          </form>
          <Typography className={classes.forgotPassword}>Forgotten Password?</Typography>
          <div style={{margin:"5px 0 20px 0",backgroundColor:"#ccc",height:"1px",width:"100%"}}/>
          <Button variant="outlined" className={classes.createButton} >Create New Account</Button>
        </Paper>
        <Typography className={classes.ads}><b>Create a Page</b> for a celebrity, band or business.</Typography>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLogin,
  };
};


const mapDispatchToProps = dispatch =>{
  return{
      login: (data) => dispatch(uSingIn(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(index)