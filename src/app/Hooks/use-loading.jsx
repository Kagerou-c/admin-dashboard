"use client";
import { useContext } from "react"
import { LoadingContext } from "../context/loading-context"

export function useLoading() {
    const ctx = useContext(LoadingContext)
    if (!ctx) {
        throw new Error("useLoading harus di dalam LoadingProvider")
    }
    return ctx
}
