import VideoView from "./components/VideoView/VideoView";

// const headMesh: any[] = [];

function App() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.5] relative flex flex-col items-center justify-center gap-5">
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
      <VideoView></VideoView>
    </div>
  );
}

export default App;
