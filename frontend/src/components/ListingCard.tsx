import React from "react";

interface ListingCardProps {
  image?: string;
  title: string;
  description: string;
  schoolNames: string[];
  itemType: string;
  gender: string;
  schoolYear: string;
  condition: string;
  price: number;
  onClick?: () => void;
}

export default function ListingCard({
  image,
  title,
  description,
  schoolNames,
  itemType,
  gender,
  schoolYear,
  condition,
  price,
  onClick,
}: ListingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition duration-300 border border-gray-200"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {itemType}
          </span>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded">
            {gender}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
            {schoolYear}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
            {condition}
          </span>
        </div>

        <div className="text-gray-700 text-sm mb-2">
          {schoolNames.join(", ")}
        </div>

        <div className="text-burgundy font-bold text-lg">£{price.toFixed(2)}</div>
      </div>
    </div>
  );
}
