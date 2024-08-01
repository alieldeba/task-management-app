"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./Features/user/userSlice";
import { persistReducer } from "redux-persist";

const userPersistConfig = {
    key: "user",
    storage: storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
    reducer: rootReducer,
});
