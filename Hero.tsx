import React, { Suspense, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import gsap from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { Canvas } from "@react-three/fiber";
import Model from "../Model";
import Model2 from "../Model2";
import Play from "../../images/playBtn.inline.svg";
import Pause from "../../images/pauseBtn.inline.svg";
import hero from "../../images/index/hero.svg";
import Arrow from "../../images/arrow-right.inline.svg";
import MobileHero from "../../images/MobileHero.svg";

const Hero = () => {
  const [anim, setAnim] = useState(true);
  const breakpoints = useBreakpoint();
  const animation = useRef(null);
  const animation1 = useRef(null);
  const animation2 = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(CSSPlugin);
  });
  useEffect(() => {
    if (anim) {
      const master = gsap.timeline({ repeat: -1 });
      master
        .to(animation2.current, {
          opacity: 0,
        })
        .to(animation.current, {
          opacity: 0,
          delay: 1,
          duration: 0.1,
        })
        .to(animation.current, {
          opacity: 1,
          delay: 0.1,
          duration: 0.1,
        })
        .to(animation.current, {
          opacity: 0,
          delay: 1,
          duration: 0.1,
        })
        .to(animation.current, {
          opacity: 1,
          delay: 0.1,
          duration: 0.1,
        })
        .to(animation.current, {
          opacity: 0,
          delay: 1,
          duration: 0.1,
        })
        .to(animation.current, {
          opacity: 1,
          delay: 0.1,
          duration: 0.1,
        })
        .to(
          animation1.current,
          {
            opacity: 0,
            duration: 0.7,
            delay: 1,
          },
          "start1"
        )
        .to(
          animation2.current,
          {
            opacity: 1,
            duration: 0.7,
            delay: 1,
          },
          "start1"
        )
        .to(
          animation1.current,
          {
            opacity: 1,
            duration: 0.7,
            delay: 10,
          },
          "start2"
        )
        .to(
          animation2.current,
          {
            opacity: 0,
            duration: 0.7,
            delay: 10,
          },
          "start2"
        );
    }
  }, [anim, breakpoints]);

  return (
    <Box component="div" sx={{ position: "relative" }}>
      <StaticImage
        src="../../images/bricks.svg"
        alt=""
        placeholder="blurred"
        layout="fixed"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <Box
        component="div"
        sx={{
          pt: 9,
          mb: { xs: 3, md: 10 },
          display: { xs: "block", sm: "flex" },
          maxWidth: 1044,
          mx: "auto",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {breakpoints.xs ||
        breakpoints.sm ||
        Object.keys(breakpoints).length === 0 ? (
          <Box
            component="div"
            sx={{ width: { xs: "100%", sm: "calc(50%)", aspectRatio: "1/1" } }}
          >
            <Box component="section" sx={{ p: 4 }}>
              <Box
                component="img"
                src={MobileHero}
                alt=""
                sx={{
                  maxHeight: { sm: 536 },
                  width: "100%",
                  display: "block",
                  aspectRatio: "1 / 1",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            component="div"
            sx={{ width: { xs: "100%", sm: "calc(50%)", aspectRatio: "1/1" } }}
          >
            {anim ? (
              <Box
                component="div"
                ref={animation}
                sx={{
                  width: "100%",
                  position: "relative",
                  aspectRatio: "1/1",
                  maxWidth: { sm: 536 },
                }}
              >
                <Canvas ref={animation1}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight intensity={0.5} />
                    <Model />
                  </Suspense>
                </Canvas>
                <Canvas
                  ref={animation2}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Suspense fallback={null}>
                    <Model2 />
                    <ambientLight intensity={0.6} />
                    <directionalLight intensity={0.5} />
                  </Suspense>
                </Canvas>
              </Box>
            ) : (
              <Box component="section">
                <Box
                  component="img"
                  src={hero}
                  alt=""
                  sx={{
                    maxHeight: { sm: 536 },
                    width: "100%",
                    display: "block",
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        <Box
          component="div"
          sx={{ width: { xs: "100%", sm: "calc(50%)" }, maxWidth: 534 }}
        >
          {breakpoints.xs ||
            breakpoints.sm ||
            (Object.keys(breakpoints).length === 0 && (
              <Box
                component="span"
                onClick={() => {
                  setAnim((anim) => !anim);
                }}
                sx={{
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                  border: "1px solid #1CE7C2",
                  borderRadius: "50%",
                  position: { sm: "absolute" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  right: 0,
                  bottom: 0,
                  ml: "auto",
                  transform: { xs: "translatey(-20px)", sm: "translatey(0)" },
                }}
              >
                {anim ? <Pause /> : <Play />}
              </Box>
            ))}
          <Typography variant="h1" sx={{ mb: 2.6 }}>
            Jump{" "}
            <Box component="span" sx={{ color: "#1CE7C2" }}>
              Crypto
            </Box>
          </Typography>
          <Typography>
            Jump Crypto is an experienced team of builders, developers, and
            traders who are excited about the prospects of Web3 and blockchain
            technology to revolutionize open, community-driven networks.{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
