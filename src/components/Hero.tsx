import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

const Model: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/jump2.gltf", (gltf) => {
      if (!group.current) return;
      group.current.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1);

      if (gltf.animations.length > 0) {
        mixer.current = new AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => mixer.current!.clipAction(clip).play());
      }
    });
  }, []);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <group ref={group}></group>;
};

const Hero: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.6} position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero;
