import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'EXHIBITION & EXPERIENTIAL SPACES', image: '/service_exhibition.jpg', link: '#' },
  { title: 'GOVT. & INSTITUTIONAL', image: '/service_govt.jpg', link: '#' },
  { title: 'AWARDS & LAUNCHES', image: '/service_awards.jpg', link: '#' },
  { title: 'VIRTUAL', image: '/service_virtual.jpg', link: '#' },
  { title: 'CSR', image: '/service_csr.jpg', link: '#' },
  { title: 'MUSIC IP\'S', image: '/service_music.jpg', link: '#' },
  { title: 'SUMMITS & CONCLAVES', image: '/service_summit.jpg', link: '#' },
  { title: 'MEDIA/INFLUENCER ACTIVATION', image: '/service_media.jpg', link: '#' },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 80, opacity: 0 },
            {
              y: 0, opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 0.5,
              }
            }
          );
        });
      }

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div ref={headingRef} className="mb-16">
          <h2 className="text-heading font-bold text-white uppercase tracking-tight">
            Corporate Event Management
          </h2>
          <p className="text-subheading text-white/60 mt-4">
            Full-service event solutions for every occasion
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((service, i) => (
            <a
              key={i}
              href={service.link}
              className="service-card group relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              </div>

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-white font-bold text-sm md:text-base leading-tight uppercase tracking-wide">
                  {service.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={18} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            ref={ctaRef}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline inline-flex items-center gap-2"
          >
            Plan Now
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
