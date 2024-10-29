"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { Suspense } from "react";
import { Center } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 10], // Adjust the camera position
        fov: 90, // Reduce the field of view to zoom in
        near: 0.5, // Adjust the near clipping plane
        far: 1000, // Adjust the far clipping plane
      }}
    >
      <directionalLight position={[-5, 5, 5]} intensity={4} />
      <Suspense fallback={null}>
        <mesh scale={[5, 5, 5]}>
          <Center>
            <Model />
          </Center>
        </mesh>
      </Suspense>
    </Canvas>
  );
}
