import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Experience = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Junior Software Developer",
      company: "Skillmine Technologies",
      period: "Present",
      description:
        "Working as a full-time developer on SkillZen, an AI-powered course creator and learning platform. Building scalable features using React, NestJS, MongoDB, LangGraph AI, and Kafka for event-driven architecture. Collaborating with cross-functional teams to deliver production-ready features.",
      skills: ["React", "NestJS", "MongoDB", "LangGraph AI", "Kafka", "Tailwind CSS"],
    },
    {
      title: "Software Development Intern",
      company: "Skillmine Technologies",
      period: "6 Months",
      description:
        "Started as an intern contributing to the SkillZen platform. Gained hands-on experience in building full-stack features, working with REST APIs, database design, and AI integration. Transitioned to a full-time role based on performance.",
      skills: ["React", "NestJS", "MongoDB", "JavaScript", "REST APIs"],
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Experience</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey, showcasing the roles and contributions
            that have shaped my career as a developer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block" />

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative animate-fade-up ${isVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[22px] w-5 h-5 bg-background border-[3px] border-primary rounded-full hidden md:flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>

                  <Card className="ml-0 md:ml-16 p-0 overflow-hidden group hover:shadow-xl transition-all duration-500 border-border/50">
                    {/* Card header accent */}
                    <div className="h-1 bg-primary" />

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </div>
                        </div>
                        <Badge variant="outline" className="self-start sm:self-center gap-1.5 px-3 py-1.5 border-primary/30 bg-primary/5">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
