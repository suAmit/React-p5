import { lazy, Suspense, useEffect, useState } from "react";

interface SketchLoaderProps {
  sketch: string | null;
}

const SketchLoader = ({ sketch }: SketchLoaderProps) => {
  const [ActiveSketch, setActiveSketch] = useState<React.ComponentType | null>(
    null,
  );

  useEffect(() => {
    if (!sketch) {
      setActiveSketch(null);
      return;
    }

    const SketchComponent = lazy(() =>
      import(`../sketches/${sketch}/canvas.tsx`).catch((error) => {
        console.error(`Failed to load sketch from ${sketch}:`, error);
        return { default: () => <div>Sketch Load Error</div> };
      }),
    );

    setActiveSketch(SketchComponent);
  }, [sketch]);

  if (!sketch) return null;

  return (
    <div>
      {ActiveSketch && (
        <Suspense fallback={<div>Loading sketch...</div>}>
          <ActiveSketch />
        </Suspense>
      )}
    </div>
  );
};

export default SketchLoader;
