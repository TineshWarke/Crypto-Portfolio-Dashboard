import { useAppSelector } from "../../lib/hooks"
import { selectLastUpdated, selectCoinsLoading } from "../../lib/features/coins/coinsSelectors"
import { Clock, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

export function RealTimeIndicator() {
    const lastUpdated = useAppSelector(selectLastUpdated)
    const loading = useAppSelector(selectCoinsLoading)
    const [timeAgo, setTimeAgo] = useState<string>("")

    useEffect(() => {
        if (!lastUpdated) return

        const updateTimeAgo = () => {
            const now = Date.now()
            const diff = now - lastUpdated
            const seconds = Math.floor(diff / 1000)
            const minutes = Math.floor(seconds / 60)

            if (minutes > 0) {
                setTimeAgo(`${minutes}m ago`)
            } else {
                setTimeAgo(`${seconds}s ago`)
            }
        }

        updateTimeAgo()
        const interval = setInterval(updateTimeAgo, 1000)

        return () => clearInterval(interval)
    }, [lastUpdated])

    if (!lastUpdated) {
        return (
            <div className="shadow-gray-500 border-2 px-2 py-0.5 rounded-full gap-1 flex items-center">
                <WifiOff className="h-3 w-3" />
                No data
            </div>
        )
    }

    return (
        <div  className={`shadow-gray-500 border-2 px-2 py-0.5 rounded-full gap-1 ${loading ? "animate-pulse" : ""}`}>
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-ping" />
                    Updating...
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-green-500" />
                    <Clock className="h-3 w-3" />
                    {timeAgo}
                </div>
            )}
        </div>
    )
}
