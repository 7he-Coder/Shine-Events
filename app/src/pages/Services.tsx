import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'exhibition',
    title: 'EXHIBITION & EXPERIENTIAL SPACES',
    image: '/service_exhibition.jpg',
    description: 'We create immersive brand experiences that captivate audiences and leave lasting impressions. From trade show booths to pop-up experiences, we design spaces that tell your brand story.',
    features: [
      'Custom booth design and fabrication',
      'Interactive technology integration',
      'Brand activation strategies',
      'On-site management and support',
    ],
  },
  {
    id: 'government',
    title: 'GOVT. & INSTITUTIONAL',
    image: '/service_govt.jpg',
    description: 'Official ceremonies and government events executed with precision and dignity. We understand the protocols and requirements for high-profile institutional events.',
    features: [
      'Protocol management',
      'VIP coordination',
      'Security planning',
      'Media management',
    ],
  },
  {
    id: 'awards',
    title: 'AWARDS & LAUNCHES',
    image: '/service_awards.jpg',
    description: 'Glamorous award ceremonies and product launches that create buzz and excitement. We bring creativity and production excellence to every celebration.',
    features: [
      'Stage design and production',
      'Entertainment coordination',
      'Red carpet management',
      'Press and media coverage',
    ],
  },
  {
    id: 'virtual',
    title: 'VIRTUAL',
    image: '/service_virtual.jpg',
    description: 'Cutting-edge virtual and hybrid event solutions that connect audiences globally. We leverage technology to create engaging online experiences.',
    features: [
      'Live streaming production',
      'Virtual platform setup',
      'Interactive features',
      'Analytics and reporting',
    ],
  },
  {
    id: 'csr',
    title: 'CSR',
    image: '/service_csr.jpg',
    description: 'Meaningful corporate social responsibility initiatives that make a difference. We help brands create impactful community engagement programs.',
    features: [
      'Community outreach programs',
      'Sustainability initiatives',
      'Volunteer coordination',
      'Impact measurement',
    ],
  },
  {
    id: 'music',
    title: 'MUSIC IP\'S',
    image: '/service_music.jpg',
    description: 'Unforgettable music concerts and festivals that bring artists and fans together. We handle everything from venue selection to artist coordination.',
    features: [
      'Artist booking and management',
      'Venue coordination',
      'Sound and lighting production',
      'Ticketing and crowd management',
    ],
  },
  {
    id: 'summits',
    title: 'SUMMITS & CONCLAVES',
    image: '/service_summit.jpg',
    description: 'High-level leadership conferences and summits that facilitate meaningful dialogue. We create environments for thought leadership and networking.',
    features: [
      'Speaker coordination',
      'Agenda planning',
      'Delegate management',
      'Networking sessions',
    ],
  },
  {
    id: 'media',
    title: 'MEDIA/INFLUENCER ACTIVATION',
    image: '/service_media.jpg',
    description: 'Strategic influencer and media engagement campaigns that amplify your brand message. We connect you with the right voices to reach your audience.',
    features: [
      'Influencer identification',
      'Content strategy',
      'Campaign execution',
      'Performance tracking',
    ],
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll to category if specified
  useLayoutEffect(() => {
    if (categoryParam) {
      const service = services.find(s => s.title === categoryParam);
      if (service) {
        setTimeout(() => {
          const element = document.getElementById(service.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  }, [categoryParam]);

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero */}
      <div ref={heroRef} className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h1 className="text-display font-black text-white uppercase tracking-tight mb-6">
          Our Services
        </h1>
        <p className="text-xl text-white/60 max-w-2xl">
          Full-service event solutions tailored to your unique needs. From concept to execution, we've got you covered.
        </p>
      </div>

      {/* Services List */}
      <div className="px-6 md:px-12 lg:px-20 pb-24 space-y-24">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-4">
                {service.title}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Let's discuss your next event and bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
