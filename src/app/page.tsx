"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Shirt, ShoppingBag, Footprints, Watch, Sparkles, Gift, Gem, Store,
  ArrowRight, Star, Truck, Shield, RotateCcw, Clock,
} from "lucide-react";
import ProductViewToggle from "@/components/ProductViewToggle";
import MallEnvironment from "@/components/3d/MallEnvironment";
import CategoryIcon3D from "@/components/3d/CategoryIcon3D";

interface Product {
  id: number;
  name: string;
  slug: string;
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

const categoryIcons: Record<string, any> = {
  fashion: Shirt,
  "bags-accessories": ShoppingBag,
  footwear: Footprints,
  "watch-accessories": Watch,
  "beauty-wellness": Sparkles,
  "gift-lifestyle": Gift,
  jewellery: Gem,
  "service-more": Store,
};

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-nex-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-nex-primary font-medium">Loading The Nex Mall...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with 3D Mall Environment */}
      <section className="relative text-white overflow-hidden">
        {/* 3D Mall Environment */}
        <div className="absolute inset-0 z-0">
          <MallEnvironment />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="animate-fade-in-up bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-nex-gold rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Welcome to Premium Shopping</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
                THE <span className="text-nex-gold">NEX</span>
                <br />
                <span className="text-3xl md:text-5xl font-light tracking-wider">MALL</span>
              </h1>
              <p className="text-xl text-white/70 mb-2 tracking-widest uppercase">
                Live With Nex
              </p>
              <p className="text-white/60 mb-8 max-w-md">
                Discover the finest collection of fashion, accessories, beauty, and lifestyle products
                from premium brands under one roof.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-nex-gold text-nex-dark font-bold rounded-full hover:bg-white hover:text-nex-dark transition-all flex items-center gap-2"
                >
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link
                  href="/category/fashion"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Explore Categories
                </Link>
              </div>
            </div>

            {/* Hero stats */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              {[
                { number: "500+", label: "Premium Brands" },
                { number: "10K+", label: "Happy Customers" },
                { number: "50K+", label: "Products" },
                { number: "24/7", label: "Customer Support" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/5 transition-colors"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-3xl font-black text-nex-gold">{stat.number}</p>
                  <p className="text-white/60 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nex-dark">Shop By Category</h2>
          <p className="text-gray-500 mt-2">Explore our wide range of premium collections</p>
          <div className="w-20 h-1 bg-nex-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.slug];
            // Use 3D icons for the first 4 categories, 2D for the rest
            const use3D = i < 4;

            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-4 h-40 flex items-center justify-center">
                  {use3D && Icon ? (
                    <CategoryIcon3D
                      Icon={Icon}
                      color="#2a6496"
                      name={cat.name}
                    />
                  ) : (
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-nex-primary to-nex-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {Icon ? (
                          <Icon size={28} className="text-white" />
                        ) : (
                          <span className="text-2xl">{cat.icon || "🛍️"}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {!use3D && (
                  <>
                    <h3 className="font-bold text-nex-dark text-center text-sm md:text-base px-4 pb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1 line-clamp-1 px-4 pb-4">
                      {cat.description}
                    </p>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-nex-cream/50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-nex-dark">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked premium selections for you</p>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 px-6 py-3 bg-nex-primary text-white font-semibold rounded-full hover:bg-nex-dark transition-colors flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <ProductViewToggle products={featuredProducts} />
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-nex-dark to-nex-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-nex-gold rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">Grand Opening Sale!</h3>
              <p className="text-white/70 text-lg">Up to 50% OFF on selected brands</p>
              <p className="text-nex-gold font-semibold mt-2">Limited period offer</p>
            </div>
            <Link
              href="/products"
              className="px-8 py-4 bg-nex-gold text-nex-dark font-bold rounded-full hover:bg-white transition-colors shrink-0"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-nex-dark">New Arrivals</h2>
            <p className="text-gray-500 mt-2">Just landed - Be the first to shop</p>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 px-6 py-3 bg-nex-primary text-white font-semibold rounded-full hover:bg-nex-dark transition-colors flex items-center gap-2"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <ProductViewToggle products={newArrivals} />
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated customer care" },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-nex-cream rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-nex-primary transition-colors">
                  <feature.icon size={24} className="text-nex-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-nex-dark">{feature.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-nex-dark mb-4">Our Premium Brands</h2>
          <p className="text-gray-500 mb-12">Partnered with the world's leading brands</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-50">
            {["Nike", "Adidas", "Zara", "H&M", "Levi's", "Raymond"].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-nex-dark hover:opacity-100 transition-opacity cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-nex-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Visit <span className="text-nex-gold">The Nex Mall</span> Today
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Experience the ultimate shopping destination. From fashion to lifestyle, find everything
            you need under one roof.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-nex-gold text-nex-dark font-bold rounded-full hover:bg-white transition-colors"
            >
              Start Shopping
            </Link>
            <a
              href="tel:+919876543210"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
