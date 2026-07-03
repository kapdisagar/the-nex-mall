"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Bvh } from "@react-three/drei";
import * as THREE from "three";

// Product Model Component
function ProductModel({ color = "#ffffff" }: { color?: string }) {
  // Use memo to cache materials
  const productMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.2,
      roughness: 0.7,
    })
  ), [color]);

  const detailMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#333333",
    })
  ), []);

  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = isHovered ? 0.2 : 0;
      meshRef.current.scale.setScalar(isHovered ? 1.05 : 1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[1.5, 2, 1]} />
        <primitive object={productMaterial} attach="material" />
        {/* Add some details to make it look more like a product */}
        <mesh position={[0, 0.8, 0.51]}>
          <boxGeometry args={[1.2, 0.2, 0.1]} />
          <primitive object={detailMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.5, 0.51]}>
          <boxGeometry args={[1.2, 0.2, 0.1]} />
          <primitive object={detailMaterial} attach="material" />
        </mesh>
      </mesh>
    </group>
  );
}

// 3D Product Card Component
export default function ProductCard3D({
  name,
  price,
  image,
  color = "#ffffff",
  onClick
}: {
  name: string;
  price: string;
  image?: string;
  color?: string;
  onClick?: () => void;
}) {
  // Use useMemo to avoid recreating the camera on every render
  const cameraSettings = useMemo(() => ({
    position: [0, 0, 5] as [number, number, number],
    fov: 50
  }), []);

  return (
    <div className="w-full h-64 relative group cursor-pointer" onClick={onClick}>
      <Canvas shadows camera={cameraSettings}>
        {/* Optimization: Add BVH for raycasting performance */}
        <Bvh>
          {/* Lighting - reduced intensity for better performance */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.6}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          <pointLight position={[0, 2, 0]} intensity={0.4} color="#ffffff" />

          {/* Environment with lower resolution */}
          <Environment preset="studio" resolution={32} />

          {/* Product */}
          <group position={[0, 0, 0]}>
            <ProductModel color={color} />
          </group>
        </Bvh>

        {/* Controls with optimized settings */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 * 0.8}
          autoRotate
          autoRotateSpeed={1}
          enableDamping={false} // Disable damping for better performance
        />
      </Canvas>

      {/* Overlay for product info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        <p className="text-xs font-bold text-nex-gold">{price}</p>
      </div>
    </div>
  );
}