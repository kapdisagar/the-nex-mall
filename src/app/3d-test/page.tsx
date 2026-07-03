"use client";

import { useState } from "react";
import MallEnvironment from "@/components/3d/MallEnvironment";
import ProductCard3D from "@/components/3d/ProductCard3D";
import CategoryIcon3D from "@/components/3d/CategoryIcon3D";
import { Shirt, ShoppingBag, Footprints, Watch } from "lucide-react";

export default function ThreeDTestPage() {
  const [productColor, setProductColor] = useState("#ff6b6b");
  const [is3DProduct, setIs3DProduct] = useState(true);

  const colors = [
    "#ff6b6b", // Red
    "#4ecdc4", // Teal
    "#45b7d1", // Blue
    "#f9ca24", // Yellow
    "#6c5ce7", // Purple
    "#fd79a8", // Pink
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-nex-dark mb-8">3D Components Test</h1>

      {/* Mall Environment Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-nex-dark mb-4">Mall Environment</h2>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="h-[500px] w-full">
            <MallEnvironment />
          </div>
        </div>
      </section>

      {/* Product Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-nex-dark mb-4">Product Card 3D</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setIs3DProduct(!is3DProduct)}
            className="px-4 py-2 bg-nex-primary text-white rounded-lg"
          >
            Toggle 3D: {is3DProduct ? "ON" : "OFF"}
          </button>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setProductColor(color)}
              className="w-8 h-8 rounded-full border-2"
              style={{ backgroundColor: color, borderColor: productColor === color ? "#000" : "#fff" }}
            />
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="h-64 w-64">
            {is3DProduct && (
              <ProductCard3D
                name="Premium T-Shirt"
                price="₹1,299"
                color={productColor}
              />
            )}
          </div>
        </div>
      </section>

      {/* Category Icons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-nex-dark mb-4">Category Icons 3D</h2>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryIcon3D Icon={Shirt} name="Fashion" color="#2a6496" />
            <CategoryIcon3D Icon={ShoppingBag} name="Bags" color="#1e4d7b" />
            <CategoryIcon3D Icon={Footprints} name="Footwear" color="#3498db" />
            <CategoryIcon3D Icon={Watch} name="Watches" color="#1a3a5c" />
          </div>
        </div>
      </section>
    </div>
  );
}