import Card from "@/components/Participants/Card/Card";

export const Participant = ({
  VideoRef,
}: {
  VideoRef: React.RefObject<HTMLVideoElement>;
}) => {
  return (
    <div className={`participant`}>
      <Card>
        <video ref={VideoRef} className="video" autoPlay playsInline></video>
      </Card>
    </div>
  );
};
