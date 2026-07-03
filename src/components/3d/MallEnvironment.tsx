"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Float, Sparkles, Bvh } from "@react-three/drei";
import * as THREE from "three";

// Mall Building Component
function MallBuilding() {
  // Use memo to cache geometries and materials
  const buildingMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#f8f9fa",
      metalness: 0.1,
      roughness: 0.8,
    })
  ), []);

  const entranceMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#1e4d7b",
      metalness: 0.3,
      roughness: 0.6,
    })
  ), []);

  const roofMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#1a3a5c",
      metalness: 0.2,
      roughness: 0.7,
    })
  ), []);

  const poleMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#3498db",
      metalness: 0.5,
      roughness: 0.3,
    })
  ), []);

  const sphereMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#d4a853",
      metalness: 0.7,
      roughness: 0.2,
    })
  ), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Main Mall Structure */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[20, 10, 15]} />
        <primitive object={buildingMaterial} attach="material" />
      </mesh>

      {/* Mall Entrance */}
      <mesh position={[0, 3, 7.6]} castShadow receiveShadow>
        <boxGeometry args={[8, 6, 0.5]} />
        <primitive object={entranceMaterial} attach="material" />
      </mesh>

      {/* Mall Roof */}
      <mesh position={[0, 10.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 1, 17]} />
        <primitive object={roofMaterial} attach="material" />
      </mesh>

      {/* Mall Sign */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 12, 8]}
          fontSize={1.5}
          color="#d4a853"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          THE NEX MALL
        </Text>
      </Float>

      {/* Decorative Elements - Left */}
      <group position={[-8, 5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
          <primitive object={poleMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={sphereMaterial} attach="material" />
        </mesh>
      </group>

      {/* Decorative Elements - Right */}
      <group position={[8, 5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
          <primitive object={poleMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={sphereMaterial} attach="material" />
        </mesh>
      </group>

      {/* Sparkles effect */}
      <Sparkles
        count={50}
        size={2}
        speed={0.3}
        opacity={0.8}
        color="#d4a853"
        scale={[20, 10, 15]}
      />
    </group>
  );
}

// Ground with reflection
function Ground() {
  const groundMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#2a6496",
      roughness: 0.8,
      metalness: 0.2,
    })
  ), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <primitive object={groundMaterial} attach="material" />
    </mesh>
  );
}

// Rotating Mall Logo
function RotatingLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const logoMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: "#d4a853",
      metalness: 0.8,
      roughness: 0.2,
    })
  ), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 8, -5]} castShadow>
        <torusGeometry args={[2, 0.5, 16, 32]} />
        <primitive object={logoMaterial} attach="material" />
        <Text
          position={[0, 0, 0.51]}
          fontSize={0.8}
          color="#1a3a5c"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          NEX
        </Text>
      </mesh>
    </Float>
  );
}

// Main Mall Environment Component
export default function MallEnvironment() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        {/* Optimization: Add BVH for raycasting performance */}
        <Bvh firstHitOnly>
          {/* Lighting */}
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-10, 5, -5]} intensity={0.8} color="#d4a853" />
          <pointLight position={[10, 5, -5]} intensity={0.8} color="#3498db" />

          {/* Environment */}
          <Environment preset="city" background={false} />

          {/* 3D Objects */}
          <MallBuilding />
          <Ground />
          <RotatingLogo />
        </Bvh>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay for text content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white z-10">
          {/* This space will be used for the text content from the original hero section */}
        </div>
      </div>
    </div>
  );
}