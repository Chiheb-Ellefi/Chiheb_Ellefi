"use client";

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
    <section id="about" className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      {/* Name + title */}
      <div className="mb-12">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-4">
          01 — About
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
          Chiheb Ellefi
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Backend Developer · System Design · DevOps
        </p>
      </div>

      {/* Bio paragraphs */}
      <div className="max-w-2xl space-y-5 mb-16 text-foreground/70 leading-relaxed text-base sm:text-lg">
        <p>
          I'm a backend-focused developer with a deep interest in how systems behave
          in production — not just how they are built. I spend most of my time
          designing distributed systems, exploring trade-offs, and understanding the
          mechanics behind scalability, fault tolerance, and performance.
        </p>
        <p>
          My work revolves around the Spring ecosystem, event-driven architectures,
          and infrastructure tooling — OAuth2 flows, API gateways, service discovery,
          caching strategies, and asynchronous messaging. I'm drawn to the question
          of how components interact: how a request flows, how failures propagate,
          how systems recover.
        </p>
        <p>
          This portfolio is a live system, not a static showcase. You can explore
          services, simulate traffic, trigger failures, and watch how the architecture
          reacts — reflecting how I think about software: as interconnected, evolving
          organisms, not isolated pieces of code.
        </p>
      </div>

      {/* Skills — inline, no boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-5">
            Backend & System Design
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {backendSkills.map((skill, i) => (
              <span key={skill} className="text-sm text-foreground/60 font-mono">
                {skill}{i < backendSkills.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-5">
            Infrastructure & Performance
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {infraSkills.map((skill, i) => (
              <span key={skill} className="text-sm text-foreground/60 font-mono">
                {skill}{i < infraSkills.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
    </section>
  );
}
