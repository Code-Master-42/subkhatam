"use client"
import React from "react"
import { useCart } from "@/app/context/cartCont"
import Link from "next/link"
import RentForm from "@/app/components/RentForm"
import Image from "next/image"
import { CreditCard, ShoppingCartIcon as PaypalIcon } from "lucide-react"


export default function CartPage() {
  const {
    rentalCartItems,
    removeFromRentalCart,
    clearRentalCart,
    selectedCar,
    setSelectedCar,
    paymentMethod,
    setPaymentMethod,
  } = useCart()

  const totalPrice = rentalCartItems.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
        {rentalCartItems.length === 0 && !selectedCar ? (
          <p className="text-xl text-black">Your cart is empty.</p>
        ) : (
          <>
            {selectedCar && (
              <div className="mb-8 p-6 border rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-semibold mb-4">{selectedCar.title}</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <Image
                      src={selectedCar.images[0] || "/placeholder.svg"}
                      alt={selectedCar.title}
                      width={300}
                      height={200}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <p className="text-lg mb-2">{selectedCar.desc}</p>
                    <p className="text-xl font-bold mb-2">Price: ${selectedCar.price.toLocaleString()} per day</p>
                    <RentForm
                      id={selectedCar.id}
                      title={selectedCar.title}
                      price={selectedCar.price}
                      onClose={() => setSelectedCar(null)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4 mb-8">
              {rentalCartItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg bg-white">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p className="text-gray-700">Daily Rate: ${item.price.toLocaleString()}</p>
                  <p className="text-gray-600">Number of Days: {item.numberOfDays}</p>
                  <p className="font-bold">Total Price: ${item.totalPrice.toLocaleString()}</p>
                  <p className="text-black">Pick-up: {new Date(item.pickupDate).toLocaleString()}</p>
                  <p className="text-black">Drop-off: {new Date(item.dropoffDate).toLocaleString()}</p>
                  <p className="text-black">Location: {item.location}</p>
                  <div className="mt-2 text-black">
                    <p>Name: {item.personalInfo.name}</p>
                    <p>Email: {item.personalInfo.email}</p>
                    <p>Phone: {item.personalInfo.phone}</p>
                  </div>
                  <button
                    onClick={() => removeFromRentalCart(item.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Remove from Cart
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-8 text-black">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setPaymentMethod("credit-card")}
                  className={`flex items-center justify-center p-4 border rounded-lg ${
                    paymentMethod === "credit-card" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
                  }`}
                >
                  <CreditCard className="mr-2" />
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex items-center justify-center p-4 border rounded-lg ${
                    paymentMethod === "paypal" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
                  }`}
                >
                  <PaypalIcon className="mr-2" />
                  PayPal
                </button>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-bold text-black">Total: ${totalPrice.toLocaleString()}</p>
              <div className="mt-4 space-x-4">
                <button onClick={clearRentalCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                    !paymentMethod && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={(e) => !paymentMethod && e.preventDefault()}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
        <Link href="/" className="mt-8 inline-block text-blue-500 hover:text-blue-700">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}

