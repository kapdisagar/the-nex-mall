"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
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

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const cat = data.categories.find((c: Category) => c.slug === slug);
        const prods = data.products.filter((p: Product) => p.categoryId === cat?.id);
        setCategory(cat || null);
        setProducts(prods);
        setLoading(false);
      });
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const filteredProducts = sortedProducts.filter(
    (p) =>
      parseFloat(p.price) >= priceRange[0] &&
      parseFloat(p.price) <= priceRange[1]
  );

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
        <Link href="/" className="hover:text-nex-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-nex-primary font-medium">{category?.name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-nex-primary to-nex-light rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-full h-full bg-white rounded-full blur-3xl translate-x-1/2"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{category?.name}</h1>
          <p className="text-white/70">{category?.description}</p>
          <p className="text-nex-gold font-semibold mt-2">
            {filteredProducts.length} Products Available
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`hidden lg:block w-64 shrink-0 ${showFilters ? "block" : ""}`}
        >
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="font-bold text-nex-dark mb-4 flex items-center gap-2">
              <SlidersHorizontal size={18} /> Filters
            </h3>

            {/* Sort */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-nex-primary bg-gray-50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Price Range
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-nex-primary"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* In Stock */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-nex-primary rounded"
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-nex-primary text-white rounded-lg text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <p className="text-sm text-gray-500 hidden lg:block">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-nex-primary text-white" : "bg-gray-100 text-gray-600"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-nex-primary text-white" : "bg-gray-100 text-gray-600"}`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-nex-dark mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center text-4xl shrink-0">
                    {product.image ? (
                      <span>{product.image}</span>
                    ) : (
                      "🛍️"
                    )}
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
      </div>
    </div>
  );
}
