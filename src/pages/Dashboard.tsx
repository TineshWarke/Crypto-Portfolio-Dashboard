import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
// import { fetchCoins } from "@/lib/features/coins/coinsSlice"
// import { addToNavigationHistory } from "@/lib/features/ui/uiSlice"
import { selectFilteredCoins } from "../../lib/features/coins/coinsSelectors"
import { CoinsTable } from "../../components/dashboard/coins-table"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { SearchAndFilters } from "../../components/dashboard/search-and-filters"
// import { RealTimeIndicator } from "./real-time-indicator"
import { Breadcrumbs } from "../../components/navigation/breadcrumbs"
// import { useAutoRefresh } from "@/hooks/use-auto-refresh"
// import { Card, CardContent } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Button } from "@/components/ui/button"
// import { RefreshCw } from "lucide-react"
import { useSelector } from "react-redux"
import { fetchCoins } from "../../lib/features/coins/coinsSlice"
// import { usePathname } from "next/navigation"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  // const pathname = usePathname()
  // const loading = useAppSelector(selectCoinsLoading)
  // const error = useAppSelector(selectCoinsError)
  const filteredCoins = useSelector(selectFilteredCoins)

  // const { manualRefresh } = useAutoRefresh({
  //   interval: 30000, // 30 seconds
  //   enabled: true,
  // })

  useEffect(() => {
    dispatch(fetchCoins({ limit: 100 }))
    // dispatch(addToNavigationHistory(location.pathname))
  }, [dispatch, location.pathname])

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
            {/* <RealTimeIndicator />
            <Button onClick={manualRefresh} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button> */}
          </div>
        </div>
{/* 
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{error}. Please try refreshing the page.</AlertDescription>
          </Alert>
        )} */}

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
    </div>
  )
}

export default Dashboard


// import { useEffect, memo } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchCoins } from "../store/features/coins/coinsSlice"
// import { addToNavigationHistory } from "../store/features/ui/uiSlice"
// import { selectCoinsLoading, selectCoinsError, selectFilteredCoins } from "../store/features/coins/coinsSelectors"
// import { CoinsTable } from "./CoinsTable"
// import { DashboardHeader } from "./DashboardHeader"
// import { SearchAndFilters } from "./SearchAndFilters"
// import { RealTimeIndicator } from "./RealTimeIndicator"
// import { Breadcrumbs } from "./Breadcrumbs"
// import { useAutoRefresh } from "../hooks/useAutoRefresh"
// import { useLocation } from "react-router-dom"

// export const DashboardContent = memo(function DashboardContent() {
//   const dispatch = useDispatch()
//   const location = useLocation()

//   const loading = useSelector(selectCoinsLoading)
//   const error = useSelector(selectCoinsError)
//   const filteredCoins = useSelector(selectFilteredCoins)

//   const { manualRefresh } = useAutoRefresh({
//     interval: 30000, // 30 seconds
//     enabled: true,
//   })

//   useEffect(() => {
//     dispatch(fetchCoins({ limit: 100 }))
//     dispatch(addToNavigationHistory(location.pathname))
//   }, [dispatch, location.pathname])

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <DashboardHeader />

//       <main className="container mx-auto px-4 py-8">
//         <Breadcrumbs />

//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//               Cryptocurrency Dashboard
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">
//               Track real-time prices and market data for top cryptocurrencies
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <RealTimeIndicator />
//             <button
//               onClick={manualRefresh}
//               disabled={loading}
//               className="flex items-center px-3 py-1.5 border rounded-md text-sm font-medium
//                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
//                 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <svg
//                 className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6" />
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
//             {error}. Please try refreshing the page.
//           </div>
//         )}

//         <div className="mb-6">
//           <SearchAndFilters />
//         </div>

        // <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        //   <div className="px-6 py-4 border-b bg-gray-100 dark:bg-gray-700 flex items-center justify-between">
        //     <p className="text-sm text-gray-600 dark:text-gray-300">
        //       Showing {filteredCoins.length} cryptocurrencies
        //     </p>
        //     <div className="text-xs text-gray-500 dark:text-gray-400">
        //       Auto-refreshes every 30 seconds
        //     </div>
        //   </div>
        //   <CoinsTable />
        // </div>
//       </main>
//     </div>
//   )
// })
