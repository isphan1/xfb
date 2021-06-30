import axios from 'axios'
import Cookies from 'cookies'

    const baseURL = "https://xfbapp.herokuapp.com/api/"

    const axiosInstance = axios.create({
        baseURL:baseURL,
        timeout:5000,
        headers:{
            // Authorization: req.cookies.access_token ?
            // "JWT "+ req.cookies.access_token : null,
            "Content-Typ" : "application/json",
        }
    })
export default axiosInstance



// const api = axios.create({
//     baseURL: baseURL
// });

// // Add request interceptor
// api.interceptors.request.use(
//     async config => {
//         const token = localStorage.getItem('access_token');

//         if (token) {
//             config.headers['Authorization'] = 'JWT ' + token;
//         }
//         config.headers['Content-Type'] = 'application/json';
//         config.headers['Accept'] = 'application/json';

//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// );