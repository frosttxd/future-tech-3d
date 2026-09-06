import { useRef, useEffect } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 245, 255], [37, 99, 235]],
  containerClassName = "",
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 300);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 300);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const gap = 16;
    let time = 0;

    const render = () => {
      time += 0.02 * animationSpeed;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          const n = Math.sin(i * 0.2 + time) * Math.cos(j * 0.2 + time);
          const norm = (n + 1) / 2;

          const colorIdx = Math.floor(norm * (colors.length - 1));
          const color = colors[colorIdx] || colors[0];

          const opacityIdx = Math.floor(norm * (opacities.length - 1));
          const opacity = opacities[opacityIdx] || 0.5;

          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize * (0.6 + 0.4 * norm), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [animationSpeed, colors, opacities, dotSize]);

  return (
    <div className={`h-full relative bg-transparent w-full ${containerClassName}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-transparent to-[#020306]/80 pointer-events-none" />
      )}
    </div>
  );
};

export default CanvasRevealEffect;
