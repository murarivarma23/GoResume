import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, LogOut, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);     // ✅ start true
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("User");
  const navigate = useNavigate();
  const location = useLocation();

  // Derive display name from metadata or email
  const deriveDisplayName = (u: any) => {
    const first =
      u?.user_metadata?.first_name ||
      u?.user_metadata?.firstName ||
      u?.user_metadata?.given_name ||
      "";
    if (first) return first;
    const email = u?.email || "";
    return email ? email.split("@")[0] : "User";
  };

  // Initial load + auth listener (single source of truth)
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          setDisplayName(deriveDisplayName(session.user));
        } else {
          setUser(null);
          setDisplayName("User");
        }
      } catch (err) {
        console.error("Header init error:", err);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Fires on sign-in, sign-out, token refresh
        if (session?.user) {
          setUser(session.user);
          setDisplayName(deriveDisplayName(session.user));
        } else {
          setUser(null);
          setDisplayName("User");
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Optional: when route changes, close mobile menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();   // ✅ client-side signout only
      setUser(null);
      setDisplayName("User");
      navigate("/");                   // ✅ SPA navigation, no hard reload
    } catch (err) {
      console.error("Logout error:", err);
      // Even if error, force UI to logged-out state
      setUser(null);
      setDisplayName("User");
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GoResume
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8 flex-1 justify-center mx-8">
            <Link to="/builder" className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              Build
            </Link>
            <Link to="/templates" className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              Templates
            </Link>
            <Link to="/analyzer" className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              AI Analyzer
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors whitespace-nowrap">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {loading ? (
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {displayName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="py-4 border-t border-border lg:hidden">
            <nav className="flex flex-col space-y-4">
              <Link to="/builder" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                Build
              </Link>
              <Link to="/templates" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                Templates
              </Link>
              <Link to="/analyzer" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                AI Analyzer
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors px-2 py-1">
                About
              </Link>

              <div className="flex flex-col space-y-2 pt-4">
                {loading ? null : user ? (
                  <>
                    <div className="px-2 py-2 text-sm font-medium border-b border-border flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {displayName}
                    </div>
                    <Button variant="ghost" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="hero" asChild>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
