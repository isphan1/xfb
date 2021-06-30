import { SINGIN, SINGUP, LOGOUT, ERRORS, USERNAME } from "./type";
import axios from "axios";
// import { tokenConfig } from '../common/getToken'
import Cookies from "js-cookie";
import axiosInstance from "../../components/axios";

export const vUsername = (data) => (dispatch) => {
  axios({
    method: "post",
    url: `/api/username/`,
    data: data,
    dataType: "jsonp",
    headers: {
      "content-type": "application/json",
      // "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  })
    .then((res) => {
      if (res.data.username === "Available") {
        dispatch({
          type: USERNAME,
          payload: { username: data.username, option: "singup" },
        });
      } else {
        dispatch({
          type: ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uInvalid = (data) => (dispatch) => {
  axios({
    method: "post",
    url: `/api/invalid/`,
    data: data,
    dataType: "jsonp",
    headers: {
      "content-type": "application/json",
      // "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
    },
  })
    .then((res) => {
      if (res.data.username === "This username is valid") {
        dispatch({
          type: USERNAME,
          payload: { username: data.username, option: "singin" },
        });
      } else {
        dispatch({
          type: ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export const uSingIn = (data) => (dispatch) => {
  axiosInstance({
      method:"post",
      url:`token/`,
      data:data,
      headers:{
          "content-type": "application/json",
      }
      })
      .then(res=>
          {
              Cookies.set('access_token',res.data.access)
              Cookies.set('refresh_token',res.data.refresh)
          dispatch({
              type:SINGIN,
              payload:data.username
          })
      }
      )
      .catch(err=>
          {}
      )
};

export const uSingUp = (data) => (dispatch) => {
  axios({
    method: "post",
    url: `/api/singup/`,
    data: data,
    dataType: "jsonp",
    headers: {
      "content-type": "application/json",
      // "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
    },
  })
    .then((res) => {
      Cookies.set("expires", res.data.token_response.expires);
      Cookies.set("token", res.data.token_response.token);
      dispatch({
        type: SINGUP,
        payload: res.data.token_response,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const uLogout = (dispatch) => {
  Cookies.remove("auth");
  // Cookies.remove("expires");
  dispatch({
    type: LOGOUT,
  });
};
export const uClear = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const uError = (dispatch) => {
  dispatch({
    type: "ERRORCLEAR",
  });
};

export const tokenFresh = (token) => (dispatch) => {
  // const token = tokenConfig(getState)
  axios({
    method: "post",
    url: `/api/refresh/`,
    data: { token },
    dataType: "jsonp",
    headers: {
      "content-type": "application/json",
      Authorization: "JWT " + token,
      // "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
    },
  })
    .then((res) => {
      Cookies.set("expires", res.data.expires);
      Cookies.set("token", res.data.token);
      dispatch({
        type: "TOKENFRESH",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //     type:ERRORS,
      //     payload:err.data
      // })
    });
};
