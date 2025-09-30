import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
  animations: any[];
};

const Model = () => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/models/jump2.gltf') as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // Play all animations automatically
  React.useEffect(() => {
    if (animations.length > 0) {
      animations.forEach((_, i) => {
        actions[Object.keys(actions)[i]]?.play();
      });
    }
  }, [animations, actions]);

  return <primitive ref={group} object={scene} scale={1} />;
};

export default Model;

useGLTF.preload('/models/jump2.gltf');
