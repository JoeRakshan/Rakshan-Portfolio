import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Code2, Briefcase, Award } from "lucide-react";
import profilePhoto from "@/assets/image0.jpeg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const stats = [
    { number: "6+", label: "Projects Completed", icon: Code2 },
    { number: "1+", label: "Years Experience", icon: Briefcase },
    { number: "3+", label: "Certifications", icon: Award },
  ];

  return (
    <section id="about" className="py-24 bg-section-bg relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Know Me <span className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-clip-text text-transparent">Better</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, experience, and what drives my passion
            for creating exceptional digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Photo */}
          <div className={`flex justify-center lg:justify-start animate-fade-left ${isVisible ? "visible" : ""} delay-200`}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              <img
                src={profilePhoto}
                alt="Joe Selva Rakshan"
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl object-cover shadow-xl ring-1 ring-border group-hover:shadow-2xl transition-all duration-500"
              />
              <div className="absolute -bottom-5 -right-5 bg-background p-4 rounded-xl shadow-lg border border-border">
                <p className="text-xs text-muted-foreground">Based in</p>
                <p className="text-sm font-semibold">Tirunelveli, India</p>
                <div className="flex items-center gap-1 mt-1">
                  {/* <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span> */}
                  {/* <p className="text-xs font-medium text-green-600">Open to opportunities</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`animate-fade-right ${isVisible ? "visible" : ""} delay-300`}>
            <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
              I'm a <span className="font-semibold text-primary">Junior Software Developer</span> at
              Skillmine Technologies with over a year of professional experience, including 6 months as
              an intern and 8 months as a full-time developer. I hold a B.Tech in Information Technology
              from Kamaraj College of Engineering and Technology.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Currently, I'm building <span className="font-medium text-foreground">SkillZen</span> — an
              AI-powered course creator and learning platform — using React, NestJS, MongoDB, LangGraph AI,
              and Kafka. I'm passionate about full-stack development, AI integration, and crafting scalable
              products that solve real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:joeselvarakshan@gmail.com">
                <Button className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 text-white gap-2 w-full sm:w-auto">
                  <Mail className="w-4 h-4" />
                  Let's Work Together
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-8 text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-border/50 animate-fade-up ${statsVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
