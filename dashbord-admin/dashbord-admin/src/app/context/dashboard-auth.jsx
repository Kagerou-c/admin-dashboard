"use client";
import { useState, useMemo, useEffect } from "react";
import { AuthContex } from "./auth-context";
import { ServerLogout } from "../server/server-logout";


export default function DashboardAuthContex({ children, initialUser }) {
    const [dataUser, setDataUser] = useState(initialUser);

    const value = useMemo(() => {
        return {
            user: dataUser,
            isLogin: !!dataUser?.email,
            logout: async () => {
                setDataUser(null);
                await ServerLogout();
            }
        }
    }, [dataUser])

    return (
        <AuthContex.Provider value={value}>
            {children}
        </AuthContex.Provider>
    );
}
