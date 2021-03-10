import axios from "axios";

const instance = axios.create({
  // baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"
  baseURL: "http://localhost:8000/api/",
  // baseURL: "http://192.168.1.3:8000/api/auth/"
  // baseURL: configUrl.authBaseURL
});

// const successHandler = (response) => {
//   // console.log(response)
//   // if (response.error) {
//   //   return Promise.reject(response.error)
//   // } else {
//   //   return response
//   // }
//   return response;
// };

// const errorHandler = (error) => {
//   if (!error.response) {
//     store.dispatch("alert/showMessage", {
//       type: "error",
//       message: "Tidak bisa terkoneksi dengan API",
//     });
//     throw new Error("Tidak bisa terkoneksi dengan API");
//   }
//   // const errorMessage = error.response.data.error
//   //   ? error.response.data.error.message
//   //   : error.response.data.status.message
//   // console.log(errorMessage)
//   // if (error.response.status == 401) {
//   //   localStorage.removeItem('token')
//   //   localStorage.removeItem('user')
//   //   window.location = '/'
//   // }
//   // store.commit('showMessage', {
//   //   type: 'error',
//   //   message: errorMessage
//   // })
//   throw error.response;
// };

// const requestHandler = (request) => {
//   request.headers.Authorization = localStorage["access_token"] || "";
//   return request;
// };

// instance.interceptor.request.use((request) => requestHandler(request));
// instance.interceptors.response.use(
//   (response) => successHandler(response),
//   (error) => errorHandler(error)
// );

export default instance;
