import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  // Make sure the path matches your public folder
  const { scene, animations } = useGLTF("/static/jump2.gltf");
  const { actions } = useAnimations(animations, scene);

  // Play all animations
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }

    // Fix grey material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.needsUpdate = true;
      }
    });
  }, [actions, scene]);

  return <primitive object={scene} scale={0.01} position={[0, -1, 0]} />;
};

export default Model;
