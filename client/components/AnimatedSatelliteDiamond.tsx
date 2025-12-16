'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface AnimatedSatelliteDiamondProps {
  position: [number, number, number]
  scale?: number
  pulseSpeed?: number
  rotationSpeed?: number
  glowIntensity?: number
  variant?: 'decorative' | 'status'
  statusText?: string
  statusSubtext?: string
}

export default function AnimatedSatelliteDiamond({
  position,
  scale = 1,
  pulseSpeed = 1,
  rotationSpeed = 0.5,
  glowIntensity = 0.3,
  variant = 'decorative',
  statusText,
  statusSubtext,
}: AnimatedSatelliteDiamondProps) {
  const meshRef = useRef<Mesh>(null)
  const innerGlowRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += rotationSpeed * 0.001
      meshRef.current.rotation.y += rotationSpeed * 0.0015
      meshRef.current.rotation.z += rotationSpeed * 0.0008
      
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * pulseSpeed + position[0]) * 0.3
    }
    
    if (innerGlowRef.current) {
      // Pulse animation for inner glow
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed * 2) * 0.1 + 1
      innerGlowRef.current.scale.setScalar(pulse)
    }
  })

  if (variant === 'decorative') {
    return (
      <group position={position} scale={scale}>
        {/* Main diamond */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4A90E2"
            transparent
            opacity={0.2}
            metalness={0.9}
            roughness={0.1}
            emissive="#6BB6FF"
            emissiveIntensity={glowIntensity}
          />
        </mesh>
        
        {/* Inner glow pulse */}
        <mesh ref={innerGlowRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial
            color="#6BB6FF"
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    )
  }

  // Status variant - simpler, more visible
  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#2A5A8A"
          transparent
          opacity={0.4}
          metalness={0.7}
          roughness={0.3}
          emissive="#4A90E2"
          emissiveIntensity={glowIntensity * 0.5}
        />
      </mesh>
    </group>
  )
}

