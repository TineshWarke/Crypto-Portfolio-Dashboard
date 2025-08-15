import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

export const selectPortfolioState = (state: RootState) => state.portfolio
export const selectCoinsState = (state: RootState) => state.coins

export const selectPortfolioWithCoinData = createSelector(
    [selectPortfolioState, selectCoinsState],
    (portfolioState, coinsState) => {
        const { holdings } = portfolioState
        const { coins } = coinsState

        return Object.values(holdings)
            .map((holding) => {
                const coin = coins[holding.coinId]
                if (!coin) return null

                const currentValue = holding.amount * coin.current_price
                const previousPrice = coin.current_price / (1 + coin.price_change_percentage_24h / 100)
                const previousValue = holding.amount * previousPrice
                const change24h = currentValue - previousValue
                const changePercentage = previousValue > 0 ? (change24h / previousValue) * 100 : 0

                return {
                    ...holding,
                    coin,
                    currentValue,
                    change24h,
                    changePercentage,
                }
            })
            .filter(Boolean)
    },
)

export const selectPortfolioSummary = createSelector([selectPortfolioWithCoinData], (portfolioWithCoinData) => {
    const totalValue = portfolioWithCoinData.reduce((sum, item) => sum + (item?.currentValue || 0), 0)
    const totalChange24h = portfolioWithCoinData.reduce((sum, item) => sum + (item?.change24h || 0), 0)
    const totalChangePercentage = totalValue > 0 ? (totalChange24h / (totalValue - totalChange24h)) * 100 : 0

    return {
        totalValue,
        totalChange24h,
        totalChangePercentage,
        holdingsCount: portfolioWithCoinData.length,
    }
})

export const selectCoinInPortfolio = (coinId: string) =>
    createSelector([selectPortfolioState], (portfolioState) => portfolioState.holdings[coinId])
