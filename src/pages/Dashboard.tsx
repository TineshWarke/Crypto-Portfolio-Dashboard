"use client"

import { useState } from "react"
// import { Navigation } from "@/components/Navigation"
// import { CryptoTable } from "@/components/CryptoTable"
// import { SearchInput } from "@/components/SearchInput"
// import { FilterButtons } from "@/components/FilterButtons"
// import { ActiveFilters } from "@/components/ActiveFilters"
// import { PriceChart } from "@/components/PriceChart"
// import { useAppSelector } from "@/hooks/useAppSelector"
// import { selectFilteredCoins } from "@/store/selectors"
// import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export default function DashboardPage() {
  // const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
  // const coins = useAppSelector(selectFilteredCoins)

  // const selectedCoinData = coins.find((coin) => coin.id === selectedCoin)

  // const handleShowChart = (coinId: string) => {
  //   setSelectedCoin(coinId === selectedCoin ? null : coinId)
  // }

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Track cryptocurrency prices and market data in real-time</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <SearchInput />
              <FilterButtons />
            </div>
            <ActiveFilters />
          </div>

          {selectedCoinData && (
            <PriceChart
              coinId={selectedCoinData.id}
              coinName={selectedCoinData.name}
              currentPrice={selectedCoinData.current_price}
              priceChange24h={selectedCoinData.price_change_percentage_24h}
            />
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Market Data</h2>
              {coins.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Click <TrendingUp className="inline h-3 w-3 mx-1" /> to view price charts
                </div>
              )}
            </div>

            <div className="relative">
              <CryptoTable />
              {coins.length > 0 && (
                <div className="absolute top-4 right-4">
                  <div className="flex flex-wrap gap-1">
                    {coins.slice(0, 5).map((coin) => (
                      <Button
                        key={coin.id}
                        variant={selectedCoin === coin.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShowChart(coin.id)}
                        className="text-xs"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {coin.symbol.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main> */}
      <h1>dashboard</h1>
    </div>
  )
}
