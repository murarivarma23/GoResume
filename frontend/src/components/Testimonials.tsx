import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    image: "👩‍💻",
    rating: 5,
    text: "GoResume's AI suggestions transformed my resume completely. I went from getting no responses to landing interviews at top tech companies. The GitHub integration saved me hours!"
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "Microsoft",
    image: "👨‍💼",
    rating: 5,
    text: "The skill recommendations were spot-on and helped me identify gaps I didn't even know I had. Got my dream job within 3 weeks of using GoResume!"
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Meta",
    image: "👩‍🎨",
    rating: 5,
    text: "Beautiful templates and intelligent content suggestions made creating my portfolio resume a breeze. The AI analysis gave me confidence that my resume was perfect."
  },
  {
    name: "David Park",
    role: "Data Scientist",
    company: "Netflix",
    image: "👨‍🔬",
    rating: 5,
    text: "The job matching feature connected me with opportunities I wouldn't have found otherwise. GoResume understands what recruiters are looking for."
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "Spotify",
    image: "👩‍💼",
    rating: 5,
    text: "From upload to final resume in under 30 minutes. The optimization suggestions increased my response rate by 300%. Absolutely game-changing!"
  },
  {
    name: "Alex Thompson",
    role: "DevOps Engineer",
    company: "Amazon",
    image: "👨‍💻",
    rating: 5,
    text: "The technical skills analysis was incredibly accurate. It suggested emerging technologies that perfectly aligned with my career goals."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Star className="h-4 w-4" />
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Loved by 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who've transformed their careers with GoResume. 
            Here's what they have to say about their success.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                
                <div className="space-y-6">
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-primary rounded-3xl text-white shadow-glow">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-white text-white" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 from 10,000+ users</span>
            </div>
            <p className="text-lg font-medium">
              Ready to join our success stories?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};