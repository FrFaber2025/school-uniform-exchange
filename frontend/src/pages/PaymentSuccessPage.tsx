import React from "react";
import { Link } from "@tanstack/react-router";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center text-gray-800">
      <img
        src="/generated/payment-icon-transparent.dim_64x64.png"
        alt="Payment success icon"
        className="w-16 h-16 mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold text-burgundy mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Thank you for your payment — your transaction has been completed
        successfully through our secure Stripe checkout. The seller has been
        notified and will dispatch your item within 3 working days.
      </p>
      <p className="mb-8 text-gray-700">
        You can track the status of your order and message the seller directly
        from the Messages page.
      </p>

      <div className="flex justify-center flex-wrap gap-4">
        <Link
          to="/messages"
          className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
        >
          View Messages
        </Link>
        <Link
          to="/browse"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Continue Browsing
        </Link>
      </div>

      <div className="mt-12">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue mascot celebrating"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-lg font-bold text-burgundy mb-2">
          Sue’s Happy Message
        </h2>
        <p className="text-gray-700 max-w-lg mx-auto">
          Congratulations! Your purchase helps another family and reduces
          clothing waste. Sue’s proud of you for making a sustainable choice!
        </p>
      </div>
    </div>
  );
}
