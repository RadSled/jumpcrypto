import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import gsap from "gsap";

export default function Hero() {
  const [anim, setAnim] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anim && canvasRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(canvasRef.current, { opacity: 0, duration: 1 })
        .to(canvasRef.current, { opacity: 1, duration: 1 });
    }
  }, [anim]);

  return (
    <div
      ref={canvasRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
      <button
        onClick={() => setAnim(!anim)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          padding: "10px 20px",
          zIndex: 1,
        }}
      >
        {anim ? "Pause" : "Play"}
      </button>
    </div>
  );
}
