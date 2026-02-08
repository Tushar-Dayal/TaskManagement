import axios from "axios";


const api = axios.create({
baseURL: "http://localhost:8080",
});


api.interceptors.request.use((config) => {
const token = localStorage.getItem("access_token");
if (token) {
config.headers.Authorization = token; // NOT Bearer, plain token
}
return config;
});


export default api;