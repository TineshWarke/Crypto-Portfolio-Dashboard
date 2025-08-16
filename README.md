# Crypto Portfolio Dashboard

Live Demo : https://crypto-portfolio-dashboard-three.vercel.app/dashboard

A responsive and interactive crypto portfolio dashboard built with **React.js** and **Redux Toolkit**.  
All application state (coins, filters, portfolio, UI) is managed in Redux.  
Market data is fetched from the **CoinGecko API** via async thunks (`createAsyncThunk`).

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/TineshWarke/Crypto-Portfolio-Dashboard.git
cd Crypto-Portfolio-Dashboard
npm install
npm run dev
```

- Runs at: `http://localhost:5173`  
- Build for production:  
  ```bash
  npm run build
  npm run preview
  ```

---

## 🏗️ Redux Architecture

- **Slices** (feature-based state):  
  - `coinsSlice`: stores normalized coin data (`ids` + `entities`)  
  - `filtersSlice`: manages search query + filter states (Top10/Top50, gainers/losers)  
  - `portfolioSlice`: holds user-owned amounts and computes total value & 24h change  
  - `uiSlice`: theme (dark/light), error/toast state  

- **Async Thunks** (`createAsyncThunk`):  
  - `fetchCoins`: loads market data from CoinGecko  
  - `pollPrices`: auto-refreshes prices every 30s  

- **Selectors** (Reselect):  
  - `selectAllCoins`, `selectFilteredCoins`, `selectPortfolioValue`, `selectPortfolioChange24h`  

- **Routing**:  
  - `/dashboard`: market overview (table + filters)  
  - `/portfolio`: user portfolio summary  

- **Performance Optimizations**:  
  - `React.memo`, `useCallback` to prevent re-renders  
  - Normalized state for efficient lookups  
  - Centralized error handling in Redux  

---

## 🌐 API Usage (CoinGecko)

- Endpoint used:  
  ```
  GET https://api.coingecko.com/api/v3/coins/markets
  ```
- Example params:  
  - `vs_currency=usd`  
  - `order=market_cap_desc`  
  - `per_page=50`  
  - `page=1`  
  - `price_change_percentage=24h`  

- **Integration details**:  
  - API calls are made only inside async thunks  
  - Responses normalized into `{ ids: [], entities: {} }`  
  - Errors caught in `rejected` case → stored in Redux → displayed via toast/alert  

---

## ✨ Features
- Live market table (name, symbol, logo, price, 24h %, market cap)  
- Search & filters (name, Top10/Top50, gainers/losers)  
- Portfolio tracking with real-time valuation and P/L %  
- Auto-refresh every 30s via Redux polling  
- Responsive, mobile-friendly design  
- Bonus: Theme toggle + chart integration (optional)  

---

**Live Demo** 👉 [Crypto Dashboard](https://crypto-portfolio-dashboard-three.vercel.app/dashboard)  
