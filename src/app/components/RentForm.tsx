
"use client"
import type React from "react"
import { useState } from "react"
import { useCart } from "@/app/context/cartCont"
import { differenceInDays } from "date-fns"

interface RentFormProps {
  id: string
  title: string
  price: number
  onClose: () => void
}

export default function RentForm({ id, title, price, onClose }: RentFormProps) {
  const { addToRentalCart, setSelectedCar } = useCart()
  const [formData, setFormData] = useState({
    pickupDate: "",
    dropoffDate: "",
    location: "",
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pickupDate = new Date(formData.pickupDate)
    const dropoffDate = new Date(formData.dropoffDate)
    const numberOfDays = differenceInDays(dropoffDate, pickupDate) + 1 // Add 1 to include the pickup day
    const totalPrice = price * numberOfDays

    addToRentalCart({
      id,
      title,
      price: price,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      location: formData.location,
      personalInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      numberOfDays,
      totalPrice,
    })
    setSelectedCar(null) // Clear the selected car after adding to cart
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
            Pick-up Date & Time
          </label>
          <input
            type="datetime-local"
            id="pickupDate"
            name="pickupDate"
            required
            className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700">
            Drop-off Date & Time
          </label>
          <input
            type="datetime-local"
            id="dropoffDate"
            name="dropoffDate"
            required
            className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-800 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Total Price: $
          {(
            price *
            (differenceInDays(new Date(formData.dropoffDate), new Date(formData.pickupDate)) + 1)
          ).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          (${price.toLocaleString()} per day for{" "}
          {differenceInDays(new Date(formData.dropoffDate), new Date(formData.pickupDate)) + 1} days)
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </form>
  )
}

