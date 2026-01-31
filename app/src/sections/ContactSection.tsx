import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    eventType: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.contact-element');
        gsap.fromTo(elements,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            }
          }
        );
      }

      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(mapRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will be in touch soon.');
    setFormData({ name: '', email: '', company: '', eventType: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing bg-black py-24 md:py-32 border-t border-white/10"
    >
      <div className="px-6 md:px-12 lg:px-20">
        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
          <div ref={contentRef}>
            <h2 className="contact-element text-heading font-bold text-white uppercase tracking-tight mb-8">
              Connect Now
            </h2>

            <div className="contact-element space-y-8 mb-12">
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-white/60" />
                  MUMBAI
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  1501 – C, Ratan Central,<br />
                  Dr. Babasaheb Ambedkar Road, Parel (East),<br />
                  Mumbai – 400012.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-white/60" />
                  DELHI
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  1/A, BGR Building, SupremeWork, 2nd Floor,<br />
                  Film City, Sector 16A,<br />
                  Noida – 201301.
                </p>
              </div>
            </div>

            <div className="contact-element space-y-4 mb-12">
              <a
                href="mailto:hello@shineevents.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span>hello@shineevents.com</span>
              </a>
              <div className="text-white/50 text-sm">Business Enquiry:</div>
              <a
                href="tel:+919769340404"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span>+91 97693 40404</span>
              </a>
            </div>

            <div className="contact-element flex items-center gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div ref={formRef}>
            <h3 className="text-white font-bold text-xl mb-6">
              Plan Your Event
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="" className="bg-black">Select event type</option>
                  <option value="corporate" className="bg-black">Corporate Event</option>
                  <option value="exhibition" className="bg-black">Exhibition</option>
                  <option value="awards" className="bg-black">Awards Ceremony</option>
                  <option value="launch" className="bg-black">Product Launch</option>
                  <option value="virtual" className="bg-black">Virtual Event</option>
                  <option value="other" className="bg-black">Other</option>
                </select>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Send Inquiry
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div ref={mapRef} className="rounded-xl overflow-hidden">
          <h3 className="text-white font-bold text-lg mb-4">Find Us</h3>
          <div className="w-full h-[400px] bg-white/5 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.893!2d72.8426!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e5f3e6c8e5%3A0x3e6c8e5f3e6c8e5!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shine Events Location"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/shine-events.png" 
              alt="Shine Events" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Shine Events. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
