import { ArrowRight, Upload, Edit, Download, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Import or Start Fresh",
    description: "Upload your existing resume or start from scratch. Connect your GitHub to auto-import projects and skills.",
    color: "text-primary"
  },
  {
    step: "02", 
    icon: Edit,
    title: "AI-Powered Editing",
    description: "Our AI analyzes and suggests improvements to your content, formatting, and keyword optimization for ATS systems.",
    color: "text-brand-secondary"
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Smart Optimization",
    description: "Get personalized skill suggestions, job-specific optimizations, and real-time feedback to maximize your impact.",
    color: "text-brand-accent"
  },
  {
    step: "04",
    icon: Download,
    title: "Export & Apply",
    description: "Download your polished resume in multiple formats and get matched with relevant job opportunities.",
    color: "text-emerald-500"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            From Resume to 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Dream Job</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes it easy to create a professional resume that gets results. 
            Follow these simple steps to transform your career prospects.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0">
                  <ArrowRight className="absolute -right-2 -top-2 h-4 w-4 text-muted-foreground" />
                </div>
              )}

              <Card className="relative z-10 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-background border-border/50 group-hover:border-primary/30">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    {/* Step Number */}
                    <div className="relative">
                      <div className="text-6xl font-bold text-muted-foreground/20 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        {step.step}
                      </div>
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${step.color === 'text-primary' ? 'from-primary to-primary-glow' : 
                        step.color === 'text-brand-secondary' ? 'from-brand-secondary to-blue-400' :
                        step.color === 'text-brand-accent' ? 'from-brand-accent to-purple-400' :
                        'from-emerald-500 to-teal-500'} p-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="h-8 w-8 text-white mx-auto" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "Resumes Created" },
            { value: "95%", label: "Success Rate" },
            { value: "24/7", label: "AI Support" },
            { value: "100+", label: "Templates" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};