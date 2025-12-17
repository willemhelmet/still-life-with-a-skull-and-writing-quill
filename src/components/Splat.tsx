import { useMemo } from "react";
import { SplatMesh } from "@sparkjsdev/spark";

export const Splat = () => {
  const splat = useMemo(() => {
    const splatMesh = new SplatMesh({
      url: import.meta.env.BASE_URL + "still-life.sog",
    });
    return splatMesh;
  }, []);

  return (
    <>
      <primitive object={splat} />
    </>
  );
};
