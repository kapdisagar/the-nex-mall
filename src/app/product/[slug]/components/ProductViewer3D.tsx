"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Bvh, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { RotateCcw, ZoomIn, ZoomOut, Info, Heart, Star, ShoppingCart } from "lucide-react";

// Product Model Component
function ProductModel3D({
  modelType = "generic",
  color = "#ffffff",
  onLoaded
}: {
  modelType?: string;
  color?: string;
  onLoaded?: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create different product models based on category
  const createProductModel = () => {
    switch (modelType) {
      case "fashion":
        return createFashionModel(color);
      case "bags-accessories":
        return createBagModel(color);
      case "footwear":
        return createFootwearModel(color);
      case "watch-accessories":
        return createWatchModel(color);
      case "beauty-wellness":
        return createBeautyModel(color);
      case "gift-lifestyle":
        return createGiftModel(color);
      case "jewellery":
        return createJewelleryModel(color);
      default:
        return createGenericProductModel(color);
    }
  };

  // Generic product model
  const createGenericProductModel = (productColor: string) => {
    const group = new THREE.Group();

    // Main product body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 2, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.2,
      roughness: 0.7,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Product details
    const detailMaterial = new THREE.MeshStandardMaterial({
      color: "#333333",
    });

    const topDetail = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.2, 0.1),
      detailMaterial
    );
    topDetail.position.set(0, 0.8, 0.51);
    group.add(topDetail);

    const middleDetail = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.2, 0.1),
      detailMaterial
    );
    middleDetail.position.set(0, 0.5, 0.51);
    group.add(middleDetail);

    return group;
  };

  // Fashion model (clothing)
  const createFashionModel = (productColor: string) => {
    const group = new THREE.Group();

    // Create a t-shirt shape
    const shirtShape = new THREE.Shape();
    shirtShape.moveTo(-0.8, 1);
    shirtShape.lineTo(-0.8, -1);
    shirtShape.lineTo(-0.5, -1.2);
    shirtShape.lineTo(0.5, -1.2);
    shirtShape.lineTo(0.8, -1);
    shirtShape.lineTo(0.8, 1);
    shirtShape.lineTo(0.5, 1);
    shirtShape.lineTo(0, 0.8);
    shirtShape.lineTo(-0.5, 1);
    shirtShape.lineTo(-0.8, 1);

    const shirtGeometry = new THREE.ShapeGeometry(shirtShape);
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      side: THREE.DoubleSide,
      metalness: 0.1,
      roughness: 0.8,
    });

    const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
    shirt.position.set(0, 0, 0);
    shirt.rotation.set(-Math.PI / 2, 0, 0);
    group.add(shirt);

    return group;
  };

  // Bag model
  const createBagModel = (productColor: string) => {
    const group = new THREE.Group();

    // Main bag body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1.2, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.3,
      roughness: 0.6,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Bag handle
    const handleGeometry = new THREE.TorusGeometry(0.4, 0.08, 16, 32);
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: "#555555",
      metalness: 0.5,
      roughness: 0.4,
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0, 0.8, 0);
    handle.rotation.set(Math.PI / 2, 0, 0);
    group.add(handle);

    return group;
  };

  // Footwear model
  const createFootwearModel = (productColor: string) => {
    const group = new THREE.Group();

    // Shoe sole
    const soleGeometry = new THREE.BoxGeometry(1.5, 0.3, 2);
    const soleMaterial = new THREE.MeshStandardMaterial({
      color: "#333333",
      metalness: 0.2,
      roughness: 0.8,
    });
    const sole = new THREE.Mesh(soleGeometry, soleMaterial);
    sole.position.set(0, -0.85, 0);
    group.add(sole);

    // Shoe upper
    const upperGeometry = new THREE.BoxGeometry(1.4, 0.8, 1.5);
    const upperMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.1,
      roughness: 0.7,
    });
    const upper = new THREE.Mesh(upperGeometry, upperMaterial);
    upper.position.set(0, -0.4, 0);
    group.add(upper);

    return group;
  };

  // Watch model
  const createWatchModel = (productColor: string) => {
    const group = new THREE.Group();

    // Watch face
    const faceGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: productColor === "#ffffff" ? "#f0f0f0" : productColor,
      metalness: 0.7,
      roughness: 0.2,
    });
    const face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.rotation.set(Math.PI / 2, 0, 0);
    group.add(face);

    // Watch band
    const bandGeometry = new THREE.BoxGeometry(0.3, 0.1, 1.5);
    const bandMaterial = new THREE.MeshStandardMaterial({
      color: productColor === "#ffffff" ? "#333333" : productColor,
      metalness: 0.5,
      roughness: 0.4,
    });

    const leftBand = new THREE.Mesh(bandGeometry, bandMaterial);
    leftBand.position.set(-0.6, 0, 0);
    group.add(leftBand);

    const rightBand = new THREE.Mesh(bandGeometry, bandMaterial);
    rightBand.position.set(0.6, 0, 0);
    group.add(rightBand);

    return group;
  };

  // Beauty product model
  const createBeautyModel = (productColor: string) => {
    const group = new THREE.Group();

    // Bottle body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1.5, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.1,
      roughness: 0.8,
      transparent: true,
      opacity: 0.9,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Bottle cap
    const capGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 0.5,
      roughness: 0.3,
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(0, 0.9, 0);
    group.add(cap);

    return group;
  };

  // Jewellery model
  const createJewelleryModel = (productColor: string) => {
    const group = new THREE.Group();

    // Ring base
    const ringGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(Math.PI / 2, 0, 0);
    group.add(ring);

    // Gemstone
    const gemGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const gemMaterial = new THREE.MeshStandardMaterial({
      color: "#ffd700",
      metalness: 0.8,
      roughness: 0.2,
    });
    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    gem.position.set(0, 0, 0.6);
    group.add(gem);

    return group;
  };

  // Gift/lifestyle model
  const createGiftModel = (productColor: string) => {
    const group = new THREE.Group();

    // Gift box
    const boxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: productColor,
      metalness: 0.1,
      roughness: 0.7,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    group.add(box);

    // Ribbon
    const ribbonGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: "#ff0000",
      metalness: 0.3,
      roughness: 0.6,
    });
    const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    ribbon.position.set(0, 0.6, 0);
    ribbon.rotation.set(Math.PI / 2, 0, 0);
    group.add(ribbon);

    return group;
  };

  // Create the model based on type
  const model = useMemo(() => createProductModel(), [modelType, color]);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

