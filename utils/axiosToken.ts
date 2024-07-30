"use server";

import axios from "axios";
import { cookies } from "next/headers";

const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
http.interceptors.request.use(
    (config) => {
        const token = cookies().get("token")?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default http;
