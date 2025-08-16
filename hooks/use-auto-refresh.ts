import { useEffect, useRef, useCallback } from "react"
import { useAppDispatch } from "../lib/hooks"
import { fetchCoins } from "../lib/features/coins/coinsSlice"

interface UseAutoRefreshOptions {
    interval?: number
    enabled?: boolean
}

export function useAutoRefresh({ interval = 30000, enabled = true }: UseAutoRefreshOptions = {}) {
    const dispatch = useAppDispatch()
    const intervalRef = useRef<number | null>(null)

    const refreshData = useCallback(() => {
        dispatch(fetchCoins({ limit: 100 }))
    }, [dispatch])

    useEffect(() => {
        if (!enabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        intervalRef.current = setInterval(refreshData, interval)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [refreshData, interval, enabled])

    const manualRefresh = useCallback(() => {
        refreshData()
        // Reset the interval to prevent double refresh
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(refreshData, interval)
        }
    }, [refreshData, interval])

    return { manualRefresh }
}
