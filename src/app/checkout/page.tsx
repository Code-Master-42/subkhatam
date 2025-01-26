'use client'
import React, { useState } from 'react';
import { useCart } from '@/app/context/cartCont';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type CheckoutStep = 'review' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { rentalCartItems, clearRentalCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('review');
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | null>(null);

  const totalPrice = rentalCartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleNextStep = () => {
    if (step === 'review') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  const handlePrevStep = () => {
    if (step === 'payment') setStep('review');
    else if (step === 'confirmation') setStep('payment');
  };

  const handleConfirmOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order confirmed:', { rentalCartItems, paymentMethod, totalPrice });
    clearRentalCart();
    setStep('confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className={`w-1/3 h-1 ${step === 'review' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className={`w-1/3 h-1 ${step === 'payment' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className={`w-1/3 h-1 ${step === 'confirmation' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      </div>

      {step === 'review' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
          {rentalCartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>Daily Rate: ${item.price.toLocaleString()}</p>
              <p>Number of Days: {item.numberOfDays}</p>
              <p className="font-bold">Total Price: ${item.totalPrice.toLocaleString()}</p>
              <p>Pick-up: {new Date(item.pickupDate).toLocaleString()}</p>
              <p>Drop-off: {new Date(item.dropoffDate).toLocaleString()}</p>
              <p>Location: {item.location}</p>
            </div>
          ))}
          <p className="text-xl font-bold mt-4">Total: ${totalPrice.toLocaleString()}</p>
        </div>
      )}

      {step === 'payment' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-4">
            <button
              onClick={() => setPaymentMethod('credit-card')}
              className={`w-full p-4 text-left border rounded-lg ${paymentMethod === 'credit-card' ? 'border-blue-500' : ''}`}
            >
              Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`w-full p-4 text-left border rounded-lg ${paymentMethod === 'paypal' ? 'border-blue-500' : ''}`}
            >
              PayPal
            </button>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
          <p>Thank you for your order. Your rental has been confirmed.</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step !== 'review' && (
          <button
            onClick={handlePrevStep}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300 flex items-center"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back
          </button>
        )}
        {step !== 'confirmation' && (
          <button
            onClick={step === 'payment' ? handleConfirmOrder : handleNextStep}
            disabled={step === 'payment' && !paymentMethod}
            className={`ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center ${
              step === 'payment' && !paymentMethod ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {step === 'payment' ? 'Confirm Order' : 'Next'}
            <ChevronRight size={20} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
