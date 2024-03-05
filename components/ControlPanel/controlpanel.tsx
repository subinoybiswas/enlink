import { HeartIcon } from "@/app/assets/hearticon";
import { Button } from "@nextui-org/react";
import { HiOutlineSparkles, HiSparkles } from "react-icons/hi";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

export default function ControlPanel({
  toggleVisibility,
  visibility,
}: {
  toggleVisibility: () => void;
  visibility: boolean;
}) {
  return (
    <div className="grid grid-flow-col gap-1 w-1/4   self-center place-items-center bg-slate-400/50 p-2 rounded-3xl ">
      <Button
        radius="full"
        variant="faded"
        isIconOnly
        aria-label="Like"
        onClick={toggleVisibility}
        style={{ transition: "all 0.5s ease-in-out" }}
      >
        {visibility ? (
          <HiSparkles size={20} />
        ) : (
          <HiOutlineSparkles size={20} />
        )}
      </Button>
      <Button radius="full" variant="faded" isIconOnly aria-label="Like">
        <FiCamera size={20} />
      </Button>
      <Button radius="full" variant="faded" isIconOnly aria-label="Like">
        <FaMicrophone size={20} />
      </Button>
    </div>
  );
}
