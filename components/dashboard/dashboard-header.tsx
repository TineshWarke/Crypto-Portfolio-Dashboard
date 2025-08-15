"use client"

// import { useAppSelector, useAppDispatch } from "@/lib/hooks"
// import { toggleTheme } from "@/lib/features/ui/uiSlice"
// import { Button } from "@/components/ui/button"
// import { MobileNav } from "@/components/navigation/mobile-nav"
import { Moon, Sun, TrendingUp, Wallet } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
// import { usePathname } from "next/navigation"

export function DashboardHeader() {
    const location = useLocation();
    // const dispatch = useAppDispatch()
    // const theme = useAppSelector((state) => state.ui.theme)

    // const handleThemeToggle = () => {
    //     dispatch(toggleTheme())
    //     document.documentElement.classList.toggle("dark")
    // }

    const navItems = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: TrendingUp,
        },
        {
            href: "/portfolio",
            label: "Portfolio",
            icon: Wallet,
        },
    ]

    return (
        <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">CryptoTracker</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = location.pathname === item.href

                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* <Button variant="ghost" size="sm" onClick={handleThemeToggle} className="hidden md:flex">
                            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </Button>

                        <MobileNav /> */}
                    </div>
                </div>
            </div>
        </header>
    )
}


// import { useAppSelector, useAppDispatch } from "../lib/hooks";
// import { toggleTheme } from "../lib/features/ui/uiSlice";
// import { Link, useLocation } from "react-router-dom";
// import { Moon, Sun, TrendingUp, Wallet } from "lucide-react";

// export function DashboardHeader() {
//   const dispatch = useAppDispatch();
//   const theme = useAppSelector((state) => state.ui.theme);
//   const location = useLocation();

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//     document.documentElement.classList.toggle("dark");
//   };

//   const navItems = [
//     { href: "/dashboard", label: "Dashboard", icon: TrendingUp },
//     { href: "/portfolio", label: "Portfolio", icon: Wallet },
//   ];

//   return (
//     <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo and Nav */}
//           <div className="flex items-center space-x-8">
//             <Link to="/dashboard" className="flex items-center space-x-2">
//               <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               <span className="text-xl font-bold">CryptoTracker</span>
//             </Link>

//             <nav className="hidden md:flex items-center space-x-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.href;

//                 return (
//                   <Link
//                     key={item.href}
//                     to={item.href}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span>{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Theme Toggle */}
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handleThemeToggle}
//               className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-4 w-4" />
//               ) : (
//                 <Sun className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
