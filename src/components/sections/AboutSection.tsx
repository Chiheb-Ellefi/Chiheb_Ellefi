"use client";
import Image from "next/image";
import meImg from "../../../public/assets/me.png";

export default function AboutSection() {
  const backendSkills = [
    "Java", "Spring Boot", "Spring Security", "OAuth2 / JWT",
    "Spring Data JPA", "Hibernate", "Spring AOP",
    "Microservices", "REST APIs", "Distributed Systems",
  ];

  const infraSkills = [
    "Docker", "Linux (Fedora)", "Redis", "PostgreSQL",
    "Kafka", "Nginx", "CI/CD", "Git & GitHub",
  ];

  return (
    <section id="about" className="w-[90%] max-w-[1400px] mx-auto py-24">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-12">
        01 — About
      </p>

      {/* Mobile Header: Image and Name in a single row */}
      <div className="flex md:hidden items-center gap-6 mb-10">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-full overflow-hidden border-2 border-primary/20">
          <Image
            src={meImg}
            alt="Chiheb Ellefi"
            fill
            className="object-cover object-top scale-[1.15]"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-none mb-3">
            Chiheb Ellefi
          </h1>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted-foreground leading-relaxed">
            Backend Developer<br />
            System Design · DevOps
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch">
        
        {/* Desktop Image: Matches height of content, zoomed in on face */}
        <div className="hidden md:block relative w-[40%] lg:w-[45%] shrink-0 rounded-2xl overflow-hidden bg-muted/20">
          <Image
            src={meImg}
            alt="Chiheb Ellefi"
            fill
            className="object-cover object-top scale-[1.15] transition-transform duration-700 hover:scale-[1.2]"
            priority
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center py-4">
          
          {/* Desktop Header */}
          <div className="hidden md:block mb-10">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              Chiheb Ellefi
            </h1>
            <p className="font-mono text-sm lg:text-base uppercase tracking-widest text-muted-foreground">
              Backend Developer · System Design · DevOps
            </p>
          </div>

          {/* About Me Text */}
          <div className="space-y-6 mb-14 text-foreground/70 leading-relaxed text-base lg:text-xl">
            <p>
              I'm a backend-focused developer with a deep interest in how systems behave
              in production — not just how they are built. I spend most of my time
              designing distributed systems, exploring trade-offs, and understanding the
              mechanics behind scalability, fault tolerance, and performance.
            </p>
            <p>
              My work revolves around the Spring ecosystem, event-driven architectures,
              and infrastructure tooling — OAuth2 flows, API gateways, service discovery,
              caching strategies, and asynchronous messaging. I'm drawn to how components
              interact: how a request flows, how failures propagate, how systems recover.
            </p>
            <p>
              This portfolio is a live system, not a static showcase. Explore services,
              simulate traffic, trigger failures — and watch how the architecture reacts.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-4">
                Backend & System Design
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {backendSkills.map((skill, i) => (
                  <span key={skill} className="text-sm lg:text-base text-foreground/60 font-mono">
                    {skill}{i < backendSkills.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-4">
                Infrastructure & Performance
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {infraSkills.map((skill, i) => (
                  <span key={skill} className="text-sm lg:text-base text-foreground/60 font-mono">
                    {skill}{i < infraSkills.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
    </section>
  );
}