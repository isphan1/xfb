import React from "react";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import Layout2 from "../components/Layout2";
import Login from "./login";

const index = (props) => {
  if(props.auth){
    return(
      <Dashboard />
    );
  }
  else{
    return(
      <Login/>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLogin,
  };
};

// index.layout = "L1"

export default connect(mapStateToProps)(index);
