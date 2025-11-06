import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, Save, ArrowLeft } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { ModernProfessional } from "@/components/resume-templates/ModernProfessional";
import { ExecutiveClassic } from "@/components/resume-templates/ExecutiveClassic";
import { CreativePortfolio } from "@/components/resume-templates/CreativePortfolio";
import { AcademicScholar } from "@/components/resume-templates/AcademicScholar";
import { StartupInnovator } from "@/components/resume-templates/StartupInnovator";
import { MinimalistPro } from "@/components/resume-templates/MinimalistPro";
import { useToast } from "@/hooks/use-toast";

const TemplateEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary: "Experienced professional with a proven track record in developing innovative solutions and leading cross-functional teams to achieve organizational goals.",
    experience: [
      {
        company: "Tech Company Inc.",
        position: "Senior Software Engineer",
        duration: "Jan 2020 - Present",
        description: "Led development of scalable web applications, mentored junior developers, and implemented best practices for code quality and testing."
      },
      {
        company: "Startup XYZ",
        position: "Software Developer",
        duration: "Jun 2018 - Dec 2019",
        description: "Developed full-stack features for SaaS platform, collaborated with design team, and improved application performance by 40%."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2018",
        gpa: "3.8/4.0"
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        techStack: "React, Node.js, MongoDB, AWS",
        description: "Built a scalable e-commerce platform with payment integration, inventory management, and real-time analytics."
      },
      {
        title: "Task Management App",
        techStack: "React Native, Firebase",
        description: "Developed a cross-platform mobile app for task management with offline support and cloud sync."
      }
    ],
    skills: "JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS, Docker, Git, Agile, CI/CD"
  });

  const templates: { [key: string]: any } = {
    "1": ModernProfessional,
    "2": ExecutiveClassic,
    "3": CreativePortfolio,
    "4": AcademicScholar,
    "5": StartupInnovator,
    "6": MinimalistPro
  };

  const templateNames: { [key: string]: string } = {
    "1": "Modern Professional",
    "2": "Executive Classic",
    "3": "Creative Portfolio",
    "4": "Academic Scholar",
    "5": "Startup Innovator",
    "6": "Minimalist Pro"
  };

  const SelectedTemplate = templates[templateId || "1"] || ModernProfessional;

  const handleSave = () => {
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded as PDF.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Action Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/templates")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <h1 className="text-2xl font-bold">{templateNames[templateId || "1"]}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm">
              <strong>Click on any text to edit it directly!</strong> Simply click on names, descriptions, dates, or any other text in the resume below to make changes.
            </p>
          </div>

          {/* Resume Preview */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <SelectedTemplate data={resumeData} isEditable={true} onUpdate={setResumeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateEditor;
