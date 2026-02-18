import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: language === 'zh' ? '小红书' : 'Xiaohongshu', href: SOCIAL_LINKS.redNote },
    { name: 'Instagram', href: SOCIAL_LINKS.instagram },
    { name: 'Bilibili', href: SOCIAL_LINKS.bilibili },
  ];

  return (
    <footer className="relative w-full bg-brutal-black text-brutal-white border-t-brutal border-brutal-black mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-8">

          {/* Column 1: Brand & Tagline - Takes 4 columns, shifted right */}
          <div className="lg:col-span-4 lg:col-start-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-4">
              HUGO XIE
            </h3>
            <p className="text-brutal-gray text-sm leading-relaxed mb-6 max-w-md">
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

          {/* Right columns wrapper - Takes 6 columns, closer to right edge */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Column 2: Contact */}
            <div>
              <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
                {t('footer.contact')}
              </h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex flex-col items-start gap-1 text-brutal-white hover:text-brutal-accent transition-colors duration-300 group"
                >
                  <span className="text-xs text-brutal-gray">Email</span>
                  <span className="text-sm">{SOCIAL_LINKS.email}</span>
                </a>
                <a
                  href={`tel:${SOCIAL_LINKS.phone}`}
                  className="flex flex-col items-start gap-1 text-brutal-white hover:text-brutal-accent transition-colors duration-300 group"
                >
                  <span className="text-xs text-brutal-gray">Tele</span>
                  <span className="text-sm">{SOCIAL_LINKS.phone}</span>
                </a>
                <div className="flex flex-col items-start gap-1 text-brutal-gray">
                  <span className="text-xs">WeChat</span>
                  <span className="text-sm text-brutal-white">{SOCIAL_LINKS.wechat}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Social */}
            <div>
              <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
                {t('footer.social')}
              </h4>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-brutal-white hover:text-brutal-accent transition-colors duration-300"
                    >
                      {social.name}
                    </a>
                ))}
              </div>
            </div>

            {/* Column 4: Quick Links */}
            <div>
              <h4 className="text-brutal-accent font-mono text-xs uppercase tracking-widest mb-6">
                {language === 'zh' ? '快速链接' : 'Quick Links'}
              </h4>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block text-sm text-brutal-white hover:text-brutal-accent transition-colors duration-300"
                >
                  {t('nav.work')}
                </Link>
                <Link
                  to="/about"
                  className="block text-sm text-brutal-white hover:text-brutal-accent transition-colors duration-300"
                >
                  {t('nav.about')}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-brutal border-brutal-white/20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brutal-gray font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} Hugo Xie. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-brutal-gray text-xs">Made with</span>
              <span className="text-brutal-accent text-lg">♥</span>
              <span className="text-brutal-gray text-xs">Claude code, Gemini and Kimi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;