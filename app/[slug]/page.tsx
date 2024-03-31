"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Participants } from "@/components/Participants/Participants";
import { MeetingBottom } from "@/components/MeetingBottom/MeetingBottom";
import useWindowDimensions from "../helpers/getWindowDimension";

export default function MeetingPage({ params }: { params: { slug: string } }) {
  const [isSettingPanelOpen, setIsSettingPanelOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  const toggleSettingPanel = () => {
    setIsSettingPanelOpen(!isSettingPanelOpen);
  };
  const [loading, setLoading] = useState(true);
  const [displayToggle, setDisplayToggle] = useState(true);
  const toggleVisibility = () => {
    setDisplayToggle((prevIsVisible) => !prevIsVisible);
  };
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<MediaDeviceInfo>();
  const [selectedAudio, setSelectedAudio] = useState<MediaDeviceInfo>();
  const VideoRef = useRef<HTMLVideoElement>(null);
  const userMediaStream = useMemo(() => {
    return navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, deviceId: selectedCamera?.deviceId },
      audio: false,
    });
  }, [selectedCamera]);
  console.log(height, width);
  useEffect(() => {
    setLoading(true);
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
      setSelectedCamera(
        devices.filter((device) => device.kind === "videoinput")[0]
      );

      setAudioDevices(
        devices.filter((device) => device.kind === "audiooutput")
      );
      setSelectedAudio(
        devices.filter((device) => device.kind === "audioinput")[0]
      );
      setLoading(false);
    };
    getDevices();
  }, []);
  useEffect(() => {
    const getUserMediaAndSetStream = async () => {
      try {
        if (VideoRef.current) {
          VideoRef.current.srcObject = await userMediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getUserMediaAndSetStream();

    return () => {
      // No need to stop tracks here, since they will be stopped when component unmounts
    };
  }, [VideoRef, selectedCamera?.deviceId, userMediaStream]);

  const refs = [VideoRef, VideoRef, VideoRef];
  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-hidden">
      {loading ? (
        <>Loading..</>
      ) : (
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row  gap-10 z-20 p-4">
              {/* Radial gradient for the container to give a faded look */}
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]"></div>

              <div className="flex-1 flex flex-row ">
                <div className="flex flex-col bg-slate-400/40 flex-1 text-center rounded-3xl">
                  <div className="flex-1 flex flex-row">
                    <div
                      className={`flex-1 overflow-y-scroll sm:overflow-hidden ${
                        isSettingPanelOpen
                          ? height <= 720
                            ? refs.length > 2 && refs.length <= 4
                              ? "xl:mx-[15rem]"
                              : ""
                            : refs.length > 2 && refs.length <= 4
                            ? "xl:mx-[10rem]"
                            : ""
                          : ""
                      } `}
                      style={{ transition: "all 0.5s ease-in-out" }}
                    >
                      <Participants VideoRefs={refs}></Participants>
                    </div>
                    <div
                      style={{
                        width: isSettingPanelOpen ? "0" : "350px",
                        opacity: isSettingPanelOpen ? 0 : 1,
                        display: isSettingPanelOpen ? "none" : "block",
                        transition: "width 0.5s ease-in-out",
                      }}
                      className="settings-wrapper animate-fade-in animate-width bg-slate-600/80 rounded-3xl m-5"
                    >
                      <div onClick={toggleSettingPanel}>Close</div>
                    </div>
                  </div>
                  <MeetingBottom
                    audioDevices={audioDevices}
                    videoDevices={videoDevices}
                    toggleSettingPanel={toggleSettingPanel}
                    toggleVisibility={toggleVisibility}
                    selectedCamera={selectedCamera}
                    setSelectedCamera={setSelectedCamera}
                    selectedAudio={selectedAudio}
                    setSelectedAudio={setSelectedAudio}
                  ></MeetingBottom>
                </div>
              </div>
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      )}
    </div>
  );
}
