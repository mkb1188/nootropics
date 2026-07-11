"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/** Deterministic PRNG so node layout is stable across renders */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generative "neural network" backdrop — glowing nodes connected by
 * faint synapse lines, slowly drifting.
 */
export function NeuralField({
  accent = "#8b5cf6",
  count = 80,
  radius = 7,
  linkDistance = 2.4,
}: {
  accent?: string;
  count?: number;
  radius?: number;
  linkDistance?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo(() => {
    const rand = mulberry32(42);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = radius * (0.45 + 0.55 * Math.cbrt(rand()));
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi)
        )
      );
    }
    const linePts: THREE.Vector3[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < linkDistance) {
          linePts.push(pts[i], pts[j]);
        }
      }
    }
    return {
      nodes: new THREE.BufferGeometry().setFromPoints(pts),
      edges: new THREE.BufferGeometry().setFromPoints(linePts),
    };
  }, [count, radius, linkDistance]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.02;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.06;
  });

  return (
    <group ref={group} position={[0, 0, -3]}>
      <points geometry={nodes}>
        <pointsMaterial
          color={accent}
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
