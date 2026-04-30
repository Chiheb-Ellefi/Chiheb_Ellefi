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
    <section id="about" className="w-full py-24">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-12 px-8 md:px-16">
        01 — About
      </p>

      {/* Heading — sits above, inset to align with text column */}
      <div className="px-8 md:px-16 mb-10">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-none mb-4">
          Chiheb Ellefi
        </h1>
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Backend Developer · System Design · DevOps
        </p>
      </div>

      {/* Image + Paragraphs — centered with each other */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center w-full">

        {/* Image */}
        <div className="flex-shrink-0 pl-8 md:pl-16 w-full md:w-[340px] lg:w-[420px] xl:w-[480px]">
          <div className="relative w-full aspect-square rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10 pointer-events-none" />
            <Image
              src={meImg}
              alt="Chiheb Ellefi"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Paragraphs only */}
        <div className="flex-1 min-w-0 pr-8 md:pr-16 space-y-5 text-foreground/70 leading-relaxed text-base sm:text-lg">
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
      </div>

      {/* Skills — below, inset to align with text column */}
      <div className="px-8 md:px-16 mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-4">
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
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/50 mb-4">
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

      <div className="mt-20 h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
    </section>
  );
}