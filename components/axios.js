import axios from "axios";
import Cookie from "js-cookie";
import { Base64 } from 'js-base64';

const baseURL = "http://localhost:8000/api/";

// const baseURL = "https://xfbapp.herokuapp.com/api/"

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    Authorization: Cookie.get("access_token")
      ? "JWT " + Cookie.get("access_token")
      : null,
  },
});

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;

//         if (typeof error.response === 'undefined') {
//             alert(
//                 'A server/network error occurred. ' +
//                     'Looks like CORS might be the problem. ' +
//                     'Sorry about this - we will get it fixed shortly.'
//             );
//             return Promise.reject(error);
//         }

//         if (
//             error.response.status === 401 &&
//             originalRequest.url === baseURL + 'token/refresh/'
//         ) {
//             window.location.href = '/';
//             return Promise.reject(error);
//         }

//         if (
//             error.response.data.code === 'token_not_valid' &&
//             error.response.status === 401 &&
//             error.response.statusText === 'Unauthorized'
//         ) {
//             console.log(originalRequest)
//             const refreshToken = originalRequest.data.refresh_token;
//             console.log(refreshToken)
//             if (refreshToken) {
//                 const tokenParts = JSON.parse(window.atob(refreshToken.split('.')[1]));
//                 // btoa(unescape(encodeURIComponent(str))))
//                 // exp date in token is expressed in seconds, while now() returns milliseconds:
//                 const now = Math.ceil(Date.now() / 1000);
//                 console.log(tokenParts.exp);

//                 if (tokenParts.exp > now) {
//                     return axiosInstance
//                         .post('token/refresh/', { refresh: refreshToken })
//                         .then((response) => {
//                             Cookie.set('access_token', response.data.access_token);
//                             Cookie.set('refresh_token', response.data.refresh_token);

//                             axiosInstance.defaults.headers['Authorization'] =
//                                 'JWT ' + response.data.access_token;
//                             originalRequest.headers['Authorization'] =
//                                 'JWT ' + response.data.access_token;

//                             return axiosInstance(originalRequest);
//                         })
//                         .catch((err) => {
//                             console.log(err);
//                         });
//                 } else {
//                     console.log('Refresh token is expired', tokenParts.exp, now);
//                     window.location.href = '/';
//                 }
//             } else {
//                 console.log('Refresh token not available.');
//                 window.location.href = '/';
//             }
//         }

//         // specific error handling done elsewhere
//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const rf = Cookie.get("refresh_token");
    const tokenParts = Base64.atob(rf.split(".")[1])
    // console.log({'r':rf,'t':tokenParts})
    const now = Math.ceil(Date.now() / 1000);
    // if (tokenParts.exp < now) {
    axiosInstance
        .post("token/refresh/", { refresh: rf })
        .then((response) => {

            Cookie.set("access_token", response.data.access);
            Cookie.set('test',"val")

          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + response.data.access;
          originalRequest.headers["Authorization"] =
            "JWT " + response.data.access;

        return axiosInstance(originalRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
//   }
);

export default axiosInstance;
