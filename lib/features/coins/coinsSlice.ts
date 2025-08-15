import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface Coin {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
    total_volume: number
    last_updated: string
}

interface CoinsState {
    coins: Record<string, Coin>
    coinsList: string[]
    loading: boolean
    error: string | null
    lastUpdated: number
}

const initialState: CoinsState = {
    coins: {},
    coinsList: [],
    loading: false,
    error: null,
    lastUpdated: 0,
}

export const fetchCoins = createAsyncThunk(
    "coins/fetchCoins",
    async (params: { limit?: number; category?: string } = {}) => {
        const { limit = 50 } = params
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`,
        )

        if (!response.ok) {
            throw new Error("Failed to fetch coins")
        }

        const data = await response.json()
        return data as Coin[]
    },
)

const coinsSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoins.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCoins.fulfilled, (state, action) => {
                state.loading = false
                const coinsById: Record<string, Coin> = {}
                const coinsList: string[] = []

                action.payload.forEach((coin) => {
                    coinsById[coin.id] = coin
                    coinsList.push(coin.id)
                })

                state.coins = coinsById
                state.coinsList = coinsList
                state.lastUpdated = Date.now()
            })
            .addCase(fetchCoins.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch coins"
            })
    },
})

export const { clearError } = coinsSlice.actions
export default coinsSlice.reducer
