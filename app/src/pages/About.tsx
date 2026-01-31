import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Target, Eye, Heart, Users, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Target,
    title: 'Purpose-Driven',
    description: 'Every event we create has a clear purpose and delivers measurable results.',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'We obsess over the little things that make a big difference.',
  },
  {
    icon: Heart,
    title: 'Passionate',
    description: 'We love what we do, and it shows in every project we undertake.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work closely with our clients to bring their vision to life.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to create unique experiences.',
  },
];

const milestones = [
  { year: '2010', event: 'Shine Events Founded' },
  { year: '2013', event: 'First International Project' },
  { year: '2016', event: '100th Successful Event' },
  { year: '2019', event: 'Expanded to Delhi Office' },
  { year: '2022', event: '500+ Events Completed' },
  { year: '2024', event: 'Industry Recognition Award' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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
          About Us
        </h1>
        <p className="text-xl text-white/60 max-w-3xl">
          Shine Events was founded with a vision to transform the event management industry. 
          With over 15 years of experience, we've become a trusted partner for brands worldwide.
        </p>
      </div>

      {/* Our Story */}
      <div ref={storyRef} className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-heading font-bold text-white uppercase tracking-tight mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                Shine Events was founded in 2010 with a combined experience of 15+ years in the field. 
                The founding team noticed a clear gap for a professional and reliable innovation-driven 
                event management company.
              </p>
              <p>
                What started as a small team with big dreams has grown into a full-service event 
                management company with offices in Mumbai and Delhi, serving clients across India 
                and internationally.
              </p>
              <p>
                Today, we've executed over 1000 events, built lasting relationships with 200+ repeat 
                clients, and assembled a team of 50+ passionate professionals who live and breathe events.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8">Our Journey</h3>
            <div className="space-y-6">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-16 flex-shrink-0">
                    <span className="text-orange-500 font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pb-6 border-b border-white/10">
                    <span className="text-white/80">{milestone.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div ref={valuesRef} className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/10">
        <h2 className="text-heading font-bold text-white uppercase tracking-tight mb-12 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={i}
              className="p-8 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-6">
                <value.icon size={24} className="text-orange-500" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{value.title}</h3>
              <p className="text-white/60">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamRef} className="px-6 md:px-12 lg:px-20 py-16 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-heading font-bold text-white uppercase tracking-tight mb-6">
            Meet Our Team
          </h2>
          <p className="text-white/60 text-lg">
            We're a diverse crew of creative thinkers, designers, planners, organizers 
            and innovators – and we're constantly inspired by what we do!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Rahul Sharma', role: 'Founder & CEO' },
            { name: 'Priya Patel', role: 'Creative Director' },
            { name: 'Amit Kumar', role: 'Operations Head' },
            { name: 'Sneha Gupta', role: 'Client Relations' },
          ].map((member, i) => (
            <div key={i} className="text-center">
              <div className="aspect-square rounded-full bg-white/10 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/30 text-4xl font-bold">
                  {member.name.charAt(0)}
                </div>
              </div>
              <h4 className="text-white font-semibold">{member.name}</h4>
              <p className="text-white/60 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            We're always looking for talented individuals who share our passion for creating exceptional experiences.
          </p>
          <Link
            to="/#careers"
            className="btn-primary inline-flex items-center gap-2"
          >
            View Careers
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
