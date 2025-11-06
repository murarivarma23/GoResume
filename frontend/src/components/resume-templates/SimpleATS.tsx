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
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

interface SimpleATSProps {
  data?: ResumeData;
}

const SimpleATS = ({ data }: SimpleATSProps) => {
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || {};
  const certifications = data?.certifications || [];

  return (
    <Card className="w-full bg-white p-10 text-black shadow-lg">
      <div className="space-y-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {personalInfo.fullName || "YOUR NAME"}
          </h1>
          <div className="text-sm">
            {[personalInfo.email, personalInfo.phone, personalInfo.location]
              .filter(Boolean)
              .join(" | ")}
          </div>
          {(personalInfo.linkedin || personalInfo.github) && (
            <div className="text-sm mt-1">
              {[personalInfo.linkedin, personalInfo.github]
                .filter(Boolean)
                .join(" | ")}
            </div>
          )}
        </div>

        {summary && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black pb-1">
              SUMMARY
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{exp.company}</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.description.split('\n').map((line, i) => (
                      line.trim() && <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-sm">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>{edu.year}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(skills.technical?.length || skills.soft?.length) && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black pb-1">
              SKILLS
            </h2>
            <div className="space-y-1 text-sm">
              {skills.technical && skills.technical.length > 0 && (
                <p>
                  <span className="font-bold">Technical:</span> {skills.technical.join(", ")}
                </p>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <p>
                  <span className="font-bold">Soft Skills:</span> {skills.soft.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-1">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <div>
                    <span className="font-bold">{cert.name}</span>
                    <span> - {cert.issuer}</span>
                  </div>
                  <span>{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SimpleATS;
