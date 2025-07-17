import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Alex Johnson',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Re-Fokus has completely changed my daily routine. The flavors are amazing and keep me energized!',
  },
  {
    name: 'Maria Chen',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'I love the glassy look of the bottles and the taste is just as refreshing. Highly recommended!',
  },
  {
    name: 'Samir Patel',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    quote: 'Perfect for my workouts and study sessions. The neon glow is so cool!',
  },
  {
    name: 'Emily Rivera',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Finally, a drink that looks as good as it tastes. The testimonials are true!',
  },
];

const TestimonialsSection = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef();

  // useEffect(() => {
  //   gsap.from(cardsRef.current, {
  //     opacity: 0,
  //     y: 60,
  //     stagger: 0.2,
  //     duration: 1.2,
  //     ease: 'power3.out',
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: 'top 80%',
  //     },
  //   });
  // }, []);

  return (
    <section className="relative w-full py-24 bg-[#10101a] overflow-hidden text-white">
      <h2 className="text-center text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-move">
        What Our Fans Say
      </h2>
      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-10 max-w-7xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={el => (cardsRef.current[i] = el)}
            className="group relative rounded-3xl p-8 flex flex-col items-center text-center backdrop-blur-xl bg-white/10 border-2 border-cyan-400/40 shadow-xl transition-transform duration-500 hover:scale-[1.04] hover:z-20"
            style={{
              boxShadow:
                '0 0 24px 4px rgba(0,255,255,0.25), 0 0 48px 8px rgba(255,0,255,0.15)',
              borderImage: 'linear-gradient(90deg, #06b6d4, #f472b6, #fde047) 1',
            }}
          >
            <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-500 pointer-events-none" style={{background: 'linear-gradient(120deg, #06b6d4 0%, #f472b6 50%, #fde047 100%)'}} />
            <img
              src={t.img}
              alt={t.name}
              className="relative z-10 w-20 h-20 rounded-full border-4 border-cyan-400/60 shadow-lg mb-4 object-cover"
            />
            <blockquote className="relative z-10 text-lg md:text-xl font-medium text-white/90 mb-4">
              “{t.quote}”
            </blockquote>
            <span className="relative z-10 text-cyan-300 font-bold text-base md:text-lg tracking-wide">
              {t.name}
            </span>
          </div>
        ))}
      </div>
      {/* Neon blurred blobs for extra glow */}
      <div className="absolute top-0 left-0 w-[220px] h-[220px] bg-cyan-400 opacity-20 blur-[100px] rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-fuchsia-500 opacity-20 blur-[100px] rounded-full animate-pulse -z-10" />
    </section>
  );
};

export default TestimonialsSection; 