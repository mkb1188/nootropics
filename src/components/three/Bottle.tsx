"use client";

import * as THREE from "three";

/**
 * Procedural supplement bottle — dark clearcoat body, matte cap,
 * emissive accent ring + label bar tinted per product.
 */
export function Bottle({ accent = "#a78bfa" }: { accent?: string }) {
  return (
    <group>
      {/* body */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 1.55, 64]} />
        <meshPhysicalMaterial
          color="#15161b"
          metalness={0.4}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>
      {/* shoulder */}
      <mesh position={[0, 0.52, 0]} scale={[1, 0.5, 1]}>
        <sphereGeometry args={[0.62, 48, 32]} />
        <meshPhysicalMaterial
          color="#15161b"
          metalness={0.4}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 48]} />
        <meshStandardMaterial color="#101014" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* glowing accent ring under the cap */}
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.315, 0.022, 16, 64]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      {/* cap */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.4, 48]} />
        <meshStandardMaterial color="#0a0a0d" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, 1.28, 0]} scale={[1, 0.35, 1]}>
        <sphereGeometry args={[0.37, 48, 24]} />
        <meshStandardMaterial color="#0a0a0d" metalness={0.7} roughness={0.32} />
      </mesh>
      {/* cap knurling */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.375, 1.08, Math.sin(angle) * 0.375]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.018, 0.34, 0.035]} />
            <meshStandardMaterial
              color="#131318"
              metalness={0.75}
              roughness={0.3}
            />
          </mesh>
        );
      })}
      {/* label band */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.632, 0.632, 0.98, 64, 1, true]} />
        <meshStandardMaterial
          color="#1b1c23"
          roughness={0.5}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* label accent bar */}
      <mesh position={[0, -0.02, 0.62]}>
        <boxGeometry args={[0.46, 0.05, 0.03]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* faux label text lines */}
      {[-0.18, -0.32, -0.44].map((y, i) => (
        <mesh key={y} position={[0, y, 0.625]}>
          <boxGeometry args={[i === 0 ? 0.5 : 0.34, 0.035, 0.02]} />
          <meshStandardMaterial color="#3f414d" roughness={0.6} />
        </mesh>
      ))}
      {/* base rim */}
      <mesh position={[0, -1.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.035, 16, 64]} />
        <meshStandardMaterial color="#0c0c10" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
