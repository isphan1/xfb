import React from "react";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const Layout1 = ({ children,auth }) =>{
  
const router = useRouter()

React.useEffect(() => {
  
if(!auth){
  router.push("/")
}

}, [])

  return (
    <div>
      <Head>
        <link rel="icon" href="/fa.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CssBaseline />
      <Header />
      <div
        style={{
          marginTop: "48px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isLogin,
  };
};

export default connect(mapStateToProps)(Layout1);
