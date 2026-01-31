import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Grid3X3, Rows3 } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  image: string;
  description: string;
}

const services: Service[] = [
  {
    title: 'EXHIBITION & EXPERIENTIAL SPACES',
    image: '/service_exhibition.jpg',
    description: 'Creating immersive brand experiences that captivate audiences',
  },
  {
    title: 'GOVT. & INSTITUTIONAL',
    image: '/service_govt.jpg',
    description: 'Official ceremonies and government events with precision',
  },
  {
    title: 'AWARDS & LAUNCHES',
    image: '/service_awards.jpg',
    description: 'Glamorous award ceremonies and product launches',
  },
  {
    title: 'VIRTUAL',
    image: '/service_virtual.jpg',
    description: 'Cutting-edge virtual and hybrid event solutions',
  },
  {
    title: 'CSR',
    image: '/service_csr.jpg',
    description: 'Meaningful corporate social responsibility initiatives',
  },
  {
    title: 'MUSIC IP\'S',
    image: '/service_music.jpg',
    description: 'Unforgettable music concerts and festivals',
  },
  {
    title: 'SUMMITS & CONCLAVES',
    image: '/service_summit.jpg',
    description: 'High-level leadership conferences and summits',
  },
  {
    title: 'MEDIA/INFLUENCER ACTIVATION',
    image: '/service_media.jpg',
    description: 'Strategic influencer and media engagement campaigns',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'static' | 'slider'>('static');
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-slide for mobile slider mode
  useEffect(() => {
    if (viewMode === 'slider' && isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [viewMode, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headingRef} className="mb-12">
          <h2 className="text-heading font-bold text-white uppercase tracking-tight">
            Corporate Event Management
          </h2>
          <p className="text-subheading text-white/60 mt-4">
            Full-service event solutions for every occasion
          </p>
        </div>

        {/* View Toggle - Mobile Only */}
        <div className="flex md:hidden items-center justify-between mb-6">
          <span className="text-white/60 text-sm">View Mode:</span>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('static')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'static' ? 'bg-white/20 text-white' : 'text-white/60'
              }`}
            >
              <Grid3X3 size={16} />
              Static
            </button>
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                viewMode === 'slider' ? 'bg-white/20 text-white' : 'text-white/60'
              }`}
            >
              <Rows3 size={16} />
              Slider
            </button>
          </div>
        </div>

        {/* Desktop Grid / Mobile Views */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              to={`/services?category=${encodeURIComponent(service.title)}`}
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
                <p className="text-white/60 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={18} className="text-white" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Static View - 1.2 cards visible */}
        {viewMode === 'static' && (
          <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {services.map((service, i) => (
                <Link
                  key={i}
                  to={`/services?category=${encodeURIComponent(service.title)}`}
                  className="service-card group relative flex-shrink-0 overflow-hidden rounded-lg bg-white/5"
                  style={{ width: 'calc(50vw + 20px)', aspectRatio: '4/5' }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-card-image w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-xs leading-tight uppercase tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Slider View */}
        {viewMode === 'slider' && (
          <div className="md:hidden relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
