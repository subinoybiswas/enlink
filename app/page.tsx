import VideoView from "./components/VideoView/VideoView";
import { Divider } from "@mui/joy";
// const headMesh: any[] = [];

function App() {
  return (
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

      <div className="text-center gap-2 " style={{ width: "50%" }}>
        <h1>Setup your Meet</h1>
        <VideoView></VideoView>
      </div>
      <div className="w-1/2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius et nemo
          atque ea eaque magni, blanditiis eos, amet minima unde odio. Maxime
          eius voluptas delectus amet quas id iusto incidunt.
        </p>
      </div>
    </div>
  );
}

export default App;
