import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: 'Fokus Berry Elixir',
    desc: 'A luxurious blend of wild berries, crafted for those who demand the extraordinary. Experience the taste of pure focus.',
    img: '/images/berry.jpg',
    cta: 'Shop Berry',
  },
  {
    title: 'Citrus Gold',
    desc: 'A zesty, golden citrus infusion that awakens your senses and elevates your day. For the bold and the refined.',
    img: '/images/orange.jpg',
    cta: 'Shop Citrus',
  },
  {
    title: 'Tropical Prestige',
    desc: 'Escape to paradise with our tropical blend. Sweet, exotic, and crafted for the discerning palate.',
    img: '/images/tripical.jpg',
    cta: 'Shop Tropical',
  },
  {
    title: 'Mint Royale',
    desc: 'A crisp, cool mint experience with a hint of luxury. Refreshment redefined for the modern connoisseur.',
    img: '/images/mint.jpg',
    cta: 'Shop Mint',
  },
  {
    title: 'Coconut Velvet',
    desc: 'Smooth coconut water with a velvet finish. Indulge in the ultimate hydration experience.',
    img: '/images/coconut.jpg',
    cta: 'Shop Coconut',
  },
];

const ProductShowcaseSection = () => {
  const sectionRef = useRef();
  const trackRef = useRef();
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    // Horizontal scroll animation (desktop only)
    let st;
    if (window.innerWidth >= 768) {
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${trackRef.current.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          gsap.to(trackRef.current, {
            x: -self.progress * (trackRef.current.scrollWidth - window.innerWidth),
            duration: 0.1,
            ease: 'none',
          });
        },
      });
    }
    // Parallax and fade-in for each card
    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      // Parallax image movement
      gsap.to(imgRefs.current[i], {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 100%',
          end: 'bottom 0%',
          scrub: true,
        },
      });
    });
    return () => {
      if (st) st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Cursor magnetic effect
  useEffect(() => {
    const handleMagnet = (e, el) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.2, y: y * 0.2, scale: 1.04, duration: 0.3, ease: 'power2.out' });
    };
    const handleReset = (el) => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1,0.4)' });
    };
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.addEventListener('mousemove', (e) => handleMagnet(e, el));
      el.addEventListener('mouseleave', () => handleReset(el));
    });
    return () => {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        el.removeEventListener('mousemove', (e) => handleMagnet(e, el));
        el.removeEventListener('mouseleave', () => handleReset(el));
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[80vh] py-32 bg-[#0a0a13] overflow-x-hidden text-white select-none">
      <h2 className="text-center text-5xl md:text-7xl font-bold mb-24 bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent animate-gradient-move tracking-tight drop-shadow-2xl">
        The Fokus Collection
      </h2>
      <div
        ref={trackRef}
        className="flex flex-nowrap gap-8 md:gap-16 px-4 md:px-32 w-max mx-auto relative overflow-x-auto snap-x snap-mandatory"
        style={{ willChange: 'transform' }}
      >
        {products.map((product, i) => (
          <div
            key={i}
            ref={el => (cardRefs.current[i] = el)}
            className="group relative flex-shrink-0 min-w-[80vw] sm:min-w-[320px] md:min-w-[420px] h-[420px] md:h-[540px] rounded-3xl bg-white/10 backdrop-blur-2xl border-2 border-fuchsia-400/30 shadow-2xl overflow-hidden flex flex-col items-center justify-end p-6 md:p-8 transition-transform duration-500 cursor-pointer snap-center"
            style={{ boxShadow: '0 0 48px 8px rgba(255,0,255,0.10), 0 0 24px 4px rgba(0,255,255,0.10)' }}
          >
            <div className="absolute top-0 left-0 w-full h-2/3 z-0 pointer-events-none">
              <img
                ref={el => (imgRefs.current[i] = el)}
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-700 ease-out drop-shadow-2xl"
                style={{ filter: 'brightness(1.15) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a13]/80 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end h-full w-full pt-24 md:pt-32">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg text-center">
                {product.title}
              </h3>
              <p className="text-white/90 text-base md:text-lg mb-8 text-center font-medium max-w-xs">
                {product.desc}
              </p>
              <button className="relative px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-400 text-black font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl border-none outline-none focus:outline-none cursor-pointer overflow-hidden">
                <span className="relative z-10">{product.cta}</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Cinematic blurred blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-fuchsia-500 opacity-20 blur-[120px] rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-300 opacity-20 blur-[120px] rounded-full animate-pulse -z-10" />
    </section>
  );
};

export default ProductShowcaseSection; 