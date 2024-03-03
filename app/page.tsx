"use client";
import { useEffect, useState } from "react";
import {
  Category,
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from "three";
import { Canvas, useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { DotBackgroundDemo } from "./background";
import options from "./helpers/faceLandMarks";
interface AvatarProps {
  url: string;
  blendshapes: Category[] | undefined; // Assuming blendshapes is an array of objects
  rotation: Euler | undefined;
}
let video: HTMLVideoElement;
let faceLandmarker: FaceLandmarker;
let lastVideoTime = -1;

let headMesh: any[] = [];
function Avatar({ url, blendshapes, rotation }: AvatarProps) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  useEffect(() => {
    if (nodes.Wolf3D_Head) headMesh.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) headMesh.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) headMesh.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) headMesh.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) headMesh.push(nodes.Wolf3D_Head_Custom);
  }, [nodes, url]);

  useFrame(() => {
    if (blendshapes && blendshapes?.length > 0) {
      blendshapes?.forEach((element) => {
        headMesh.forEach((mesh) => {
          let index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });
      if (rotation) {
        nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
        nodes.Neck.rotation.set(
          rotation.x / 5 + 0.3,
          rotation.y / 5,
          rotation.z / 5
        );
        nodes.Spine2.rotation.set(
          rotation.x / 10,
          rotation.y / 10,
          rotation.z / 10
        );
      }
    }
  });

  return <primitive object={scene} position={[0, -1.75, 3]} />;
}

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

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-col items-center justify-center gap-5">
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
      <div className="w-3/4 md:w-1/2 h-14 z-20 bg-white rounded-3xl">Hello</div>
      <div className="flex justify-center content-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl h-1/2 w-full md:w-1/2 md:h-1/2 z-20 border-[5px] dark:border-slate-200 border-slate-600">
        <video className="camera-feed hidden " id="video" autoPlay></video>

        <Canvas
          style={{ height: "100%", width: "95%" }}
          camera={{ fov: 20 }}
          shadows
        >
          <ambientLight intensity={0.5} />

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

          <Avatar url={url} blendshapes={blendshapes} rotation={rotation} />
        </Canvas>
      </div>

      {/* <img className="logo" src="./logo.png" /> */}
    </div>
  );
}

export default App;
