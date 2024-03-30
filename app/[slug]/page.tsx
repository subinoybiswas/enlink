"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdCallEnd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Snippet } from "@nextui-org/react";
import { Avatar, DropdownTrigger, AvatarGroup } from "@nextui-org/react";
import VideoView from "@/components/VideoView/VideoView";
import Card from "@/components/Card/Card";
export default function MeetingPage({ params }: { params: { slug: string } }) {
  const [isSettingPanelOpen, setIsSettingPanelOpen] = useState(false);

  const toggleSettingPanel = () => {
    setIsSettingPanelOpen(!isSettingPanelOpen);
  };
  const [displayToggle, setDisplayToggle] = useState(true);
  const toggleVisibility = () => {
    setDisplayToggle((prevIsVisible) => !prevIsVisible);
  };
  const VideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        if (VideoRef.current) {
          VideoRef.current.srcObject = stream;
        }
      });
  });

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-hidden">
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row  gap-10 z-20 p-4">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]"></div>

            <div className="flex-1 flex flex-row ">
              {/* <div className=" flex flex-col bg-slate-800 justify-between justify-items-center w-[60px] text-center rounded-3xl">
          <div className="invisible">Start</div>
          <div className="grid gap-4 justify-items-center justify-center">
            <Button isIconOnly radius="full" className="justify-self-center bg">
              <FaVideo></FaVideo>
            </Button>
            <Button isIconOnly radius="full">
              <FaVideo></FaVideo>
            </Button>
            <Button isIconOnly radius="full">
              <SlCalender></SlCalender>
            </Button>
          </div>
          <div className="mb-4">
            <Button isIconOnly radius="full" color="danger">
              <IoMdExit></IoMdExit>
            </Button>
          </div>
        </div> */}
              <div className="flex flex-col bg-slate-400/40 flex-1 text-center rounded-3xl">
                <div className="flex-1 flex flex-row">
                  <div
                    className="flex-1"
                    style={{ transition: "all 0.5s ease-in-out" }}
                  >
                    <div
                      style={{
                        "--grid-size": 2,
                        "--grid-col-size": 1,
                        "--grid-row-size": 3,
                      }}
                      className={`participants`}
                    >
                      <div className={`participant`}>
                        <Card>
                          <video
                            ref={VideoRef}
                            className="video"
                            autoPlay
                            playsInline
                          ></video>
                        </Card>
                      </div>
                      <div className={`participant`}>
                        <Card>
                          <video
                            ref={VideoRef}
                            className="video"
                            autoPlay
                            playsInline
                          ></video>
                        </Card>
                      </div>
                      <div className={`participant`}>
                        <Card>
                          <video
                            ref={VideoRef}
                            className="video"
                            autoPlay
                            playsInline
                          ></video>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: isSettingPanelOpen ? "0" : "350px",
                      opacity: isSettingPanelOpen ? 0 : 1,
                      visibility: isSettingPanelOpen ? "hidden" : "visible",
                      transition: "width 0.5s ease-in-out",
                    }}
                    className="bg-slate-900/40 rounded-3xl m-2"
                  >
                    <div onClick={toggleSettingPanel}>Close</div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 m-8 select-none hidden sm:block">
                  <Snippet size="lg" symbol="" color="primary" variant="solid">
                    bfg-khj-oiy
                  </Snippet>
                </div>
                <div className="absolute bottom-0 left-0 m-8 hidden sm:block">
                  <div className="flex flex-rowitems-center text-center">
                    <Avatar
                      className=" mx-2 "
                      isBordered
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                    <h1 className="m-2">Subinoy Biswas</h1>
                  </div>
                </div>
                <div className="z-[20] grid grid-flow-col gap-2 mb-2 self-center place-items-center bg-slate-800/50 p-1 rounded-3xl ">
                  <Button
                    radius="full"
                    variant="faded"
                    isIconOnly
                    aria-label="Like"
                    onClick={toggleVisibility}
                  >
                    <HiSparkles size={20} />
                  </Button>
                  <Button
                    radius="full"
                    variant="faded"
                    isIconOnly
                    aria-label="Like"
                  >
                    <FiCamera size={20} />
                  </Button>
                  <Button
                    radius="full"
                    variant="faded"
                    isIconOnly
                    aria-label="Like"
                    size="lg"
                    color="danger"
                  >
                    <MdCallEnd size={20} />
                  </Button>
                  <Button
                    radius="full"
                    variant="faded"
                    isIconOnly
                    aria-label="Like"
                  >
                    <FaMicrophone size={20} />
                  </Button>
                  <Button
                    radius="full"
                    variant="faded"
                    isIconOnly
                    aria-label="Like"
                    onClick={toggleSettingPanel}
                  >
                    <IoIosSettings size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </div>
  );
}
