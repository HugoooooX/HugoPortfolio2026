import React, { useEffect, useRef, useState } from 'react';

type Particle = { x: number; y: number; id: number };
type ClickBurst = { x: number; y: number; id: number };

const PixelCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailParticlesRef = useRef<Particle[]>([]);
  const [trailParticles, setTrailParticles] = useState<Particle[]>([]);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let particleId = 0;
    let lastParticleTs = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
      setIsVisible(true);

      // Add trail particle
      const now = performance.now();
      if (now - lastParticleTs > 22) {
        lastParticleTs = now;
        particleId++;
        const newParticle = { x: e.clientX, y: e.clientY, id: particleId };
        trailParticlesRef.current = [...trailParticlesRef.current.slice(-6), newParticle];
        setTrailParticles([...trailParticlesRef.current]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const burstId = Date.now() + Math.random();
      const burst = { x: e.clientX, y: e.clientY, id: burstId };
      setClickBursts((prev) => [...prev, burst]);
      window.setTimeout(() => {
        setClickBursts((prev) => prev.filter((item) => item.id !== burstId));
      }, 420);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      setIsHovering(!!isHoverable);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Trail Particles */}
      {trailParticles.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: particle.x - 3,
            top: particle.y - 3,
            width: 6,
            height: 6,
            backgroundColor: '#ffda2c',
            border: '1px solid #0A0A0A',
            opacity: ((index + 1) / trailParticles.length) * 0.45,
            transform: `scale(${(index + 1) / trailParticles.length})`,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}

      {/* Click Pixel Burst */}
      {clickBursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none z-[10000]"
          style={{ left: burst.x, top: burst.y }}
        >
          {[[-16, -8], [-12, 10], [-8, -16], [-3, 14], [6, -14], [10, 12], [15, -6], [18, 8], [-18, 2], [2, -20]].map(
            ([dx, dy], idx) => (
              <div
                key={`${burst.id}-${idx}`}
                className="absolute w-[6px] h-[6px] bg-[#ffda2c] border border-[#0A0A0A]"
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate(-50%, -50%)`,
                  animation: `pixelBurst 0.42s steps(3, end) forwards`,
                  ['--dx' as string]: `${dx}px`,
                  ['--dy' as string]: `${dy}px`,
                }}
              />
            )
          )}
        </div>
      ))}

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: 32,
          height: 32,
          willChange: 'transform',
        }}
      >
        {/* Pixel cursor inspired by Sweezy pinky pixel style, recolored to yellow/black */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className={isHovering ? 'scale-110' : 'scale-100'}
        >
          <path
            d="M2 2l18 9-7 2 7 8-3 2-7-8-2 7z"
            fill={isHovering ? '#ffe24d' : '#ffda2c'}
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinejoin="bevel"
          />
          {isHovering && <rect x="17" y="1" width="3" height="3" fill="#0A0A0A" />}
        </svg>
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes pixelBurst {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default PixelCursor;
