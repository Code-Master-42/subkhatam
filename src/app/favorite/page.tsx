"use client"
import React from "react"
import { useCart } from "@/app/context/cartCont"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useCart()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Favorites</h1>
        {favorites.length === 0 ? (
          <p className="text-xl text-black">You haven't added any favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">Price: ${item.price.toLocaleString()}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/cars/${item.id}`} className="text-blue-500 hover:text-blue-700">
                    View Details
                  </Link>
                  <button onClick={() => removeFromFavorites(item.id)} className="text-red-500 hover:text-red-700">
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link href="/" className="mt-8 inline-block text-blue-500 hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

