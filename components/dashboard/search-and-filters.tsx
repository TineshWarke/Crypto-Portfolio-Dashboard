import { memo, useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { setSearchQuery, setFilter, clearFilters } from "../../lib/features/ui/uiSlice"
import { Button } from "../../components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Search, X, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { cn } from "../../lib/utils"

export const SearchAndFilters = memo(function SearchAndFilters() {
    const dispatch = useAppDispatch()
    const searchQuery = useAppSelector((state) => state.ui.searchQuery)
    const filterBy = useAppSelector((state) => state.ui.filterBy)

    const handleSearchChange = useCallback(
        (value: string) => {
            dispatch(setSearchQuery(value))
        },
        [dispatch],
    )

    const handleFilterChange = useCallback(
        (filter: typeof filterBy) => {
            dispatch(setFilter(filter))
        },
        [dispatch],
    )

    const handleClearFilters = useCallback(() => {
        dispatch(clearFilters())
    }, [dispatch])

    const getFilterLabel = useCallback((filter: typeof filterBy) => {
        switch (filter) {
            case "top10":
                return "Top 10"
            case "top50":
                return "Top 50"
            case "positive":
                return "Positive 24h"
            case "negative":
                return "Negative 24h"
            default:
                return "All Coins"
        }
    }, [])

    const hasActiveFilters = searchQuery.trim() !== "" || filterBy !== "all"

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search cryptocurrencies..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={`pl-10 ${cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        )}`}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" />
                                {getFilterLabel(filterBy)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleFilterChange("all")}>All Coins</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilterChange("top10")}>Top 10 by Market Cap</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilterChange("top50")}>Top 50 by Market Cap</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilterChange("positive")}>Positive 24h Change</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilterChange("negative")}>Negative 24h Change</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                            <X className="h-4 w-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-muted-foreground">Active filters:</span>

                    {searchQuery.trim() && (
                        <div className="gap-1 bg-gray-200 text-xs px-2 rounded-full py-0.5 font-semibold hover:bg-red-100">
                            <button onClick={() => handleSearchChange("")}>
                                Search: "{searchQuery}"
                            </button>
                        </div>
                    )}

                    {filterBy !== "all" && (
                        <div className="gap-1 bg-gray-200 text-xs px-2 rounded-full py-0.5 font-semibold hover:bg-red-100">
                            <button onClick={() => handleFilterChange("all")}>
                                {getFilterLabel(filterBy)}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
})
