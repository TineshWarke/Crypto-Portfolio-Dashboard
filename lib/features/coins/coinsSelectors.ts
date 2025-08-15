import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

export const selectCoinsState = (state: RootState) => state.coins
export const selectUIState = (state: RootState) => state.ui

export const selectFilteredCoins = createSelector([selectCoinsState, selectUIState], (coinsState, uiState) => {
    const { coins, coinsList } = coinsState
    const { searchQuery, filterBy } = uiState

    let filteredCoins = coinsList.map((id) => coins[id]).filter(Boolean)

    // Apply search filter
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        filteredCoins = filteredCoins.filter(
            (coin) => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query),
        )
    }

    // Apply category filters
    switch (filterBy) {
        case "top10":
            filteredCoins = filteredCoins.slice(0, 10)
            break
        case "top50":
            filteredCoins = filteredCoins.slice(0, 50)
            break
        case "positive":
            filteredCoins = filteredCoins.filter((coin) => coin.price_change_percentage_24h > 0)
            break
        case "negative":
            filteredCoins = filteredCoins.filter((coin) => coin.price_change_percentage_24h < 0)
            break
        default:
            // 'all' - no additional filtering
            break
    }

    return filteredCoins
})

export const selectCoinsLoading = (state: RootState) => state.coins.loading
export const selectCoinsError = (state: RootState) => state.coins.error
export const selectLastUpdated = (state: RootState) => state.coins.lastUpdated
