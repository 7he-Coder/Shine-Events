import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Users, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  audience: string;
  location: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 'global-excellence-awards',
    title: 'Global Excellence Awards',
    category: 'Awards',
    description: 'A prestigious awards ceremony honoring distinguished individuals who have enhanced global reputation through their exceptional talents and achievements.',
    audience: 'Celebrities, Ministers, Athletes',
    location: 'Taj Palace, New Delhi',
    image: '/project_awards.jpg',
    year: '2024',
  },
  {
    id: 'national-leadership-conference',
    title: 'National Leadership Conference',
    category: 'Conferences',
    description: 'An avenue for legislative members across the nation to gather and exchange ideas.',
    audience: 'MLAs, MLCs, Government Officials',
    location: 'Jio Convention Center, Mumbai',
    image: '/project_conference.jpg',
    year: '2024',
  },
  {
    id: 'creator-festival',
    title: 'Creator Festival',
    category: 'Entertainment',
    description: 'A debut awards ceremony high on glam, spunk and style quotient.',
    audience: 'Celebrities & Digital Influencers',
    location: 'Mehboob Studio, Mumbai',
    image: '/project_fashion.jpg',
    year: '2023',
  },
  {
    id: 'electric-vehicle-launch',
    title: 'Electric Vehicle Mega Launch',
    category: 'Product Launch',
    description: 'A thrilling event for the launch of a premium electric vehicle with holographic projection.',
    audience: 'Media, Influencers & Celebrities',
    location: 'Mehboob Studio, Mumbai',
    image: '/project_car.jpg',
    year: '2023',
  },
  {
    id: 'tech-summit-2024',
    title: 'Global Tech Summit 2024',
    category: 'Conferences',
    description: 'International technology conference bringing together industry leaders.',
    audience: 'Tech Leaders, Entrepreneurs',
    location: 'Hyatt Regency, Bangalore',
    image: '/service_summit.jpg',
    year: '2024',
  },
  {
    id: 'music-festival',
    title: 'Summer Music Festival',
    category: 'Entertainment',
    description: 'Three-day music festival featuring top artists from around the world.',
    audience: 'Music Lovers, Festival Goers',
    location: 'Pune, Maharashtra',
    image: '/service_music.jpg',
    year: '2023',
  },
];

const categories = ['All', 'Awards', 'Conferences', 'Entertainment', 'Product Launch'];

export default function Work() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero */}
      <div ref={heroRef} className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h1 className="text-display font-black text-white uppercase tracking-tight mb-6">
          Project Showcase
        </h1>
        <p className="text-xl text-white/60 max-w-2xl">
          Explore our portfolio of exceptional events that have created lasting impressions.
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-12 lg:px-20 pb-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <Filter size={18} className="text-white/60 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white/50 text-sm">{project.year}</span>
                <h3 className="text-white font-bold text-xl mt-1 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <MapPin size={14} />
                  {project.location}
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Users size={14} />
                  {project.audience}
                </div>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={18} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
