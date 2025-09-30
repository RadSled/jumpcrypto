import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model() {
  const gltf = useGLTF("/models/jump2.gltf");
  return <primitive object={gltf.scene} />;
}
