import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FokusEnergySection = () => {
  const sectionRef = useRef();
  const bottleRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(bottleRef.current, {
        scrollTrigger: {
          trigger: bottleRef.current,
          start: "top 80%",
        },
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const moveX = ((clientX / innerWidth) - 0.5) * 30;
    const moveY = ((clientY / innerHeight) - 0.5) * 30;
    if (bottleRef.current) {
      gsap.to(bottleRef.current, {
        rotateX: -moveY,
        rotateY: moveX,
        transformPerspective: 1000,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#031226] text-white flex flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Glowing BG blobs */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-[160px] rounded-full top-[-150px] left-[-150px] z-0" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[160px] rounded-full bottom-[-150px] right-[-150px] z-0" />

      <h2 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-20 relative z-10">
        Unlock Clean Energy With FOKUS
      </h2>

      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 max-w-7xl w-full z-10">
        {/* Left features */}
        <div className="flex flex-col gap-10">
          <Feature icon="🥥" title="Made with Coconut Water" />
          <Feature icon="🚫" title="No Added Sugar" />
        </div>

        {/* Bottle Tilt Animation */}
        <div
          ref={bottleRef}
          className="transition-transform duration-300 ease-out"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0619/0569/8889/files/focusprd__1_-removebg-preview.png?v=1738065445"
            alt="Fokus Bottles"
            className="w-[340px] md:w-[440px] drop-shadow-[0_0_50px_rgba(0,200,255,0.25)]"
          />
        </div>

        {/* Right features */}
        <div className="flex flex-col gap-10">
          <Feature icon="💪" title="Fight Off Fatigue" />
          <Feature icon="⚡" title="Increase Your Energy" />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title }) => {
  return (
    <div className="feature-item flex items-center gap-4 text-left">
      <span className="text-4xl">{icon}</span>
      <p className="text-lg md:text-xl font-semibold tracking-wide text-white/90">
        {title}
      </p>
    </div>
  );
};

export default FokusEnergySection;
