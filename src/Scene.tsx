import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls, Image } from "@react-three/drei";
import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./components/Splat.tsx";

export const Scene = () => {
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);

  return (
    <>
      <color attach="background" args={[0, 0, 0]} />
      <CameraControls distance={1} />
      <group position={[0, 1, -1]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
        <Image url={"still-life.jpg"} />
      </group>
      <SparkRenderer args={[sparkRendererArgs]}>
        <group position={[0, 0, 0]} rotation={[Math.PI, Math.PI * 0.5, 0]}>
          <Splat />
        </group>
      </SparkRenderer>
    </>
  );
};
