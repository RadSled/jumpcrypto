import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/jump2.gltf");
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      // optional rotation/animation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={gltf.scene} ref={meshRef} />;
};

export default Model;
