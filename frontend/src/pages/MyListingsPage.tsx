import React, { useState } from "react";
import ListingCard from "../components/ListingCard";

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

  // Sample data for illustration — replace with API data later
  const myListings = [
    {
      id: "1",
      title: "School Blazer (Navy)",
      description: "Excellent condition, fits ages 13–14.",
      schoolNames: ["King’s High School"],
      gender: "boys",
      schoolYear: "Year 9",
      condition: "Excellent",
      price: 18,
      photos: ["/images/sample-uniform.jpg"],
      isActive: true,
    },
    {
      id: "2",
      title: "Girls Pleated Skirt",
      description: "Very good condition, outgrown by my daughter.",
      schoolNames: ["Greenfield Academy"],
      gender: "girls",
      schoolYear: "Year 6",
      condition: "Slightly Worn",
      price: 10,
      photos: ["/images/sample-dress.jpg"],
      isActive: false,
    },
  ];

  const activeListings = myListings.filter((l) => l.isActive);
  const inactiveListings = myListings.filter((l) => !l.isActive);

  const displayedListings = activeTab === "active" ? activeListings : inactiveListings;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        My Listings
      </h1>

      {/* Tabs for active/inactive */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${
            activeTab === "active"
              ? "bg-burgundy text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Active Listings
        </button>
        <button
          onClick={() => setActiveTab("inactive")}
          className={`px-4 py-2 rounded ${
            activeTab === "inactive"
              ? "bg-burgundy text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Inactive Listings
        </button>
      </div>

      {/* Display listings */}
      {displayedListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          {activeTab === "active"
            ? "You don’t currently have any active listings."
            : "You don’t currently have any inactive listings."}
        </p>
      )}
    </div>
  );
}
