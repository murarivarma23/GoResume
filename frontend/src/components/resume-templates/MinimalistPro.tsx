import { ResumeData } from "@/types/resume";

interface MinimalistProProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const MinimalistPro = ({ data, isEditable = false, onUpdate }: MinimalistProProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-4xl font-light mb-2 tracking-tight"
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
        >
          {data.name}
        </h1>
        <div className="text-sm text-gray-600 space-x-4">
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.email}</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.phone}</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.location}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
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
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 tracking-wide">EXPERIENCE</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-base" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                <span className="text-sm text-gray-500 font-light" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 tracking-wide">EDUCATION</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-base" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</h3>
                  <p className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500 font-light" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 mb-4 tracking-wide">PROJECTS</h2>
          {data.projects.map((project, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-medium text-base mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.title}</h3>
              <p className="text-sm text-gray-600 mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.techStack}</p>
              <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div>
          <h2 className="text-lg font-light text-gray-900 mb-4 tracking-wide">SKILLS</h2>
          <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>
            {data.skills}
          </p>
        </div>
      )}
    </div>
  );
};
