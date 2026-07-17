import { NextResponse } from "next/server";

const categories = [
  { id: 1, name: "Fashion", slug: "fashion", icon: "", description: "Men's and women's fashion from top brands", image: "fashion" },
  { id: 2, name: "Bags & Accessories", slug: "bags-accessories", icon: "👜", description: "Premium bags and lifestyle accessories", image: "bags" },
  { id: 3, name: "Footwear", slug: "footwear", icon: "", description: "Trendy footwear for every occasion", image: "footwear" },
  { id: 4, name: "Watch & Accessories", slug: "watch-accessories", icon: "", description: "Luxury watches and accessories", image: "watches" },
  { id: 5, name: "Beauty & Wellness", slug: "beauty-wellness", icon: "💄", description: "Beauty products and wellness essentials", image: "beauty" },
  { id: 6, name: "Gift & Lifestyle", slug: "gift-lifestyle", icon: "🎁", description: "Unique gifts and lifestyle products", image: "gifts" },
  { id: 7, name: "Jewellery", slug: "jewellery", icon: "💎", description: "Exquisite jewellery collections", image: "jewellery" },
  { id: 8, name: "Service & More", slug: "service-more", icon: "🏪", description: "Additional services and offerings", image: "services" },
];

  // Fashion
  { id: 1, name: "Premium Cotton Formal Shirt", slug: "premium-cotton-formal-shirt", description: "Luxury cotton formal shirt", longDescription: "Experience the finest quality cotton formal shirt with a perfect blend of comfort and elegance. Made from 100% premium Egyptian cotton.", price: "2499", originalPrice: "3999", image: "/img/fashion-detail.png", categoryId: 1, inStock: true, rating: "4.5", reviews: 128, featured: true, isNew: true },
  { id: 2, name: "Designer Slim Fit Blazer", slug: "designer-slim-fit-blazer", description: "Premium tailored blazer for men", longDescription: "A perfectly tailored slim fit blazer crafted from Italian wool blend.", price: "5999", originalPrice: "8999", image: "/img/fashion-detail.png", categoryId: 1, inStock: true, rating: "4.7", reviews: 89, featured: true, isNew: false },
  { id: 3, name: "Casual Denim Jacket", slug: "casual-denim-jacket", description: "Classic blue denim jacket", longDescription: "Timeless denim jacket with modern styling and premium wash.", price: "3499", originalPrice: "4999", image: "/img/fashion-detail.png", categoryId: 1, inStock: true, rating: "4.3", reviews: 256, featured: false, isNew: true },
  { id: 4, name: "Women's Silk Kurta Set", slug: "womens-silk-kurta-set", description: "Elegant silk kurta with palazzo", longDescription: "Beautiful silk kurta set perfect for festive occasions.", price: "3299", originalPrice: "5499", image: "/img/fashion-detail.png", categoryId: 1, inStock: true, rating: "4.6", reviews: 198, featured: true, isNew: false },

  // Bags
  { id: 5, name: "Leather Messenger Bag", slug: "leather-messenger-bag", description: "Genuine leather messenger bag", longDescription: "Handcrafted genuine leather messenger bag with multiple compartments.", price: "4599", originalPrice: "6999", image: "/img/lifestyle-shopping.png", categoryId: 2, inStock: true, rating: "4.8", reviews: 67, featured: true, isNew: false },
  { id: 6, name: "Premium Backpack", slug: "premium-backpack", description: "Stylish urban backpack", longDescription: "Modern backpack with laptop compartment and USB charging port.", price: "2999", originalPrice: "4499", image: "/img/lifestyle-shopping.png", categoryId: 2, inStock: true, rating: "4.4", reviews: 145, featured: false, isNew: true },
  { id: 7, name: "Women's Tote Bag", slug: "womens-tote-bag", description: "Elegant leather tote", longDescription: "Spacious and stylish leather tote bag for everyday use.", price: "3499", originalPrice: "4999", image: "/img/lifestyle-shopping.png", categoryId: 2, inStock: true, rating: "4.5", reviews: 112, featured: false, isNew: false },

  // Footwear
  { id: 8, name: "Running Sports Shoes", slug: "running-sports-shoes", description: "Lightweight running shoes", longDescription: "High-performance running shoes with advanced cushioning technology.", price: "4999", originalPrice: "7999", image: "/img/lifestyle-shopping.png", categoryId: 3, inStock: true, rating: "4.6", reviews: 234, featured: true, isNew: true },
  { id: 9, name: "Classic Leather Loafers", slug: "classic-leather-loafers", description: "Premium leather loafers", longDescription: "Timeless leather loafers crafted from finest Italian leather.", price: "3999", originalPrice: "5999", image: "/img/lifestyle-shopping.png", categoryId: 3, inStock: true, rating: "4.7", reviews: 156, featured: false, isNew: false },
  { id: 10, name: "Women's Block Heel Sandals", slug: "womens-block-heel-sandals", description: "Comfortable block heel sandals", longDescription: "Elegant sandals with comfortable block heels for all-day wear.", price: "2499", originalPrice: "3999", image: "/img/lifestyle-shopping.png", categoryId: 3, inStock: true, rating: "4.3", reviews: 189, featured: false, isNew: true },

  // Watches
  { id: 11, name: "Classic Analog Watch", slug: "classic-analog-watch", description: "Elegant analog wristwatch", longDescription: "Sophisticated analog watch with stainless steel band and sapphire crystal.", price: "8999", originalPrice: "12999", image: "/img/watches-luxury.png", categoryId: 4, inStock: true, rating: "4.8", reviews: 98, featured: true, isNew: false },
  { id: 12, name: "Smart Fitness Watch", slug: "smart-fitness-watch", description: "Advanced smartwatch", longDescription: "Feature-packed smartwatch with health monitoring and GPS.", price: "12999", originalPrice: "18999", image: "/img/watches-luxury.png", categoryId: 4, inStock: true, rating: "4.5", reviews: 312, featured: true, isNew: true },

  // Beauty
  { id: 13, name: "Luxury Perfume Collection", slug: "luxury-perfume-collection", description: "Premium fragrance set", longDescription: "Exquisite collection of designer fragrances in an elegant gift box.", price: "5499", originalPrice: "7999", image: "/img/lifestyle-shopping.png", categoryId: 5, inStock: true, rating: "4.9", reviews: 76, featured: true, isNew: false },
  { id: 14, name: "Complete Skincare Set", slug: "complete-skincare-set", description: "Daily skincare routine kit", longDescription: "Complete skincare regimen with cleanser, toner, serum, and moisturizer.", price: "2999", originalPrice: "4499", image: "/img/lifestyle-shopping.png", categoryId: 5, inStock: true, rating: "4.6", reviews: 167, featured: false, isNew: true },

  // Gifts
  { id: 15, name: "Premium Gift Hamper", slug: "premium-gift-hamper", description: "Luxury gift basket", longDescription: "Curated luxury gift hamper with chocolates, dry fruits, and gourmet treats.", price: "4999", originalPrice: "6999", image: "/img/lifestyle-shopping.png", categoryId: 6, inStock: true, rating: "4.7", reviews: 54, featured: true, isNew: false },
  { id: 16, name: "Home Decor Collection", slug: "home-decor-collection", description: "Artistic home accessories", longDescription: "Beautiful handcrafted home decor pieces for modern interiors.", price: "1999", originalPrice: "3499", image: "/img/lifestyle-shopping.png", categoryId: 6, inStock: true, rating: "4.4", reviews: 89, featured: false, isNew: true },

  // Jewellery
  { id: 17, name: "Gold Plated Necklace Set", slug: "gold-plated-necklace-set", description: "Elegant necklace with earrings", longDescription: "Stunning gold plated necklace set with matching earrings.", price: "2999", originalPrice: "4999", image: "/img/jewellery-detail.png", categoryId: 7, inStock: true, rating: "4.8", reviews: 134, featured: true, isNew: true },
  { id: 18, name: "Diamond Stud Earrings", slug: "diamond-stud-earrings", description: "Classic diamond studs", longDescription: "Timeless diamond stud earrings in 18K gold setting.", price: "7999", originalPrice: "11999", image: "/img/jewellery-detail.png", categoryId: 7, inStock: true, rating: "4.9", reviews: 67, featured: false, isNew: false },

  // Services
  { id: 19, name: "Personal Shopping Service", slug: "personal-shopping-service", description: "Expert styling assistance", longDescription: "Get personalized shopping assistance from our expert stylists.", price: "1999", originalPrice: null, image: "/img/mall-exterior.png", categoryId: 8, inStock: true, rating: "4.7", reviews: 23, featured: false, isNew: true },
  { id: 20, name: "Gift Wrapping Premium", slug: "gift-wrapping-premium", description: "Luxury gift wrapping", longDescription: "Premium gift wrapping service with custom ribbons and personal notes.", price: "499", originalPrice: null, image: "/img/mall-exterior.png", categoryId: 8, inStock: true, rating: "4.5", reviews: 156, featured: false, isNew: false },
];

export async function GET() {
  return NextResponse.json({ categories, products });
}
