'use client'

import { useMemo, useCallback, useState } from "react"
import { LoadingContext } from "./context/loading-context"
import LoadingComponent from "./motion-component/loading"

export function LoadingProvider({children}) {
  const [isLoading, setLoading]= useState(false)

  const startLoading = useCallback(()=>{
    setLoading(true)
  },[])

  const stopLoading = useCallback(()=>{
    setLoading(false)
  },[])

  const value = useMemo(() => {
    return {
      isLoading,
      startLoading,
      stopLoading
    }
  }, [isLoading])

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <LoadingComponent isLoading={isLoading} />}
    </LoadingContext.Provider>
  )
}