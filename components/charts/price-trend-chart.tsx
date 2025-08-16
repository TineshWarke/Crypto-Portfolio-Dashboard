import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Coin } from "../../lib/features/coins/coinsSlice"

interface PriceTrendChartProps {
    coin: Coin
}

export function PriceTrendChart({ coin }: PriceTrendChartProps) {
    const chartData = useMemo(() => {
        const data = []
        const currentPrice = coin.current_price
        const change24h = coin.price_change_percentage_24h / 100

        // Generate 24 hours of mock data points
        for (let i = 23; i >= 0; i--) {
            const timeAgo = i
            const randomVariation = (Math.random() - 0.5) * 0.1 // ±5% random variation
            const trendFactor = (change24h * (23 - i)) / 23 // Linear trend over 24h
            const price = currentPrice * (1 - trendFactor + randomVariation)

            data.push({
                time: `${timeAgo}h ago`,
                price: Math.max(0, price),
                timestamp: Date.now() - timeAgo * 60 * 60 * 1000,
            })
        }

        return data.reverse()
    }, [coin.current_price, coin.price_change_percentage_24h])

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: value < 1 ? 6 : 2,
        }).format(value)
    }

    const isPositive = coin.price_change_percentage_24h > 0

    return (
        <div className='p-5 border-2 shadow-gray-500 rounded-2xl'>
            <div className="pb-2">
                <h2 className="text-base font-semibold flex items-center justify-between">
                    <span>{coin.name} Price Trend</span>
                    <span className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                        {isPositive ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </h2>
            </div>
            <div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={formatPrice}
                                domain={["dataMin * 0.99", "dataMax * 1.01"]}
                            />
                            <Tooltip
                                formatter={(value: number) => [formatPrice(value), "Price"]}
                                labelStyle={{ color: "var(--foreground)" }}
                                contentStyle={{
                                    backgroundColor: "var(--background)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "6px",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke={isPositive ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: isPositive ? "#22c55e" : "#ef4444" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
