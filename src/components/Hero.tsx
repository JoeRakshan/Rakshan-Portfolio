import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typing effect
  const roles = ["Junior Software Developer", "Full Stack Developer", "React Developer", "AI Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-hero-gradient-from/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hero-gradient-to/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Location Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-sm gap-2 border-primary/30 bg-primary/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for projects
              </Badge>
            </div>

            {/* Greeting */}
            <p className="text-lg text-muted-foreground mb-2 font-medium">Hello, I'm</p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-clip-text text-transparent">
                Joe Selva
              </span>
              <br />
              <span>Rakshan</span>
            </h1>

            {/* Typing Effect */}
            <div className="h-10 flex items-center justify-center lg:justify-start mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink" />
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Junior Software Developer at Skillmine Technologies, building AI-powered
              products with React, NestJS, and modern web technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 text-white"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="hover:-translate-y-0.5 transition-all duration-300 border-primary/30 hover:border-primary"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right - Profile Photo */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to rounded-2xl opacity-20 blur-xl animate-pulse-glow" />

              {/* Photo */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary/20">
                <img
                  src={profilePhoto}
                  alt="Joe Selva Rakshan"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-hero-gradient-from to-hero-gradient-to rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg animate-bounce-subtle">
                <MapPin className="w-5 h-5" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-border">
                <p className="text-xs text-muted-foreground">Currently at</p>
                <p className="text-sm font-semibold bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-clip-text text-transparent">
                  Skillmine Technologies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
