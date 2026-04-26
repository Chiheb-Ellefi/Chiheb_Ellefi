"use client";

import { ReactNode, useState } from "react";
import { Terminal, Activity, GitBranch, User, Cpu, Menu, X } from "lucide-react";
import TerminalOverlay from "@/components/terminal/TerminalOverlay";
import ProjectsModal from "@/components/modals/ProjectsModal";
import AboutModal from "@/components/modals/AboutModal";
import { useTerminalStore } from "@/store/useTerminalStore";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const toggleTerminal = useTerminalStore(state => state.toggleTerminal);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar / Left Navigation */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col py-4 gap-6 shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-16 md:hover:w-56 md:group md:items-center
        `}
      >
        <div className="flex items-center justify-between px-4 md:px-0 md:justify-center w-full shrink-0">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Cpu size={24} />
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 w-full px-3 overflow-hidden">
          <SidebarItem icon={<Activity size={20} />} label="Architecture" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={<Terminal size={20} />} label="Terminal" onClick={() => { toggleTerminal(); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={<User size={20} />} label="About Me" onClick={() => { setIsAboutOpen(true); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={<GitBranch size={20} />} label="Projects" onClick={() => { setIsProjectsOpen(true); setIsMobileMenuOpen(false); }} />
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-card/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-semibold text-base md:text-lg tracking-tight truncate">Chiheb System</h1>
            <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-[10px] md:text-xs font-medium border border-success/30 flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              <span className="hidden xs:inline">Operational</span>
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono text-muted-foreground truncate">
            <span className="hidden sm:inline">CLUSTER: cl-alpha-01</span>
            <span className="hidden lg:inline">REGION: global-edge</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-hidden relative bg-black/20">
          {/* A grid overlay pattern for that techy look */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {children}
          <TerminalOverlay />
          <ProjectsModal isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
          <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 w-full p-3 md:p-2.5 hover:bg-border rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 whitespace-nowrap overflow-hidden"
    >
      <div className="shrink-0">
        {icon}
      </div>
      <span className="text-sm font-medium md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </button>
  );
}
