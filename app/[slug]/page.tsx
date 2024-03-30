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
  const [displayToggle, setDisplayToggle] = useState(true);
  const toggleVisibility = () => {
    setDisplayToggle((prevIsVisible) => !prevIsVisible);
  };
  const VideoRef = useRef<HTMLVideoElement>(null);
  const userMediaStream = useMemo(() => {
    return navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: false,
    });
  }, []); // Empty dependency array ensures this runs only once when component mounts
  console.log(height, width);
  useEffect(() => {
    const getUserMediaAndSetStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });
        if (VideoRef.current) {
          VideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getUserMediaAndSetStream();

    return () => {
      userMediaStream.then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
    };
  }, [VideoRef, userMediaStream]);

  const refs = [VideoRef, VideoRef, VideoRef, VideoRef, VideoRef];
  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-hidden">
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row  gap-10 z-20 p-4">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]"></div>

            <div className="flex-1 flex flex-row ">
              <div className="flex flex-col bg-slate-400/40 flex-1 text-center rounded-3xl">
                <div className="flex-1 flex flex-row">
                  <div
                    className={`flex-1 overflow-y-scroll ${
                      isSettingPanelOpen
                        ? height <= 720
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
                    className="settings-wrapper animate-fade-in animate-width"
                  >
                    <div onClick={toggleSettingPanel}>Close</div>
                  </div>
                </div>
                <MeetingBottom
                  toggleSettingPanel={toggleSettingPanel}
                  toggleVisibility={toggleVisibility}
                ></MeetingBottom>
              </div>
            </div>
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </div>
  );
}
