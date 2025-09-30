import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from './Model';

const Hero = () => {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
      <Suspense fallback={null}>
        <Stage
          environment="city"
          intensity={1}
          contactShadow={true}
          shadowBias={-0.0001}
        >
          <Model />
        </Stage>
        {/* OrbitControls can be removed if no interaction is desired */}
      </Suspense>
    </Canvas>
  );
};

export default Hero;
