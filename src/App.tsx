import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Scene } from "./Scene.tsx";
import { PlayButton } from "./components/PlayButton.tsx";
import { useMyStore } from "./store/store.ts";
import { MobileControls } from "./components/MobileControls.tsx";

function App() {
  const isMobile = useMyStore((state) => state.isMobile);
  const status = useMyStore((state) => state.status);

  return (
    <>
      {status !== "playing" && <PlayButton />}

      <div className="flex h-screen w-screen">
        {isMobile && status === "playing" && <MobileControls />}
        <Canvas
          gl={{ antialias: false }}
          dpr={1}
          camera={{
            position: [0, 1.5, 5],
            rotation: [0, 0, 0],
          }}
        >
          <Scene />
        </Canvas>
        <Loader />
      </div>
    </>
  );
}
export default App;
