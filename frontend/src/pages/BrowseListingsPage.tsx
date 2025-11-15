import React, { useState } from "react";
import ListingCard from "../components/ListingCard";

export default function BrowseListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    itemType: "",
    gender: "",
    schoolYear: "",
    schoolName: "",
    condition: "",
  });

  // This will be replaced by static or API data later
  const sampleListings = [
    {
      id: "1",
      title: "Grey School Blazer",
      description: "Excellent condition, barely worn.",
      schoolNames: ["St. Peter’s High School"],
      gender: "boys",
      schoolYear: "Year 10",
      condition: "Excellent",
      price: 20,
      photos: ["/images/sample-uniform.jpg"],
    },
    {
      id: "2",
      title: "Girls Summer Dress",
      description: "Good condition, washed and ready to wear.",
      schoolNames: ["Greenfield Primary"],
      gender: "girls",
      schoolYear: "Year 3",
      condition: "Slightly Worn",
      price: 8,
      photos: ["/images/sample-dress.jpg"],
    },
  ];

  const filteredListings = sampleListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filter.itemType || listing.title.toLowerCase().includes(filter.itemType.toLowerCase());
    const matchesGender = !filter.gender || listing.gender === filter.gender;
    const matchesYear = !filter.schoolYear || listing.schoolYear.toLowerCase().includes(filter.schoolYear.toLowerCase());
    const matchesSchool = !filter.schoolName || listing.schoolNames.join(" ").toLowerCase().includes(filter.schoolName.toLowerCase());
    const matchesCondition = !filter.condition || listing.condition.toLowerCase().includes(filter.condition.toLowerCase());
    return matchesSearch && matchesType && matchesGender && matchesYear && matchesSchool && matchesCondition;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Browse School Uniform Listings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={filter.itemType}
          onChange={(e) => setFilter({ ...filter, itemType: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">All Types</option>
          <option value="blazer">Blazer</option>
          <option value="shirt">Shirt</option>
          <option value="skirt">Skirt</option>
          <option value="trousers">Trousers</option>
          <option value="jumper">Jumper</option>
          <option value="shoes">Shoes</option>
        </select>
        <select
          value={filter.gender}
          onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">All Genders</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
        </select>
        <input
          type="text"
          placeholder="School Name"
          value={filter.schoolName}
          onChange={(e) => setFilter({ ...filter, schoolName: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="School Year"
          value={filter.schoolYear}
          onChange={(e) => setFilter({ ...filter, schoolYear: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={filter.condition}
          onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">All Conditions</option>
          <option value="New or As New">New or As New</option>
          <option value="Excellent">Excellent</option>
          <option value="Slightly Worn">Slightly Worn</option>
        </select>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No listings match your search criteria.
        </p>
      )}
    </div>
  );
}
