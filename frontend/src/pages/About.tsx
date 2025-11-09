import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Users, Zap, Award, Globe, Code, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Resumes Created", value: "50K+", icon: Brain },
    { label: "Job Placements", value: "12K+", icon: Target },
    { label: "Active Users", value: "25K+", icon: Users },
    { label: "AI Optimizations", value: "100K+", icon: Zap }
  ];

  const team = [
    {
      name: "Murari Varma",
      role: "Web Developer",
      bio: "Aspiring Web Developer",
      image: "/placeholder.svg"
    },
    {
      name: "Geet Avaneesh",
      role: "Frontend and API",
      bio: "React Developer and handling the API",
      image: "/placeholder.svg"
    },
    {
      name: "Akshith",
      role: "Database and Deployment",
      bio: "Cloud Deployment and Database Management expert",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in everything we build, from AI algorithms to user experience."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making professional resume tools available to everyone, regardless of background or experience."
    },
    {
      icon: Code,
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to solve real-world career challenges."
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Measuring success by the careers we help launch and the lives we positively impact."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">GoResume</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people create, optimize, and present their professional stories. 
              Using AI-powered insights and beautifully designed templates, we help job seekers land their dream careers.
            </p>
          </div>
        </section>


        {/* Mission Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Job searching shouldn't be a barrier to achieving your career goals. That's why we created GoResume - 
                to democratize access to professional resume creation and career optimization tools. Our AI-powered platform 
                analyzes your skills, suggests improvements, and helps you present your best professional self to potential employers.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                  <p className="text-muted-foreground">Smart algorithms that understand what recruiters want to see</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Results-Driven</h3>
                  <p className="text-muted-foreground">Proven strategies that increase interview callbacks by 40%</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">User-Centric</h3>
                  <p className="text-muted-foreground">Designed with feedback from thousands of job seekers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a diverse group of engineers, designers, and career experts united by our passion for helping others succeed.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from product development to customer support.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already elevated their careers with GoResume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" className="px-8">
                Start Building Your Resume
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;