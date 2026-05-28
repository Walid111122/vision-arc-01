"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* Suppress THREE.Clock deprecation from @react-three/fiber internals */
const _origWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
  _origWarn.apply(console, args);
};

function RibbonMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow, weighty rotation
      meshRef.current.rotation.x -= delta * 0.05;
      meshRef.current.rotation.y -= delta * 0.08;
      meshRef.current.rotation.z -= delta * 0.03;
    }
  });

  return (
    <Float
      speed={1.5}       // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5}   // Up/down float intensity
      floatingRange={[-0.5, 0.5]} // Range of y-axis values
    >
      <mesh ref={meshRef} scale={1.8}>
        {/* A complex, twisting torus knot to simulate a ribbon */}
        <torusKnotGeometry args={[2, 0.6, 256, 32, 3, 4]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.2}
          distort={0.3} // Subtle distortion for organic feel
          speed={0.5}   // Slow morphing
        />
      </mesh>
    </Float>
  );
}

export function FluidRibbon() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        
        {/* Main Fiery Red-Orange key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={4}
          color="#FF3B00"
        />
        
        {/* Subtle secondary light for rim highlights */}
        <directionalLight
          position={[-5, -5, -5]}
          intensity={1.5}
          color="#FF6B33"
        />

        {/* Deep red fill light from below */}
        <pointLight
          position={[0, -10, 0]}
          intensity={8}
          color="#990000"
        />

        <RibbonMesh />
        
        {/* Soft studio environment reflection to give it that premium matte finish */}
        <Environment preset="studio" environmentIntensity={0.1} />
      </Canvas>
    </div>
  );
}
