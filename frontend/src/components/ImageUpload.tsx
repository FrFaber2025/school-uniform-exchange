import React, { useState } from "react";

interface ImageUploadProps {
  images: File[];
  setImages: (files: File[]) => void;
}

export default function ImageUpload({ images, setImages }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(
    images.map((file) => URL.createObjectURL(file))
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setImages([...images, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-800">
        Upload Photos
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      <p className="text-sm text-gray-500 mt-2">
        You can upload multiple images. The first photo will be your main image.
      </p>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover rounded border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
