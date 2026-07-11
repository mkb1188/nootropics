"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import { Bottle } from "./Bottle";
import { NeuralField } from "./NeuralField";
import { GlowSprite, OrbitRing, Pedestal } from "./BottleExtras";

/** Tilts its children toward the mouse for a subtle parallax response */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.55,
      0.06
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.22,
      0.06
    );
  });
  return <group ref={ref}>{children}</group>;
}

function Capsule({
  position,
  color,
  emissive = false,
  seed = 0,
}: {
  position: [number, number, number];
  color: string;
  emissive?: boolean;
  seed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + seed;
    ref.current.position.y = position[1] + Math.sin(t * 0.9) * 0.14;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.z = t * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <capsuleGeometry args={[0.09, 0.22, 8, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={emissive ? color : "#000000"}
        emissiveIntensity={emissive ? 0.8 : 0}
        roughness={0.25}
        clearcoat={1}
      />
    </mesh>
  );
}

export default function HeroScene({ accent = "#a78bfa" }: { accent?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.6], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.7} />
      <directionalLight position={[-5, 3, -4]} intensity={2.4} color={accent} />
      <directionalLight position={[0, -3, 3]} intensity={0.5} color="#8bb0ff" />
      <NeuralField accent={accent} />
      <Sparkles
        count={90}
        scale={[10, 6, 5]}
        size={1.8}
        speed={0.35}
        opacity={0.5}
        color={accent}
      />
      <Rig>
        {/* ambient aura behind the bottle */}
        <GlowSprite color={accent} scale={5.5} opacity={0.16} position={[0, 0, -0.8]} />
        <Float
          speed={1.7}
          rotationIntensity={0.35}
          floatIntensity={0.7}
          floatingRange={[0.02, 0.16]}
        >
          <Bottle accent={accent} />
        </Float>
        <Pedestal accent={accent} />
        <OrbitRing accent={accent} radius={1.5} speed={0.4} tilt={[1.3, 0, 0.3]} />
        <OrbitRing
          accent={accent}
          radius={1.85}
          speed={-0.22}
          tilt={[1.05, 0, -0.5]}
          beadScale={0.7}
        />
        <Capsule position={[-1.6, 0.5, 0.4]} color={accent} emissive seed={1.3} />
        <Capsule position={[1.65, -0.4, 0.6]} color="#e4e4e7" seed={3.1} />
        <Capsule position={[1.3, 0.95, -0.5]} color="#e4e4e7" seed={5.4} />
      </Rig>
      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.6}
        scale={9}
        blur={2.8}
        far={2.4}
      />
    </Canvas>
  );
}
