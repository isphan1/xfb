import React from "react";
import App from "next/app";
import Layout1 from "../components/Layout1";
import Layout2 from "../components/Layout2";
import "../styles/globals.css";
import Login from "./login";
import { connect, Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const layouts = {
  L1: Layout1,
  L2: Layout2,
};
function MyApp({ Component, pageProps }) {
  var Layout = layouts[Component.layout] || Layout2;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </PersistGate>
    </Provider>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const auth = appContext.ctx.req.cookies.auth;
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps, auth: auth };
// };

export default MyApp;
