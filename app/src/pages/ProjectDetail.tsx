import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  audience: string;
  location: string;
  date: string;
  image: string;
  gallery: string[];
  highlights: string[];
}

const projects: Record<string, Project> = {
  'global-excellence-awards': {
    id: 'global-excellence-awards',
    title: 'Global Excellence Awards',
    category: 'Awards',
    description: 'A prestigious awards ceremony honoring distinguished individuals.',
    longDescription: `The Global Excellence Awards was a landmark event that brought together the brightest minds and most influential figures from across industries. Held at the prestigious Taj Palace in New Delhi, this awards ceremony recognized individuals who have made significant contributions to their fields and enhanced India's global reputation.

    The evening was filled with glamour, inspiring speeches, and memorable moments. From the red carpet arrivals to the final award presentation, every detail was meticulously planned and executed to create an unforgettable experience for all attendees.`,
    audience: 'Celebrities, Ministers, Athletes, Business Leaders',
    location: 'Taj Palace, New Delhi',
    date: 'December 2024',
    image: '/project_awards.jpg',
    gallery: ['/service_awards.jpg', '/service_exhibition.jpg'],
    highlights: [
      '500+ distinguished guests in attendance',
      'Live performance by renowned artists',
      'Holographic stage design',
      'International media coverage',
    ],
  },
  'national-leadership-conference': {
    id: 'national-leadership-conference',
    title: 'National Leadership Conference',
    category: 'Conferences',
    description: 'Historic gathering of legislative leaders.',
    longDescription: `The National Leadership Conference served as a platform for legislative members from across India to come together, share ideas, and discuss the future of governance. This historic event at Jio Convention Center in Mumbai brought together MLAs, MLCs, and government officials for meaningful dialogue.

    The conference featured keynote addresses from prominent leaders, panel discussions on critical policy issues, and networking sessions that fostered collaboration across party lines.`,
    audience: 'MLAs, MLCs, Government Officials, Ministers',
    location: 'Jio Convention Center, Mumbai',
    date: 'November 2024',
    image: '/project_conference.jpg',
    gallery: ['/service_summit.jpg', '/service_govt.jpg'],
    highlights: [
      '200+ legislative members participated',
      '12 panel discussions',
      'Live broadcast to 10 states',
      'Bilateral meeting rooms',
    ],
  },
  'creator-festival': {
    id: 'creator-festival',
    title: 'Creator Festival',
    category: 'Entertainment',
    description: 'Awards ceremony for digital creators.',
    longDescription: `The Creator Festival was a celebration of digital creativity, recognizing the most influential content creators across platforms. This high-energy event at Mehboob Studio brought together creators, brands, and fans for an evening of entertainment and inspiration.

    The festival featured live performances, award presentations across multiple categories, and networking opportunities for the creator community.`,
    audience: 'Celebrities & Digital Influencers',
    location: 'Mehboob Studio, Mumbai',
    date: 'October 2023',
    image: '/project_fashion.jpg',
    gallery: ['/service_media.jpg', '/service_music.jpg'],
    highlights: [
      '50+ creators recognized',
      '10M+ social media impressions',
      'Brand partnership activations',
      'After-party with live DJ',
    ],
  },
  'electric-vehicle-launch': {
    id: 'electric-vehicle-launch',
    title: 'Electric Vehicle Mega Launch',
    category: 'Product Launch',
    description: 'Premium EV launch with holographic reveal.',
    longDescription: `The Electric Vehicle Mega Launch was a groundbreaking event that showcased the future of sustainable transportation. The highlight was an exclusive holographic projection show that unveiled the vehicle in spectacular fashion, creating a memorable moment for all attendees.

    The event brought together media, influencers, and industry experts to witness the launch of this premium electric vehicle.`,
    audience: 'Media, Influencers & Celebrities',
    location: 'Mehboob Studio, Mumbai',
    date: 'September 2023',
    image: '/project_car.jpg',
    gallery: ['/service_exhibition.jpg', '/service_virtual.jpg'],
    highlights: [
      'Holographic vehicle reveal',
      'Test drive experience zone',
      '200+ media attendees',
      'Livestream to 50K+ viewers',
    ],
  },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = id ? projects[id] : null;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Project Not Found</h1>
          <Link to="/work" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Back Button */}
      <div className="px-6 md:px-12 lg:px-20 py-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>
      </div>

      {/* Hero Image */}
      <div ref={heroRef} className="relative h-[50vh] md:h-[60vh]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12">
          <span className="inline-block px-4 py-1 bg-orange-500 rounded-full text-sm text-white mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">About the Event</h2>
            <div className="text-white/70 text-lg leading-relaxed whitespace-pre-line mb-12">
              {project.longDescription}
            </div>

            {/* Highlights */}
            <h3 className="text-xl font-bold text-white mb-6">Event Highlights</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-white/80">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Gallery */}
            <h3 className="text-xl font-bold text-white mb-6">Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-xl">
              <h3 className="text-white font-semibold mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-orange-500 mt-1" />
                  <div>
                    <p className="text-white/50 text-sm">Date</p>
                    <p className="text-white">{project.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-orange-500 mt-1" />
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={18} className="text-orange-500 mt-1" />
                  <div>
                    <p className="text-white/50 text-sm">Audience</p>
                    <p className="text-white">{project.audience}</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Plan a Similar Event
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <div className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8">More Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(projects)
            .filter(p => p.id !== project.id)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="group relative aspect-video rounded-lg overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-orange-500 text-sm">{p.category}</span>
                  <h3 className="text-white font-bold">{p.title}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
