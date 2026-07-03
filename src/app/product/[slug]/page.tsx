"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw, Package
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
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
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.products.find((p: Product) => p.slug === slug);
        setProduct(found || null);
        if (found) {
          const cat = data.categories.find((c: Category) => c.id === found.categoryId);
          setCategory(cat || null);
          const related = data.products
            .filter((p: Product) => p.categoryId === found.categoryId && p.id !== found.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    setAddedToWishlist(!addedToWishlist);
  };

  const discount = product?.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) * 100
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-nex-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-nex-dark mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
        <Link
          href="/products"
          className="px-6 py-3 bg-nex-primary text-white font-semibold rounded-full hover:bg-nex-dark transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-nex-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-nex-primary transition-colors">Products</Link>
        {category && (
          <>
            <span>/</span>
            <Link href={`/category/${category.slug}`} className="hover:text-nex-primary transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-nex-primary font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-nex-primary hover:text-nex-dark transition-colors mb-8 font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Product Image / Visual */}
        <div className="relative bg-gradient-to-br from-blue-50 to-gray-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-inner">
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="px-3 py-1 bg-nex-accent text-white text-xs font-bold rounded-full">NEW</span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-{discount}%</span>
            )}
          </div>

          {/* Placeholder visual */}
          <div className="text-center">
            <div className="text-9xl mb-4">🛍️</div>
            <p className="text-gray-400 text-sm">Product Image</p>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleAddToWishlist}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
              addedToWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={addedToWishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-sm text-nex-accent font-semibold uppercase tracking-wider mb-2 hover:text-nex-primary transition-colors"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-nex-dark mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(parseFloat(product.rating))
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-black text-nex-dark">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  Save ₹{(parseFloat(product.originalPrice) - parseFloat(product.price)).toFixed(0)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.longDescription || product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock — Ready to Ship" : "Out of Stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-lg transition-all ${
                addedToCart
                  ? "bg-green-500 text-white"
                  : product.inStock
                  ? "bg-nex-gold text-nex-dark hover:bg-yellow-400 active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={22} />
              {addedToCart ? "Added to Cart! ✓" : product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`px-6 py-4 rounded-full font-semibold border-2 transition-all flex items-center gap-2 ${
                addedToWishlist
                  ? "bg-red-50 border-red-400 text-red-500"
                  : "border-gray-300 text-gray-600 hover:border-nex-primary hover:text-nex-primary"
              }`}
            >
              <Heart size={20} fill={addedToWishlist ? "currentColor" : "none"} />
              {addedToWishlist ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: "Free Delivery above ₹999" },
              { icon: Shield, text: "Secure Payment" },
              { icon: RotateCcw, text: "30-Day Returns" },
              { icon: Package, text: "Premium Packaging" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                <item.icon size={16} className="text-nex-primary shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-nex-dark">Related Products</h2>
              <p className="text-gray-500 mt-1">More from {category?.name}</p>
            </div>
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="px-5 py-2.5 bg-nex-primary text-white font-semibold rounded-full hover:bg-nex-dark transition-colors text-sm"
              >
                View All
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
