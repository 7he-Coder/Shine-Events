import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
  'Netflix', 'Spotify', 'Adobe', 'Salesforce', 'Oracle',
  'IBM', 'Intel', 'Cisco', 'SAP', 'VMware',
];

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );

      if (logosRef.current) {
        const logos = logosRef.current.querySelectorAll('.client-logo');
        gsap.fromTo(logos,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: logosRef.current,
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
      id="clients"
      className="section-flowing bg-black py-20 md:py-28"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/50">
            Trusted By
          </h2>
        </div>

        <div
          ref={logosRef}
          className="grid grid-cols-3 sm:grid-cols-5 gap-8 md:gap-12"
        >
          {clients.map((client, i) => (
            <div
              key={i}
              className="client-logo flex items-center justify-center"
            >
              <span className="text-white/40 font-bold text-lg md:text-xl tracking-tight hover:text-white/70 transition-colors cursor-default">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
