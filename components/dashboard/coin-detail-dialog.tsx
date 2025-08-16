import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { PriceTrendChart } from "../../components/charts/price-trend-chart"
import { AddToPortfolioDialog } from "./add-to-portfolio-dialog"
import { Eye, TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react"
import type { Coin } from "../../lib/features/coins/coinsSlice"

interface CoinDetailDialogProps {
    coin: Coin
}

export function CoinDetailDialog({ coin }: CoinDetailDialogProps) {
    const [open, setOpen] = useState(false)

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: value < 1 ? 6 : 2,
        }).format(value)
    }

    const formatMarketCap = (marketCap: number) => {
        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`
        } else if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`
        } else if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`
        }
        return `$${marketCap.toLocaleString()}`
    }

    const isPositive = coin.price_change_percentage_24h > 0

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                        <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                            <span className="text-xl">{coin.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">#{coin.market_cap_rank}</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Current Price</span>
                            </div>
                            <div className="text-2xl font-bold">{formatCurrency(coin.current_price)}</div>
                            <div className={`mt-1 flex w-fit px-2 rounded-full items-center ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {isPositive ? "+" : ""}
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Market Cap</span>
                            </div>
                            <div className="text-2xl font-bold">{formatMarketCap(coin.market_cap)}</div>
                            <div className="text-sm text-muted-foreground mt-1">Rank #{coin.market_cap_rank}</div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">24h Volume</span>
                            </div>
                            <div className="text-2xl font-bold">{formatMarketCap(coin.total_volume)}</div>
                            <div className="text-sm text-muted-foreground mt-1">Trading volume</div>
                        </div>
                    </div>

                    <PriceTrendChart coin={coin} />

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <AddToPortfolioDialog coin={coin} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
