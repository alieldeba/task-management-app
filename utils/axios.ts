import axios from "axios";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

const http = axios.create({
    baseURL: "https://managing-tasks-api.vercel.app",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${cookies.get("token")}`
    },
});

export default http;
