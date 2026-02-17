import { Card } from "@/components/ui/card";
import { Zap, BookOpen, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const AnimatedProgress = ({ value, isVisible }: { value: number; isVisible: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => setWidth(value), 200);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, value]);

  return (
    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const Skills = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  const skillCategories = [
    {
      title: "Advanced",
      icon: Zap,
      description: "Core technologies I work with daily",
      skills: [
        { name: "HTML & CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 92 },
        { name: "NestJS", level: 85 },
        { name: "MongoDB", level: 88 },
        { name: "LangGraph AI", level: 80 },
        { name: "Kafka", level: 78 },
        { name: "n8n", level: 75 },
      ],
    },
    {
      title: "Beginner",
      icon: BookOpen,
      description: "Technologies I'm currently exploring",
      skills: [
        { name: "Docker", level: 55 },
        { name: "Java", level: 60 },
        { name: "Figma", level: 50 },
        { name: "CapCut", level: 55 },
      ],
    },
    {
      title: "Certifications",
      icon: Award,
      description: "Professional course completions",
      skills: [
        { name: "Algorithms Data Collection (Coursera)", level: 85 },
        { name: "Deep Learning (Python)", level: 80 },
        { name: "Infosys Springboard (React JS)", level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-hero-gradient-from/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Expertise</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Skills & <span className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
            across various technologies and tools.
          </p>
        </div>

        <div
          ref={skillsRef}
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className={`p-6 sm:p-8 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-border/50 animate-fade-up ${skillsVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{category.description}</p>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                    </div>
                    <AnimatedProgress value={skill.level} isVisible={skillsVisible} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-14 animate-fade-up ${isVisible ? "visible" : ""} delay-500`}>
          <p className="text-muted-foreground italic">
            Always learning and exploring new technologies to stay current with industry trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
