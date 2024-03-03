import VideoView from "./components/VideoView/VideoView";
import { Divider } from "@mui/joy";
// const headMesh: any[] = [];

function App() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-row items-center justify-center gap-5">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* <div {...getRootProps({ className: "dropzone" })}>
        <p>Drag & drop RPM avatar GLB file here</p>
      </div>
      <input
        className="url"
        type="text"
        placeholder="Paste RPM avatar URL"
        onChange={handleOnChange}
      /> */}
      <div className="flex flex-row justify-between">
        <VideoView></VideoView>
        <Divider orientation="vertical"></Divider>
        <VideoView></VideoView>
      </div>
    </div>
  );
}

export default App;
