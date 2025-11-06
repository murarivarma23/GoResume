import { ResumeData } from "@/types/resume";

interface ExecutiveClassicProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const ExecutiveClassic = ({ data, isEditable = false, onUpdate }: ExecutiveClassicProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Header */}
      <div className="mb-6 pb-4">
        <h1 
          className="text-4xl font-serif font-bold mb-3 text-gray-900"
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
        >
          {data.name}
        </h1>
        <div className="text-sm text-gray-600 space-x-2">
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.email}</span>
          <span className="text-gray-400">|</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.phone}</span>
          <span className="text-gray-400">|</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.location}</span>
        </div>
      </div>

      {/* Executive Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">Executive Summary</h2>
          <p 
            className="text-sm text-gray-700 leading-relaxed text-justify"
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleEdit('summary', e.currentTarget.textContent || '')}
          >
            {data.summary}
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">Professional Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                  <p className="text-sm text-gray-700 font-semibold" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-base" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</h3>
                  <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Core Competencies */}
      {data.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">Core Competencies</h2>
          <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>
            {data.skills}
          </p>
        </div>
      )}
    </div>
  );
};
