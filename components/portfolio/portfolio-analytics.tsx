import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface PortfolioAnalyticsProps {
    holdings: Array<{
        coinId: string
        amount: number
        coin: any
        currentValue: number
        changePercentage: number
        change24h: number
        addedAt: number
    }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF7C7C"]

export function PortfolioAnalytics({ holdings }: PortfolioAnalyticsProps) {
    const analyticsData = useMemo(() => {
        const totalValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0)

        const pieData = holdings
            .map((holding) => ({
                name: holding.coin.symbol.toUpperCase(),
                value: holding.currentValue,
                percentage: (holding.currentValue / totalValue) * 100,
                coin: holding.coin,
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8) // Show top 8 holdings

        const topPerformers = holdings
            .filter((holding) => holding.changePercentage > 0)
            .sort((a, b) => b.changePercentage - a.changePercentage)
            .slice(0, 3)

        const worstPerformers = holdings
            .filter((holding) => holding.changePercentage < 0)
            .sort((a, b) => a.changePercentage - b.changePercentage)
            .slice(0, 3)

        return {
            pieData,
            topPerformers,
            worstPerformers,
            totalValue,
        }
    }, [holdings])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{data.coin.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatCurrency(data.value)} ({data.percentage.toFixed(1)}%)
                    </p>
                </div>
            )
        }
        return null
    }

    if (holdings.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
                <div>
                    <h2 className="text-lg font-medium">Portfolio Allocation</h2>
                </div>
                <div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData.pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {analyticsData.pieData.map((entry, index) => (
                                        <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
                <div className="pb-5">
                    <h2 className="text-lg font-medium">Performance Overview</h2>
                </div>
                <div className="space-y-6">
                    {analyticsData.topPerformers.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-green-600 mb-2">Top Performers (24h)</h4>
                            <div className="space-y-2 pl-2">
                                {analyticsData.topPerformers.map((holding) => (
                                    <div key={holding.coinId} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={holding.coin.image || "/placeholder.svg"}
                                                alt={holding.coin.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="text-sm font-medium">{holding.coin.symbol.toUpperCase()}</span>
                                        </div>
                                        <div className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-2">
                                            +{holding.changePercentage.toFixed(2)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {analyticsData.worstPerformers.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-red-600 mb-2">Worst Performers (24h)</h4>
                            <div className="space-y-2 pl-2">
                                {analyticsData.worstPerformers.map((holding) => (
                                    <div key={holding.coinId} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={holding.coin.image || "/placeholder.svg"}
                                                alt={holding.coin.name}
                                                className="w-6 h-6 rounded-full"
                                            />
                                            <span className="text-sm font-medium">{holding.coin.symbol.toUpperCase()}</span>
                                        </div>
                                        <div className="bg-red-100 text-red-800 hover:bg-red-200 rounded-full px-2">
                                            {holding.changePercentage.toFixed(2)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
