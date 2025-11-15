import React from "react";
import { Link } from "@tanstack/react-router";

export default function SellerTipsPage() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Seller Tips
      </h1>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          1. Great Photos Make Great Sales
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use natural daylight – avoid harsh flash or dark rooms.</li>
          <li>Lay items flat or on a hanger for a clear full view.</li>
          <li>Include close-ups of logos, labels, and any marks or repairs.</li>
          <li>Always remove name tags or black them out before photographing.</li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          2. Write Clear Descriptions
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Include school name(s), gender, year range, and sizing info.</li>
          <li>Be honest about condition – use “New or As New”, “Excellent”, or “Slightly Worn”.</li>
          <li>Mention any markings, initials, or stitched labels to build trust.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          3. Price Smartly
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Check similar listings to stay competitive.</li>
          <li>Use the built‑in price suggestion tool for guidance.</li>
          <li>Include postage costs when setting your price.</li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          4. Pack and Post Properly
        </h2>
        <p>
          Use waterproof or padded mailing bags and dispatch within 
          <strong> 3 working days</strong>. Always keep proof of postage 
          and use tracked services for higher‑value items.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          5. Communicate Professionally
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be polite and respond promptly to buyer messages.</li>
          <li>Confirm when items are dispatched and update if delays occur.</li>
          <li>Keep all communication within the SUE messaging system for transparency.</li>
        </ul>
      </section>

      <div className="text-center mt-10">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue the mascot offering seller tips"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-lg font-bold text-burgundy mb-3">
          Sue’s Top Tip
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Sue says: “Honest photos and friendly communication make for quick sales and happy buyers! Keep it simple, kind, and sustainable.”
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link
            to="/create-listing"
            className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
          >
            Create a Listing
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
