import React, { useEffect, useRef } from "react";
import p5 from "p5";
import sketch from "./sketch";

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (canvasRef.current && !p5Instance.current) {
      p5Instance.current = new p5(sketch, canvasRef.current);
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default Canvas;
