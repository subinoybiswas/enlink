import { HeartIcon } from "@/app/assets/hearticon";
import { Button } from "@nextui-org/react";
import { AiFillAudio } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";

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
        color="danger"
        aria-label="Like"
        onClick={toggleVisibility}
      >
        {visibility ? (
          <FaMicrophone width={"25px"} />
        ) : (
          <FaMicrophoneSlash width={"25px"} />
        )}
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
  );
}
