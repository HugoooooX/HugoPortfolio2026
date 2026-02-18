import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { EDUCATION, EXPERIENCE, SKILLS, LANGUAGES, INTERESTS, ABOUT_INTRO } from '../constants';
import { MapPin, Award, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { language, t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top when About page mounts
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

      // Animate sections
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
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

      // Timeline items
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger?.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  // Interest tag colors - redesigned with harmonious palette
  const interestColors = [
    { bg: '#C41E3A', text: '#FFFFFF' }, // Film - Deep Red
    { bg: '#FFB6C1', text: '#4A0E16' }, // Fashion - Rose Pink (dark text)
    { bg: '#0066CC', text: '#FFFFFF' }, // Tech - Electric Blue
    { bg: '#228B22', text: '#FFFFFF' }, // Travel - Forest Green
  ];

  // Current status items with cover images
  const currentStatusItems = [
    {
      label: language === 'zh' ? '在看' : 'Watching',
      value: language === 'zh' ? '同乐者' : 'Pluribus',
      image: 'https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/554195e2766d49790193841d322aaaff~tplv-xv4ileqgde-cspdq:256:256:q30.image',
      color: '#C41E3A'
    },
    {
      label: language === 'zh' ? '在玩' : 'Playing',
      value: 'Balatro',
      image: 'https://and-static.ghzs.com/open_platform/images/2024/4/22/NDkwODMwOGYtMzdlYy00NWQ4LWEwYTktZjJjYzU2ODE5M2Iw.png',
      color: '#0066CC'
    },
    {
      label: language === 'zh' ? '在听' : 'Listening',
      value: 'Bad Bunny',
      image: 'https://cdn-images.dzcdn.net/images/cover/d98eaccfbb945bdf68241d6de7fe6a49/500x500.jpg',
      color: '#228B22'
    }
  ];

  return (
    <PageTransition>
      {/* Custom Cursor */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] bg-brutal-black text-brutal-white flex items-center border-b-brutal border-brutal-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-24 md:py-32 w-full">
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <span className="text-brutal-accent font-mono text-xs uppercase tracking-widest block mb-4">
                {language === 'zh' ? '关于' : 'About'}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8">
                {language === 'zh' ? '谢志弘' : 'HUGO XIE'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-brutal-gray max-w-3xl leading-normal sm:leading-relaxed">
                {ABOUT_INTRO[language]}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-brutal-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">

            {/* Left Column: Timeline */}
            <div className="lg:col-span-8 space-y-16 md:space-y-24">

              {/* Education */}
              <div className="animate-section">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <span className="flex-shrink-0 w-12 h-12 bg-brutal-black text-brutal-white flex items-center justify-center font-mono text-xl font-bold">01</span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('about.education')}</h2>
                </div>

                <div className="space-y-8 md:space-y-12 pl-4 sm:pl-6 md:pl-16">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="timeline-item group relative pl-6 md:pl-8 border-l-brutal border-l-2 border-brutal-black/20">
                      <div className="absolute left-0 top-0 w-3 h-3 bg-brutal-accent border-2 border-brutal-black rounded-full -translate-x-1/2 group-hover:scale-125 transition-transform duration-300"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-brutal-accent transition-colors duration-300">
                            {edu.content[language].school}
                          </h3>
                          <p className="text-brutal-gray mt-1">{edu.content[language].degree}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-block bg-brutal-light px-4 py-2 border-brutal border-brutal-black font-mono text-xs uppercase">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="animate-section">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <span className="flex-shrink-0 w-12 h-12 bg-brutal-black text-brutal-white flex items-center justify-center font-mono text-xl font-bold">02</span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('about.experience')}</h2>
                </div>

                <div className="space-y-8 md:space-y-12 pl-4 sm:pl-6 md:pl-16">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="timeline-item group relative pl-6 md:pl-8 border-l-brutal border-l-2 border-brutal-black/20">
                      <div className="absolute left-0 top-0 w-3 h-3 bg-brutal-accent border-2 border-brutal-black rounded-full -translate-x-1/2 group-hover:scale-125 transition-transform duration-300"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-brutal-accent transition-colors duration-300">
                            {exp.content[language].company}
                          </h3>
                          <p className="text-brutal-black font-medium mt-1">{exp.content[language].role}</p>
                          {exp.content[language].department && (
                            <p className="text-brutal-gray text-sm mt-1">{exp.content[language].department}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-block bg-brutal-light px-4 py-2 border-brutal border-brutal-black font-mono text-xs uppercase">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Skills & Info */}
            <div className="lg:col-span-4 space-y-12 md:space-y-16">

              {/* Skills */}
              <div className="animate-section">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <Target className="w-6 h-6 text-brutal-accent" />
                  <h2 className="text-xl md:text-2xl font-bold">{t('about.skills')}</h2>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-3">
                  {SKILLS[language].map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-brutal-light border-brutal border-brutal-black px-3 md:px-4 py-2 md:py-3 text-sm font-mono hover:bg-brutal-black hover:text-brutal-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="animate-section">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <MapPin className="w-6 h-6 text-brutal-accent" />
                  <h2 className="text-xl md:text-2xl font-bold">{t('about.language')}</h2>
                </div>
                <div className="space-y-3">
                  {LANGUAGES[language].map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-brutal-light border-brutal border-brutal-black px-4 py-3 hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className="w-2 h-2 bg-brutal-accent rounded-full"></div>
                      <span className="text-sm font-medium">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests - Redesigned with harmonious colors */}
              <div className="animate-section">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <Award className="w-6 h-6 text-brutal-accent" />
                  <h2 className="text-xl md:text-2xl font-bold">{t('about.interests')}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {INTERESTS[language].map((interest, idx) => {
                    const colors = interestColors[idx % interestColors.length];
                    return (
                      <div
                        key={idx}
                        className="text-center py-3 md:py-4 border-brutal border-brutal-black font-mono text-xs uppercase tracking-wider hover:scale-105 transition-transform duration-200"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text
                        }}
                      >
                        {interest}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Current Status - Full Width Horizontal Layout - White Background */}
      <section className="py-6 md:py-12 bg-brutal-white text-brutal-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-8">
            {language === 'zh' ? '最近干什么' : 'What\'s Up'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {currentStatusItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-brutal-white border-brutal border-brutal-black transition-all duration-300 overflow-hidden brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                style={{ '--hover-bg': item.color } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-6 transition-colors duration-300 group-hover:bg-[var(--hover-bg)]">
                  {/* Square Cover Image */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.value}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Text Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono uppercase tracking-wider text-brutal-gray mb-1 group-hover:text-brutal-black/70 transition-colors duration-300">{item.label}</div>
                    <div className="text-lg md:text-xl font-bold truncate group-hover:text-brutal-black transition-colors duration-300">{item.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-brutal-black text-brutal-white">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-8 md:mb-12">
            {language === 'zh' ? '很高兴认识你' : 'Nice to Meet You'}
          </h2>
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-3 bg-brutal-accent text-brutal-black px-8 py-5 font-mono text-sm uppercase tracking-wider brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
          >
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
