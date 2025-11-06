export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

export interface Project {
  title: string;
  techStack: string;
  description: string;
  githubLink?: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string;
}
