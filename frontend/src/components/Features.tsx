import { Brain, FileText, Target, Briefcase, Github, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Get intelligent feedback on your resume with our advanced AI that analyzes content, formatting, and ATS compatibility.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from 20+ ATS-friendly templates designed by hiring experts and loved by recruiters.",
    gradient: "from-brand-secondary to-blue-400"
  },
  {
    icon: Target,
    title: "Smart Optimization",
    description: "Automatically optimize your resume content for specific job roles and industries with AI suggestions.",
    gradient: "from-brand-accent to-purple-400"
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description: "Find relevant job opportunities that match your skills and experience with our intelligent job recommender.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Automatically import your projects and contributions from GitHub to showcase your technical expertise.",
    gradient: "from-gray-600 to-gray-800"
  },
  {
    icon: Sparkles,
    title: "Skill Suggestions",
    description: "Discover relevant skills to add based on your experience and industry trends to stay competitive.",
    gradient: "from-emerald-500 to-teal-500"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Everything You Need to 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you create, optimize, and enhance your resume 
            to stand out in today's competitive job market.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-primary rounded-2xl text-white font-medium shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
            <Brain className="h-5 w-5" />
            Ready to build your perfect resume?
          </div>
        </div>
      </div>
    </section>
  );
};