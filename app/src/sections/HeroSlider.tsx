import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  link?: string;
}

const slides: Slide[] = [
  {
    type: 'image',
    src: '/hero_bg.jpg',
    title: 'WE CREATE',
    subtitle: 'ELEVATED BRAND EXPERIENCES',
    link: '/work',
  },
  {
    type: 'image',
    src: '/project_awards.jpg',
    title: 'AWARDS',
    subtitle: 'CELEBRATING EXCELLENCE',
    link: '/work',
  },
  {
    type: 'image',
    src: '/project_conference.jpg',
    title: 'CONFERENCES',
    subtitle: 'LEADERSHIP SUMMITS',
    link: '/work',
  },
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'EXPERIENCES',
    subtitle: 'THAT INSPIRE',
    link: '/work',
  },
];

export default function HeroSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play slides
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentSlide]);

  // Handle video playback
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    if (currentSlideData.type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (slides[currentSlide].type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-black"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={slide.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          {/* Animated Headline */}
          <div key={currentSlide} className="mb-8 animate-fade-in-up">
            <div className="text-display font-black text-white uppercase tracking-tight">
              {slides[currentSlide].title}
            </div>
            <div className="text-display font-black text-white uppercase tracking-tight">
              {slides[currentSlide].subtitle}
            </div>
          </div>

          {/* CTA Button */}
          {slides[currentSlide].link && (
            <Link
              to={slides[currentSlide].link!}
              className="btn-primary inline-flex items-center gap-2"
            >
              View Projects
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 z-30">
        <div className="flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-12 h-1 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-6 md:right-12 lg:right-20 z-30 hidden md:block">
        <span className="text-white/60 text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
