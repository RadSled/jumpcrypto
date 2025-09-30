import React, { Suspense, useState } from "react";
import { Box } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import Model from "../Model";
import Play from "../../images/playBtn.inline.svg";
import Pause from "../../images/pauseBtn.inline.svg";

const Hero = () => {
  const [anim, setAnim] = useState(true);

  return (
    <Box component="div" sx={{ position: "relative", width: "100%", height: 600 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} />
        <Suspense fallback={null}>
          {anim && <Model />}
        </Suspense>
      </Canvas>

      <Box
        component="span"
        onClick={() => setAnim((a) => !a)}
        sx={{
          width: 40,
          height: 40,
          border: "1px solid #1CE7C2",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
      >
        {anim ? <Pause /> : <Play />}
      </Box>
    </Box>
  );
};

export default Hero;
