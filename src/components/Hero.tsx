import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { AnimationMixer } from "three";
import * as THREE from "three";
import gsap from "gsap";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/jump2.gltf");
  const meshRef = useRef<THREE.Group>(null);
  const mixer = useRef<AnimationMixer>();

  useEffect(() => {
    if (gltf.animations.length && meshRef.current) {
      mixer.current = new AnimationMixer(meshRef.current);
      gltf.animations.forEach((clip) => mixer.current!.clipAction(clip).play());
    }
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
    if (meshRef.current) meshRef.current.rotation.y += 0.002; // optional rotation
  });

  return <primitive ref={meshRef} object={gltf.scene} />;
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Example GSAP animation for fade in
    gsap.from(containerRef.current, { opacity: 0, duration: 1 });
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "600px" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero;
