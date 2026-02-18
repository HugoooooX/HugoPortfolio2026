import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, Play, Calendar, Clock, MapPin, Film, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);
  const { language, t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll to top immediately on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap) return;

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animation
      gsap.fromTo('.project-hero-title',
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' }
      );

      gsap.fromTo('.project-hero-meta',
        { yPercent: 30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      // Content sections
      gsap.utils.toArray<HTMLElement>('.content-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Images
      gsap.utils.toArray<HTMLElement>('.project-image').forEach((img) => {
        gsap.fromTo(img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger?.getAll().forEach((t: any) => t.kill());
    };
  }, [id]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const content = project.content[language];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-brutal-black text-brutal-white flex items-center border-b-brutal border-brutal-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={project.coverImage}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brutal-black/50 via-brutal-black/70 to-brutal-black"></div>
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-32 w-full">
          {/* Back Button - White bg, black text, shadow */}
          <Link
            to="/"
            className="project-hero-meta inline-flex items-center gap-3 bg-brutal-white text-brutal-black px-5 py-3 font-mono text-xs uppercase tracking-wider brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all mb-8 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('project.back')}
          </Link>

          <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
            <div className={project.poster ? "col-span-12 md:col-span-7 lg:col-span-8" : "col-span-12 md:col-span-8 lg:col-span-9"}>
              <h1 className="project-hero-title text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-8 md:mb-12">
                {content.title}
              </h1>

              <div className="project-hero-meta flex flex-wrap gap-x-6 gap-y-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brutal-accent" />
                  <span className="text-sm md:text-base">{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-brutal-yellow" />
                  <span className="text-sm md:text-base">{content.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brutal-cyan" />
                  <span className="text-sm md:text-base">{content.role}</span>
                </div>
              </div>
            </div>

            {/* Poster - only shown if project has poster */}
            {project.poster && (
              <div className="col-span-12 md:col-span-5 lg:col-span-4 mt-8 md:mt-0">
                <div className="relative aspect-[2/3] max-w-[200px] sm:max-w-[240px] md:max-w-[280px] mx-auto md:mx-0 md:ml-auto brutal-shadow-lg border-brutal border-brutal-white/20 overflow-hidden">
                  <img
                    src={project.poster}
                    alt={`${content.title} poster`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator - Changed to Chinese */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-brutal-gray">
            {language === 'zh' ? '滑动' : 'Scroll'}
          </span>
          <div className="w-px h-12 bg-brutal-white animate-pulse"></div>
        </div>
      </section>

      {/* Video Section */}
      <section className="content-section bg-brutal-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-10 sm:py-12 md:py-24">
          <div className="w-full aspect-video bg-brutal-light border-brutal border-brutal-black brutal-shadow-lg overflow-hidden relative group">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
                title={content.title}
                style={{ display: 'block' }}
                              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brutal-black text-brutal-white">
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-brutal-accent flex items-center justify-center brutal-shadow-accent group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
                  </div>
                  <p className="text-lg md:text-xl font-mono uppercase tracking-wider">
                    {language === 'zh' ? '预告片即将上线' : 'Trailer Coming Soon'}
                  </p>
                  <p className="text-sm text-brutal-gray mt-2">{content.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="content-section bg-brutal-light border-t-brutal border-brutal-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-10 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              {/* Enhanced number visibility with background */}
              <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-black text-brutal-accent font-mono text-sm font-bold">
                01
              </span>
            </div>
            <div className="lg:col-span-8 lg:col-start-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12">{t('project.synopsis')}</h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-brutal-black font-light">
                {content.synopsis}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Director Statement */}
      {content.directorStatement && (
        <section className="content-section bg-brutal-black text-brutal-white border-t-brutal border-brutal-black">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-10 sm:py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-accent text-brutal-black font-mono text-sm font-bold">
                  02
                </span>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">{t('project.statement')}</h2>
                <div className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl leading-relaxed font-light text-brutal-gray">
                  {content.directorStatement.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Credits Section */}
      {content.credits && (
        <section className="content-section bg-brutal-white border-t-brutal border-brutal-black">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-10 sm:py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-black text-brutal-accent font-mono text-sm font-bold">
                  03
                </span>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">
                  {language === 'zh' ? '制作团队' : 'Credits'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {Object.entries(content.credits).map(([key, value]) => (
                    <div
                      key={key}
                      className="group border-brutal border-brutal-black p-6 hover:bg-brutal-black hover:text-brutal-white transition-all duration-300"
                    >
                      <div className="text-xs font-mono uppercase tracking-wider text-brutal-gray group-hover:text-brutal-gray/80 mb-2">
                        {key}
                      </div>
                      <div className="text-lg font-bold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section - Updated to 16:9 aspect ratio */}
      <section className="content-section bg-brutal-light border-t-brutal border-brutal-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-10 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 mb-8">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-brutal-black text-brutal-accent font-mono text-sm font-bold">
                04
              </span>
            </div>
            <div className="lg:col-span-8 lg:col-start-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                {language === 'zh' ? '剧照' : 'Gallery'}
              </h2>
            </div>
          </div>

          {/* Image Grid - All 16:9 aspect ratio */}
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {/* Full width image - 16:9 */}
            <div className="col-span-12 mb-6 sm:mb-8 md:mb-16">
              <div className="project-image relative aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[0]}
                  alt="Gallery 1"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>

            {/* Two images side by side - 16:9 */}
            <div className="col-span-12 md:col-span-6">
              <div className="project-image relative aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[1]}
                  alt="Gallery 2"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:mt-12">
              <div className="project-image relative aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[2]}
                  alt="Gallery 3"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>

            {/* Asymmetric layout - 16:9 */}
            <div className="col-span-12 md:col-span-7 mt-6 sm:mt-8 md:mt-24">
              <div className="project-image relative aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[3]}
                  alt="Gallery 4"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 flex items-end mt-6 sm:mt-8 md:mt-24">
              <div className="project-image w-full aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[4]}
                  alt="Gallery 5"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>

            {/* Full width closing image - 16:9 */}
            <div className="col-span-12 mt-6 sm:mt-8 md:mt-24">
              <div className="project-image relative aspect-video bg-brutal-white border-brutal border-brutal-black brutal-shadow overflow-hidden">
                <img
                  src={project.images[5]}
                  alt="Gallery 6"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA section removed as requested */}
    </PageTransition>
  );
};

export default ProjectDetail;