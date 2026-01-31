import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Years' },
  { value: 200, suffix: '+', label: 'Repeat Clients' },
  { value: 1000, suffix: '+', label: 'Wow Experiences' },
  { value: 50, suffix: '+', label: 'Professional Folks' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * easeOut));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(sublineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: sublineRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(statItems,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div ref={headlineRef} className="text-center mb-6">
          <h2 className="text-heading font-bold text-white uppercase tracking-tight">
            How we do anything is
          </h2>
          <h2 className="text-heading font-bold text-white uppercase tracking-tight">
            How we do everything
          </h2>
        </div>

        <p
          ref={sublineRef}
          className="text-center text-white/60 text-lg md:text-xl mb-16"
        >
          With purpose, passion and creativity
        </p>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
