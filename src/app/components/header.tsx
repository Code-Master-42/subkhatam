'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/cartCont';
import { Heart, Bell, ShoppingCart, Search, Clover } from 'lucide-react';
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
const {user}=useUser()
  const { favorites, rentalCartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Here you would typically handle the search functionality
    // For now, we'll just log the search term
  };

  return (
    <header className="bg-blue-700 text-gray-800 p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <Link href="/" className="text-2xl font-bold text-white">
            Car Rental
          </Link>
          <form onSubmit={handleSearch} className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 flex-grow"
            />
            <button type="submit" className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition duration-300">
              <Search size={20} />
            </button>
          </form>
          <nav>
            <ul className="flex items-center space-x-6 text-white">
              <li>
                <Link href="/notification" className="flex flex-col items-center hover:text-gray-900 transition duration-300">
                  <Bell size={24} />
                  <span className="text-xs">Notifications</span>
                </Link>
              </li>
              <li>
                <Link href="/favorite" className="flex flex-col items-center hover:text-gray-900 transition duration-300 relative">
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                  <Heart size={24} />
                  <span className="text-xs">Favorites</span>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="flex flex-col items-center hover:text-gray-900 transition duration-300 relative">
                  {rentalCartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {rentalCartItems.length}
                    </span>
                  )}
                  <ShoppingCart size={24} />
                  <span className="text-xs">Cart</span>
                </Link>
              </li>
              <li>
               
              </li>
              <ClerkLoaded>
{user?(
  <div>
    <UserButton/>
    <div className='hidden sm:block text-xs'>
    <p className='text-gray-400'>WelcomBack</p>
    <p className='font-bold'>{user.fullName}</p></div>
  </div>
):(
  <SignInButton mode='modal'/>
)}





              </ClerkLoaded>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

