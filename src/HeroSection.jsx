import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !textRef.current) return;
    // Video zoom
    gsap.to(videoRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      ease: 'none',
    });
    // Text fade out, move up, and letter spacing
    gsap.to(textRef.current, {
      opacity: 0,
      y: -100,
      letterSpacing: '1.5vw',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      ease: 'none',
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none">
        {/* Video absolutely positioned */}
        <video
          ref={videoRef}
          src="/focus-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{}}
        />
        {/* Text with video background using blend mode */}
        <h1
          ref={textRef}
          className="text-[20vw] font-extrabold uppercase leading-none text-center z-10 pointer-events-none text-transparent bg-clip-text"
          style={{
            backgroundImage: 'url(/focus-video.mp4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            mixBlendMode: 'difference',
            color: 'white',
            position: 'relative',
            letterSpacing: '0.2vw',
            transition: 'letter-spacing 0.2s',
          }}
        >
          FOKUS
        </h1>
      </div>
    </section>
  );
};

export default HeroSection; 