import React, { useState } from "react";
import SellerRating from "../components/SellerRating";
import ReviewsList from "../components/ReviewsList";

export default function ListingDetailPage() {
  // Mock listing data — replace later with live API content if needed
  const listing = {
    id: "1",
    title: "Boys Navy School Blazer",
    description: "Excellent condition, worn only a few times. Clean and ready to wear.",
    schoolNames: ["Kingston Grammar School"],
    gender: "boys",
    schoolYear: "Year 10",
    condition: "Excellent",
    price: 25,
    photos: ["/images/sample-uniform.jpg"],
    sizeMeasurements: {
      chestSize: "38 inch",
      sleeveLength: "23 inch",
      waistSize: null,
      insideLeg: null,
      coatJumperSize: null,
      shoeSize: null,
    },
    seller: {
      name: "Jane Smith",
      rating: 4,
      reviewsCount: 8,
    },
  };

  const [selectedImage, setSelectedImage] = useState(listing.photos[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and price */}
      <h1 className="text-3xl font-bold text-center mb-4">{listing.title}</h1>
      <p className="text-center text-lg text-burgundy font-semibold mb-6">
        £{listing.price}
      </p>

      {/* Photo Gallery */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={selectedImage}
          alt={listing.title}
          className="rounded-lg shadow-md w-72 h-72 object-cover mb-4"
        />
        <div className="flex space-x-2">
          {listing.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 rounded cursor-pointer border ${
                selectedImage === photo
                  ? "border-burgundy border-2"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(photo)}
            />
          ))}
        </div>
      </div>

      {/* Description and details */}
      <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2 text-burgundy">Description</h2>
        <p className="mb-4">{listing.description}</p>

        <h2 className="text-lg font-bold mb-2 text-burgundy">Details</h2>
        <ul className="space-y-1 text-gray-700 mb-4">
          <li>
            <strong>School:</strong> {listing.schoolNames.join(", ")}
          </li>
          <li>
            <strong>Gender:</strong> {listing.gender.charAt(0).toUpperCase() + listing.gender.slice(1)}
          </li>
          <li>
            <strong>School Year:</strong> {listing.schoolYear}
          </li>
          <li>
            <strong>Condition:</strong> {listing.condition}
          </li>
          {Object.entries(listing.sizeMeasurements).map(([label, value]) =>
            value ? (
              <li key={label}>
                <strong>
                  {label
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (c) => c.toUpperCase())}
                  :
                </strong>{" "}
                {value}
              </li>
            ) : null
          )}
        </ul>

        <button className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition">
          Contact Seller
        </button>
      </div>

      {/* Seller info */}
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-xl font-bold mb-2 text-burgundy">Seller Information</h2>
        <p className="mb-2">{listing.seller.name}</p>
        <SellerRating rating={listing.seller.rating} reviewCount={listing.seller.reviewsCount} />
      </div>

      {/* Reviews */}
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-lg font-bold mb-3 text-burgundy">Recent Reviews</h2>
        <ReviewsList />
      </div>
    </div>
  );
}
