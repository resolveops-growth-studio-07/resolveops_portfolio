import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Preload, Line, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import './DigitalCore.css';

// ── Components ───────────────────────────────────────

function CoreModule({ position, color, speed = 1, isHovered }: { position: [number, number, number], color: string, speed?: number, isHovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetScale = isHovered ? 1.5 : 1;
  const currentScale = useRef(1);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2 * speed;
      ref.current.rotation.y += delta * 0.3 * speed;
      
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
      ref.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1}>
      <Icosahedron args={[0.5, 1]} position={position} ref={ref}>
        <meshStandardMaterial 
          color={color} 
          wireframe={!isHovered} 
          emissive={color} 
          emissiveIntensity={isHovered ? 0.85 : 0.35}
          transparent
          opacity={0.92}
        />
      </Icosahedron>
    </Float>
  );
}

function Connections({ nodes, isHovered }: { nodes: [number, number, number][], isHovered: boolean }) {
  // Generate pairs of connections
  const lines = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        pairs.push([nodes[i], nodes[j]]);
      }
    }
    return pairs;
  }, [nodes]);

  return (
    <>
      {lines.map((pair, index) => (
        <Line 
          key={index}
          points={pair} 
          color={isHovered ? "#36E0D0" : "#6B7A84"} 
          lineWidth={1}
          transparent
          opacity={isHovered ? 0.65 : 0.28}
        />
      ))}
    </>
  );
}

function Scene({ isPaused, isReducedMotion }: { isPaused: boolean, isReducedMotion: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { camera, pointer } = useThree();

  // Nodes for Design, Develop, Automate, Analytics
  const nodes: [number, number, number][] = useMemo(() => [
    [-2, 1, -1],
    [2, 1.5, 0],
    [-1.5, -1.5, 1],
    [1.5, -1, -2]
  ], []);

  useFrame(() => {
    if (isPaused || isReducedMotion) return;
    
    // Parallax effect based on pointer
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <CoreModule position={nodes[0]} color="#36E0D0" speed={0.8} isHovered={hovered} />
      <CoreModule position={nodes[1]} color="#7C6CFF" speed={1.2} isHovered={hovered} />
      <CoreModule position={nodes[2]} color="#F2C879" speed={1.5} isHovered={hovered} />
      <CoreModule position={nodes[3]} color="#F4F7F8" speed={1.0} isHovered={hovered} />
      <Connections nodes={nodes} isHovered={hovered} />
      
      {/* Central Core */}
      <Sphere args={[0.3, 32, 32]} position={[0,0,0]}>
         <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Sphere>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#36E0D0" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C6CFF" />
    </group>
  );
}

// ── Main Component ───────────────────────────────────

export default function DigitalCore() {
  const [isPaused, setIsPaused] = useState(false);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback for no-WebGL or error
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="digital-core-fallback">
        <div className="core-fallback-indicator" />
      </div>
    );
  }

  return (
    <div className="digital-core-wrapper">
      <div className="core-controls">
        <button 
          className="btn-ghost" 
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
        >
          {isPaused ? "Play" : "Pause"} Core
        </button>
      </div>
      
      <div className="digital-core-canvas">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]} // Bounded device pixel ratio
          gl={{ antialias: false, powerPreference: "high-performance" }} // Reduced rendering work
          onCreated={({ gl }) => {
            gl.setClearColor('#0B0D10', 0);
          }}
          frameloop={isPaused ? 'never' : 'always'}
        >
          <Scene isPaused={isPaused} isReducedMotion={isReducedMotion} />
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
}
