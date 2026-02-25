"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

const COLORS = [
  "rgba(249,115,22,0.6)",  // orange
  "rgba(59,130,246,0.5)",  // blue
  "rgba(167,139,250,0.5)", // purple
  "rgba(34,197,94,0.4)",   // green
];

const LINE_COLORS = [
  "rgba(249,115,22,",  // orange
  "rgba(59,130,246,",  // blue
  "rgba(167,139,250,", // purple
  "rgba(34,197,94,",   // green
];

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const CONNECTION_DIST = 150;
    const SPEED = prefersReduced ? 0 : 0.3;
    // ── Line tuning (rollback: LINE_WIDTH = 0.5, LINE_ALPHA = 0.15) ──
    const LINE_WIDTH = 1.0;
    const LINE_ALPHA = 0.25;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Track scroll for parallax
    function onScroll() {
      scrollRef.current = window.scrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Init particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        color: COLORS[colorIdx],
        radius: Math.random() * 1.5 + 1,
      });
    }
    particlesRef.current = particles;

    // If reduced motion, draw once and stop
    if (prefersReduced) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * LINE_ALPHA;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(155,98,255,${alpha})`;
            ctx.lineWidth = LINE_WIDTH;
            ctx.stroke();
          }
        }
      }
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = scrollRef.current;
      const parallaxOffset = scrollY * 0.05;

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw with parallax offset
        const drawY = p.y - parallaxOffset % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const p1y = p1.y - parallaxOffset % canvas.height;
          const p2y = p2.y - parallaxOffset % canvas.height;

          const dx = p1.x - p2.x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * LINE_ALPHA;
            // Use the color of the first particle for the line
            const colorIdx = COLORS.indexOf(p1.color);
            const lineColor = LINE_COLORS[colorIdx >= 0 ? colorIdx : 0];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1y);
            ctx.lineTo(p2.x, p2y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = LINE_WIDTH;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
        opacity: 0.4,
      }}
    />
  );
}
