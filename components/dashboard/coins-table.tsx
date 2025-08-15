import { memo, useCallback } from "react"
import { useAppSelector } from "../../lib/hooks"
import { selectFilteredCoins, selectCoinsLoading } from "../../lib/features/coins/coinsSelectors"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { AddToPortfolioDialog } from "./add-to-portfolio-dialog"
// import { CoinDetailDialog } from "./coin-detail-dialog"
import type { Coin } from "../../lib/features/coins/coinsSlice"

const CoinRow = memo(function CoinRow({ coin }: { coin: Coin }) {
    const formatPrice = useCallback((price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: price < 1 ? 6 : 2,
        }).format(price)
    }, [])

    const formatMarketCap = useCallback((marketCap: number) => {
        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`
        } else if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`
        } else if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`
        }
        return `$${marketCap.toLocaleString()}`
    }, [])

    const formatPercentage = useCallback((percentage: number) => {
        const isPositive = percentage >= 0
        return (
            <div className={`w-fit rounded-full px-2
                ${isPositive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}>
                {isPositive ? "+" : ""}
                {percentage.toFixed(2)}%
            </div>
        )
    }, [])

    return (
        <TableRow className="hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium pl-5">{coin.market_cap_rank}</TableCell>

            <TableCell>
                <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8">
                        <img
                            src={coin.image || "/placeholder.svg"}
                            alt={coin.name}
                            className="rounded-full object-cover"
                            sizes="32px"
                        />
                    </div>
                    <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-muted-foreground uppercase">{coin.symbol}</div>
                    </div>
                </div>
            </TableCell>

            <TableCell className="font-mono">{formatPrice(coin.current_price)}</TableCell>

            <TableCell>{formatPercentage(coin.price_change_percentage_24h)}</TableCell>

            <TableCell className="font-mono">{formatMarketCap(coin.market_cap)}</TableCell>

            <TableCell>
                <div className="flex items-center space-x-2">
                    {/* <CoinDetailDialog coin={coin} /> */}
                    <AddToPortfolioDialog coin={coin} />
                </div>
            </TableCell>
        </TableRow>
    )
})

export const CoinsTable = memo(function CoinsTable() {
    const coins = useAppSelector(selectFilteredCoins)
    const loading = useAppSelector(selectCoinsLoading)

    if (loading && coins.length === 0) {
        return (
            <div className="p-6">
                <div className="space-y-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-full bg-gray-100" />
                            <div className="h-4 w-32 rounded-full bg-gray-100" />
                            <div className="h-4 w-20 rounded-full bg-gray-100" />
                            <div className="h-4 w-24 rounded-full bg-gray-100" />
                            <div className="h-4 w-20 rounded-full bg-gray-100" />
                            <div className="h-4 w-16 rounded-full bg-gray-100" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (coins.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-muted-foreground">No cryptocurrencies found matching your criteria.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12 pl-5">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coins.map((coin) => (
                        <CoinRow key={coin.id} coin={coin} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
})