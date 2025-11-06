import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GoResume
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              AI-powered resume builder that helps you create professional resumes 
              and land your dream job faster.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/builder" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Job Matcher
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume Guides
                </Link>
              </li>
              <li>
                <Link to="/career-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} GoResume. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};