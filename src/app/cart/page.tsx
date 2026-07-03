"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  slug: string;
  price: string;
  quantity: number;
}

const initialItems: CartItem[] = [
  { id: 1, name: "Premium Cotton Formal Shirt", slug: "premium-cotton-formal-shirt", price: "2499", quantity: 1 },
  { id: 2, name: "Running Sports Shoes", slug: "running-sports-shoes", price: "4999", quantity: 1 },
  { id: 3, name: "Gold Plated Necklace Set", slug: "gold-plated-necklace-set", price: "2999", quantity: 2 },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-nex-dark mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="px-8 py-4 bg-nex-primary text-white font-semibold rounded-full hover:bg-nex-dark transition-colors"
        >
          Start Shopping
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
        <span className="text-nex-primary font-medium">Shopping Cart</span>
      </nav>

      <h1 className="text-3xl font-bold text-nex-dark mb-8">
        Shopping Cart <span className="text-lg text-gray-500 font-normal">({items.length} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg flex items-center justify-center text-3xl shrink-0">
                ️
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold text-nex-dark hover:text-nex-primary transition-colors line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="text-xl font-bold text-nex-dark mt-2">{item.price}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1.5 font-semibold min-w-[40px] text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-nex-primary hover:text-nex-dark font-medium mt-4"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-nex-dark mb-6">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `${shipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18% GST)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              {shipping === 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Savings on Shipping</span>
                  <span>-₹99</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold text-nex-dark">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-nex-primary text-white font-bold rounded-full hover:bg-nex-dark transition-colors mt-6 text-lg">
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>🔒 Secure SSL Encryption</p>
              <p className="mt-1">Free shipping on orders above ₹999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
