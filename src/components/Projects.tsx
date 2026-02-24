import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "SkillZen — AI Course Platform",
      description:
        "An AI-powered course creator and learning platform that generates personalized courses, quizzes, and learning paths using LangGraph AI. Built with event-driven architecture for scalable real-time features.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&fm=webp&q=80",
      skills: ["React", "NestJS", "MongoDB", "LangGraph AI", "Kafka", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "App Based Digital Audiometer",
      description:
        "An App-Based Digital Audiometer designed for the modern era, offering a portable, cost-effective solution to assess an individual's hearing capabilities.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&fm=webp&q=80",
      skills: ["React Js", "Node Js", "Chart Js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Construction Product Booking",
      description:
        "A comprehensive online platform for the seamless booking of construction products, including bricks, cement, and steel.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&fm=webp&q=80",
      skills: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Birds and Animal Species Identification",
      description:
        "A machine learning-powered species identification app that identifies animals and birds from images with a user-friendly upload and prediction interface.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&fm=webp&q=80",
      skills: ["Python", "Flask", "HTML", "CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-section-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div
          ref={sectionRef}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills in development,
            user experience design, and modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border/50 animate-fade-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
