import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSlider from '../sections/HeroSlider';
import ServicesSection from '../sections/ServicesSection';
import ProjectsSection from '../sections/ProjectsSection';
import Stats from '../sections/Stats';
import ESG from '../sections/ESG';
import Clients from '../sections/Clients';
import Careers from '../sections/Careers';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      <HeroSlider />
      <ServicesSection />
      <ProjectsSection />
      <Stats />
      <ESG />
      <Clients />
      <Careers />
      <ContactSection />
    </>
  );
}
