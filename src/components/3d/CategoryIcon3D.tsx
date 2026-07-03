"use client";

import { useRef, useState, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Bvh } from "@react-three/drei";
import * as THREE from "three";
import {
  Shirt, ShoppingBag, Footprints, Watch, Sparkles, Gift, Gem, Store,
  LucideIcon
} from "lucide-react";

// Map icon components to their name strings (safe for all Lucide versions)
const iconNameMap = new Map<LucideIcon, string>([
  [Shirt, "Shirt"],
  [ShoppingBag, "ShoppingBag"],
  [Footprints, "Footprints"],
  [Watch, "Watch"],
  [Sparkles, "Sparkles"],
  [Gift, "Gift"],
  [Gem, "Gem"],
  [Store, "Store"],
]);

// Error boundary to prevent 3D crashes from breaking the whole page
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Create a 3D representation of Lucide icons
function Icon3D({ iconName, color = "#ffffff" }: { iconName: string; color?: string }) {
  // Create different 3D models based on icon name
  const createIconModel = () => {
    const group = new THREE.Group();
    const iconMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 0.8,
      roughness: 0.2,
    });

    switch (iconName) {
      case "Shirt": // Fashion
        // Create a simple t-shirt shape
        const shirtShape = new THREE.Shape();
        shirtShape.moveTo(-0.3, 0.4);
        shirtShape.lineTo(-0.3, -0.4);
        shirtShape.lineTo(-0.2, -0.5);
        shirtShape.lineTo(0.2, -0.5);
        shirtShape.lineTo(0.3, -0.4);
        shirtShape.lineTo(0.3, 0.4);
        shirtShape.lineTo(0.2, 0.4);
        shirtShape.lineTo(0, 0.3);
        shirtShape.lineTo(-0.2, 0.4);
        shirtShape.lineTo(-0.3, 0.4);

        const shirtGeometry = new THREE.ShapeGeometry(shirtShape);
        const shirt = new THREE.Mesh(shirtGeometry, iconMaterial);
        shirt.position.set(0, 0, 0.21);
        shirt.rotation.set(-Math.PI / 2, 0, 0);
        group.add(shirt);
        break;

      case "ShoppingBag": // Bags & Accessories
        // Create a simple bag shape
        const bag = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.5, 0.4),
          iconMaterial
        );
        bag.position.set(0, 0, 0.21);
        group.add(bag);

        // Add bag handle
        const handle = new THREE.Mesh(
          new THREE.TorusGeometry(0.2, 0.03, 8, 16),
          iconMaterial
        );
        handle.position.set(0, 0.3, 0.21);
        handle.rotation.set(Math.PI / 2, 0, 0);
        group.add(handle);
        break;

      case "Footprints": // Footwear
        // Create shoe sole
        const sole = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.1, 0.8),
          new THREE.MeshStandardMaterial({ color: "#333333" })
        );
        sole.position.set(0, -0.2, 0.21);
        group.add(sole);

        // Create shoe upper
        const upper = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.3, 0.6),
          iconMaterial
        );
        upper.position.set(0, 0, 0.21);
        group.add(upper);
        break;

      case "Watch": // Watch & Accessories
        // Create watch face
        const face = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32),
          iconMaterial
        );
        face.position.set(0, 0, 0.21);
        face.rotation.set(Math.PI / 2, 0, 0);
        group.add(face);

        // Create watch hands
        const hourHand = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.2, 0.02),
          new THREE.MeshStandardMaterial({ color: "#000000" })
        );
        hourHand.position.set(0, 0, 0.26);
        group.add(hourHand);

        const minuteHand = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.25, 0.02),
          new THREE.MeshStandardMaterial({ color: "#000000" })
        );
        minuteHand.position.set(0, 0, 0.26);
        group.add(minuteHand);
        break;

      case "Sparkles": // Beauty & Wellness
        // Create a bottle
        const bottle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.15, 0.4, 32),
          new THREE.MeshStandardMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.8,
          })
        );
        bottle.position.set(0, 0, 0.21);
        group.add(bottle);

        // Create a cap
        const cap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.1, 32),
          new THREE.MeshStandardMaterial({ color: "#ff6b6b" })
        );
        cap.position.set(0, 0.25, 0.21);
        group.add(cap);
        break;

      case "Gift": // Gift & Lifestyle
        // Create a gift box
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.5, 0.5),
          iconMaterial
        );
        box.position.set(0, 0, 0.21);
        group.add(box);

        // Create a ribbon
        const ribbon = new THREE.Mesh(
          new THREE.TorusGeometry(0.25, 0.03, 8, 16),
          new THREE.MeshStandardMaterial({ color: "#ff0000" })
        );
        ribbon.position.set(0, 0, 0.46);
        ribbon.rotation.set(Math.PI / 2, 0, 0);
        group.add(ribbon);
        break;

      case "Gem": // Jewellery
        // Create a gemstone
        const gem = new THREE.Mesh(
          new THREE.ConeGeometry(0.3, 0.5, 32),
          new THREE.MeshStandardMaterial({
            color: "#ffd700",
            metalness: 0.9,
            roughness: 0.1,
          })
        );
        gem.position.set(0, 0, 0.21);
        gem.rotation.set(Math.PI, 0, 0);
        group.add(gem);
        break;

      case "Store": // Service & More
        // Create a simple store front
        const store = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.5, 0.3),
          iconMaterial
        );
        store.position.set(0, 0, 0.21);
        group.add(store);

        // Add a roof
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(0.4, 0.3, 4),
          new THREE.MeshStandardMaterial({ color: "#8B4513" })
        );
        roof.position.set(0, 0.4, 0.21);
        roof.rotation.set(0, Math.PI / 4, 0);
        group.add(roof);
        break;

      default:
        // Default to a box if icon not recognized
        const defaultIcon = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.6, 0.2),
          iconMaterial
        );
        defaultIcon.position.set(0, 0, 0.21);
        group.add(defaultIcon);
    }

    return group;
  };

  const iconModel = useMemo(() => createIconModel(), [iconName]);

  return <primitive object={iconModel} />;
}

