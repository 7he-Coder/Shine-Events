import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Project Showcase', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'ESG', path: '/#esg' },
  { label: 'Career', path: '/#careers' },
  { label: 'Connect Now', path: '/#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = path;
      } else {
        const element = document.getElementById(path.substring(2));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 nav-blur' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <img 
                src="/shine-events.png" 
                alt="Shine Events" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase mt-1">
                Creating Wow Experiences
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path.startsWith('/#') ? '/' : link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive(link.path) ? 'text-orange-500' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-black/95 nav-blur transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          className="absolute top-5 right-6 p-2 text-white"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path.startsWith('/#') ? '/' : link.path}
              onClick={() => handleNavClick(link.path)}
              className={`text-2xl md:text-3xl font-medium transition-colors ${
                isActive(link.path) ? 'text-orange-500' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
