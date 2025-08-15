import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
    theme: "light" | "dark"
    searchQuery: string
    filterBy: "all" | "top10" | "top50" | "positive" | "negative"
    currentPage: "dashboard" | "portfolio"
    sidebarOpen: boolean
    navigationHistory: string[]
    isNavigating: boolean
}

const initialState: UIState = {
    theme: "light",
    searchQuery: "",
    filterBy: "all",
    currentPage: "dashboard",
    sidebarOpen: false,
    navigationHistory: [],
    isNavigating: false,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },

        setFilter: (state, action: PayloadAction<UIState["filterBy"]>) => {
            state.filterBy = action.payload
        },

        setCurrentPage: (state, action: PayloadAction<UIState["currentPage"]>) => {
            state.currentPage = action.payload
        },

        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },

        clearFilters: (state) => {
            state.searchQuery = ""
            state.filterBy = "all"
        },

        addToNavigationHistory: (state, action: PayloadAction<string>) => {
            const path = action.payload
            // Remove if already exists to avoid duplicates
            state.navigationHistory = state.navigationHistory.filter((p) => p !== path)
            // Add to beginning of array
            state.navigationHistory.unshift(path)
            // Keep only last 10 items
            state.navigationHistory = state.navigationHistory.slice(0, 10)
        },

        setNavigating: (state, action: PayloadAction<boolean>) => {
            state.isNavigating = action.payload
        },

        clearNavigationHistory: (state) => {
            state.navigationHistory = []
        },
    },
})

export const {
    toggleTheme,
    setSearchQuery,
    setFilter,
    setCurrentPage,
    toggleSidebar,
    clearFilters,
    addToNavigationHistory,
    setNavigating,
    clearNavigationHistory,
} = uiSlice.actions
export default uiSlice.reducer
