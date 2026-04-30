"use client";

import ArchitectureDiagram from "@/components/system/ArchitectureDiagram";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TerminalSection from "@/components/sections/TerminalSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero / About Section */}
      <section className="w-full relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AboutSection />
        </div>
      </section>

      {/* Services Cluster Section - Subtle gradient background */}
      <section id="cluster" className="w-full py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Services Cluster</h2>
            <p className="text-foreground/70">Our interconnected service architecture</p>
          </div>
          <div className="relative h-[600px] rounded-xl border border-border/30 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* Terminal Section - Different subtle gradient */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">System Activity</h2>
            <p className="text-foreground/70">Real-time monitoring and logs</p>
          </div>
          <TerminalSection />
        </div>
      </section>

      {/* Projects Section - Minimal background */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 relative pb-20">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Projects</h2>
            <p className="text-foreground/70">Recent work and case studies</p>
          </div>
          <ProjectsSection />
        </div>
      </section>
    </div>
  );
}