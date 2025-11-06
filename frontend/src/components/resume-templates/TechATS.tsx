import { Card } from "@/components/ui/card";

interface ResumeData {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary?: string;
  experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }>;
  skills?: {
    technical?: string[];
    languages?: string[];
    tools?: string[];
  };
  projects?: Array<{
    title: string;
    techStack: string;
    description: string;
    githubLink?: string;
  }>;
}

interface TechATSProps {
  data?: ResumeData;
}

const TechATS = ({ data }: TechATSProps) => {
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || {};
  const projects = data?.projects || [];

  return (
    <Card className="w-full bg-white p-8 text-black shadow-lg font-mono">
      <div className="space-y-4">
        <div className="border-b-4 border-gray-800 pb-3">
          <h1 className="text-3xl font-bold">
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          <div className="text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          </div>
          <div className="text-xs mt-1 flex flex-wrap gap-x-4">
            {personalInfo.github && <span>🔗 GitHub: {personalInfo.github}</span>}
            {personalInfo.linkedin && <span>💼 LinkedIn: {personalInfo.linkedin}</span>}
            {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
          </div>
        </div>

        {summary && (
          <div>
            <h2 className="text-base font-bold mb-2 bg-gray-100 px-2 py-1">
              // ABOUT
            </h2>
            <p className="text-xs leading-relaxed pl-2">{summary}</p>
          </div>
        )}

        {(skills.technical?.length || skills.languages?.length || skills.tools?.length) && (
          <div>
            <h2 className="text-base font-bold mb-2 bg-gray-100 px-2 py-1">
              // TECHNICAL SKILLS
            </h2>
            <div className="pl-2 space-y-1 text-xs">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-bold">Technologies:</span> {skills.technical.join(", ")}
                </div>
              )}
              {skills.languages && skills.languages.length > 0 && (
                <div>
                  <span className="font-bold">Languages:</span> {skills.languages.join(", ")}
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div>
                  <span className="font-bold">Tools & Platforms:</span> {skills.tools.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-2 bg-gray-100 px-2 py-1">
              // EXPERIENCE
            </h2>
            <div className="space-y-3 pl-2">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm">{exp.position}</h3>
                      <p className="text-xs">{exp.company}</p>
                    </div>
                    <p className="text-xs">{exp.duration}</p>
                  </div>
                  <ul className="list-none text-xs mt-1 space-y-0.5">
                    {exp.description.split('\n').map((line, i) => (
                      line.trim() && <li key={i}>→ {line.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-2 bg-gray-100 px-2 py-1">
              // PROJECTS
            </h2>
            <div className="space-y-3 pl-2">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">{project.title}</h3>
                    {project.githubLink && (
                      <span className="text-xs">🔗 {project.githubLink}</span>
                    )}
                  </div>
                  <p className="text-xs italic mt-0.5">Stack: {project.techStack}</p>
                  <p className="text-xs mt-1">→ {project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-2 bg-gray-100 px-2 py-1">
              // EDUCATION
            </h2>
            <div className="space-y-2 pl-2">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p>{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.year}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TechATS;
