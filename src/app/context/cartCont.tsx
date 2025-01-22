"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface RentalCartItem {
  id: string
  title: string
  price: number
  pickupDate: string
  dropoffDate: string
  location: string
  personalInfo: {
    name: string
    email: string
    phone: string
  }
  numberOfDays: number
  totalPrice: number
}

export interface FavoriteItem {
  id: string
  title: string
  price: number
}

export interface SelectedCar {
  id: string
  title: string
  price: number
  images: string[]
  desc: string
  selectedColor?: string
}

type PaymentMethod = "credit-card" | "paypal" | null

interface CartContextType {
  rentalCartItems: RentalCartItem[]
  favorites: FavoriteItem[]
  selectedCar: SelectedCar | null
  paymentMethod: PaymentMethod
  addToRentalCart: (item: RentalCartItem) => void
  removeFromRentalCart: (itemId: string) => void
  clearRentalCart: () => void
  getRentalCartTotal: () => number
  getRentalCartItemsCount: () => number
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (itemId: string) => void
  isFavorite: (itemId: string) => boolean
  setSelectedCar: (car: SelectedCar | null) => void
  setPaymentMethod: (method: PaymentMethod) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rentalCartItems, setRentalCartItems] = useState<RentalCartItem[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [selectedCar, setSelectedCar] = useState<SelectedCar | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)

  useEffect(() => {
    const storedCart = localStorage.getItem("rentalCart")
    const storedFavorites = localStorage.getItem("favorites")
    if (storedCart) {
      setRentalCartItems(JSON.parse(storedCart))
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("rentalCart", JSON.stringify(rentalCartItems))
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [rentalCartItems, favorites])

  const addToRentalCart = (item: RentalCartItem) => {
    setRentalCartItems((prevItems) => [...prevItems, item])
  }

  const removeFromRentalCart = (itemId: string) => {
    setRentalCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearRentalCart = () => {
    setRentalCartItems([])
  }

  const getRentalCartTotal = () => {
    return rentalCartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  const getRentalCartItemsCount = () => {
    return rentalCartItems.length
  }

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => [...prevFavorites, item])
  }

  const removeFromFavorites = (itemId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId))
  }

  const isFavorite = (itemId: string) => {
    return favorites.some((item) => item.id === itemId)
  }

  return (
    <CartContext.Provider
      value={{
        rentalCartItems,
        favorites,
        selectedCar,
        paymentMethod,
        addToRentalCart,
        removeFromRentalCart,
        clearRentalCart,
        getRentalCartTotal,
        getRentalCartItemsCount,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        setSelectedCar,
        setPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


