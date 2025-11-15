import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function CreateListingPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    schoolNames: "",
    gender: "",
    schoolYear: "",
    itemType: "",
    condition: "",
    price: "",
  });
  const [images, setImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your listing has been saved (mock version for Vercel build).");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Create a New Listing</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
            placeholder="e.g. Boys Navy Blazer Size 10"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded p-2"
            placeholder="Describe the item, its condition, and any notes."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">School Name(s)</label>
          <input
            type="text"
            name="schoolNames"
            value={form.schoolNames}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Enter one or more school names"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">School Year</label>
            <input
              type="text"
              name="schoolYear"
              value={form.schoolYear}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="e.g. Year 8"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Item Type</label>
          <select
            name="itemType"
            value={form.itemType}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select</option>
            <option value="blazer">Blazer</option>
            <option value="shirt">Shirt</option>
            <option value="skirt">Skirt</option>
            <option value="trousers">Trousers</option>
            <option value="jumper">Jumper</option>
            <option value="shoes">Shoes</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Condition</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select</option>
            <option value="New or As New">New or As New</option>
            <option value="Excellent">Excellent</option>
            <option value="Slightly Worn">Slightly Worn</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (£)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Photos</label>
          <ImageUpload onImagesChange={setImages} />
        </div>

        <button
          type="submit"
          className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
        >
          Save Listing
        </button>
      </form>

      <div className="mt-10 text-center">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue mascot offering tips"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-burgundy mb-2">Sue’s Tips for Sellers</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Make sure your uniform items are clean, ironed, and photographed clearly in natural light.
          Mention any small marks or alterations — honesty helps build trust and results in faster sales!
        </p>
      </div>
    </div>
  );
}
