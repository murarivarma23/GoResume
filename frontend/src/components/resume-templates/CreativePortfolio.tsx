import { ResumeData } from "@/types/resume";

interface CreativePortfolioProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const CreativePortfolio = ({ data, isEditable = false, onUpdate }: CreativePortfolioProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Colored Header */}
      <div className="bg-gray-800 text-white p-8 mb-0">
        <h1 
          className="text-4xl font-bold mb-2"
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
        >
          {data.name}
        </h1>
        <div className="text-sm space-x-3">
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.email}</span>
          <span>•</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.phone}</span>
          <span>•</span>
          <span contentEditable={isEditable} suppressContentEditableWarning>{data.location}</span>
        </div>
      </div>

      <div className="p-8">
        {/* About */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="w-2 h-6 bg-gray-800 mr-3"></span>
              About Me
            </h2>
            <p 
              className="text-sm text-gray-700 leading-relaxed ml-5"
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
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="w-2 h-6 bg-gray-800 mr-3"></span>
              Experience
            </h2>
            <div className="ml-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="mb-4 relative pl-4 border-l-2 border-gray-300">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gray-800"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                    <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold mb-1" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
                  <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <span className="w-2 h-6 bg-gray-800 mr-3"></span>
              Projects
            </h2>
            <div className="ml-5 grid grid-cols-1 gap-4">
              {data.projects.map((project, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-base mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.title}</h3>
                  <p className="text-sm text-gray-600 italic mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.techStack}</p>
                  <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <span className="w-2 h-6 bg-gray-800 mr-3"></span>
                Education
              </h2>
              <div className="ml-5">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="mb-3">
                    <h3 className="font-semibold text-sm" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</h3>
                    <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
                    <p className="text-xs text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <span className="w-2 h-6 bg-gray-800 mr-3"></span>
                Skills
              </h2>
              <p className="text-sm text-gray-700 ml-5" contentEditable={isEditable} suppressContentEditableWarning>
                {data.skills}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
