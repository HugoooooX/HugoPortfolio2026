import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<string, { zh: string; en: string }> = {
  'nav.work': { zh: '作品', en: 'Work' },
  'nav.about': { zh: '关于', en: 'About' },
  'hero.role': { zh: 'Hugo Xie', en: 'Hugo Xie' },
  'hero.tags': { zh: '导演、剪辑', en: 'Director, Editor' },
  'hero.intro': { zh: '关注瞬息万变的人类情感变化，希望记录这个时代下不同的个体。', en: 'Focused on capturing fleeting human emotions and recording diverse individuals in this era.' },
  'home.selected': { zh: '精选作品', en: 'Selected Works' },
  'home.scroll': { zh: '滑动探索', en: 'Scroll to explore' },
  'home.archive': { zh: '项目归档', en: 'Projects Archive' },
  'archive.project': { zh: '项目', en: 'Project' },
  'archive.role': { zh: '担任角色', en: 'Role' },
  'archive.year': { zh: '年份', en: 'Year' },
  'about.title': { zh: '关于我', en: 'About Me' },
  'about.download': { zh: '下载简历 (PDF)', en: 'Download CV (PDF)' },
  'about.education': { zh: '教育经历', en: 'Education' },
  'about.experience': { zh: '工作经历', en: 'Experience' },
  'about.skills': { zh: '技能', en: 'Skills' },
  'about.language': { zh: '语言', en: 'Language' },
  'about.interests': { zh: '兴趣', en: 'Interests' },
  'about.current': { zh: '最近状态', en: 'Current Status' },
  'project.back': { zh: '返回归档', en: 'Back to Archive' },
  'project.synopsis': { zh: '简介', en: 'Synopsis' },
  'project.statement': { zh: '导演阐述', en: 'Director\'s Statement' },
  'footer.contact': { zh: '联系方式', en: 'Contact' },
  'footer.social': { zh: '社交媒体', en: 'Social' },
  'footer.rights': { zh: '版权所有', en: 'All Rights Reserved.' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
