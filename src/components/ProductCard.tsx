"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import ProductCard3D from "./3d/ProductCard3D";

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
  use3D?: boolean; // Add 3D option
  color?: string; // Color for 3D model
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  // Function to get star class based on rating
  const getStarClass = (index: number) => {
    return index < Math.floor(parseFloat(product.rating || "4.5"))
      ? "fill-amber-400 text-amber-400"
      : "text-gray-300";
  };

  // If 3D is enabled, use the 3D component
  if (product.use3D) {
    return (
      <Link href={`/product/${product.slug}`} className="group block">
        <ProductCard3D
          name={product.name}
          price={`₹${product.price}`}
          color={product.color || "#ffffff"}
        />
        {/* Info overlay for 3D card */}
        <div className="p-2">
          <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-nex-primary transition-colors text-center">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-lg font-bold text-nex-dark">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Original 2D version
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="absolute inset-0 flex items-center justify-center text-6xl bg-gradient-to-br from-blue-50 to-gray-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="opacity-30">🛍️</span>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-nex-accent text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="w-full py-2.5 bg-nex-primary hover:bg-nex-dark text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-nex-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={getStarClass(i)}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-nex-dark">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}