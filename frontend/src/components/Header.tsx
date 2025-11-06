import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GoResume
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/builder" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Build
            </Link>
            <Link 
              to="/templates" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link 
              to="/analyzer" 
              className="text-foreground hover:text-primary transition-colors"
            >
              AI Analyzer
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/builder" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Build
              </Link>
              <Link 
                to="/templates" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                to="/analyzer" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Analyzer
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};