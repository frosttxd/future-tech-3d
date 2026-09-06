import React, { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

export interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
  useDnaPalette?: boolean;
}

export function LiquidChrome({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  useDnaPalette = false,
  className = "",
  style,
  ...props
}: LiquidChromeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      uniform float uUseDnaPalette;
      varying vec2 vUv;

      vec3 getDnaColor(float t) {
          t = fract(t);
          vec3 cCyan = vec3(0.0, 0.96, 1.0);          // #00f5ff
          vec3 cCobalt = vec3(0.145, 0.388, 0.922);    // #2563eb
          vec3 cViolet = vec3(0.659, 0.333, 0.969);    // #a855f7
          vec3 cMagenta = vec3(0.925, 0.282, 0.600);   // #ec4899
          vec3 cTurquoise = vec3(0.024, 0.714, 0.831); // #06b6d4

          if (t < 0.25) {
              return mix(cCyan, cCobalt, t / 0.25);
          } else if (t < 0.5) {
              return mix(cCobalt, cViolet, (t - 0.25) / 0.25);
          } else if (t < 0.75) {
              return mix(cViolet, cMagenta, (t - 0.5) / 0.25);
          } else {
              return mix(cMagenta, cTurquoise, (t - 0.75) / 0.25);
          }
      }

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          float wave = abs(sin(uTime - uv.y - uv.x));
          vec3 color;
          
          if (uUseDnaPalette > 0.5) {
              float phase = fract(uTime * 0.22 + (uv.x + uv.y) * 0.18);
              vec3 dnaColor = getDnaColor(phase);
              // Rich iridescent DNA fluid
              color = dnaColor * (0.045 / max(wave, 0.015));
              // Blazing white starlight core highlight sweep
              float specular = pow(clamp(1.0 - wave * 1.15, 0.0, 1.0), 3.2);
              color += vec3(1.0, 1.0, 1.0) * specular * 1.25;
          } else {
              color = uBaseColor / max(wave, 0.001);
          }

          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            container.offsetWidth || 1,
            container.offsetHeight || 1,
            (container.offsetWidth || 1) / (container.offsetHeight || 1),
          ]),
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) },
        uUseDnaPalette: { value: useDnaPalette ? 1.0 : 0.0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const width = container.offsetWidth || 1;
      const height = container.offsetHeight || 1;
      renderer.setSize(width, height);
      const res = program.uniforms.uResolution.value as Float32Array;
      res[0] = gl.canvas.width;
      res[1] = gl.canvas.height;
      res[2] = gl.canvas.width / (gl.canvas.height || 1);
    }

    window.addEventListener("resize", resize);
    resize();

    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1);
      const y = 1 - (e.clientY - rect.top) / (rect.height || 1);
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = x;
      mouse[1] = y;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!container || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / (rect.width || 1);
      const y = 1 - (touch.clientY - rect.top) / (rect.height || 1);
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = x;
      mouse[1] = y;
    }

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove);
    }

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      const loseCtx = gl.getExtension("WEBGL_lose_context");
      if (loseCtx) loseCtx.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive, useDnaPalette]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
      {...props}
    />
  );
}

export default LiquidChrome;
