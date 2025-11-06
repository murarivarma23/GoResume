import { Card } from "@/components/ui/card";

interface ResumeData {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
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
    soft?: string[];
  };
  projects?: Array<{
    title: string;
    techStack: string;
    description: string;
  }>;
}

interface ATSClassicProps {
  data?: ResumeData;
}

const ATSClassic = ({ data }: ATSClassicProps) => {
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || {};
  const projects = data?.projects || [];

  return (
    <Card className="w-full bg-white p-8 text-black shadow-lg">
      <div className="space-y-4">
        <div className="text-center border-b-2 border-gray-800 pb-3">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          <div className="text-sm mt-2 space-x-3">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
          <div className="text-sm mt-1 space-x-3">
            {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
            {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
          </div>
        </div>

        {summary && (
          <div>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm font-semibold">{exp.company}</p>
                    </div>
                    <p className="text-sm italic">{exp.duration}</p>
                  </div>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{edu.year}</p>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(skills.technical?.length || skills.soft?.length) && (
          <div>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Skills
            </h2>
            {skills.technical && skills.technical.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Technical: </span>
                <span className="text-sm">{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills.soft && skills.soft.length > 0 && (
              <div>
                <span className="font-semibold">Soft Skills: </span>
                <span className="text-sm">{skills.soft.join(", ")}</span>
              </div>
            )}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm italic">{project.techStack}</p>
                  <p className="text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ATSClassic;
