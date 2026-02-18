import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { PROJECTS, OTHER_WORKS } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Play, Clapperboard, Scissors, Camera } from 'lucide-react';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  // Scroll to top when Home page mounts
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const featuredProjects = PROJECTS.slice(0, 3);

  const splitText = (text: string) => {
    return text.split('').map((char, idx) => (
      <span key={idx} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Parallax effect for hero image
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate offset (subtle movement - max 15px)
        const offsetX = ((e.clientX - centerX) / window.innerWidth) * 15;
        const offsetY = ((e.clientY - centerY) / window.innerHeight) * 15;

        setImageOffset({ x: offsetX, y: offsetY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap) return;

    const tl = gsap.timeline();

    // Hero animation
    tl.fromTo('.hero-title .char',
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.03 }
    )
    .fromTo('.hero-tagline',
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-image',
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo('.hero-cta',
      { xPercent: -50, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // Scroll animations
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Project cards reveal - batch for smoother performance
      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      projectCards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true
            },
            delay: i * 0.1
          }
        );
      });

      // Archive items
      const archiveItems = gsap.utils.toArray<HTMLElement>('.archive-item');
      archiveItems.forEach((item, i) => {
        gsap.fromTo(item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              once: true
            }
          }
        );
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger?.getAll().forEach((t: any) => t.kill());
    };
  }, [language]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-brutal-white overflow-hidden border-b-brutal border-brutal-black">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {/* Left: Title */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center min-h-[70vh]">
              {/* Fixed: Added pb-4 to ensure text is not clipped at bottom */}
              <div ref={headlineRef} className="hero-title overflow-visible pb-4">
                <h1 className="text-[12vw] md:text-[10vw] font-bold leading-[1.15] tracking-tight md:tracking-tighter">
                  <span className="block overflow-hidden">
                    <span className="inline-block">
                      {language === 'zh'
                        ? splitText('谢志弘')
                        : splitText('HUGO XIE')
                      }
                    </span>
                  </span>
                </h1>
              </div>

              <div className="hero-tagline mt-8 md:mt-12 overflow-hidden">
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <span className="text-sm sm:text-base md:text-xl font-mono text-brutal-gray uppercase tracking-widest flex items-center gap-2">
                    <Clapperboard className="w-5 h-5 text-brutal-accent" />
                    {language === 'zh' ? '导演' : 'Director'}
                  </span>
                  <span className="text-sm sm:text-base md:text-xl font-mono text-brutal-gray uppercase tracking-widest flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-brutal-accent" />
                    {language === 'zh' ? '剪辑' : 'Editor'}
                  </span>
                  <span className="text-sm sm:text-base md:text-xl font-mono text-brutal-gray uppercase tracking-widest flex items-center gap-2">
                    <Camera className="w-5 h-5 text-brutal-accent" />
                    {language === 'zh' ? '摄影' : 'Cinematographer'}
                  </span>
                </div>
              </div>

              <div className="hero-cta mt-8 md:mt-12">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 bg-brutal-black text-brutal-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 font-mono text-xs sm:text-sm uppercase tracking-wider brutal-shadow brutal-shadow-accent hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
                >
                  {language === 'zh' ? '了解更多' : 'Discover More'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Image with Parallax Effect */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 flex items-start md:items-end mt-8 md:mt-0" ref={imageContainerRef}>
              <motion.div
                className="hero-image relative w-full max-w-[280px] md:max-w-none mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                  transform: `translate(${imageOffset.x}px, ${imageOffset.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="aspect-[3/4] bg-brutal-light border-brutal border-brutal-black brutal-shadow-lg overflow-hidden">
                  <img
                    src="https://img.heliar.top/file/1769584960569_DirectorPhoto1.jpeg"
                    alt="Hugo Xie"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-brutal-gray">{t('home.scroll')}</span>
          <div className="w-px h-12 bg-brutal-black animate-pulse"></div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 md:py-12 bg-brutal-black text-brutal-white overflow-hidden border-y-brutal border-brutal-black">
        <div ref={marqueeRef} className="marquee whitespace-nowrap">
          <span className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter mx-4 sm:mx-8">
            DOCUMENTARY • FILMMAKING • VISUAL STORYTELLING • CREATIVE DIRECTION •
          </span>
          <span className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter mx-4 sm:mx-8">
            DOCUMENTARY • FILMMAKING • VISUAL STORYTELLING • CREATIVE DIRECTION •
          </span>
        </div>
      </section>

      {/* Selected Works */}
      <section id="selected-work" className="py-16 md:py-24 lg:py-32 bg-brutal-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8 sm:mb-10 md:mb-16">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-black text-brutal-accent font-mono text-sm font-bold">01</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
              {t('home.selected')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="project-card group block"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative aspect-[4/3] bg-brutal-light border-brutal border-brutal-black overflow-hidden mb-4 md:mb-6 brutal-shadow group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
                  {/* Cover Image */}
                  <img
                    src={project.coverImage}
                    alt={project.content[language].title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  {/* GIF - shows on hover */}
                  {project.gifUrl && (
                    <img
                      src={project.gifUrl}
                      alt={`${project.content[language].title} preview`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/20 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" />
                  </div>
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 bg-brutal-white px-3 py-1 border-brutal border-brutal-black font-mono text-xs uppercase">
                    {project.year}
                  </div>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-brutal-accent transition-colors duration-300 glitch">
                      {project.content[language].title}
                    </h3>
                    <p className="text-brutal-gray font-mono text-xs uppercase tracking-wider mt-2">
                      {project.content[language].type}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-brutal-black group-hover:translate-x-1 group-hover:text-brutal-accent transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Projects button removed as requested */}
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-brutal-light border-t-brutal border-brutal-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-black text-brutal-accent font-mono text-sm font-bold">02</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
                {t('home.archive')}
              </h2>
            </div>
            <div className="flex gap-4">
              <span className="bg-brutal-black text-brutal-white px-3 py-1 font-mono text-xs uppercase">2019—2025</span>
            </div>
          </div>

          <div className="space-y-0">
            {OTHER_WORKS.map((work, idx) => {
              const WorkItem = (
                <div
                  key={`other-${idx}`}
                  className="archive-item group flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-8 border-b-brutal border-brutal-black/20 md:hover:bg-brutal-white md:hover:px-6 transition-all duration-300"
                  style={{ cursor: work.url ? 'pointer' : 'inherit' }}
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-brutal-accent transition-colors duration-300">
                      {work.content[language].title}
                    </h3>
                    <p className="text-brutal-gray font-mono text-xs uppercase tracking-wider mt-1">
                      {work.content[language].client}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 mt-4 md:mt-0">
                    <div className="text-sm md:text-base text-brutal-gray whitespace-nowrap">
                      {work.content[language].role}
                    </div>
                    <div className="flex-shrink-0 font-mono text-sm ml-auto md:ml-0">
                      <span className="bg-brutal-black text-brutal-white px-3 py-1">{work.year}</span>
                    </div>
                  </div>
                </div>
              );

              return work.url ? (
                <a
                  key={`other-link-${idx}`}
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {WorkItem}
                </a>
              ) : (
                WorkItem
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-brutal-black text-brutal-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-8 md:mb-12">
            {language === 'zh' ? '创造有趣而动人的作品' : 'Creating Fun & Moving Works'}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:xiehugo99@gmail.com"
              className="group inline-flex items-center justify-center gap-3 bg-brutal-accent text-brutal-black px-8 py-5 font-mono text-sm uppercase tracking-wider brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              {language === 'zh' ? '发送邮件' : 'Send Email'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/about"
              className="group inline-flex items-center justify-center gap-3 bg-transparent border-brutal border-brutal-white text-brutal-white px-8 py-5 font-mono text-sm uppercase tracking-wider hover:bg-brutal-white hover:text-brutal-black transition-all duration-300"
            >
              {language === 'zh' ? '了解更多' : 'Learn More'}
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;