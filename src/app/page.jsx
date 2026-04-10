'use client';
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import Login from "./auth/log";
import Register from "./auth/reg";

export default function () {
  // Register component is kept but not rendered in the UI
  // To re-enable, set isLogin state toggle back
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Login setIsLogin={setIsLogin} />
    </>
  )
}