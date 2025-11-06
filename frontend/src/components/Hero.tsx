import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Dream Resume </span>
                with AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Create professional resumes in minutes with our AI-powered builder. 
                Get personalized suggestions, optimize your content, and land your dream job.
              </p>
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/builder">
                  Start Building Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/analyzer">Analyze Existing Resume</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>✓ Free forever</span>
              <span>✓ No credit card required</span>
              <span>✓ ATS-friendly templates</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-primary rounded-2xl opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-secondary rounded-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-brand-accent rounded-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-card bg-gradient-card">
                <img
                  src={heroImage}
                  alt="AI Resume Builder Interface"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>

              {/* Floating cards */}
              <div className="absolute -right-6 top-8 bg-card border border-border rounded-lg p-3 shadow-elegant animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-xs font-medium">Resume Score: 95%</span>
                </div>
              </div>

              <div className="absolute -left-6 bottom-12 bg-card border border-border rounded-lg p-3 shadow-elegant animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium">AI Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};