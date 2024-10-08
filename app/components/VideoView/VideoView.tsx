"use client";
import React, { useEffect, useState } from "react";
import { Color, Euler, Matrix4 } from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar, AvatarProps } from "./components/Avatar";
import {
  Category,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import options from "@/app/helpers/faceLandMarks";
import { Preload, Loader } from "@react-three/drei";

export default function VideoView() {
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
  return (
    <div className="flex justify-center content-center items-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl w-full min-h-[50%] md:max-w-xl z-20 border-[5px] dark:border-slate-200 border-slate-600">
      <Loader />
      <video
        className="camera-feed hidden"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        id="video"
        autoPlay
      ></video>

      <Canvas
        style={{ height: "100%", width: "95%" }}
        camera={{ fov: 15 }}
        shadows
      >
        <Preload all />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          color={new Color(1, 1, 1)}
          intensity={0.5}
          castShadow={true} // Enable shadow casting
        />
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
    </div>
  );
}
