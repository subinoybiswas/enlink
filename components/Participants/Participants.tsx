import { Participant } from "./Participant/Participant";
import "./participants.css";
export const Participants = ({
  VideoRefs,
}: {
  VideoRefs: React.RefObject<HTMLVideoElement>[];
}) => {
  const participantKey = VideoRefs;
  let gridCol =
    participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
  let gridColSize = participantKey.length <= 4 ? 1 : 2;
  let gridRowSize =
    participantKey.length <= 4
      ? participantKey.length
      : Math.ceil(participantKey.length / 2);
  //   gridColSize = Math.ceil(Math.sqrt(participantKey.length));
  //   gridRowSize = Math.ceil(participantKey.length / gridColSize);
  return (
    <div
      style={{
        "--grid-size": gridCol as any,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
      }}
      className={`participants`}
    >
      {VideoRefs.map((ref, index) => (
        <Participant VideoRef={ref} key={index} />
      ))}
    </div>
  );
};
