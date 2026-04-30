"use client";

import ArchitectureDiagram from "@/components/system/ArchitectureDiagram";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TerminalSection from "@/components/sections/TerminalSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen pb-20">
      <AboutSection />
      
      <section id="cluster" className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border flex flex-col shadow-xl overflow-hidden h-[600px]">
          <div className="flex items-center justify-between p-4 border-b border-border bg-black/20">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-primary">●</span>
              <span>Services Cluster</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <TerminalSection />
      
      <ProjectsSection />
    </div>
  );
}
