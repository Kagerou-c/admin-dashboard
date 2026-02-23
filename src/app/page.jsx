'use client';
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import Login from "./reg and log/log";
import Register from "./reg and log/reg";

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