import React from "react";
import { Link } from "@tanstack/react-router";

export default function PaymentFailurePage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <img
        src="/generated/payment-icon-transparent.dim_64x64.png"
        alt="Payment failure icon"
        className="w-16 h-16 mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold text-burgundy mb-4">
        Payment Unsuccessful
      </h1>
      <p className="text-gray-700 mb-8 max-w-xl mx-auto">
        Unfortunately, your payment did not go through. This might be because
        the transaction was cancelled, the card details were incorrect, or the
        payment provider declined the charge.
      </p>

      <p className="text-gray-700 mb-8">
        Please check your details or try again. If the problem continues,
        contact your card provider or reach out to the SUE team for assistance.
      </p>

      <div className="flex justify-center flex-wrap gap-4">
        <Link
          to="/browse"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Browse Listings
        </Link>
        <Link
          to="/create-listing"
          className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
        >
          Try Again
        </Link>
      </div>

      <div className="mt-12">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue the mascot offering help"
          className="w-32 h-32 mx-auto mb-4"
        />
        <p className="text-gray-600 italic">
          Don’t worry — Sue says payments sometimes fail for small reasons!
          Simply retry your checkout, and you’ll be back on track in no time.
        </p>
      </div>
    </div>
  );
}
