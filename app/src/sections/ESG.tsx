import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ESG() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(iconRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          scrollTrigger: {
            trigger: iconRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.esg-element');
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
      id="esg"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={iconRef}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8"
          >
            <Leaf size={40} className="text-green-400" />
          </div>

          <div ref={contentRef}>
            <h2 className="esg-element text-heading font-bold text-white uppercase tracking-tight mb-4">
              Transforming Corporate Events
            </h2>
            <h2 className="esg-element text-heading font-bold text-green-400 uppercase tracking-tight mb-8">
              To Go Net Zero
            </h2>

            <p className="esg-element text-white/70 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              As a leading corporate event planner, we're riding the global wave for climate action. 
              We've flipped the script on event management by introducing a fresh ESG approach that 
              centres on sustainability planning.
            </p>

            <p className="esg-element text-white/70 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              We guide partners in understanding, measuring, and offsetting carbon footprints. 
              We get it – climate change is real. So is our commitment! Let's create memorable 
              events that are actually good for our guests and the planet.
            </p>

            <button className="esg-element btn-outline inline-flex items-center gap-2 border-green-400/50 text-green-400 hover:bg-green-400/10">
              Greenify Your Events
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
