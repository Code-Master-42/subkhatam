import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    
      
<main className="bg-gray-50 p-6 ">
{/* Hero Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 mt-8">
  {/* Left Hero Section */}
  <div className="bg-blue-500 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
    <h1 className="text-3xl font-semibold mb-4">
      The Best Platform for Car Rental
    </h1>
    <p className="mb-6">
      Ease of doing a car rental safely and reliably, all at an
      affordable price.
    </p>
    <Link href="/Detail-car">
      <button className="bg-white text-blue-500 py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition-colors">
        Explore Rentals
      </button>
    </Link>
    <div className="mt-6">
      <Image
        src="/image 7.png"
        alt="Car Image 1"
        width={500}
        height={300}
        className="rounded-lg transition-transform duration-500 transform hover:scale-105"
      />
    </div>
  </div>

  {/* Right Hero Section */}
  <div className="bg-blue-700 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
    <h1 className="text-3xl font-semibold mb-4">
      Rent Cars at Affordable Prices
    </h1>
    <p className="mb-6">
      Providing cheap car rental services with comfort and safety
      guaranteed.
    </p>
    <Link href="/Detail-car">
      <button className="bg-white text-blue-700 py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition-colors">
        Explore Rentals
      </button>
    </Link>
    <div className="mt-6">
      <Image
        src="/image 8.png"
        alt="Car Image 2"
        width={500}
        height={300}
        className="rounded-lg transition-transform duration-500 transform hover:scale-105"
      />
    </div>
  </div>
</div>
    </main>
  )
}

export default Home