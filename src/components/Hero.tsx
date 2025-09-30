import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export default function Hero() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
