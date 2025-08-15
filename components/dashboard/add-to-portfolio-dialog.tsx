"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateHolding } from "@/lib/features/portfolio/portfolioSlice"
import { selectCoinInPortfolio } from "@/lib/features/portfolio/portfolioSelectors"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit } from "lucide-react"
import { useForm } from "react-hook-form"
import type { Coin } from "@/lib/features/coins/coinsSlice"

interface AddToPortfolioDialogProps {
  coin: Coin
}

interface PortfolioForm {
  amount: number
}

export function AddToPortfolioDialog({ coin }: AddToPortfolioDialogProps) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const existingHolding = useAppSelector(selectCoinInPortfolio(coin.id))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PortfolioForm>({
    defaultValues: {
      amount: existingHolding?.amount || 0,
    },
  })

  const handleAddToPortfolio = (data: PortfolioForm) => {
    dispatch(
      updateHolding({
        coinId: coin.id,
        amount: data.amount,
      }),
    )
    setOpen(false)
    reset()
  }

  const isEditing = !!existingHolding

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {isEditing ? (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit" : "Add"} {coin.name} to Portfolio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleAddToPortfolio)} className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-medium">{coin.name}</div>
              <div className="text-sm text-muted-foreground">${coin.current_price.toLocaleString()}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="any"
              placeholder="Enter amount you own"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0, message: "Amount must be positive" },
              })}
            />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
          </div>

          {existingHolding && (
            <div className="text-sm text-muted-foreground">
              Current holding: {existingHolding.amount.toLocaleString()} {coin.symbol.toUpperCase()}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Add to Portfolio"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
