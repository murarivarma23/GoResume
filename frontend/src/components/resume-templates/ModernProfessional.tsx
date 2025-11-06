import { ResumeData } from "@/types/resume";

interface ModernProfessionalProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const ModernProfessional = ({ data, isEditable = false, onUpdate }: ModernProfessionalProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 
          className="text-3xl font-bold mb-2"
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
        >
          {data.name}
        </h1>
        <div className="text-sm text-gray-700 space-x-3">
          <span contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleEdit('email', e.currentTarget.textContent || '')}>{data.email}</span>
          <span>•</span>
          <span contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleEdit('phone', e.currentTarget.textContent || '')}>{data.phone}</span>
          <span>•</span>
          <span contentEditable={isEditable} suppressContentEditableWarning onBlur={(e) => handleEdit('location', e.currentTarget.textContent || '')}>{data.location}</span>
        </div>
        {data.linkedin && (
          <div className="text-sm text-gray-600 mt-1">
            <span contentEditable={isEditable} suppressContentEditableWarning>{data.linkedin}</span>
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase">Professional Summary</h2>
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

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase border-b border-gray-300 pb-1">Work Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-base" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-700 italic mb-1" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
              <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase border-b border-gray-300 pb-1">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-base" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</h3>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</span>
              </div>
              <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase border-b border-gray-300 pb-1">Skills</h2>
          <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>
            {data.skills}
          </p>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase border-b border-gray-300 pb-1">Projects</h2>
          {data.projects.map((project, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="font-semibold text-base" contentEditable={isEditable} suppressContentEditableWarning>{project.title}</h3>
              <p className="text-sm text-gray-600 italic" contentEditable={isEditable} suppressContentEditableWarning>{project.techStack}</p>
              <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
