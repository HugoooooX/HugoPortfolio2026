export type Language = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface ProjectContent {
  title: string;
  role: string;
  type: string;
  synopsis: string;
  directorStatement?: string;
  credits?: Record<string, string>;
}

export interface Project {
  id: string;
  year: string;
  videoUrl?: string;
  coverImage: string;
  gifUrl?: string;
  poster?: string;
  images: string[];
  content: {
    zh: ProjectContent;
    en: ProjectContent;
  };
}

export interface OtherWork {
  year: string;
  url?: string;
  content: {
    zh: {
      title: string;
      client: string;
      role: string;
      description: string;
    };
    en: {
      title: string;
      client: string;
      role: string;
      description: string;
    };
  };
}

export interface Education {
  period: string;
  content: {
    zh: { school: string; degree: string; };
    en: { school: string; degree: string; };
  };
}

export interface Experience {
  period: string;
  content: {
    zh: { company: string; role: string; department?: string; };
    en: { company: string; role: string; department?: string; };
  };
}