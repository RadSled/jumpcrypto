import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, Color } from "three";

interface ModelProps {
  url: string;
  scale?: number;
  play?: boolean;
}

const Model: React.FC<ModelProps> = ({ url, scale = 1, play = true }) => {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      if (!group.current) return;

      group.current.add(gltf.scene);
      gltf.scene.scale.set(scale, scale, scale);

      // Set original material colors (if needed)
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color = new Color(child.material.color.getHex());
          child.material.needsUpdate = true;
        }
      });

      if (gltf.animations.length > 0) {
        mixer.current = new AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          const action = mixer.current!.clipAction(clip);
          if (play) action.play();
        });
      }
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer.current && play) mixer.current.update(clock.getDelta());
    };
    animate();
  }, [url, scale, play]);

  return <group ref={group}></group>;
};

const Hero: React.FC = () => {
  const [play, setPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
        }}
        camera={{ position: [0, 1, 3], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.6} position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Model url="/static/jump2.gltf" scale={isMobile ? 0.5 : 1} play={play} />
        </Suspense>
      </Canvas>

      <button
        onClick={() => setPlay(!play)}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "1px solid #1CE7C2",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {play ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Hero;
