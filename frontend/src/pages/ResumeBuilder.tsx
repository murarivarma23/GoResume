import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Plus, Download, Eye, Save } from "lucide-react";
import { resumeAPI } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { downloadElementAsPDF } from "@/lib/pdf"; // <-- ADDED

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      languages: ""
    },
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    projects: [{ title: "", techStack: "", description: "", githubLink: "" }],
    skills: { technical: [] as string[], soft: [] as string[] },
    certifications: [{ name: "", issuer: "", year: "" }]
  });

  const [resumeId, setResumeId] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", duration: "", description: "" }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", techStack: "", description: "", githubLink: "" }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "", gpa: "" }]
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issuer: "", year: "" }]
    }));
  };

  const handleSaveDraft = async () => {
    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      let res;
      if (resumeId) {
        res = await resumeAPI.updateResume(resumeId, { content: formData });
      } else {
        res = await resumeAPI.createResume({ content: formData });
        setResumeId(res.id);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1500);
    } catch (e: any) {
      setSaveError("Failed to save resume: " + (e.message || "Unknown error"));
    } finally {
      setSaveLoading(false);
    }
  };

  // --- ADDED: PDF download handler ---
  const handleDownload = async () => {
    const filename =
      (formData.personalInfo.fullName?.trim() || "resume")
        .replace(/[^\w\-]+/g, "_")
        .slice(0, 60) + ".pdf";
    await downloadElementAsPDF("resume-preview", filename);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-muted-foreground">Create your professional resume step by step</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={formData.personalInfo.fullName}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.personalInfo.email}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.personalInfo.phone}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value }
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="New York, NY"
                            value={formData.personalInfo.location}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, location: e.target.value }
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="linkedin.com/in/johndoe"
                          value={formData.personalInfo.linkedin}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          placeholder="github.com/johndoe"
                          value={formData.personalInfo.github}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, github: e.target.value }
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          placeholder="Brief summary of your professional background..."
                          rows={4}
                          value={formData.summary}
                          onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Work Experience
                        <Button variant="outline" size="sm" onClick={addExperience}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Company</Label>
                              <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) => {
                                  const newExp = [...formData.experience];
                                  newExp[index].company = e.target.value;
                                  setFormData(prev => ({ ...prev, experience: newExp }));
                                }}
                              />
                            </div>
                            <div>
                              <Label>Position</Label>
                              <Input
                                placeholder="Job Title"
                                value={exp.position}
                                onChange={(e) => {
                                  const newExp = [...formData.experience];
                                  newExp[index].position = e.target.value;
                                  setFormData(prev => ({ ...prev, experience: newExp }));
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              placeholder="Jan 2020 - Present"
                              value={exp.duration}
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[index].duration = e.target.value;
                                setFormData(prev => ({ ...prev, experience: newExp }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                              value={exp.description}
                              onChange={(e) => {
                                const newExp = [...formData.experience];
                                newExp[index].description = e.target.value;
                                setFormData(prev => ({ ...prev, experience: newExp }));
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Education
                        <Button variant="outline" size="sm" onClick={addEducation}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 p-4 border border-border rounded-lg">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              placeholder="University Name"
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...formData.education];
                                newEdu[index].institution = e.target.value;
                                setFormData(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              placeholder="Bachelor of Science"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...formData.education];
                                newEdu[index].degree = e.target.value;
                                setFormData(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Graduation Year</Label>
                            <Input
                              placeholder="2023"
                              value={edu.year}
                              onChange={(e) => {
                                const newEdu = [...formData.education];
                                newEdu[index].year = e.target.value;
                                setFormData(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              placeholder="3.8/4.0"
                              value={edu.gpa}
                              onChange={(e) => {
                                const newEdu = [...formData.education];
                                newEdu[index].gpa = e.target.value;
                                setFormData(prev => ({ ...prev, education: newEdu }));
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Projects
                        <Button variant="outline" size="sm" onClick={addProject}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {formData.projects.map((project, index) => (
                        <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                          <div>
                            <Label>Project Title</Label>
                            <Input
                              placeholder="Amazing Web App"
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].title = e.target.value;
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Tech Stack</Label>
                            <Input
                              placeholder="React, Node.js, MongoDB"
                              value={project.techStack}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].techStack = e.target.value;
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Describe your project and its impact..."
                              rows={3}
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].description = e.target.value;
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                            />
                          </div>
                          <div>
                            <Label>GitHub Link</Label>
                            <Input
                              placeholder="github.com/username/project"
                              value={project.githubLink}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index].githubLink = e.target.value;
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Certifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Technical Skills</Label>
                        <Input
                          placeholder="React, JavaScript, Python, SQL (comma separated)"
                          value={Array.isArray(formData.skills.technical) ? formData.skills.technical.join(", ") : ""}
                          onChange={(e) => {
                            const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                            setFormData(prev => ({
                              ...prev,
                              skills: { ...prev.skills, technical: skills }
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Soft Skills</Label>
                        <Input
                          placeholder="Leadership, Communication, Problem Solving"
                          value={Array.isArray(formData.skills.soft) ? formData.skills.soft.join(", ") : ""}
                          onChange={(e) => {
                            const skills = e.target.value.split(",").map(s => s.trim()).filter(s => s);
                            setFormData(prev => ({
                              ...prev,
                              skills: { ...prev.skills, soft: skills }
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Languages</Label>
                        <Input
                          placeholder="English (Native), Spanish (Conversational)"
                          value={formData.personalInfo.languages}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, languages: e.target.value }
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Certifications</Label>
                        {formData.certifications.map((cert, index) => (
                          <div key={index} className="mb-4 space-y-2 p-3 border border-border rounded-lg">
                            <Input
                              placeholder="Certification Name"
                              value={cert.name}
                              onChange={(e) => {
                                const newCerts = [...formData.certifications];
                                newCerts[index].name = e.target.value;
                                setFormData(prev => ({ ...prev, certifications: newCerts }));
                              }}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Issuer"
                                value={cert.issuer}
                                onChange={(e) => {
                                  const newCerts = [...formData.certifications];
                                  newCerts[index].issuer = e.target.value;
                                  setFormData(prev => ({ ...prev, certifications: newCerts }));
                                }}
                              />
                              <Input
                                placeholder="Year"
                                value={cert.year}
                                onChange={(e) => {
                                  const newCerts = [...formData.certifications];
                                  newCerts[index].year = e.target.value;
                                  setFormData(prev => ({ ...prev, certifications: newCerts }));
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addCertification}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Certification
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={handleSaveDraft} disabled={saveLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {saveLoading ? "Saving..." : "Save Draft"}
                </Button>
                {saveError && <div className="text-red-500 text-xs mt-1">{saveError}</div>}
                {saveSuccess && <div className="text-green-600 text-xs mt-1">Draft saved!</div>}

                {/* CHANGED: enabled & wired up */}
                <Button variant="hero" className="flex-1" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="lg:sticky lg:top-24">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Live Preview
                    <Button variant="outline" size="sm" onClick={() => navigate("/templates")}>
                      <Eye className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* IMPORTANT: white bg + stable id for html2canvas */}
                  <div
                    id="resume-preview"
                    className="bg-white p-6 rounded-lg shadow-inner min-h-[600px] text-black"
                    style={{ width: "794px", maxWidth: "100%" }} // ~A4 width at 96dpi for nicer PDF scaling
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">{formData.personalInfo.fullName || "Your Name"}</h2>
                      <p className="text-gray-600">
                        {formData.personalInfo.email || "your.email@example.com"} |
                        {formData.personalInfo.phone || " +1 (555) 123-4567"}
                      </p>
                      <p className="text-gray-600">
                        {formData.personalInfo.location || "Location"} |
                        {formData.personalInfo.linkedin || " LinkedIn"} |
                        {formData.personalInfo.github || " GitHub"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h3>
                        <p className="text-gray-700 text-sm mt-2">{formData.summary || "Your professional summary will appear here..."}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">EXPERIENCE</h3>
                        <div className="text-gray-700 text-sm mt-2">
                          {formData.experience.length > 0 && formData.experience.some(exp => exp.company || exp.position || exp.duration || exp.description) ? (
                            formData.experience.map((exp, index) => (
                              (exp.company || exp.position || exp.duration || exp.description) && (
                                <div key={index} className="mb-3">
                                  <p className="font-medium">{exp.position || "Position"} - {exp.company || "Company"}</p>
                                  <p className="text-gray-600">{exp.duration || "Duration"}</p>
                                  <p className="mt-1">{exp.description || "Description"}</p>
                                </div>
                              )
                            ))
                          ) : (
                            <div className="mb-3">
                              <p className="font-medium">Job Title - Company Name</p>
                              <p className="text-gray-600">Duration</p>
                              <p className="mt-1">Your job description will appear here...</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">EDUCATION</h3>
                        <div className="text-gray-700 text-sm mt-2">
                          {formData.education.length > 0 && formData.education.some(edu => edu.institution || edu.degree || edu.year) ? (
                            formData.education.map((edu, index) => (
                              (edu.institution || edu.degree || edu.year) && (
                                <div key={index} className="mb-3">
                                  <p className="font-medium">{edu.degree || "Degree"} from {edu.institution || "Institution"}</p>
                                  <p className="text-gray-600">{edu.year || "Year"} {edu.gpa && `(GPA: ${edu.gpa})`}</p>
                                </div>
                              )
                            ))
                          ) : (
                            <div className="mb-3">
                              <p className="font-medium">Degree - University Name</p>
                              <p className="text-gray-600">Graduation Year (GPA: X.X/Y.Y)</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">PROJECTS</h3>
                        <div className="text-gray-700 text-sm mt-2">
                          {formData.projects.length > 0 && formData.projects.some(project => project.title || project.techStack || project.description) ? (
                            formData.projects.map((project, index) => (
                              (project.title || project.techStack || project.description) && (
                                <div key={index} className="mb-2">
                                  <p className="font-medium">{project.title || "Project Title"}</p>
                                  <p className="text-gray-600">{project.techStack || "Tech Stack"}</p>
                                  <p className="mt-1">{project.description || "Description"}</p>
                                  {project.githubLink && <p className="text-blue-500 text-xs">{project.githubLink}</p>}
                                </div>
                              )
                            ))
                          ) : (
                            <div className="mb-2">
                              <p className="font-medium">Project Title</p>
                              <p className="text-gray-600">Tech Stack</p>
                              <p className="mt-1">Project description will appear here...</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">SKILLS</h3>
                        <p className="text-gray-700 text-sm mt-2">
                          {formData.skills.technical.length > 0 && `Technical: ${formData.skills.technical.join(", ")}`}
                          {formData.skills.soft.length > 0 && (formData.skills.technical.length > 0 ? "; " : "") + `Soft: ${formData.skills.soft.join(", ")}`}
                          {formData.personalInfo.languages && (formData.skills.technical.length > 0 || formData.skills.soft.length > 0 ? "; " : "") + `Languages: ${formData.personalInfo.languages}`}
                          {formData.certifications.length > 0 && formData.certifications.some(c => c.name) && (formData.skills.technical.length > 0 || formData.skills.soft.length > 0 || formData.personalInfo.languages ? "; " : "") + `Certifications: ${formData.certifications.filter(c => c.name).map(c => `${c.name}${c.issuer ? ` (${c.issuer}${c.year ? `, ${c.year}` : ''})` : ''}`).join(", ")}`}
                          {(!formData.skills.technical.length && !formData.skills.soft.length && !formData.personalInfo.languages && !formData.certifications.some(c => c.name)) && "Your skills will be listed here..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
