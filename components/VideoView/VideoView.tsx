"use client";
import React, { useEffect, useRef, useState } from "react";
import { Color, Euler, Matrix4 } from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar, AvatarProps } from "./helper/Avatar";
import {
  Category,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import options from "@/app/helpers/faceLandMarks";
import { Preload, Loader } from "@react-three/drei";

export default function VideoView({
  displayToggle,
}: {
  displayToggle: boolean;
}) {
  let video: HTMLVideoElement;
  let faceLandmarker: FaceLandmarker;
  let lastVideoTime = -1;
  const [blendshapes, setBlendshapes] = useState<Category[]>();
  const [rotation, setRotation] = useState<Euler>();
  const [show, setShow] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    "https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024"
  );
  const handleOnChange = (event: any) => {
    setUrl(`${event.target.value}?morphTargets=ARKit&textureAtlas=1024`);
  };
  useEffect(() => {
    setup();
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    const stream = canvas?.captureStream();
    // Capture canvas as a MediaStream
    let videoTrack: MediaStreamTrack;
    if (stream && videoRef && videoRef.current) {
      videoTrack = stream.getVideoTracks()[0];
      videoRef.current.srcObject = new MediaStream([videoTrack]);
    }

    // You can now use the videoTrack in your calls or further processing

    return () => {
      videoTrack.stop(); // Don't forget to stop the video track when component unmounts
    };
  }, []);
  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      options
    );

    video = document.getElementById("video") as HTMLVideoElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predict);
        video.style.transform = `scaleX(-1)`;
      });
  };

  const predict = async () => {
    let nowInMs = Date.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(
        video,
        nowInMs
      );

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        setBlendshapes(faceLandmarkerResult.faceBlendshapes[0].categories);

        const matrix = new Matrix4().fromArray(
          faceLandmarkerResult.facialTransformationMatrixes![0].data
        );
        setRotation(new Euler().setFromRotationMatrix(matrix));
      }
    }

    window.requestAnimationFrame(predict);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="flex justify-center content-center items-center bg-slate-900/80 rounded-3xl z-20 border-[5px] dark:border-slate-200 border-slate-600"
      style={{ aspectRatio: 16 / 9, transition: "all 0.5s ease-in-out" }}
    >
      <Loader />
      <video
        className="camera-feed"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: "1.5rem",
          display: displayToggle ? "none" : "",
          transform: "scaleX(-1)",
          aspectRatio: 16 / 9,
        }}
        id="video"
        autoPlay
      ></video>
      {displayToggle ? (
        <Canvas
          ref={canvasRef}
          style={{ aspectRatio: 16 / 9, transform: "scaleX(-1)" }}
          camera={{ fov: 14 }}
          shadows
        >
          <Preload all />
          <ambientLight intensity={0.8} />

          <pointLight
            position={[10, 10, 10]}
            color={new Color(1, 1, 0)}
            intensity={0.5}
            castShadow
          />
          <pointLight
            position={[-10, 0, 10]}
            color={new Color(1, 0, 0)}
            intensity={0.5}
            castShadow
          />
          <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
          <Avatar
            url={url}
            blendshapes={blendshapes}
            rotation={rotation}
            // headMesh={headMesh}
          />
        </Canvas>
      ) : (
        <></>
      )}
      <video
        height={"50px"}
        width={"50px"}
        ref={videoRef}
        autoPlay
        controls
        style={{ transform: "scaleX(-1)", display: "none" }}
      />
    </div>
  );
}
