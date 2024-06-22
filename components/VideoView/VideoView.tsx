"use client";
import React, { use, useEffect, useRef, useState, createRef } from "react";
import { Color, Euler, Matrix4 } from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "./helper/Avatar";
import {
  Category,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import options from "@/app/helpers/faceLandMarks";
import { Preload, Loader } from "@react-three/drei";
import { useReactMediaRecorder } from "react-media-recorder";
import { create } from "domain";

export default function VideoView({
  displayToggle,
}: {
  displayToggle: boolean;
}) {
  let video: HTMLVideoElement;
  let faceLandmarker: FaceLandmarker | null = null;
  let lastVideoTime = -1;
  const [blendshapes, setBlendshapes] = useState<Category[] | null>(null);
  const [rotation, setRotation] = useState<Euler | null>(null);
  const [url, setUrl] = useState<string>(
    "https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024"
  );

  useEffect(() => {
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

    setup();
  }, []);

  const predict = async () => {
    let nowInMs = Date.now();
    if (faceLandmarker && lastVideoTime !== video.currentTime) {
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
  const avatarRef = createRef<HTMLCanvasElement>();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const recordButtonRef = useRef(null);
  const playButtonRef = useRef(null);
  const downloadButtonRef = useRef(null);

  const [recordedBlobs, setRecordedBlobs] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const canvas = avatarRef.current;
    const video = videoRef.current;

    // Capture stream from canvas
    const canvasStream = canvas?.captureStream();
    setStream(canvasStream);

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (canvasStream) {
        canvasStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
    }
  };

  const handleStop = (event) => {
    console.log("Recorder stopped: ", event);
    const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
    videoRef.current.src = window.URL.createObjectURL(superBuffer);
  };

  const toggleRecording = () => {
    if (recordButtonRef.current.textContent === "Start Recording") {
      startRecording();
    } else {
      stopRecording();
      recordButtonRef.current.textContent = "Start Recording";
      playButtonRef.current.disabled = false;
      downloadButtonRef.current.disabled = false;
    }
  };

  const startRecording = () => {
    let options = { mimeType: "video/webm" };
    setRecordedBlobs([]);
    try {
      let recorder = new MediaRecorder(stream, options);
      setMediaRecorder(recorder);
    } catch (e0) {
      console.log("Unable to create MediaRecorder with options Object: ", e0);
    }
    console.log(
      "Created MediaRecorder",
      mediaRecorder,
      "with options",
      options
    );
    recordButtonRef.current.textContent = "Stop Recording";
    playButtonRef.current.disabled = true;
    downloadButtonRef.current.disabled = true;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100); // collect 100ms of data
    console.log("MediaRecorder started", mediaRecorder);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    console.log("Recorded Blobs: ", recordedBlobs);
    videoRef.current.controls = true;
  };

  const play = () => {
    videoRef.current.play();
  };

  const download = () => {
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "test.webm";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div
      className="flex justify-center content-center items-center bg-slate-900/80 rounded-3xl z-20 border-[5px] dark:border-slate-200 border-slate-600"
      style={{ aspectRatio: 16 / 9, transition: "all 0.5s ease-in-out" }}
    >
      <Loader />
      <p>{status}</p>
      <br />
      <button ref={recordButtonRef} onClick={toggleRecording}>Start Recording</button>
      <button ref={playButtonRef} onClick={play} disabled>Play</button>
      <button ref={downloadButtonRef} onClick={download} disabled>Download</button>
      <br />
      <video ref={videoRef} width={400} height={300} controls />

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
          ref={avatarRef}
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
          {blendshapes && rotation && (
            <Avatar
              url={url}
              blendshapes={blendshapes}
              rotation={rotation}
              // headMesh={headMesh}
            />
          )}
        </Canvas>
      ) : (
        <></>
      )}
    </div>
  );
}
