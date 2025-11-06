import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModernProfessional } from "@/components/resume-templates/ModernProfessional";
import { ExecutiveClassic } from "@/components/resume-templates/ExecutiveClassic";
import { CreativePortfolio } from "@/components/resume-templates/CreativePortfolio";
import { AcademicScholar } from "@/components/resume-templates/AcademicScholar";
import { StartupInnovator } from "@/components/resume-templates/StartupInnovator";
import { MinimalistPro } from "@/components/resume-templates/MinimalistPro";
import { ResumeData } from "@/types/resume";

const Templates = () => {
  const navigate = useNavigate();

  const sampleData: ResumeData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    summary: "Experienced professional with expertise in developing innovative solutions.",
    experience: [
      {
        company: "Tech Company Inc.",
        position: "Senior Software Engineer",
        duration: "Jan 2020 - Present",
        description: "Led development of scalable applications."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2018"
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        techStack: "React, Node.js, MongoDB",
        description: "Built a scalable e-commerce platform."
      }
    ],
    skills: "JavaScript, React, Node.js, Python, SQL"
  };

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech professionals",
      category: "Technology",
      component: ModernProfessional,
      tags: ["Modern", "Clean", "ATS-Friendly"]
    },
    {
      id: 2,
      name: "Executive Classic",
      description: "Sophisticated layout ideal for senior management positions",
      category: "Executive",
      component: ExecutiveClassic,
      tags: ["Elegant", "Professional", "Leadership"]
    },
    {
      id: 3,
      name: "Creative Portfolio",
      description: "Vibrant design showcasing creativity for design professionals",
      category: "Creative",
      component: CreativePortfolio,
      tags: ["Creative", "Colorful", "Portfolio"]
    },
    {
      id: 4,
      name: "Academic Scholar",
      description: "Comprehensive format for academic and research positions",
      category: "Academic",
      component: AcademicScholar,
      tags: ["Academic", "Detailed", "Research"]
    },
    {
      id: 5,
      name: "Startup Innovator",
      description: "Dynamic layout for entrepreneurs and startup professionals",
      category: "Startup",
      component: StartupInnovator,
      tags: ["Dynamic", "Innovation", "Startup"]
    },
    {
      id: 6,
      name: "Minimalist Pro",
      description: "Simple yet effective design focusing on content clarity",
      category: "Minimalist",
      component: MinimalistPro,
      tags: ["Minimal", "Clean", "Simple"]
    }
  ];

  const categories = ["All", "Technology", "Executive", "Creative", "Academic", "Startup", "Minimalist"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Resume <span className="bg-gradient-primary bg-clip-text text-transparent">Templates</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, ATS-friendly resume templates. 
              Each template is crafted to help you stand out and land your dream job.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => {
                const TemplateComponent = template.component;
                return (
                  <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-muted h-64">
                        <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                          <TemplateComponent data={sampleData} isEditable={false} />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => navigate(`/template/${template.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => navigate(`/template/${template.id}`)}
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Perfect Resume?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get started with any template and customize it to match your unique professional profile.
            </p>
            <Button size="lg" variant="hero" className="px-8">
              Start Building Now
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Templates;