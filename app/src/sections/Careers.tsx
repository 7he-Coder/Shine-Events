import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.career-element');
        gsap.fromTo(elements,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="careers"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-4xl">
          <p className="career-element text-white/70 text-lg md:text-xl leading-relaxed mb-6">
            At Shine Events, it's more than just a job; it's our life's passion. 
            We're a diverse crew of creative thinkers, designers, planners, organizers 
            and innovators – and we're constantly inspired by what we do!
          </p>

          <p className="career-element text-white/70 text-lg md:text-xl leading-relaxed mb-8">
            Every day is a fresh adventure, every project a unique canvas.
          </p>

          <p className="career-element text-white text-xl md:text-2xl font-semibold mb-10">
            If you love turning creative sparks into exceptional experiences, drop us a line.
            Let's create something extraordinary together!
          </p>

          <div className="career-element flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2">
              Join Us!
              <ArrowRight size={18} />
            </button>
            <button className="btn-outline flex items-center gap-2">
              Show Openings
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
