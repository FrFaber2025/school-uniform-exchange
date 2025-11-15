import React from "react";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Hero Section */}
      <section className="relative w-full bg-gray-100">
        <img
          src="/generated/sue-hero-banner.dim_1200x400.jpg"
          alt="School Uniform Exchange banner"
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            School Uniform Exchange (SUE)
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto drop-shadow">
            Buy and sell pre‑loved UK school uniforms easily and safely — helping families save money and reduce waste.
          </p>
        </div>
      </section>

      {/* About / Intro Section */}
      <section className="py-12 px-4 max-w-3xl">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue mascot smiling"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-burgundy mb-3">Meet Sue!</h2>
        <p className="text-gray-700 mb-4">
          Sue is here to make second‑hand school uniform shopping simple. Whether you’re decluttering wardrobes or looking for affordable options, SUE connects UK parents and guardians to exchange uniforms in great condition.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/browse"
            className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
          >
            Browse Listings
          </Link>
          <Link
            to="/create-listing"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Sell Uniforms
          </Link>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-white w-full py-12 px-4 text-gray-700">
        <h2 className="text-2xl font-bold text-burgundy mb-4">Turn Outgrown Items into Cash</h2>
        <img
          src="/generated/homepage-diverse-children.dim_1200x400.jpg"
          alt="Children wearing school uniforms"
          className="w-full h-64 md:h-80 object-cover rounded mb-4"
        />
        <p className="max-w-3xl mx-auto">
          Each year, thousands of uniforms are outgrown long before they wear out. By selling them on SUE, you keep quality clothing in circulation and help other families save.
        </p>
      </section>

      {/* Getting Started */}
      <section className="bg-gray-50 w-full py-12 px-4">
        <h2 className="text-2xl font-bold text-burgundy mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-gray-700">
          Creating a listing takes just minutes — all you need is a photo, a short description, and your price.
        </p>
        <Link
          to="/create-listing"
          className="bg-burgundy text-white px-8 py-3 rounded hover:bg-burgundy-dark transition"
        >
          Create a Listing
        </Link>
      </section>
    </div>
  );
}
