import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line');
        tl.fromTo(lines,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
          '-=0.8'
        );
      }

      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(aboutRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, descRef.current, ctaRef.current, aboutRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([descRef.current, ctaRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -30, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(aboutRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 30, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.1, y: '-10%', ease: 'none' },
        0.70
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-black"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img
          src="/hero_bg.jpg"
          alt="Corporate event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-[10] h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          <div ref={headlineRef} className="mb-8">
            <div className="headline-line text-display font-black text-white uppercase tracking-tight">
              WE CREATE
            </div>
            <div className="headline-line text-display font-black text-white uppercase tracking-tight">
              ELEVATED
            </div>
            <div className="headline-line text-display font-black text-white uppercase tracking-tight">
              BRAND EXPERIENCES
            </div>
          </div>

          <p
            ref={descRef}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            At Shine Events, ideas turn to reality with a blend of creativity, a thirst for excellence, 
            and razor sharp execution. With us, it is as much about the little things as it is about the big picture.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => scrollToSection('services')}
              className="btn-primary flex items-center gap-2"
            >
              Explore Services
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline"
            >
              Know More
            </button>
          </div>
        </div>

        <div
          ref={aboutRef}
          className="absolute bottom-12 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Shine Events was founded with a combined experience of 15+ years in the field. 
              The founding team noticed a clear gap for a professional and reliable innovation-driven event management company.
            </p>
            <button
              onClick={() => scrollToSection('stats')}
              className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              Know More
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
