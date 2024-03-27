"use client";
import VideoView from "../components/VideoView/VideoView";
import {
  Avatar,
  Button,
  DropdownTrigger,
  AvatarGroup,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import ControlPanel from "../components/ControlPanel/controlpanel";
import MyDropdownMenu from "./assets/dropdownmenu";
import { Snippet } from "@nextui-org/react";
// const headMesh: any[] = [];

function App() {
  const [displayToggle, setDisplayToggle] = useState(true);
  const toggleVisibility = () => {
    setDisplayToggle((prevIsVisible) => !prevIsVisible);
  };
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row  gap-10 z-20 p-4">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]"></div>

          <div className=" w-[55%] flex flex-col text-center gap-2 content-center  font-myFont h-full">
            <h1 className="font-myFont text-3xl my-2">Setup your Meet</h1>
            <div className="grid grid-flow-col gap-1 w-full   self-center place-items-center bg-slate-400/50 p-2 rounded-3xl">
              <div className="justify-self-start flex items-center text-center">
                <Avatar
                  className=" mx-2 "
                  isBordered
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <h2 className=" mx-2 text-xl">Subinoy Biswas</h2>
              </div>
              <div className="justify-self-end mx-2">
                <MyDropdownMenu />
              </div>
            </div>

            <VideoView displayToggle={displayToggle}></VideoView>
            <ControlPanel
              toggleVisibility={toggleVisibility}
              visibility={displayToggle}
            />
            <div className="absolute bottom-0 right-0 m-5">
              <Snippet variant="bordered" size="lg" symbol="">
                bfg-khj-oiy
              </Snippet>
            </div>
          </div>
          <div className="w-[45%] text-center flex flex-col content-center gap-5 h-full justify-center">
            <h1 className="text-4xl self-center">Are you Ready?</h1>
            <AvatarGroup isBordered>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
            <div>
              <Button size="lg">Join</Button>
            </div>
          </div>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
