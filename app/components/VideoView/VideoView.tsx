import React from "react";
import { Color } from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar, AvatarProps } from "./components/Avatar";

export default function VideoView({ url, blendshapes, rotation }: AvatarProps) {
    
  return (
    <div className="flex justify-center content-center items-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl w-full min-h-[50%] md:max-w-xl z-20 border-[5px] dark:border-slate-200 border-slate-600">
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
