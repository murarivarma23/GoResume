import { ResumeData } from "@/types/resume";

interface AcademicScholarProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const AcademicScholar = ({ data, isEditable = false, onUpdate }: AcademicScholarProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-4 border-gray-900">
        <h1 
          className="text-3xl font-serif font-bold mb-2"
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
        >
          {data.name}
        </h1>
        <div className="text-sm text-gray-700">
          <div contentEditable={isEditable} suppressContentEditableWarning>{data.email} | {data.phone}</div>
          <div contentEditable={isEditable} suppressContentEditableWarning>{data.location}</div>
          {data.linkedin && <div className="text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{data.linkedin}</div>}
        </div>
      </div>

      {/* Research Interests / Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-gray-400 pb-1">Research Interests</h2>
          <p 
            className="text-sm text-gray-700 leading-relaxed"
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleEdit('summary', e.currentTarget.textContent || '')}
          >
            {data.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-gray-400 pb-1">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</h3>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</span>
              </div>
              <p className="text-sm text-gray-700 italic" contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Research Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-gray-400 pb-1">Research Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-700 italic mb-1" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Publications / Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-gray-400 pb-1">Publications & Projects</h2>
          {data.projects.map((project, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="font-bold text-sm" contentEditable={isEditable} suppressContentEditableWarning>{project.title}</h3>
              <p className="text-sm text-gray-600 italic mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.techStack}</p>
              <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills & Competencies */}
      {data.skills && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide border-b-2 border-gray-400 pb-1">Skills & Competencies</h2>
          <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>
            {data.skills}
          </p>
        </div>
      )}
    </div>
  );
};
