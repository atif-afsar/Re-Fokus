import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const flavors = [
  {
    name: 'Berry Blast',
    desc: 'A burst of mixed berries for a refreshing, tangy kick.',
    bg: 'from-fuchsia-500 to-pink-400',
    img: 'https://via.placeholder.com/120x240?text=Berry',
  },
  {
    name: 'Citrus Rush',
    desc: 'Zesty citrus blend to energize your day.',
    bg: 'from-yellow-400 to-orange-500',
    img: 'https://via.placeholder.com/120x240?text=Citrus',
  },
  {
    name: 'Tropical Vibe',
    desc: 'Exotic tropical fruits for a sweet escape.',
    bg: 'from-green-400 to-teal-400',
    img: 'https://via.placeholder.com/120x240?text=Tropical',
  },
  {
    name: 'Cool Mint',
    desc: 'A crisp, minty flavor for ultimate refreshment.',
    bg: 'from-cyan-400 to-blue-400',
    img: 'https://via.placeholder.com/120x240?text=Mint',
  },
  {
    name: 'Classic Coconut',
    desc: 'Smooth coconut water with a hint of vanilla.',
    bg: 'from-gray-200 to-gray-400',
    img: 'https://via.placeholder.com/120x240?text=Coconut',
  },
];

const FlavorsSection = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
    // Animate the glowing background
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.1,
        filter: 'blur(60px)',
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-x-clip">
      {/* Glowing blurred background */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vw] max-w-5xl bg-gradient-radial from-fuchsia-400 via-blue-400 to-cyan-300 opacity-30 rounded-full blur-3xl z-0 pointer-events-none animate-pulse"
      />
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg font-[Sora,sans-serif]">Our Flavors</h2>
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl flex overflow-x-auto md:grid md:grid-cols-3 gap-8 snap-x snap-mandatory px-4 md:px-0 z-10"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {flavors.map((flavor, i) => (
          <div
            key={flavor.name}
            ref={el => (cardsRef.current[i] = el)}
            className={`snap-center shrink-0 md:shrink bg-gradient-to-br ${flavor.bg} rounded-3xl p-6 flex flex-col items-center justify-between min-w-[260px] max-w-xs h-[420px] shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:-rotate-x-6 cursor-pointer group`}
            style={{ perspective: 1000 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <img
                src={flavor.img}
                alt={flavor.name}
                className="w-24 h-48 object-contain drop-shadow-xl transition-transform duration-300 group-hover:-rotate-3"
                draggable="false"
              />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white font-[Sora,sans-serif] drop-shadow-sm text-center">{flavor.name}</h3>
            <p className="mt-2 text-white/90 text-center font-[Poppins,sans-serif]">{flavor.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlavorsSection; 