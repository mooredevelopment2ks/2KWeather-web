import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

useGLTF.preload("/apocalypse-day.glb");

export default function Model() {
  const group = useRef < Group > null;
  const { nodes, materials, animations, scene } = useGLTF(
    "/apocalypse-day.glb"
  );
  return (
    <group useRef={group}>
      <primitive object={scene} />
    </group>
  );
}
