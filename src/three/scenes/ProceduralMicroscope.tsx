import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralMicroscopeProps {
  interactive?: boolean;
}

/**
 * Procedural Laboratory Microscope
 * 
 * Crafted from Three.js geometric primitives:
 * - Weighted horseshoe/horseshoe base
 * - Curved optical limb (arm)
 * - Specimen stage with aperture
 * - Revolving nosepiece with 3 objective lenses
 * - Optical body tube and ocular eyepiece
 * - Dual coarse & fine adjustment knurled knobs
 * - Warm blush laboratory PBR materials
 */
export const ProceduralMicroscope: React.FC<ProceduralMicroscopeProps> = ({
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const nosepieceRef = useRef<THREE.Group>(null);

  // Materials with ivory/blush medical enamel and chrome accents
  const ivoryEnamel = new THREE.MeshStandardMaterial({
    color: '#FAF4F0',
    roughness: 0.22,
    metalness: 0.12,
  });

  const chromeAccent = new THREE.MeshStandardMaterial({
    color: '#E8DED9',
    metalness: 0.85,
    roughness: 0.18,
  });

  const darkCharcoalTrim = new THREE.MeshStandardMaterial({
    color: '#222025',
    roughness: 0.35,
    metalness: 0.45,
  });

  const brassDetail = new THREE.MeshStandardMaterial({
    color: '#B65F6D',
    metalness: 0.65,
    roughness: 0.28,
  });

  const glassStage = new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    transmission: 0.85,
    ior: 1.5,
  });

  // Slow, refined ambient floating rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Check reduced motion preference dynamically
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    // Gentle natural drift
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.25;

    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.05 - 0.2;

    // Pointer-driven interactive tilt
    if (interactive) {
      const targetTiltX = state.pointer.y * 0.12;
      const targetTiltY = state.pointer.x * 0.2;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        delta * 2
      );

      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -targetTiltY * 0.5,
        delta * 2
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.2, 0]}
      scale={[0.9, 0.9, 0.9]}
    >
      {/* 1. Base (Heavy Cast Foot) */}
      <mesh
        material={ivoryEnamel}
        position={[0, -1.1, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.85, 0.95, 0.22, 32]} />
      </mesh>

      <mesh
        material={darkCharcoalTrim}
        position={[0, -1.22, 0]}
      >
        <cylinderGeometry args={[0.96, 0.98, 0.06, 32]} />
      </mesh>

      {/* 2. Lower Pillar & Illuminator */}
      <mesh
        material={chromeAccent}
        position={[0, -0.85, 0]}
      >
        <cylinderGeometry args={[0.22, 0.28, 0.35, 24]} />
      </mesh>

      {/* Light Field Diaphragm (Substage light source) */}
      <mesh
        material={darkCharcoalTrim}
        position={[0, -0.65, 0.2]}
      >
        <cylinderGeometry args={[0.26, 0.26, 0.12, 24]} />
      </mesh>

      <mesh
        material={brassDetail}
        position={[0, -0.58, 0.2]}
      >
        <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
      </mesh>

      {/* 3. Curved Arm (Limb) */}
      <group position={[0, 0, -0.25]}>
        {/* Lower Spine */}
        <mesh
          material={ivoryEnamel}
          position={[0, -0.3, 0]}
          rotation={[0.2, 0, 0]}
        >
          <boxGeometry args={[0.32, 0.85, 0.35]} />
        </mesh>

        {/* Upper Curved Arch */}
        <mesh
          material={ivoryEnamel}
          position={[0, 0.35, 0.12]}
          rotation={[-0.35, 0, 0]}
        >
          <boxGeometry args={[0.3, 0.75, 0.32]} />
        </mesh>
      </group>

      {/* 4. Specimen Stage (Platform) */}
      <group position={[0, -0.25, 0.18]}>
        {/* Main Stage Plate */}
        <mesh
          material={darkCharcoalTrim}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.15, 0.08, 1.05]} />
        </mesh>

        {/* Slide Glass Specimen with Blood Smear Tint */}
        <mesh
          material={glassStage}
          position={[0, 0.06, 0]}
        >
          <boxGeometry args={[0.75, 0.02, 0.32]} />
        </mesh>

        <mesh
          material={brassDetail}
          position={[0, 0.08, 0]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.015, 16]} />
        </mesh>

        {/* Stage Clips */}
        <mesh
          material={chromeAccent}
          position={[-0.42, 0.07, 0]}
          rotation={[0, 0, 0.1]}
        >
          <boxGeometry args={[0.04, 0.02, 0.22]} />
        </mesh>

        <mesh
          material={chromeAccent}
          position={[0.42, 0.07, 0]}
          rotation={[0, 0, -0.1]}
        >
          <boxGeometry args={[0.04, 0.02, 0.22]} />
        </mesh>
      </group>

      {/* 5. Revolving Nosepiece & Objectives */}
      <group
        ref={nosepieceRef}
        position={[0, 0.45, 0.22]}
      >
        {/* Turret Disc */}
        <mesh
          material={darkCharcoalTrim}
          rotation={[0.1, 0, 0]}
        >
          <cylinderGeometry args={[0.36, 0.42, 0.14, 24]} />
        </mesh>

        {/* Objective 1: High Power (100x Oil Immersion - Rose Ring) */}
        <group
          position={[0, -0.28, 0.08]}
          rotation={[-0.05, 0, 0]}
        >
          <mesh material={chromeAccent}>
            <cylinderGeometry args={[0.09, 0.12, 0.38, 16]} />
          </mesh>

          <mesh
            material={brassDetail}
            position={[0, -0.12, 0]}
          >
            <cylinderGeometry args={[0.095, 0.095, 0.06, 16]} />
          </mesh>
        </group>

        {/* Objective 2: Medium Power (40x) */}
        <group
          position={[-0.18, -0.22, -0.12]}
          rotation={[0.2, 0, -0.3]}
        >
          <mesh material={chromeAccent}>
            <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
          </mesh>
        </group>

        {/* Objective 3: Low Power (10x) */}
        <group
          position={[0.18, -0.2, -0.12]}
          rotation={[0.2, 0, 0.3]}
        >
          <mesh material={chromeAccent}>
            <cylinderGeometry args={[0.08, 0.1, 0.26, 16]} />
          </mesh>
        </group>
      </group>

      {/* 6. Optical Body Tube & Head */}
      <group position={[0, 0.82, 0.1]}>
        {/* Inclined Head Housing */}
        <mesh
          material={ivoryEnamel}
          rotation={[-0.25, 0, 0]}
        >
          <boxGeometry args={[0.34, 0.42, 0.48]} />
        </mesh>

        {/* Eyepiece Tube (Ocular) */}
        <group
          position={[0, 0.28, 0.14]}
          rotation={[-0.45, 0, 0]}
        >
          <mesh material={chromeAccent}>
            <cylinderGeometry args={[0.11, 0.12, 0.45, 20]} />
          </mesh>

          {/* Rubber Eyecup */}
          <mesh
            material={darkCharcoalTrim}
            position={[0, 0.24, 0]}
          >
            <cylinderGeometry args={[0.15, 0.12, 0.08, 20]} />
          </mesh>
        </group>
      </group>

      {/* 7. Focus Knobs (Coarse & Fine Adjustment) */}
      <group position={[0, -0.22, -0.22]}>
        {/* Transverse Axle */}
        <mesh
          material={chromeAccent}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.06, 0.06, 0.85, 16]} />
        </mesh>

        {/* Left Coarse Knob */}
        <mesh
          material={darkCharcoalTrim}
          position={[-0.46, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
        </mesh>

        {/* Left Fine Knob */}
        <mesh
          material={brassDetail}
          position={[-0.54, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
        </mesh>

        {/* Right Coarse Knob */}
        <mesh
          material={darkCharcoalTrim}
          position={[0.46, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
        </mesh>

        {/* Right Fine Knob */}
        <mesh
          material={brassDetail}
          position={[0.54, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
        </mesh>
      </group>
    </group>
  );
};