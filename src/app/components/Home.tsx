import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';

export interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}

const Home = async () => {
  const response: Car[] = await client.fetch(
    `*[_type == "car" ][0..1]{
        _id,
        name,
        pricePerDay,
        "imageUrl": image.asset->url
    }`
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
        {response.map((car) => (
          <div
            key={car._id}
            className="flex flex-col justify-between w-full h-full bg-blue-500 shadow-md rounded-md p-4"
          >
            {/* Name at the Top */}
            <h2 className="text-lg font-bold text-white mb-2 truncate mt-3">{car.name}</h2>

            {/* Price Below Name */}
            <p className="text-md text-gray-200 font-medium mt-8">${car.pricePerDay} / day</p>

            {/* Button Centered in the Middle */}
            <div className="flex item-center justify-start  mt-8">
              <Link href={`/popular/${car._id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Rent Now
                </button>
              </Link>
            </div>

            {/* Image at the Bottom */}
            <div className="w-full h-60 overflow-hidden rounded-lg mt-4 relative flex items-center justify-center">
              <Image
                src={car.imageUrl}
                alt={car.name}
                width={200}
                height={200}
                className="w-[60%] h-[40%] object-cover rounded-lg transition-transform duration-500 transform hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
