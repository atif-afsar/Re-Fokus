import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const products = [
  {
    title: 'Fokus Berry Elixir',
    desc: 'A luxurious blend of wild berries, crafted for those who demand the extraordinary. Experience the taste of pure focus.',
    img: '/images/berry.jpg',
    cta: 'Shop Berry',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    title: 'Citrus Gold',
    desc: 'A zesty, golden citrus infusion that awakens your senses and elevates your day. For the bold and the refined.',
    img: '/images/orange.jpg',
    cta: 'Shop Citrus',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    title: 'Tropical Prestige',
    desc: 'Escape to paradise with our tropical blend. Sweet, exotic, and crafted for the discerning palate.',
    img: '/images/tripical.jpg',
    cta: 'Shop Tropical',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    title: 'Mint Royale',
    desc: 'A crisp, cool mint experience with a hint of luxury. Refreshment redefined for the modern connoisseur.',
    img: '/images/mint.jpg',
    cta: 'Shop Mint',
    gradient: 'from-emerald-500 to-cyan-500'
  },
  {
    title: 'Coconut Velvet',
    desc: 'Smooth coconut water with a velvet finish. Indulge in the ultimate hydration experience.',
    img: '/images/coconut.jpg',
    cta: 'Shop Coconut',
    gradient: 'from-blue-500 to-indigo-600'
  },
];

const ProductShowcaseSection = () => {
  const sectionRef = useRef();
  const trackRef = useRef();

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // setIsVisible(entry.isIntersecting); // Removed React state
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Infinite marquee effect (GSAP, no React state)
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    // Wait for images to load for accurate width
    const onImagesLoaded = () => {
      const cards = Array.from(track.children);
      const totalWidth = cards.slice(0, products.length).reduce((acc, card) => acc + card.offsetWidth + 32, 0); // 32px gap
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -totalWidth,
        duration: 18,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(v => parseFloat(v) % -totalWidth),
        },
      });
    };
    const imgs = track.querySelectorAll('img');
    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete) loaded++;
      else img.onload = () => { loaded++; if (loaded === imgs.length) onImagesLoaded(); };
    });
    if (loaded === imgs.length) onImagesLoaded();
    return () => {
      gsap.killTweensOf(track);
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (trackRef.current) {
      // trackRef.current.style.animationPlayState = 'paused'; // Removed GSAP animation
    }
  };

  const handleMouseLeave = () => {
    if (trackRef.current) {
      // trackRef.current.style.animationPlayState = 'running'; // Removed GSAP animation
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden text-white"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Animated heading */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="relative text-6xl md:text-8xl font-black tracking-tight">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            The
          </span>
          {' '}
          <span className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse delay-300">
            Fokus
          </span>
          {' '}
          <span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse delay-700">
            Collection
          </span>
        </h2>

        {/* Animated underline */}
        <div className="flex justify-center mt-6">
          <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-pulse">
            <div className="h-full w-48 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Product carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 will-change-transform"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ width: `${(420 + 32) * products.length * 2}px` }}
          >
            {/* Double the products for seamless loop */}
            {[...products, ...products].map((product, i) => (
              <div
                key={i}
                className="group relative flex-shrink-0 w-[420px] h-[560px] rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/40 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                }}
              >
                {/* Image container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                  {/* Floating gradient orb */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${product.gradient} rounded-full blur-sm opacity-80 group-hover:scale-125 transition-transform duration-500`}></div>
                </div>

                {/* Content */}
                <div className="relative p-8 h-[296px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                      {product.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 group-hover:text-slate-200 transition-colors duration-300">
                      {product.desc}
                    </p>
                  </div>

                  {/* Animated button */}
                  <button className="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg transition-all duration-300 group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/25 group-hover:-translate-y-1 active:translate-y-0">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {product.cta}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>

                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
                  </button>

                  {/* Card accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${product.gradient} transition-all duration-500 w-0 group-hover:w-full`}></div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-indigo-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays for seamless edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
    </section>
  );
};

export default ProductShowcaseSection;