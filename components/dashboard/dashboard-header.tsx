import { useAppSelector, useAppDispatch } from "../../lib/hooks"
import { toggleTheme } from "../../lib/features/ui/uiSlice"
import { Button } from "../../components/ui/button"
import { Moon, Sun, TrendingUp, Wallet } from "lucide-react"
import { Link, useLocation } from "react-router-dom";

export function DashboardHeader() {
    const location = useLocation();
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.ui.theme)

    const handleThemeToggle = () => {
        dispatch(toggleTheme())
        document.documentElement.classList.toggle("dark")
    }

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
            <div className="container mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="flex items-center space-x-2">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">CryptoTracker</span>
                        </Link>

                        <nav className="flex items-center space-x-1">
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
                        <Button variant="ghost" size="sm" onClick={handleThemeToggle} className="hidden md:flex">
                            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}