export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'photo' | 'video' | 'graphic';
  tags: string[];
  thumbnail: string;
  description: string;
  year: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
}

export type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};