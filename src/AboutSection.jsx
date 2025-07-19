import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const baseFloatingImages = [
  'https://fokus.shop/cdn/shop/files/Frame_1.png?v=1736231978',
  'https://fokus.shop/cdn/shop/files/Frame_3_1.png?v=1736231978',
  'https://fokus.shop/cdn/shop/files/Frame_2_2.png?v=1737091469',
];

const floatingImages = Array.from({ length: 8 }, (_, i) => ({
  src: baseFloatingImages[i % 3],
  style: { width: `${90 + Math.random() * 60}px` },
}));

const imageData = [
  {
    src: 'https://fokus.shop/cdn/shop/files/N02.jpg?v=1736341080&width=832',
    alt: 'Fokus Product 1',
  },
  {
    src: 'https://fokus.shop/cdn/shop/files/5.jpg?v=1736324313&width=832',
    alt: 'Fokus Product 2',
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const floatingRefs = useRef([]);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  // GSAP floating images: animate to random positions within section (responsive to resize)
  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    let bounds = section.getBoundingClientRect();

    // Update bounds on resize
    const updateBounds = () => {
      bounds = section.getBoundingClientRect();
    };
    window.addEventListener('resize', updateBounds);

    floatingRefs.current.forEach((img, i) => {
      if (!img) return;
      // Only the first image will be controlled by the cursor
      if (i === 0) return;
      const animateFloat = () => {
        const maxX = Math.max(0, bounds.width - img.offsetWidth);
        const maxY = Math.max(0, bounds.height - img.offsetHeight);
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        gsap.to(img, {
          x,
          y,
          duration: 4 + Math.random() * 2,
          ease: 'sine.inOut',
          onComplete: animateFloat,
        });
      };
      // Start at a random position
      gsap.set(img, {
        x: Math.random() * Math.max(0, bounds.width - img.offsetWidth),
        y: Math.random() * Math.max(0, bounds.height - img.offsetHeight),
        opacity: 0.85,
        filter: 'drop-shadow(0 0 24px #23272f) drop-shadow(0 0 8px #1e293b)',
      });
      animateFloat();
    });
    return () => {
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  // Magnetic follow effect for only the first floating image
  useEffect(() => {
    if (!sectionRef.current || !floatingRefs.current[0]) return;
    const section = sectionRef.current;
    const img = floatingRefs.current[0];
    let following = false;

    const moveImageToCursor = (e) => {
      following = true;
      const bounds = section.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      gsap.to(img, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power1.out',
      });
    };

    const handleMouseLeave = () => {
      following = false;
      const bounds = section.getBoundingClientRect();
      const animateFloat = () => {
        if (following) return;
        const maxX = Math.max(0, bounds.width - img.offsetWidth);
        const maxY = Math.max(0, bounds.height - img.offsetHeight);
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        gsap.to(img, {
          x,
          y,
          duration: 8 + Math.random() * 6,
          ease: 'sine.inOut',
          onComplete: animateFloat,
        });
      };
      animateFloat();
    };

    section.addEventListener('mousemove', moveImageToCursor);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', moveImageToCursor);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 2D rotation animation for the two main images (flat spin, slow)
  useEffect(() => {
    if (!leftImageRef.current || !rightImageRef.current) return;
    const leftImg = leftImageRef.current;
    const rightImg = rightImageRef.current;
    let leftTween, rightTween;

    const startRotation = () => {
      leftTween = gsap.to(leftImg, {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: 'linear',
        modifiers: {
          rotate: v => `${parseFloat(v) % 360}deg`,
        },
      });
      rightTween = gsap.to(rightImg, {
        rotate: -360,
        duration: 18,
        repeat: -1,
        ease: 'linear',
        modifiers: {
          rotate: v => `${parseFloat(v) % 360}deg`,
        },
      });
    };
    startRotation();

    const pauseLeft = () => leftTween && leftTween.pause();
    const resumeLeft = () => leftTween && leftTween.resume();
    const pauseRight = () => rightTween && rightTween.pause();
    const resumeRight = () => rightTween && rightTween.resume();

    leftImg.addEventListener('mouseenter', pauseLeft);
    leftImg.addEventListener('mouseleave', resumeLeft);
    rightImg.addEventListener('mouseenter', pauseRight);
    rightImg.addEventListener('mouseleave', resumeRight);

    return () => {
      leftImg.removeEventListener('mouseenter', pauseLeft);
      leftImg.removeEventListener('mouseleave', resumeLeft);
      rightImg.removeEventListener('mouseenter', pauseRight);
      rightImg.removeEventListener('mouseleave', resumeRight);
      leftTween && leftTween.kill();
      rightTween && rightTween.kill();
    };
  }, []);

  // Animate heading and paragraph on mount and loop
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        }
      );
      // Shimmer/gradient animation on heading
      gsap.to(headingRef.current, {
        backgroundPosition: '200% center',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
    if (paraRef.current) {
      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.3, ease: 'power3.out' }
      );
      // No color animation, keep static color
    }
  }, []);

  // Cool hover effect for heading and paragraph
  const handleTextMouseEnter = (ref, type) => {
    if (!ref.current) return;
    if (type === 'heading') {
      gsap.to(ref.current, {
        scale: 1.13,
        filter: 'drop-shadow(0 4px 32px #23272f) brightness(1.1)',
        backgroundPosition: '400% center',
        duration: 0.35,
        ease: 'expo.out',
      });
      // Add shake animation
      gsap.fromTo(ref.current, { x: -6 }, { x: 6, duration: 0.08, yoyo: true, repeat: 7, ease: 'power1.inOut', onComplete: () => {
        gsap.to(ref.current, { x: 0, duration: 0.1, ease: 'expo.out' });
      }});
    } else {
      gsap.to(ref.current, {
        scale: 1.08,
        filter: 'drop-shadow(0 2px 16px #23272f)',
        color: '#23272f',
        duration: 0.32,
        ease: 'expo.out',
      });
    }
  };

  const handleTextMouseLeave = (ref, type) => {
    if (!ref.current) return;
    if (type === 'heading') {
      gsap.to(ref.current, {
        scale: 1,
        filter: 'none',
        backgroundPosition: '200% center',
        duration: 0.4,
        x: 0, // reset shake
        ease: 'expo.out',
      });
    } else {
      gsap.to(ref.current, {
        scale: 1,
        filter: 'none',
        color: '#e0e7ef',
        duration: 0.38,
        ease: 'expo.out',
      });
    }
  };

  // Clickable animation for heading and paragraph
  const handleTextClick = ref => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { scale: 1, color: '#23272f' },
        {
          scale: 1.12,
          color: '#18181b',
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(ref.current, { scale: 1, color: '#23272f', duration: 0.18 });
          },
        }
      );
    }
  };

  // Particle effect state
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sectionRef.current) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let bounds = sectionRef.current.getBoundingClientRect();

    // Resize canvas to section
    const resizeCanvas = () => {
      bounds = sectionRef.current.getBoundingClientRect();
      canvas.width = bounds.width;
      canvas.height = bounds.height;
      canvas.style.width = bounds.width + 'px';
      canvas.style.height = bounds.height + 'px';
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 3 + Math.random() * 2;
      this.color = '#00fff7';
      this.alpha = 1;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
    }
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.018;
    };
    Particle.prototype.draw = function (ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0.05);
      for (let p of particles) {
        p.update();
        p.draw(ctx);
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(x, y));
      }
    };
    sectionRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#03162A',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
        }}
      />
      {/* Multiple Floating Images (only the first follows the cursor) */}
      {floatingImages.map((img, i) => (
        <img
          key={i}
          ref={el => (floatingRefs.current[i] = el)}
          src={img.src}
          alt="floating decoration"
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            maxWidth: 50,
            maxHeight: 50,
            pointerEvents: 'none',
            zIndex: 2,
            borderRadius: 18,
            boxShadow: '0 2px 16px #38bdf8',
            border: '2px solid #38bdf8',
            objectFit: 'cover',
            transition: 'box-shadow 0.3s',
          }}
        />
      ))}

      {/* Main Content: left image, center text, right image */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 48,
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Left Image */}
        <img
          ref={leftImageRef}
          src={imageData[0].src}
          alt={imageData[0].alt}
          style={{ width: 260, height: 260, borderRadius: '1.5rem', objectFit: 'cover', boxShadow: '0 8px 32px #38bdf855', border: '3px solid #38bdf8', background: '#0a2540', transition: 'transform 0.4s' }}
        />
        {/* Center Text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
          <h2
            ref={headingRef}
            onClick={() => handleTextClick(headingRef)}
            onMouseEnter={() => handleTextMouseEnter(headingRef, 'heading')}
            onMouseLeave={() => handleTextMouseLeave(headingRef, 'heading')}
            style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: '3.5rem',
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              lineHeight: 1.1,
            }}
          >
            WHO IS <span style={{ color: '#38bdf8' }}>FOKUS</span>?
          </h2>
          <p
            ref={paraRef}
            onClick={() => handleTextClick(paraRef)}
            onMouseEnter={() => handleTextMouseEnter(paraRef, 'para')}
            onMouseLeave={() => handleTextMouseLeave(paraRef, 'para')}
            style={{
              color: '#fff',
              fontSize: '1.7rem',
              maxWidth: 700,
              textAlign: 'center',
              marginBottom: '2.5rem',
              cursor: 'pointer',
              userSelect: 'none',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              transition: 'color 0.5s',
            }}
          >
            Fokus is a stylish hydration brand co-founded by YouTubers <span style={{ color: '#38bdf8', fontWeight: 700 }}>Abhishek Malhan</span> and <span style={{ color: '#38bdf8', fontWeight: 700 }}>Nischay Malhan</span>.<br />
            Crafted with coconut water, vitamins, and zero sugar for the <span style={{ color: '#38bdf8', fontWeight: 700 }}>#GetFokus</span> lifestyle.
          </p>
        </div>
        {/* Right Image */}
        <img
          ref={rightImageRef}
          src={imageData[1].src}
          alt={imageData[1].alt}
          style={{ width: 260, height: 260, borderRadius: '1.5rem', objectFit: 'cover', boxShadow: '0 8px 32px #38bdf855', border: '3px solid #38bdf8', background: '#0a2540', transition: 'transform 0.4s' }}
        />
      </div>
    </section>
  );
};

export default AboutSection;