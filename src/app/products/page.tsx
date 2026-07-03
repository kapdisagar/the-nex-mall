"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Grid3X3, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string | null;
  image: string | null;
  rating: string;
  reviews: number;
  isNew: boolean;
  featured: boolean;
  inStock: boolean;
  categoryId: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFiltered(data.products);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const lower = search.toLowerCase();
      setFiltered(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower)
        )
      );
    } else {
      setFiltered(products);
    }
  }, [search, products]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-nex-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-nex-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-nex-primary font-medium">All Products</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-nex-dark">All Products</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-nex-primary w-64"
            />
          </div>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${viewMode === "grid" ? "bg-nex-primary text-white" : "text-gray-600"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              className={`p-2 ${viewMode === "list" ? "bg-nex-primary text-white" : "text-gray-600"}`}
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-500 mb-6">Showing {filtered.length} products</p>

      {/* Products */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🔍</p>
          <h3 className="text-xl font-bold text-nex-dark mb-2">No products found</h3>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center text-4xl shrink-0">
                ️
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-bold text-nex-dark text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xl font-bold text-nex-dark">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
