"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdCallEnd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
export default function MeetingPage({ params }: { params: { slug: string } }) {
  const [isSettingPanelOpen, setIsSettingPanelOpen] = useState(false);

  const toggleSettingPanel = () => {
    setIsSettingPanelOpen(!isSettingPanelOpen);
  };

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-hidden">
      <div className="h-[50px] m-2 bg-slate-400 rounded-3xl">Hi </div>
      <div className="bg-slate-300 flex-1 flex flex-row">
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
        <div className="flex flex-col bg-slate-400 flex-1 text-center">
          <div className="flex-1 flex flex-row">
            <div
              className="flex-1"
              style={{ transition: "all 0.5s ease-in-out" }}
            >
              Body
            </div>
            <div
              style={{
                width: isSettingPanelOpen ? "0" : "25vw",
                opacity: isSettingPanelOpen ? 0 : 1,
                visibility: isSettingPanelOpen ? "hidden" : "visible",
                transition: "width 0.5s ease-in-out",
              }}
              className="bg-slate-300 rounded-3xl m-2"
            >
              <div onClick={toggleSettingPanel}>Close</div>
            </div>
          </div>
          <div className="grid grid-flow-col gap-2 mb-2 self-center place-items-center bg-slate-800/50 p-1 rounded-3xl ">
            <Button radius="full" variant="faded" isIconOnly aria-label="Like">
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
  );
}
