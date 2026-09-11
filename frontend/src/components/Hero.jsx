import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── ASCII Penguin made of dollar signs ───
// Each character becomes a particle on the canvas
const PENGUIN_ART = [
  "          $$$$$$$          ",
  "        $$$$$$$$$$$        ",
  "       $$$$$$$$$$$$$       ",
  "      $$$ $$$$$ $$$$$     ",
  "      $$ @ $$$ @ $$$$     ",
  "      $$$ $$$$$ $$$$$     ",
  "       $$$$$$$$$$$$$       ",
  "       $$$$     $$$$       ",
  "       $$$$$$$$$$$$$       ",
  "      $$$$$$$$$$$$$$$      ",
  "     $$ $$$$$$$$$$$ $$     ",
  "    $$  $$$$$$$$$$$  $$    ",
  "   $$   $$$$$$$$$$   $$   ",
  "   $$   $$$$$$$$$$   $$   ",
  "   $$   $$$$$$$$$$   $$   ",
  "    $$  $$$$$$$$$$$  $$    ",
  "     $$ $$$$$$$$$$$ $$     ",
  "      $$$$$$$$$$$$$$$      ",
  "       $$$$$$$$$$$$$       ",
  "      $$$$$$$$$$$$$$$      ",
  "     $$$$$       $$$$$     ",
  "    $$$$$$       $$$$$$    ",
  "    $$$$$$       $$$$$$    ",
  "     $$$$$$$$$$$$$$$$$     ",
  "       $$$$$$$$$$$$$       ",
];

// ─── Particle class ───
class Particle {
  constructor(x, y, char) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.char = char;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85;
    this.springFactor = 0.08;
    this.size = 0;
    this.targetSize = 10;
    // randomized color from a palette of dollar-green / terminal-green / cyan
    const colors = [
      "rgba(0,255,136,0.9)",
      "rgba(0,230,118,0.85)",
      "rgba(0,200,83,0.8)",
      "rgba(0,255,200,0.7)",
      "rgba(100,255,218,0.75)",
      "rgba(57,255,20,0.8)",
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(mouseX, mouseY, isHovering) {
    // Grow in on load
    if (this.size < this.targetSize) {
      this.size += (this.targetSize - this.size) * 0.05;
    }

    if (isHovering) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 120;

      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 6;
        this.vy += Math.sin(angle) * force * 6;
      }
    }

    // Spring back to origin
    const dx = this.originX - this.x;
    const dy = this.originY - this.y;
    this.vx += dx * this.springFactor;
    this.vy += dy * this.springFactor;

    // Friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    const displacement = Math.sqrt(
      (this.x - this.originX) ** 2 + (this.y - this.originY) ** 2
    );
    const alpha = Math.min(1, 0.5 + displacement / 60);

    ctx.save();
    ctx.font = `${Math.round(this.size)}px "Fira Code", "Courier New", monospace`;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = alpha;

    // Glow effect when displaced
    if (displacement > 5) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8 + displacement * 0.3;
    }

    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
  }
}

// ─── PenguinCanvas component ───
const PenguinCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const isHoveringRef = useRef(false);
  const animFrameRef = useRef(null);

  const initParticles = useCallback((canvas) => {
    const particles = [];
    const charSize = 11;
    const artWidth = PENGUIN_ART[0].length * charSize;
    const artHeight = PENGUIN_ART.length * (charSize + 4);
    const offsetX = (canvas.width - artWidth) / 2;
    const offsetY = (canvas.height - artHeight) / 2;

    PENGUIN_ART.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        const ch = line[col];
        if (ch !== " ") {
          const x = offsetX + col * charSize;
          const y = offsetY + row * (charSize + 4);
          particles.push(new Particle(x, y, ch));
        }
      }
    });

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      // Recalculate particle positions
      initParticles({
        width: rect.width,
        height: rect.height,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // ─── Animation loop ───
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((p) => {
        p.update(
          mouseRef.current.x,
          mouseRef.current.y,
          isHoveringRef.current
        );
        p.draw(ctx);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ display: "block" }}
    />
  );
};

// ─── Code Snippets floating decorations ───
const codeSnippets = [
  { code: "$ sudo apt install tux", top: "8%", left: "5%", delay: "0s" },
  { code: "$ echo $PENGUIN", top: "20%", left: "65%", delay: "0.3s" },
  { code: "$ chmod +x penguin.sh", top: "75%", left: "10%", delay: "0.6s" },
  { code: "$ ./build_tux --ascii", top: "85%", left: "55%", delay: "0.9s" },
  { code: "$ grep -r '$' tux/", top: "45%", left: "80%", delay: "1.2s" },
];

// ─── Main Hero Component ───
const Hero = () => {
  const [visible, setVisible] = useState(false);

  const scrollTosec = () => {
    const teamSection = document.getElementById("AboutGLUG");
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#03022B] flex items-center overflow-hidden">
      {/* ── Left Side: Hero Content ── */}
      <div
        className={`relative z-20 w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-16 lg:pt-0 lg:pb-0 transition-all duration-1000 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Small terminal badge */}
        <div className="inline-flex items-center gap-2 bg-[#0a0a3a] border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-blue-300 font-mono tracking-wide">
            ~/glug $ open-source --activate
          </span>
        </div>

        <h1 className="font-canno text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 tracking-wide leading-[1.1] drop-shadow-[0px_4px_24px_rgba(80,140,255,0.25)] pb-4 text-left">
          Unleash Innovation <br />
          Through Open Source
        </h1>

        <br />

        <p className="tracking-tight text-sm md:text-base text-blue-200 mb-10 max-w-lg leading-relaxed text-left">
          It is a student-led community hosting tech events, workshops and
          hackathons with the support of industry sponsors.
        </p>

        <div className="font-helvetica flex flex-col sm:flex-row items-start gap-4">
          <a
            href="https://chat.whatsapp.com/C3ZPRyoG0OI5Uy5ZEs7xxL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full px-8 py-3 shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Join Us
          </a>

          <button
            onClick={scrollTosec}
            className="inline-block bg-transparent border-2 border-blue-400 text-blue-300 font-semibold rounded-full px-8 py-3 shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Explore
          </button>
        </div>
      </div>

      {/* ── Right Side: Interactive Penguin Canvas ── */}
      <div
        className={`hidden lg:block relative w-1/2 h-[90vh] transition-all duration-1000 ease-out delay-300
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
      >
        {/* Floating code snippets */}
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute font-mono text-[10px] sm:text-xs text-green-400/40 pointer-events-none select-none animate-pulse"
            style={{
              top: snippet.top,
              left: snippet.left,
              animationDelay: snippet.delay,
              animationDuration: "3s",
            }}
          >
            {snippet.code}
          </div>
        ))}

        {/* Penguin particle canvas */}
        <PenguinCanvas />

        {/* Subtle radial glow behind the penguin */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Mobile: Show a static ASCII penguin ── */}
      <div
        className={`lg:hidden absolute bottom-4 right-4 font-mono text-[6px] leading-[8px] text-green-400/20 pointer-events-none select-none whitespace-pre transition-all duration-1000 ease-out delay-500
          ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {PENGUIN_ART.join("\n")}
      </div>
    </section>
  );
};

export default Hero;
