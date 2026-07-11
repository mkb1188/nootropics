"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Billboard sprite with a radial-gradient canvas texture and additive
 * blending — a cheap, reliable stand-in for bloom that keeps the canvas
 * transparent (real postprocessing would composite a black background).
 */
export function GlowSprite({
  color,
  scale = 1.6,
  opacity = 0.5,
  position = [0, 0, 0] as [number, number, number],
}: {
  color: string;
  scale?: number;
  opacity?: number;
  position?: [number, number, number];
}) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const c = new THREE.Color(color);
    const [r, g, b] = [c.r, c.g, c.b].map((v) => Math.round(v * 255));
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.35, `rgba(${r},${g},${b},0.35)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [color]);

  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

/** Dark display pedestal with an emissive accent ring and floor glow */
export function Pedestal({ accent }: { accent: string }) {
  return (
    <group position={[0, -1.26, 0]}>
      <mesh>
        <cylinderGeometry args={[1.05, 1.18, 0.14, 64]} />
        <meshStandardMaterial color="#0b0b0f" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.014, 12, 96]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      <GlowSprite color={accent} scale={3} opacity={0.28} position={[0, 0.15, 0]} />
    </group>
  );
}

/**
 * Tilted gyroscope ring that slowly orbits the bottle, carrying a
 * glowing bead — pure sci-fi garnish.
 */
export function OrbitRing({
  accent,
  radius = 1.5,
  speed = 0.35,
  tilt = [1.25, 0, 0.35] as [number, number, number],
  beadScale = 1,
}: {
  accent: string;
  radius?: number;
  speed?: number;
  tilt?: [number, number, number];
  beadScale?: number;
}) {
  const spinner = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spinner.current) spinner.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={spinner}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 8, 128]} />
          <meshStandardMaterial
            color="#4b4b57"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
        <group position={[radius, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.045 * beadScale, 16, 16]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <GlowSprite color={accent} scale={0.55 * beadScale} opacity={0.85} />
        </group>
      </group>
    </group>
  );
}
