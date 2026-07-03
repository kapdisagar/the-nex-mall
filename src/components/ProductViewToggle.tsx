"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice?: string | null;
  image: string | null;
  rating?: string;
  reviews?: number;
  isNew?: boolean;
  featured?: boolean;
  inStock?: boolean;
  color?: string; // For 3D version
}

export default function ProductViewToggle({ products }: { products: Product[] }) {
  const [use3D, setUse3D] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");

  // Color options for 3D products
  const colors = [
    "#ff6b6b", // Red
    "#4ecdc4", // Teal
    "#45b7d1", // Blue
    "#f9ca24", // Yellow
    "#6c5ce7", // Purple
    "#fd79a8", // Pink
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={() => setUse3D(!use3D)}
          className="px-4 py-2 bg-nex-primary text-white rounded-lg hover:bg-nex-dark transition-colors"
        >
          Toggle 3D View: {use3D ? "ON" : "OFF"}
        </button>

        {use3D && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Product Color:</span>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-6 h-6 rounded-full border-2"
                style={{
                  backgroundColor: color,
                  borderColor: selectedColor === color ? "#000" : "#fff"
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={
              use3D ? {
                ...product,
                use3D: true,
                color: selectedColor
              } : product
            }
          />
        ))}
      </div>
    </div>
  );
}