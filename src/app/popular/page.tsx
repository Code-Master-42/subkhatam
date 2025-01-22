import React from 'react'
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
export interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}


const Popularcar = async() => {
  const response: Car[] = await client.fetch(
    `*[_type == "car" ][0..10]{
        _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url
        }`
  );

  
  return (
    <div>
             {
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {response.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer p-6 rounded-lg relative overflow-hidden"

          >
            
                  <div className="w-full h-60 overflow-hidden rounded-lg mb-4 relative">
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      width={400}
                      height={100}
                      className="rounded-lg transition-transform duration-500 transform hover:scale-105"
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2 truncate">
                    {car.name}
                  </h2>
                  <p className="text-gray-700 text-md font-medium mb-4">
                    {car.pricePerDay}
                  </p>
                  <Link href={`/popular/${car._id}`} >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Rent Now
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }
    </div>
  )
}

export default Popularcar

