export interface ResumeExperience {
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  period: string;
  notes: string | null;
}

export interface ResumeData {
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  summary: string | null;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[] | null;
}
