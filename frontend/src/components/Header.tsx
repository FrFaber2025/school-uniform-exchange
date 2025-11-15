import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-burgundy text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and title */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/generated/sue-logo-transparent.dim_300x100.png"
            alt="School Uniform Exchange Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold whitespace-nowrap">
            School Uniform Exchange (SUE)
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4 text-sm md:text-base">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/browse" className="hover:text-gray-300">
            Browse
          </Link>
          <Link to="/create-listing" className="hover:text-gray-300">
            Sell
          </Link>
          <Link to="/seller-tips" className="hover:text-gray-300">
            Seller Tips
          </Link>
          <Link to="/returns-refunds" className="hover:text-gray-300">
            Returns & Refunds
          </Link>
          <Link to="/postage-packing" className="hover:text-gray-300">
            Postage & Packing
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-gray-300">
            Terms
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded hover:bg-burgundy-dark"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-burgundy-dark text-white">
          <nav className="flex flex-col space-y-2 p-4 text-sm">
            <Link to="/" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/browse" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Browse
            </Link>
            <Link to="/create-listing" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Sell
            </Link>
            <Link to="/seller-tips" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Seller Tips
            </Link>
            <Link to="/returns-refunds" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Returns & Refunds
            </Link>
            <Link to="/postage-packing" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Postage & Packing
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Terms
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
