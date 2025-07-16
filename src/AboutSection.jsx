import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const aboutText = [
  'Fokus is a stylish hydration brand co-founded by YouTubers Abhishek Malhan (Fukra Insaan) and Nischay Malhan (Triggered Insaan).',
  'Crafted with coconut water, added vitamins like D3, ginkgo biloba, and zero sugar —',
  'Fokus Fuel your day the #GetFokus lifestyle.'
];

const imageData = [
  {
    src: 'https://fokus.shop/cdn/shop/files/N02.jpg?v=1736341080&width=832',
    alt: 'Fokus Product 1',
    direction: 'left',
    rotate: -8,
  },
  {
    src: 'https://fokus.shop/cdn/shop/files/4_9fd7d940-dccc-405c-9514-33e23831ce6e.jpg?v=1736324277&width=832',
    alt: 'Fokus Product 2',
    direction: 'bottom',
    rotate: 8,
  },
  {
    src: 'https://fokus.shop/cdn/shop/files/5.jpg?v=1736324313&width=832',
    alt: 'Fokus Product 3',
    direction: 'right',
    rotate: -8,
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const imageRefs = useRef([]);
  const bgGlowRef = useRef(null);

  useEffect(() => {
    let splitHeading, splitPara;
    // Section fade-in with blur and y
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, filter: 'blur(10px)', y: 50 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
    // Split heading into letters and animate
    splitHeading = new SplitType(headingRef.current, { types: 'chars' });
    // Apply gradient and bg-clip-text to heading chars
    splitHeading.chars.forEach(char => {
      char.style.backgroundImage = 'linear-gradient(90deg, #fff, #e5e7eb, #fff, #f3f4f6)';
      char.style.backgroundSize = '200% 100%';
      char.style.backgroundPosition = '0% center';
      char.style.WebkitBackgroundClip = 'text';
      char.style.backgroundClip = 'text';
      char.style.WebkitTextFillColor = 'transparent';
      char.style.color = 'transparent';
      char.style.display = 'inline-block';
    });
    gsap.fromTo(
      headingRef.current.querySelectorAll('.char'),
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    );
    // Split paragraph into words and animate
    splitPara = new SplitType(paraRef.current, { types: 'words' });
    gsap.fromTo(
      paraRef.current.querySelectorAll('.word'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    );
    // Animate images: slide in from different directions, rotate, stagger
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      let from = { opacity: 0, scale: 0.85, rotate: imageData[i].rotate };
      if (imageData[i].direction === 'left') from.x = -60;
      if (imageData[i].direction === 'right') from.x = 60;
      if (imageData[i].direction === 'bottom') from.y = 60;
      gsap.fromTo(
        img,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          delay: 0.2 + i * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          onComplete: () => {
            // Floating animation (yoyo)
            gsap.to(img, {
              y: '+=12',
              duration: 2.5 + i,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        }
      );
      // Shine effect on hover
      img.addEventListener('mouseenter', () => {
        gsap.fromTo(
          img,
          { WebkitMaskImage: 'linear-gradient(120deg, transparent 40%, white 50%, transparent 60%)', WebkitMaskSize: '200% 100%', WebkitMaskPosition: '150% 0%' },
          {
            WebkitMaskPosition: '-50% 0%',
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              img.style.WebkitMaskImage = '';
              img.style.WebkitMaskPosition = '';
              img.style.WebkitMaskSize = '';
            },
          }
        );
      });
    });
    // Animate the blurred radial background
    if (bgGlowRef.current) {
      gsap.to(bgGlowRef.current, {
        scale: 1.1,
        filter: 'blur(60px)',
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      });
    }
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      splitHeading && splitHeading.revert();
      splitPara && splitPara.revert();
      imageRefs.current.forEach(img => {
        if (!img) return;
        img.onmouseenter = null;
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 gap-10 md:gap-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
      {/* Animated blurred radial gradient background */}
      <div
        ref={bgGlowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gradient-radial from-fuchsia-400 via-blue-400 to-yellow-300 opacity-30 rounded-full blur-3xl z-0 pointer-events-none animate-pulse"
      />
      {/* Left: Text */}
      <div className="flex-1 flex flex-col justify-center items-start max-w-xl z-10">
        <h2
          ref={headingRef}
          className="font-[Sora,sans-serif] text-3xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent tracking-tight drop-shadow-2xl animate-gradient-move"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #fff, #e5e7eb, #fff, #f3f4f6)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% center',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          WHO IS FOKUS?
        </h2>
        <p
          ref={paraRef}
          className="font-[Poppins,sans-serif] text-lg md:text-xl leading-relaxed font-semibold text-white/90 drop-shadow-md"
        >
          {aboutText.join(' ')}
        </p>
      </div>
      {/* Right: Images */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md z-10 gap-6">
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full mt-2">
          {imageData.map((img, i) => (
            <div key={i} className="relative group">
              <img
                ref={el => (imageRefs.current[i] = el)}
                src={img.src}
                alt={img.alt}
                className="w-40 h-40 md:w-56 md:h-56 rounded-lg object-cover border-2 border-gray-200 shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:border-blue-400 cursor-pointer"
                style={{ willChange: 'transform, opacity' }}
              />
              {/* Optional: Shine overlay for fallback */}
              <span className="pointer-events-none absolute inset-0 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 