import { useEffect, useRef, useState } from "react";
import { mountCar } from "./carRenderer.js";

// "Low Poly Small car" by scailman (Sketchfab), CC BY 4.0 — credited in the figure caption.
const MODEL_URL = "/models/low-poly-car/model.glb";

/**
 * A slowly turning 3D car, sized to its container. Drawn by the page's one
 * shared renderer (see carRenderer.js); pauses off-screen, holds still for
 * reduced motion, and shows a soft shimmer until the model is ready.
 */
export default function CarModel3D({ className = "", modelUrl = MODEL_URL, paint = null, startAngle = -0.6 }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    setReady(false);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const car = mountCar({ canvas, url: modelUrl, paint, startAngle, still, onReady: () => setReady(true) });

    const measure = () => {
      const { width, height } = host.getBoundingClientRect();
      car.update({ width, height });
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(host);
    const io = new IntersectionObserver(([entry]) => car.update({ visible: entry.isIntersecting }));
    io.observe(host);

    return () => {
      io.disconnect();
      resizeObserver.disconnect();
      car.destroy();
    };
  }, [modelUrl, paint, startAngle]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden>
      {!ready ? <span className="cs-skeleton absolute inset-[18%] rounded-full opacity-70" /> : null}
      <canvas
        ref={canvasRef}
        className="block h-full w-full transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
