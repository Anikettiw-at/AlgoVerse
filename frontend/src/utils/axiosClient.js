import axios from "axios"

// const axiosClient =  axios.create({
//     baseURL: 'http://localhost:3000',
//     withCredentials: true,
//     // headers: {
//     //     'Content-Type': 'application/json'
//     // }
// });

const axiosClient =  axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});





export default axiosClient;

