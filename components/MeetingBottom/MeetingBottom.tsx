import { Avatar, Button, Snippet } from "@nextui-org/react";
import { FaMicrophone } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";

export const MeetingBottom = ({
  toggleVisibility,
  toggleSettingPanel,
}: {
  toggleVisibility: () => void;
  toggleSettingPanel: () => void;
}) => {
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
    </>
  );
};