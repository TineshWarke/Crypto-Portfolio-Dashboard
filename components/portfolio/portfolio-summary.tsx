import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react"

interface PortfolioSummaryProps {
    summary: {
        totalValue: number
        totalChange24h: number
        totalChangePercentage: number
        holdingsCount: number
    }
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
    const { totalValue, totalChange24h, totalChangePercentage, holdingsCount } = summary

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const isPositive = totalChange24h >= 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
                <div className="flex flex-row items-center justify-between space-y-0 pb-10">
                    <h2 className="text-sm font-medium">Total Portfolio Value</h2>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                    <p className="text-xs text-muted-foreground mt-1">Current market value</p>
                </div>
            </div>

            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
                <div className="flex flex-row items-center justify-between space-y-0 pb-10">
                    <h2 className="text-sm font-medium">24h Change</h2>
                    {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">{formatCurrency(Math.abs(totalChange24h))}</div>
                        <div className={`px-2 rounded-full ${isPositive ? "bg-green-100 text-green-800 hover:bg-green-200" :
                            "bg-red-100 text-red-800 hover:bg-red-200"}`}>
                            {isPositive ? "+" : ""}
                            {totalChangePercentage.toFixed(2)}%
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{isPositive ? "Profit" : "Loss"} in last 24 hours</p>
                </div>
            </div>

            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
                <div className="flex flex-row items-center justify-between space-y-0 pb-10">
                    <h2 className="text-sm font-medium">Holdings</h2>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                    <div className="text-2xl font-bold">{holdingsCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">Different cryptocurrencies</p>
                </div>
            </div>
        </div>
    )
}
