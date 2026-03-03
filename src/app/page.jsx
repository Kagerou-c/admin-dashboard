'use client';
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import Login from "./auth/log";
import Register from "./auth/reg";

export default function () {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </>
  )
}