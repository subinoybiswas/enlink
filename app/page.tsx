"use client";
import { useEffect, useRef, useState } from "react";
import {
  Category,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from "three";
import { Canvas, useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { DotBackgroundDemo } from "./background";
import options from "./helpers/faceLandMarks";
import { Avatar } from "./components/VideoView/components/Avatar";
import VideoView from "./components/VideoView/VideoView";

let video: HTMLVideoElement;
let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;

// const headMesh: any[] = [];

function App() {
  const [blendshapes, setBlendshapes] = useState<Category[]>();
  const [rotation, setRotation] = useState<Euler>();
  const [show, setShow] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    "https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024"
  );
  const { getRootProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
  });
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

  const handleOnChange = (event: any) => {
    setUrl(`${event.target.value}?morphTargets=ARKit&textureAtlas=1024`);
  };

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-col items-center justify-center gap-5">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* <div {...getRootProps({ className: "dropzone" })}>
        <p>Drag & drop RPM avatar GLB file here</p>
      </div>
      <input
        className="url"
        type="text"
        placeholder="Paste RPM avatar URL"
        onChange={handleOnChange}
      /> */}
      <VideoView
        url={url}
        blendshapes={blendshapes}
        rotation={rotation}
      ></VideoView>
    </div>
  );
}

export default App;
