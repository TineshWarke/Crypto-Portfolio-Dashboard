import { memo, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { addToNavigationHistory } from "../../lib/features/ui/uiSlice"
import { selectCoinsError, selectCoinsLoading, selectFilteredCoins } from "../../lib/features/coins/coinsSelectors"
import { CoinsTable } from "../../components/dashboard/coins-table"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { SearchAndFilters } from "../../components/dashboard/search-and-filters"
import { RealTimeIndicator } from "../../components/dashboard/real-time-indicator"
import { Breadcrumbs } from "../../components/navigation/breadcrumbs"
import { useAutoRefresh } from "../../hooks/use-auto-refresh"
import { Button } from "../../components/ui/button"
import { RefreshCw } from "lucide-react"
import { useSelector } from "react-redux"
import { fetchCoins } from "../../lib/features/coins/coinsSlice"
import { ToastContainer, toast } from 'react-toastify';

export const Dashboard = memo(function DashboardContent() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectCoinsLoading)
  const error = useAppSelector(selectCoinsError)
  const filteredCoins = useSelector(selectFilteredCoins)

  const { manualRefresh } = useAutoRefresh({
    interval: 30000, // 30 seconds
    enabled: true,
  })

  const fetchCoinsCallback = useCallback(() => {
    dispatch(fetchCoins({ limit: 100 }))
  }, [dispatch])

  useEffect(() => {
    fetchCoinsCallback()
    dispatch(addToNavigationHistory(location.pathname))
  }, [fetchCoinsCallback, location.pathname])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cryptocurrency Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track real-time prices and market data for top cryptocurrencies
            </p>
          </div>

          <div className="flex items-center gap-3">
            <RealTimeIndicator />
            <Button onClick={manualRefresh} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {error && (
          toast.error(error + ' Please try refreshing the page.')
        )}

        <div className="mb-6">
          <SearchAndFilters />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-100 dark:bg-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredCoins.length} cryptocurrencies
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Auto-refreshes every 30 seconds
            </div>
          </div>
          <CoinsTable />
        </div>
      </main>

      <ToastContainer />
    </div>
  )
})

export default Dashboard