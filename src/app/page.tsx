"use client";

import ArchitectureDiagram from "@/components/system/ArchitectureDiagram";
import SimulationControls from "@/components/controls/SimulationControls";
import TourGuide from "@/components/system/TourGuide";
import { useState } from "react";
import { Settings2, X } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-full relative">
      {/* Main Architecture View */}
      <div className="flex-1 relative overflow-hidden">
        <TourGuide />
        <ArchitectureDiagram />
      </div>
      
      {/* Mobile Toggle for Simulation Controls */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-20 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
      >
        {isSidebarOpen ? <X size={24} /> : <Settings2 size={24} />}
      </button>

      {/* Simulation Controls Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-40 w-full sm:w-80 border-l border-border bg-card/95 backdrop-blur-md flex flex-col 
        transition-transform duration-300 ease-in-out transform
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 md:bg-card/50 md:backdrop-blur-sm
      `}>
        <SimulationControls />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
