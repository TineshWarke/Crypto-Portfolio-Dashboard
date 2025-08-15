import { configureStore } from "@reduxjs/toolkit"
import coinsReducer from "./features/coins/coinsSlice"
// import portfolioReducer from "./features/portfolio/portfolioSlice"
import uiReducer from "./features/ui/uiSlice"

export const store = configureStore({
    reducer: {
        coins: coinsReducer,
        // portfolio: portfolioReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
