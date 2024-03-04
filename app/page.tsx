"use client";
import VideoView from "../components/VideoView/VideoView";
import { Divider } from "@mui/joy";
import { Button, DropdownTrigger } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { HeartIcon } from "./assets/hearticon";
import { Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
// const headMesh: any[] = [];

function App() {
  const [displayToggle, setDisplayToggle] = useState(true);
  const toggleVisibility = () => {
    setDisplayToggle((prevIsVisible) => !prevIsVisible);
  };
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row  gap-5 z-20">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-[-1]"></div>

          {/* <div {...getRootProps({ className: "dropzone" })}>
        <p>Drag & drop RPM avatar GLB file here</p>
        </div>
      <input
        className="url"
        type="text"
        placeholder="Paste RPM avatar URL"
        onChange={handleOnChange}
      /> */}

          <div
            className=" w-full flex flex-col text-center gap-2 content-center  "
            style={{ width: "50%", margin: "5px" }}
          >
            <h1 className="font-myFont text-3xl my-2">Setup your Meet</h1>
            <div className="grid grid-flow-col gap-1 w-full   self-center place-items-center bg-slate-400/50 p-2 rounded-3xl">
              <h2 className="justify-self-start mx-2 text-xl">
                Subinoy Biswas
              </h2>
              <div className="justify-self-end mx-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      radius="full"
                      variant="faded"
                      isIconOnly
                      color="danger"
                      aria-label="Like"
                    >
                      <HeartIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <VideoView displayToggle={displayToggle}></VideoView>
            <div className="grid grid-flow-col gap-1 w-1/4   self-center place-items-center bg-slate-400/50 p-2 rounded-3xl">
              <Button
                radius="full"
                variant="faded"
                isIconOnly
                color="danger"
                aria-label="Like"
                onClick={toggleVisibility}
              >
                <HeartIcon />
              </Button>
              <Button
                radius="full"
                variant="faded"
                isIconOnly
                color="danger"
                aria-label="Like"
              >
                <HeartIcon />
              </Button>
              <Button
                radius="full"
                variant="faded"
                isIconOnly
                color="danger"
                aria-label="Like"
              >
                <HeartIcon />
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius et
              nemo atque ea eaque magni, blanditiis eos, amet minima unde odio.
              Maxime eius voluptas delectus amet quas id iusto incidunt.
            </p>
          </div>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
