import React, { useEffect, useRef } from 'react';

const InteractiveBackground = ({ densityMultiplier = 1, opacityMultiplier = 1, className = "z-0", color = "138, 230, 255" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let dots = [];
    const initDots = () => {
      dots = [];
      const numDots = Math.floor(((width * height) / 10000) * densityMultiplier);
      for (let i = 0; i < numDots; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        dots.push({
          ox: x,
          oy: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };
    handleResize();

    let mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        const dx = mouse.x - dot.ox;
        const dy = mouse.y - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = dot.ox;
        let targetY = dot.oy;
        let radius = 1;
        let opacity = 0.15 * opacityMultiplier;

        if (dist < 150) {
          const force = (150 - dist) / 150;
          
          const pushDist = force * 15;
          if (dist > 0) {
            targetX -= (dx / dist) * pushDist;
            targetY -= (dy / dist) * pushDist;
          }
          
          radius = 1 + force * 2;
          opacity = (0.15 + force * 0.6) * opacityMultiplier;
        }

        dot.vx += (targetX - dot.x) * 0.05;
        dot.vy += (targetY - dot.y) * 0.05;
        dot.vx *= 0.85;
        dot.vy *= 0.85;
        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [densityMultiplier, opacityMultiplier, color]);

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none hidden md:block ${className}`} />;
};

export default InteractiveBackground;
