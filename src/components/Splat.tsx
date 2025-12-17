import { useMemo } from "react";
import { SplatMesh } from "@sparkjsdev/spark";

export const Splat = () => {
  const splat = useMemo(() => {
    const splatMesh = new SplatMesh({
      url: "PUT_URL_HERE",
    });
    return splatMesh;
  }, []);

  return (
    <>
      <primitive object={splat} />
    </>
  );
};
