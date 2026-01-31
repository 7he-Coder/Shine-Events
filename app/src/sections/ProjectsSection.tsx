import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  audience: string;
  location: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'global-excellence-awards',
    title: 'Global Excellence Awards',
    description: 'A prestigious awards ceremony honoring distinguished individuals who have enhanced global reputation through their exceptional talents and achievements. Esteemed figures from film, sports, and social work were recognized.',
    audience: 'Celebrities, Ministers, Athletes, Business Leaders',
    location: 'Taj Palace, New Delhi',
    image: '/project_awards.jpg',
  },
  {
    id: 'national-leadership-conference',
    title: 'National Leadership Conference',
    description: 'An avenue for legislative members across the nation to gather and exchange ideas. Honorable speakers and current legislative assembly leaders came together for this historic conference.',
    audience: 'MLAs, MLCs, Government Officials, Ministers',
    location: 'Jio Convention Center, Mumbai',
    image: '/project_conference.jpg',
  },
  {
    id: 'creator-festival',
    title: 'Creator Festival',
    description: 'A debut awards ceremony high on glam, spunk and style quotient where sought-after creators were recognized for their compelling and unmatched content contributions.',
    audience: 'Celebrities & Digital Influencers',
    location: 'Mehboob Studio, Mumbai',
    image: '/project_fashion.jpg',
  },
  {
    id: 'electric-vehicle-launch',
    title: 'Electric Vehicle Mega Launch',
    description: 'A thrilling event for the launch of a premium electric vehicle. The highlight was an exclusive holographic projection show that unveiled the final cost, adding excitement to the electrifying atmosphere.',
    audience: 'Media, Influencers & Celebrities',
    location: 'Mehboob Studio, Mumbai',
    image: '/project_car.jpg',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.5,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-flowing bg-black py-24 md:py-32"
    >
      <div className="px-6 md:px-12 lg:px-20">
        <div ref={headingRef} className="mb-16">
          <h2 className="text-heading font-bold text-white uppercase tracking-tight">
            Featured Work
          </h2>
          <p className="text-subheading text-white/60 mt-4">
            Recent stories from our portfolio
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[i] = el; }}
              className="project-card group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 bg-white/5 rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
              </div>

              <div className="p-6 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <Users size={18} />
                    <span className="text-sm">{project.audience}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin size={18} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all w-fit"
                >
                  Know More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/work"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
