import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../lib/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

// // main.tsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css"; // Tailwind global styles
// import App from "./App";

// // Providers
// import { ReduxProvider } from "./components/providers/redux-provider";
// import { ThemeProvider } from "./components/theme-provider";
// import { PageTransition } from "./components/navigation/page-transition";
// import { Toaster } from "./components/ui/toaster";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ReduxProvider>
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//         <PageTransition />
//         <App />
//         <Toaster />
//       </ThemeProvider>
//     </ReduxProvider>
//   </React.StrictMode>
// );
