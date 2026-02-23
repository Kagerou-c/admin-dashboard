"use client";
import { createContext } from "react";

export const AuthContex = createContext({
    user: null,
    isLogin: false,
    logout: () => { }
});