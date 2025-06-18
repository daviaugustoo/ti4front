import axios from "axios";

const api = axios.create({
    baseURL: "https://ti4back.onrender.com"
});

export default api;