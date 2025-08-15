import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PortfolioHolding {
    coinId: string
    amount: number
    addedAt: number
}

interface PortfolioState {
    holdings: Record<string, PortfolioHolding>
    totalValue: number
    totalChange24h: number
}

const initialState: PortfolioState = {
    holdings: {},
    totalValue: 0,
    totalChange24h: 0,
}

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        updateHolding: (state, action: PayloadAction<{ coinId: string; amount: number }>) => {
            const { coinId, amount } = action.payload

            if (amount <= 0) {
                delete state.holdings[coinId]
            } else {
                state.holdings[coinId] = {
                    coinId,
                    amount,
                    addedAt: state.holdings[coinId]?.addedAt || Date.now(),
                }
            }
        },

        removeHolding: (state, action: PayloadAction<string>) => {
            delete state.holdings[action.payload]
        },

        updatePortfolioValues: (state, action: PayloadAction<{ totalValue: number; totalChange24h: number }>) => {
            state.totalValue = action.payload.totalValue
            state.totalChange24h = action.payload.totalChange24h
        },

        clearPortfolio: (state) => {
            state.holdings = {}
            state.totalValue = 0
            state.totalChange24h = 0
        },
    },
})

export const { updateHolding, removeHolding, updatePortfolioValues, clearPortfolio } = portfolioSlice.actions
export default portfolioSlice.reducer
