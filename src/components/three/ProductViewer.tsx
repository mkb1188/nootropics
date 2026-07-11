"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { Bottle } from "./Bottle";
import { NeuralField } from "./NeuralField";
import { GlowSprite, OrbitRing, Pedestal } from "./BottleExtras";

/** Full-size manipulatable bottle for the product detail page */
export default function ProductViewer({ accent }: { accent: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.8], fov: 33 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.7} />
      <directionalLight position={[-5, 3, -4]} intensity={2.4} color={accent} />
      <directionalLight position={[0, -3, 3]} intensity={0.5} color="#8bb0ff" />
      <NeuralField accent={accent} count={60} radius={6} linkDistance={2.2} />
      <Sparkles
        count={70}
        scale={[8, 5, 5]}
        size={1.6}
        speed={0.3}
        opacity={0.45}
        color={accent}
      />
      <GlowSprite color={accent} scale={5.5} opacity={0.15} position={[0, 0, -0.8]} />
      <Float
        speed={1.2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[0.02, 0.14]}
      >
        <Bottle accent={accent} />
      </Float>
      <Pedestal accent={accent} />
      <OrbitRing accent={accent} radius={1.55} speed={0.35} tilt={[1.3, 0, 0.3]} />
      <OrbitRing
        accent={accent}
        radius={1.9}
        speed={-0.2}
        tilt={[1.05, 0, -0.5]}
        beadScale={0.7}
      />
      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.55}
        scale={9}
        blur={2.8}
        far={2.4}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
