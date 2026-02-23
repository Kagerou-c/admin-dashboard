"use client";
import { useContext } from "react"
import { AuthContex } from "./contex.jsx"

export function useAuth() {
    const ctx = useContext(AuthContex)
    if (!ctx) {
        throw new Error("useAuth harus di dalam AuthProvider")
    }
    return ctx
}
