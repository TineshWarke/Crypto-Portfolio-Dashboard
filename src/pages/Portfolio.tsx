import { memo, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { fetchCoins } from "../../lib/features/coins/coinsSlice"
import { updatePortfolioValues } from "../../lib/features/portfolio/portfolioSlice"
// import { addToNavigationHistory } from "../../lib/features/ui/uiSlice"
import { selectPortfolioWithCoinData, selectPortfolioSummary } from "../../lib/features/portfolio/portfolioSelectors"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { PortfolioSummary } from "../../components/portfolio/portfolio-summary"
import { PortfolioHoldings } from "../../components/portfolio/portfolio-holdings"
import { PortfolioAnalytics } from "../../components/portfolio/portfolio-analytics"
import { EmptyPortfolio } from "../../components/portfolio/empty-portfolio"
import { RealTimeIndicator } from "../../components/dashboard/real-time-indicator"
import { Breadcrumbs } from "../../components/navigation/breadcrumbs"
import { useAutoRefresh } from "../../hooks/use-auto-refresh"

const Portfolio = memo(function Portfolio() {
  const dispatch = useAppDispatch()
  // const pathname = usePathname()
  const portfolioData = useAppSelector(selectPortfolioWithCoinData)
  const portfolioSummary = useAppSelector(selectPortfolioSummary)

  useAutoRefresh({
    interval: 30000, // 30 seconds
    enabled: portfolioData.length > 0, // Only auto-refresh if user has holdings
  })

  useEffect(() => {
    dispatch(
      updatePortfolioValues({
        totalValue: portfolioSummary.totalValue,
        totalChange24h: portfolioSummary.totalChange24h,
      }),
    )
  }, [dispatch, portfolioSummary.totalValue, portfolioSummary.totalChange24h])

  const fetchCoinsCallback = useCallback(() => {
    dispatch(fetchCoins({ limit: 100 }))
  }, [dispatch])

  useEffect(() => {
    fetchCoinsCallback()
    // dispatch(addToNavigationHistory(location.pathname))
  }, [fetchCoinsCallback, location.pathname])


  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground mt-1">Track your cryptocurrency investments and performance</p>
          </div>

          {portfolioData.length > 0 && (
            <div className="flex items-center gap-2">
              <RealTimeIndicator />
              <div className="text-xs text-muted-foreground">Live updates</div>
            </div>
          )}
        </div>

        {portfolioData.length === 0 ? (
          <EmptyPortfolio />
        ) : (
          <div className="space-y-6">
            <PortfolioSummary summary={portfolioSummary} />

            <PortfolioAnalytics holdings={portfolioData.filter((h): h is NonNullable<typeof h> => h !== null)} />

            <div className="shadow-gray-500 border-2 rounded-2xl p-5">
              <div className="p-0">
                <PortfolioHoldings holdings={portfolioData.filter((h): h is NonNullable<typeof h> => h !== null)} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
})

export default Portfolio