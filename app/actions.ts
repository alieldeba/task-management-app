"use server";

import axios from "../utils/axiosToken";

export const checkLogin = async (): Promise<boolean> => {
    return await axios
        .get("/auth/check-login")
        .then((res) => res.data.isLoggedIn)
        .catch((err) => {
            // console.error(err);
            return false;
        });
};
