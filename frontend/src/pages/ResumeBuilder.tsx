import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Plus, Download, Eye, Save } from "lucide-react";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: ""
    },
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    projects: [{ title: "", techStack: "", description: "", githubLink: "" }],
    skills: { technical: [], soft: [] },
    certifications: [{ name: "", issuer: "", year: "" }]
  });

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
                          <Input id="fullName" placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="New York, NY" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input id="linkedin" placeholder="linkedin.com/in/johndoe" />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input id="github" placeholder="github.com/johndoe" />
                      </div>
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea id="summary" placeholder="Brief summary of your professional background..." rows={4} />
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
                              <Input placeholder="Company Name" />
                            </div>
                            <div>
                              <Label>Position</Label>
                              <Input placeholder="Job Title" />
                            </div>
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input placeholder="Jan 2020 - Present" />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Describe your responsibilities and achievements..." rows={3} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Institution</Label>
                          <Input placeholder="University Name" />
                        </div>
                        <div>
                          <Label>Degree</Label>
                          <Input placeholder="Bachelor of Science" />
                        </div>
                        <div>
                          <Label>Graduation Year</Label>
                          <Input placeholder="2023" />
                        </div>
                        <div>
                          <Label>GPA (Optional)</Label>
                          <Input placeholder="3.8/4.0" />
                        </div>
                      </div>
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
                            <Input placeholder="Amazing Web App" />
                          </div>
                          <div>
                            <Label>Tech Stack</Label>
                            <Input placeholder="React, Node.js, MongoDB" />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Describe your project and its impact..." rows={3} />
                          </div>
                          <div>
                            <Label>GitHub Link</Label>
                            <Input placeholder="github.com/username/project" />
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
                        <Input placeholder="React, JavaScript, Python, SQL (comma separated)" />
                      </div>
                      <div>
                        <Label>Soft Skills</Label>
                        <Input placeholder="Leadership, Communication, Problem Solving" />
                      </div>
                      <div>
                        <Label>Languages</Label>
                        <Input placeholder="English (Native), Spanish (Conversational)" />
                      </div>
                      <div>
                        <Label>Certifications</Label>
                        <Textarea placeholder="List your certifications..." rows={3} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="hero" className="flex-1">
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
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-6 rounded-lg shadow-inner min-h-[600px] text-black">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Your Name</h2>
                      <p className="text-gray-600">your.email@example.com | +1 (555) 123-4567</p>
                      <p className="text-gray-600">Location | LinkedIn | GitHub</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h3>
                        <p className="text-gray-700 text-sm mt-2">Your professional summary will appear here...</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">EXPERIENCE</h3>
                        <div className="text-gray-700 text-sm mt-2">
                          <div className="mb-3">
                            <p className="font-medium">Job Title - Company Name</p>
                            <p className="text-gray-600">Duration</p>
                            <p className="mt-1">Your job description will appear here...</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">PROJECTS</h3>
                        <div className="text-gray-700 text-sm mt-2">
                          <div className="mb-2">
                            <p className="font-medium">Project Title</p>
                            <p className="text-gray-600">Tech Stack</p>
                            <p className="mt-1">Project description will appear here...</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-1">SKILLS</h3>
                        <p className="text-gray-700 text-sm mt-2">Your skills will be listed here...</p>
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