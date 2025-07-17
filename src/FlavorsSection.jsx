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
    bg: 'from-pink-500 to-purple-600',
    img: '/images/berry.jpg',
  },
  {
    name: 'Citrus Rush',
    desc: 'Zesty citrus blend to energize your day.',
    bg: 'from-yellow-400 to-orange-500',
    img: '/images/orange.jpg',
  },
  {
    name: 'Tropical Vibe',
    desc: 'Exotic tropical fruits for a sweet escape.',
    bg: 'from-green-400 to-teal-400',
    img: '/images/tripical.jpg',
  },
  {
    name: 'Cool Mint',
    desc: 'A crisp, minty flavor for ultimate refreshment.',
    bg: 'from-cyan-400 to-blue-500',
    img: '/images/mint.jpg',
  },
  {
    name: 'Classic Coconut',
    desc: 'Smooth coconut water with a hint of vanilla.',
    bg: 'from-gray-100 to-gray-400',
    img: '/images/coconut.jpg',
  },
];

const FlavorsSection = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#0f0f0f] text-white overflow-hidden">
      {/* Glowing blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-[300px] h-[300px] bg-cyan-400 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      {/* Heading */}
      <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-move">
        Our Flavors
      </h2>

      {/* Flavor cards */}
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 z-10"
      >
        {flavors.map((flavor, i) => (
          <div
            key={flavor.name}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`bg-gradient-to-br ${flavor.bg} p-6 rounded-3xl shadow-2xl transform transition duration-300 hover:scale-105 hover:-rotate-2 backdrop-blur-md bg-opacity-80`}
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={flavor.img}
                alt={flavor.name}
                className="w-28 h-48 object-contain mb-4 drop-shadow-xl transition duration-300 hover:scale-110"
              />
              <h3 className="text-xl font-bold font-[Sora,sans-serif] drop-shadow-lg">
                {flavor.name}
              </h3>
              <p className="mt-2 text-sm font-[Poppins,sans-serif] text-white/90">
                {flavor.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlavorsSection;
