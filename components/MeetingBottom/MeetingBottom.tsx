import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Snippet,
} from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
export const MeetingBottom = ({
  toggleVisibility,
  toggleSettingPanel,
  audioDevices,
  videoDevices,
  selectedCamera,
  setSelectedCamera,
  setSelectedAudio,
  selectedAudio,
}: {
  toggleVisibility: () => void;
  toggleSettingPanel: () => void;
  audioDevices: MediaDeviceInfo[];
  videoDevices: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo | undefined;
  seletecdAudio: MediaDeviceInfo | undefined;
  setSelectedCamera: React.Dispatch<
    React.SetStateAction<MediaDeviceInfo | undefined>
  >;
  setSelectedAudio: React.Dispatch<
    React.SetStateAction<MediaDeviceInfo | undefined>
  >;
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set([selectedAudio?.deviceId])
  );
  const [selectedKeys2, setSelectedKeys2] = React.useState<any>(
    new Set([selectedCamera?.deviceId])
  );

  return (
    <>
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
        <div className="flex flex-row items-center bg-slate-700/50 rounded-full">
          <Button radius="full" variant="faded" isIconOnly aria-label="Like">
            <FiCamera size={20} />
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <div className="p-1">
                <IoIosArrowUp></IoIosArrowUp>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Camera selection"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys2}
              onSelectionChange={setSelectedKeys2}
            >
              {videoDevices.map((device) => (
                <DropdownItem
                  key={device.deviceId}
                  onClick={() => setSelectedCamera(device)}
                >
                  {device.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
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
        <div className="flex flex-row items-center bg-slate-700/50 rounded-full">
          <Button radius="full" variant="faded" isIconOnly aria-label="Like">
            <FaMicrophone size={20} />
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <div className="p-1">
                <IoIosArrowUp></IoIosArrowUp>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Microphone selection"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {audioDevices.map((device) => (
                <DropdownItem key={device.deviceId}>
                  {device.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
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
    </>
  );
};
