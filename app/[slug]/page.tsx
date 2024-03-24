"use client";
import React, { useState } from "react";

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
        <div className="bg-slate-800">dsfd</div>
        <div className="bg-slate-400 flex-1">Body</div>
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
