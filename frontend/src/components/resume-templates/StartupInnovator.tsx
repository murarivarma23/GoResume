import { ResumeData } from "@/types/resume";

interface StartupInnovatorProps {
  data: ResumeData;
  isEditable?: boolean;
  onUpdate?: (data: ResumeData) => void;
}

export const StartupInnovator = ({ data, isEditable = false, onUpdate }: StartupInnovatorProps) => {
  const handleEdit = (field: string, value: string) => {
    if (isEditable && onUpdate) {
      onUpdate({ ...data, [field]: value });
    }
  };

  return (
    <div className="bg-white shadow-lg max-w-[8.5in] mx-auto text-black">
      {/* Left Sidebar */}
      <div className="grid grid-cols-3 gap-0">
        <div className="bg-gray-900 text-white p-6 col-span-1">
          <div className="mb-6">
            <h1 
              className="text-2xl font-bold mb-2"
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => handleEdit('name', e.currentTarget.textContent || '')}
            >
              {data.name}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase mb-2 text-gray-300">Contact</h2>
            <div className="text-xs space-y-1">
              <p contentEditable={isEditable} suppressContentEditableWarning>{data.email}</p>
              <p contentEditable={isEditable} suppressContentEditableWarning>{data.phone}</p>
              <p contentEditable={isEditable} suppressContentEditableWarning>{data.location}</p>
              {data.linkedin && <p contentEditable={isEditable} suppressContentEditableWarning>{data.linkedin}</p>}
            </div>
          </div>

          {/* Skills */}
          {data.skills && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase mb-2 text-gray-300">Skills</h2>
              <p className="text-xs leading-relaxed" contentEditable={isEditable} suppressContentEditableWarning>
                {data.skills}
              </p>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase mb-2 text-gray-300">Education</h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-3 text-xs">
                  <p className="font-semibold" contentEditable={isEditable} suppressContentEditableWarning>{edu.degree}</p>
                  <p contentEditable={isEditable} suppressContentEditableWarning>{edu.institution}</p>
                  <p className="text-gray-400" contentEditable={isEditable} suppressContentEditableWarning>{edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Profile */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">Profile</h2>
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
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">Experience</h2>
              {data.experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base" contentEditable={isEditable} suppressContentEditableWarning>{exp.position}</h3>
                    <span className="text-sm text-gray-600" contentEditable={isEditable} suppressContentEditableWarning>{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold mb-1" contentEditable={isEditable} suppressContentEditableWarning>{exp.company}</p>
                  <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Key Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-900">Key Projects</h2>
              {data.projects.map((project, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-bold text-base mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.title}</h3>
                  <p className="text-sm text-gray-600 italic mb-1" contentEditable={isEditable} suppressContentEditableWarning>{project.techStack}</p>
                  <p className="text-sm text-gray-700" contentEditable={isEditable} suppressContentEditableWarning>{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
