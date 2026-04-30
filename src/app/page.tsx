"use client";

import ArchitectureDiagram from "@/components/system/ArchitectureDiagram";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TerminalSection from "@/components/sections/TerminalSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ── About ── */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AboutSection />
        </div>
      </section>

      {/* ── Services Cluster ── embedded, no outer box */}
      <section id="cluster" className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-4">
            02 — Architecture
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Services Cluster
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            An interactive map of the interconnected microservices architecture powering this system.
          </p>

          {/* Diagram — full-width, generous height, no inner border box */}
          <div className="w-full h-[700px]">
            <ArchitectureDiagram />
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
        </div>
      </section>

      {/* ── System Activity (Terminal) ── */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-4">
            System Activity
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-10">
            Live Monitor
          </h2>
          <TerminalSection />
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <ProjectsSection />
        </div>
      </section>

    </div>
  );
}
