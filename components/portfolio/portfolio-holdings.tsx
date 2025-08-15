import { useState } from "react"
import { useAppDispatch } from "../../lib/hooks"
import { updateHolding, removeHolding } from "../../lib/features/portfolio/portfolioSlice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Edit, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "../../lib/utils"

interface PortfolioHoldingsProps {
    holdings: Array<{
        coinId: string
        amount: number
        addedAt: number
        coin: any
        currentValue: number
        change24h: number
        changePercentage: number
    }>
}

interface EditHoldingForm {
    amount: number
}

export function PortfolioHoldings({ holdings }: PortfolioHoldingsProps) {
    const dispatch = useAppDispatch()
    const [editingHolding, setEditingHolding] = useState<string | null>(null)

    const { register, handleSubmit, reset, setValue } = useForm<EditHoldingForm>()

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    }

    const formatPercentage = (percentage: number) => {
        const isPositive = percentage >= 0
        return (
            <div className={`w-fit px-2 rounded-full ${isPositive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}>
                {isPositive ? "+" : ""}
                {percentage.toFixed(2)}%
            </div>
        )
    }

    const handleEditHolding = (holding: any) => {
        setEditingHolding(holding.coinId)
        setValue("amount", holding.amount)
    }

    const handleUpdateHolding = (data: EditHoldingForm) => {
        if (editingHolding) {
            dispatch(
                updateHolding({
                    coinId: editingHolding,
                    amount: data.amount,
                }),
            )
            setEditingHolding(null)
            reset()
        }
    }

    const handleRemoveHolding = (coinId: string) => {
        dispatch(removeHolding(coinId))
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Holdings</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {holdings.map((holding) => (
                        <TableRow key={holding.coinId} className="hover:bg-muted/50">
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <div className="relative h-8 w-8">
                                        <img
                                            src={holding.coin.image || "/placeholder.svg"}
                                            alt={holding.coin.name}
                                            className="rounded-full object-cover"
                                            sizes="32px"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">{holding.coin.name}</div>
                                        <div className="text-sm text-muted-foreground uppercase">{holding.coin.symbol}</div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="font-mono">
                                {holding.amount.toLocaleString()} {holding.coin.symbol.toUpperCase()}
                            </TableCell>

                            <TableCell className="font-mono">{formatCurrency(holding.coin.current_price)}</TableCell>

                            <TableCell className="font-mono font-medium">{formatCurrency(holding.currentValue)}</TableCell>

                            <TableCell>
                                <div className="space-y-1">
                                    {formatPercentage(holding.changePercentage)}
                                    <div className="text-xs text-muted-foreground">{formatCurrency(Math.abs(holding.change24h))}</div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="sm" onClick={() => handleEditHolding(holding)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit {holding.coin.name} Holdings</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit(handleUpdateHolding)} className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium">Amount</label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        placeholder="Enter amount"
                                                        {...register("amount", {
                                                            required: true,
                                                            min: 0,
                                                            valueAsNumber: true,
                                                        })}
                                                        className={cn(
                                                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-2">
                                                    <Button type="button" variant="outline" onClick={() => setEditingHolding(null)}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit">Update</Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="ghost" size="sm" onClick={() => handleRemoveHolding(holding.coinId)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
