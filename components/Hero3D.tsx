"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useProgress, Html, Environment } from '@react-three/drei'
import { Mesh, BufferGeometry, MeshStandardMaterial, Vector3 } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { ErrorBoundary } from 'react-error-boundary'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-sm">
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}


function FallbackModel() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const mouse = state.mouse
      meshRef.current.rotation.y = mouse.x * 0.8
      meshRef.current.rotation.x = mouse.y * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.7}
        roughness={0.2}
        emissive="#ffffff"
        emissiveIntensity={0.05}
        wireframe
      />
    </mesh>
  )
}

function STLModel({ url }: { url: string }) {
  const meshRef = useRef<Mesh>(null)
  const geometry = useLoader(STLLoader, url)
  
  // Don't rotate the geometry itself, we'll handle it on the mesh
  geometry.center()
  geometry.computeBoundingBox()
  const box = geometry.boundingBox!
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 2.5 / maxDim // Scale to fit nicely in view
  
  // Simple cursor following - just rotate to face cursor
  useFrame((state) => {
    if (meshRef.current) {
      const mouse = state.mouse
      
      // Only rotate on Y axis (left/right) to face cursor
      const targetRotationY = mouse.x * 0.8 // More responsive
      
      // Keep base X rotation for upright position, add small tilt
      const targetRotationX = -Math.PI / 2 + (mouse.y * 0.3)
      
      // Smooth rotation using lerp
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.15 // Faster response
      )
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.15
      )
    }
  })
  
  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      scale={scale}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to stand upright
    >
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.7}
        roughness={0.2}
        emissive="#ffffff"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <ErrorBoundary fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">3D Model Loading...</p>
        </div>
      }>
        <Canvas className="opacity-70" shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false}
          />
          
          {/* Lighting setup */}
          <ambientLight intensity={0.3} />
          
          {/* Key light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            color="#ffffff"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-5, 3, -5]}
            intensity={0.5}
            color="#a78bfa"
          />
          
          {/* Rim light */}
          <pointLight
            position={[0, 10, -10]}
            intensity={0.8}
            color="#ec4899"
          />
          
          {/* Bottom light for glow effect */}
          <pointLight
            position={[0, -5, 0]}
            intensity={0.5}
            color="#6b46c1"
          />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          <ErrorBoundary fallback={<FallbackModel />}>
            <Suspense fallback={<Loader />}>
              {/* STL Model - ensure smk-kas-43.stl is in public/models/ directory */}
              <STLModel url="/models/smk-kas-43.stl" />
            </Suspense>
          </ErrorBoundary>
          
          {/* Add some fog for atmosphere */}
          <fog attach="fog" args={['#000000', 5, 15]} />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}