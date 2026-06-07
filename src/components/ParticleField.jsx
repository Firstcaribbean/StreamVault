import { useEffect, useRef } from "react";

export default function ParticleField({ accent = "#7C3AED" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrame;
    let particles = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 9)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.6 + 0.25,
        speed: Math.random() * 0.22 + 0.04,
        alpha: Math.random() * 0.55 + 0.15,
      }));
    };

    const render = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y * 0.008) * 0.12;

        if (particle.y > window.innerHeight + 10) {
          particle.y = -10;
          particle.x = Math.random() * window.innerWidth;
        }

        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${particle.alpha})`;
        context.shadowColor = accent;
        context.shadowBlur = 10;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden="true" />;
}