// 3D Icon Component
function Icon3DModel({ iconName, color = "#ffffff" }: { iconName: string; color?: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use memo to cache materials
  const baseMaterial = useMemo(() => (
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.3,
      roughness: 0.7,
    })
  ), [color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = isHovered ? 0.1 : 0;
      meshRef.current.scale.setScalar(isHovered ? 1.1 : 1);
    }
  });

  return (
    <group ref={meshRef}
           onPointerOver={() => setIsHovered(true)}
           onPointerOut={() => setIsHovered(false)}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 1.2, 0.4]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>

      {/* Icon */}
      <Icon3D iconName={iconName} />
    </group>
  );
}

// 3D Category Icon Component
export default function CategoryIcon3D({
  Icon,
  color = "#2a6496",
  name
}: {
  Icon: LucideIcon;
  color?: string;
  name: string;
}) {
  // Safely extract icon name - Icon.name is undefined in Lucide React v1.23+
  const iconName = iconNameMap.get(Icon) ?? "default";

  // Use useMemo to avoid recreating the camera on every render
  const cameraSettings = useMemo(() => ({
    position: [0, 0, 3] as [number, number, number],
    fov: 50
  }), []);

  // 2D fallback when 3D is not available
  const Fallback2D = (
    <div className="w-full h-32 relative flex flex-col items-center justify-center">
      <div className="w-14 h-14 bg-gradient-to-br from-nex-primary to-nex-light rounded-2xl flex items-center justify-center mx-auto mb-2">
        <Icon size={26} className="text-white" />
      </div>
      <p className="text-xs font-semibold text-nex-dark truncate px-2 text-center">{name}</p>
    </div>
  );

  return (
    <div className="w-full h-32 relative group cursor-pointer">
      <CanvasErrorBoundary fallback={Fallback2D}>
        <Canvas shadows camera={cameraSettings}>
          {/* Optimization: Add BVH for raycasting performance */}
          <Bvh>
            {/* Lighting with reduced intensity */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[3, 3, 3]}
              intensity={0.6}
              castShadow
              shadow-mapSize-width={256}
              shadow-mapSize-height={256}
            />
            <pointLight position={[0, 1, 0]} intensity={0.4} color="#ffffff" />

            {/* Environment with lower resolution */}
            <Environment preset="studio" resolution={32} />

            {/* Icon */}
            <group position={[0, 0, 0]}>
              <Icon3DModel iconName={iconName} color={color} />
            </group>
          </Bvh>

          {/* Controls with optimized settings */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 * 0.8}
            autoRotate
            autoRotateSpeed={1.5}
            enableDamping={false} // Disable damping for better performance
          />
        </Canvas>
      </CanvasErrorBoundary>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p className="text-xs font-semibold text-nex-dark truncate">{name}</p>
      </div>
    </div>
  );
}