import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  {
    img: '/images/berry.jpg',
    title: 'Berry Energy with @alexfit',
  },
  {
    img: '/images/orange.jpg',
    title: 'Citrus Glow by @mariaactive',
  },
  {
    img: '/images/tripical.jpg',
    title: 'Tropical Escape ft. @samirtravels',
  },
  {
    img: '/images/mint.jpg',
    title: 'Mint Refresh by @emilywellness',
  },
  {
    img: '/images/coconut.jpg',
    title: 'Coconut Calm with @cocochic',
  },
];

const LifestyleGallerySection = () => {
  const sectionRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      // Fade-in and parallax
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      // Parallax floating effect
      gsap.to(card, {
        y: '+=24',
        repeat: -1,
        yoyo: true,
        duration: 3 + i,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-[#10101a] overflow-x-hidden text-white select-none">
      <h2 className="text-center text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-move tracking-tight drop-shadow-2xl">
        Lifestyle & Influence
      </h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-14 px-4 md:px-16 max-w-7xl mx-auto">
        {gallery.map((item, i) => (
          <div
            key={i}
            ref={el => (cardRefs.current[i] = el)}
            className="relative group rounded-3xl overflow-hidden shadow-xl min-w-[260px] max-w-xs md:max-w-sm aspect-[3/4] bg-white/5 backdrop-blur-xl border border-white/10 transition-transform duration-500 hover:scale-105 cursor-pointer"
            style={{ boxShadow: '0 0 32px 4px rgba(255,255,255,0.08)' }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ filter: 'brightness(1.08) contrast(1.08)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-base md:text-lg font-semibold tracking-wide shadow-lg border border-white/20">
              {item.title}
            </span>
          </div>
        ))}
      </div>
      {/* Minimal floating blurred blobs */}
      <div className="absolute top-0 left-0 w-[180px] h-[180px] bg-cyan-400 opacity-10 blur-[80px] rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-fuchsia-500 opacity-10 blur-[80px] rounded-full animate-pulse -z-10" />
    </section>
  );
};

export default LifestyleGallerySection; 