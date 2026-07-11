"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Bottle } from "./Bottle";
import { GlowSprite, Pedestal } from "./BottleExtras";

/** Idles at a slow spin, accelerates smoothly while the card is hovered */
function Spin({
  hovered,
  children,
}: {
  hovered: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const speed = useRef(0.25);
  useFrame((_, delta) => {
    speed.current = THREE.MathUtils.lerp(
      speed.current,
      hovered ? 1.6 : 0.25,
      0.08
    );
    if (ref.current) ref.current.rotation.y += delta * speed.current;
  });
  return <group ref={ref}>{children}</group>;
}

export default function CardScene({
  accent,
  hovered = false,
}: {
  accent: string;
  hovered?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 5.1], fov: 33 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <directionalLight position={[-4, 2, -3]} intensity={2.2} color={accent} />
      <group scale={0.92} position={[0, 0.08, 0]}>
        <GlowSprite color={accent} scale={4.5} opacity={0.13} position={[0, 0, -0.8]} />
        <Spin hovered={hovered}>
          <Float
            speed={1.4}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[0.02, 0.12]}
          >
            <Bottle accent={accent} />
          </Float>
        </Spin>
        <Pedestal accent={accent} />
      </group>
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.5}
        scale={7}
        blur={2.5}
        far={2.2}
      />
    </Canvas>
  );
}
