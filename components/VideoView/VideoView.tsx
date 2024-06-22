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
  const avatarRef = createRef<HTMLCanvasElement>();
  const recordButtonRef = useRef(null);

  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    const setup = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      faceLandmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        options
      );

      video = document.getElementById("vid") as HTMLVideoElement;
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        })
        .then(function (stream) {
          stream.addEventListener("loadeddata", () => {
            console.log("loadeddata");
          });
          video.srcObject = stream;
          video.addEventListener("loadeddata", predict);
          video.style.transform = `scaleX(-1)`;
        });
    };

    setup();

    const canvas = avatarRef.current;
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

  const handleDataAvailable = (event: any) => {
    if (event.data && event.data.size > 0) {
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
    }
  };

  const handleStop = (event: any) => {
    console.log("Recorder stopped: ", event);
  };

  const toggleRecording = () => {
    startRecording();
  };
  const toggleRecordingOff = () => {
    stopRecording();
  };

  const startRecording = () => {
    let options = { mimeType: "video/webm", videoBitsPerSecond: 2500000 };
    setRecordedBlobs([]);
    try {
      if (stream === undefined) {
        console.log("Stream is undefined");
        return;
      }
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
    if (mediaRecorder === undefined) {
      return;
    }
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100); // collect 100ms of data
    console.log("MediaRecorder started", mediaRecorder);
  };

  const stopRecording = () => {
    if (mediaRecorder === undefined) {
      console.log("MediaRecorder is undefined");
      return;
    }
    mediaRecorder.stop();
    console.log("Recorded Blobs: ", recordedBlobs);
    const blob = new Blob(recordedBlobs, { type: "video/mp4" });
    const url = window.URL.createObjectURL(blob);
    console.log("url", url);
    // videoRef.current.controls = true;
  };

  return (
    <div
      className="flex justify-center content-center items-center bg-slate-900/80 rounded-3xl z-20 border-[5px] dark:border-slate-200 border-slate-600"
      style={{ aspectRatio: 16 / 9, transition: "all 0.5s ease-in-out" }}
    >
      <Loader />

      <br />
      <button ref={recordButtonRef} onClick={toggleRecording}>
        Start Recording
      </button>
      <button ref={recordButtonRef} onClick={toggleRecordingOff}>
        Stop Recording
      </button>

      <br />

      <video
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: "1.5rem",
          display: displayToggle ? "none" : "",
          transform: "scaleX(-1)",
          aspectRatio: 16 / 9,
          position: "relative",
          zIndex: 2,
        }}
        id="vid"
        autoPlay
      ></video>
      {displayToggle ? (
 
          <Canvas
            ref={avatarRef}
            style={{ aspectRatio: 16 / 9, transform: "scaleX(-1)" ,height: "400px", width: "600px"}}
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