// 3D Product Viewer Component
export default function ProductViewer3D({
  product,
  onAddToCart,
  onAddToWishlist
}: {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    description?: string;
    category?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    colors?: string[];
  };
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const controlsRef = useRef<any>(null);

  // Default colors if not provided
  const colors = product.colors || [
    "#ff6b6b", // Red
    "#4ecdc4", // Teal
    "#45b7d1", // Blue
    "#f9ca24", // Yellow
    "#6c5ce7", // Purple
    "#fd79a8", // Pink
  ];

  // Reset view
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setZoomLevel(1);
  };

  // Zoom in
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  // Zoom out
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  // Calculate discount
  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  return (
    <div className="w-full h-[600px] relative bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* 3D Canvas */}
      <div className="w-full h-full relative">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          {/* Optimization: Add BVH for raycasting performance */}
          <Bvh>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffffff" />
            <pointLight position={[0, -2, 0]} intensity={0.3} color="#ffffff" />

            {/* Environment */}
            <Environment preset="studio" background={false} />

            {/* Product */}
            <group position={[0, 0, 0]} scale={zoomLevel}>
              <ProductModel3D
                modelType={product.category}
                color={selectedColor}
              />
            </group>
          </Bvh>

          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enableZoom={false} // We're handling zoom manually
            enablePan={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.1}
          />
        </Canvas>
      </div>

      {/* UI Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
        <button
          onClick={resetView}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          title="Reset view"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={zoomOut}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          title="Zoom out"
        >
          <ZoomOut size={20} />
        </button>

        <span className="text-white text-sm px-2">Zoom: {Math.round(zoomLevel * 100)}%</span>

        <button
          onClick={zoomIn}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          title="Zoom in"
        >
          <ZoomIn size={20} />
        </button>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`p-2 text-white hover:bg-white/20 rounded-full transition-colors ${
            showInfo ? "bg-white/20" : ""
          }`}
          title="Product info"
        >
          <Info size={20} />
        </button>
      </div>

      {/* Color Selection */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""
              }`}
              style={{ backgroundColor: color }}
              title={`Select ${color} color`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={onAddToWishlist}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-nex-dark hover:bg-white transition-colors shadow-lg"
          title="Add to wishlist"
        >
          <Heart size={20} />
        </button>

        <button
          onClick={onAddToCart}
          className="px-6 py-3 bg-nex-gold text-nex-dark font-bold rounded-full hover:bg-yellow-400 transition-colors shadow-lg flex items-center gap-2"
          disabled={!product.inStock}
        >
          <ShoppingCart size={20} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {/* Product Info Overlay */}
      {showInfo && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-nex-dark mb-2">{product.name}</h3>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-nex-dark">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-{discount}%</span>
              )}
            </div>

            {product.rating && product.reviews && (
              <div className="flex items-center gap-1 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            )}

            {product.description && (
              <div className="mb-4">
                <h4 className="font-semibold text-nex-dark mb-2">Description</h4>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Availability:</span>
              <span className={`text-sm font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}