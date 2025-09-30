import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, Color } from "three";

const Hero: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/jump2.gltf", (gltf) => {
      if (!group.current) return;

      group.current.add(gltf.scene);

      // Scale the model
      const scale = isMobile ? 0.5 : 1;
      gltf.scene.scale.set(scale, scale, scale);

      // Fix colors
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color = new Color(child.material.color.getHex());
          child.material.needsUpdate = true;
        }
      });

      // Setup animation
      if (gltf.animations.length > 0) {
        mixer.current = new AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          mixer.current!.clipAction(clip).play();
        });
      }
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer.current) mixer.current.update(clock.getDelta());
    };
    animate();
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.6} position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <group ref={group}></group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero;
