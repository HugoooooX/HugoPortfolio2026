import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MessageCircle, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Xiaohongshu', href: SOCIAL_LINKS.redNote, icon: MessageCircle },
    { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: Instagram },
    { name: 'Bilibili', href: SOCIAL_LINKS.bilibili, icon: Youtube },
  ];

  return (
    <footer className="w-full bg-brutal-black text-brutal-white border-t-brutal border-brutal-black mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12">

          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
              HUGO XIE
            </h3>
            <p className="text-brutal-gray text-sm leading-relaxed mb-6">
              {t('hero.intro')}
            </p>
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-brutal-accent font-mono text-xs uppercase tracking-wider hover:text-brutal-white transition-colors duration-300"
            >
              {t('home.scroll')}
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
              {t('footer.contact')}
            </h4>
            <div className="space-y-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-3 text-brutal-white hover:text-brutal-accent transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 text-brutal-accent group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-brutal-gray">email</span>
                  <span className="text-sm">{SOCIAL_LINKS.email}</span>
                </div>
              </a>
              <a
                href={`tel:${SOCIAL_LINKS.phone}`}
                className="flex items-center gap-3 text-brutal-white hover:text-brutal-accent transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 text-brutal-accent group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-brutal-gray">tele</span>
                  <span className="text-sm">{SOCIAL_LINKS.phone}</span>
                </div>
              </a>
              <div className="flex items-center gap-3 text-brutal-gray">
                <MessageCircle className="w-4 h-4 text-brutal-accent flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs">WeChat</span>
                  <span className="text-sm text-brutal-white">{SOCIAL_LINKS.wechat}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
              {t('footer.social')}
            </h4>
            <div className="space-y-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-brutal-white hover:text-brutal-accent transition-colors duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-brutal-accent group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
              {language === 'zh' ? '快速链接' : 'Quick Links'}
            </h4>
            <div className="space-y-3">
              <a
                href="/"
                className="block text-sm text-brutal-white hover:text-brutal-accent transition-colors duration-300"
              >
                {t('nav.work')}
              </a>
              <a
                href="/about"
                className="block text-sm text-brutal-white hover:text-brutal-accent transition-colors duration-300"
              >
                {t('nav.about')}
              </a>
              <a
                href="mailto:xiehugo99@gmail.com"
                className="inline-flex items-center gap-2 bg-brutal-accent text-brutal-black px-4 py-2 font-mono text-xs uppercase tracking-wider brutal-shadow brutal-shadow-accent hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 mt-4"
              >
                {language === 'zh' ? '联系我' : 'Get in Touch'}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-brutal border-brutal-white/20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] md:text-xs text-brutal-gray font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} Hugo Xie. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-brutal-gray text-xs">Made with</span>
              <span className="text-brutal-accent text-lg">♥</span>
              <span className="text-brutal-gray text-xs">claude code, Gemini and Kimi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-brutal border-l-2 border-b-brutal border-b-2 border-brutal-accent"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-brutal border-r-2 border-b-brutal border-b-2 border-brutal-yellow"></div>
    </footer>
  );
};

export default Footer;
