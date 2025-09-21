"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useProgress, Html, Environment } from '@react-three/drei'
import { Mesh } from 'three'
import { ErrorBoundary } from 'react-error-boundary'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <div className="text-sm">Loading 3D Scene...</div>
        <div className="text-xs text-gray-400">{Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

function SimpleModel() {
  const meshRef = useRef<Mesh>(null)
  
  // Simple cursor following - just rotate to face cursor
  useFrame((state) => {
    if (meshRef.current) {
      const pointer = state.pointer
      meshRef.current.rotation.y = pointer.x * 0.3
      meshRef.current.rotation.x = -pointer.y * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#4c64e4" 
        roughness={0.2} 
        metalness={0.8}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={false}
        autoRotate={false}
      />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Suspense fallback={<Loader />}>
        <SimpleModel />
        <Environment preset="studio" />
      </Suspense>
    </>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-full text-white text-center">
      <div>
        <div className="text-xl mb-2">⚠️</div>
        <div className="text-sm">3D Scene Error</div>
        <div className="text-xs text-gray-400 mt-1">
          {error.message || 'Failed to load 3D content'}
        </div>
      </div>
    </div>
  )
}

export function Hero3D() {
  return (
    <div className="w-full h-full">
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onError={(error) => console.error('3D Hero Error:', error)}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}