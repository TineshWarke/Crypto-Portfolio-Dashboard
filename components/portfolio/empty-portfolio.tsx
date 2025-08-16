import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Wallet, TrendingUp } from "lucide-react"

export function EmptyPortfolio() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center py-16 border-2 shadow-gray-500 rounded-3xl">
                <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                    <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-semibold mb-2">Your portfolio is empty</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                    Start building your cryptocurrency portfolio by adding coins from the dashboard. Track your investments and
                    monitor their performance in real-time.
                </p>

                <Link to="/dashboard">
                    <Button>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Browse Cryptocurrencies
                    </Button>
                </Link>
            </div>
        </div>
    )
}
