"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdCallEnd } from "react-icons/md";
export default function MeetingPage({ params }: { params: { slug: string } }) {
  const [isSettingPanelOpen, setIsSettingPanelOpen] = useState(false);

  const toggleSettingPanel = () => {
    setIsSettingPanelOpen(!isSettingPanelOpen);
  };

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-hidden">
      <div className="flex flex-row w-full h-[50px] bg-slate-50">
        <div className="w-1/3 h-full bg-black bg-opacity-50">sds</div>
        <div className="w-2/3 h-full bg-black bg-opacity-50">dsd</div>
        <div className="w-2/3 h-full bg-black bg-opacity-50">dsd</div>
      </div>
      <div className="bg-slate-300 flex-1 flex flex-row">
        <div className=" flex flex-col bg-slate-800 justify-between justify-items-center w-[60px] text-center rounded-3xl">
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
        </div>
        <div className="bg-slate-400 flex-1">
          Body
          <div className="grid grid-flow-col gap-0.5 w-1/4   self-center place-items-center bg-slate-800/50 p-1 rounded-3xl ">
            <Button
              radius="full"
              variant="faded"
              isIconOnly
              aria-label="Like"
              style={{ transition: "all 0.5s ease-in-out" }}
            >
              <HiSparkles size={20} />
            </Button>
            <Button radius="full" variant="faded" isIconOnly aria-label="Like">
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
            <Button radius="full" variant="faded" isIconOnly aria-label="Like">
              <FaMicrophone size={20} />
            </Button>
            <Button radius="full" variant="faded" isIconOnly aria-label="Like">
              <FaMicrophone size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full min-w-[30vw] bg-white z-10 ${
          isSettingPanelOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform ease-in-out duration-300 bg-orange-500`}
      >
        <button className="absolute top-4 right-4" onClick={toggleSettingPanel}>
          Close
        </button>
        <div className="p-4">
          {/* Add your setting panel content here */}
          Setting Panel Content
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button onClick={toggleSettingPanel}>Open Settings</button>
      </div>
    </div>
  );
}
