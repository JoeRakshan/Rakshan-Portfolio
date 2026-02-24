import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border/50 relative">
      {/* Scroll to top button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          size="icon"
          aria-label="Scroll to top"
          className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-12 h-12"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-primary mb-4 block"
            >
              Joe Selva Rakshan
            </button>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Junior Software Developer at Skillmine Technologies, building
              AI-powered products with modern web technologies.
            </p>
            <div className="flex gap-2">
              <a href="https://github.com/joeselvarakshan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  className="rounded-full hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/joe-selva-rakshan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="LinkedIn"
                  className="rounded-full hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
              <a href="mailto:joeselvarakshan@gmail.com" aria-label="Email">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Email"
                  className="rounded-full hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Quick Links</h3>
            <div className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Get In Touch</h3>
            <div className="space-y-2.5 text-muted-foreground">
              <a
                href="mailto:joeselvarakshan@gmail.com"
                className="block hover:text-primary transition-colors"
              >
                joeselvarakshan@gmail.com
              </a>
              <a href="tel:+919360607325" className="block hover:text-primary transition-colors">
                +91 9360607325
              </a>
              <p>Tirunelveli, India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Joe Selva Rakshan. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
