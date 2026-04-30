"use client";

import { ReactNode, useState } from "react";
import { Terminal, Activity, GitBranch, User, Cpu, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Sidebar / Left Navigation (Mobile Only now or kept as drawer) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col py-4 gap-6 shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
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
          <SidebarItem icon={<User size={20} />} label="About Me" href="#about" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={<Activity size={20} />} label="Cluster" href="#cluster" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarItem icon={<GitBranch size={20} />} label="Projects" href="#projects" onClick={() => setIsMobileMenuOpen(false)} />
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
            <h1 className="font-semibold text-base md:text-lg tracking-tight truncate">Portfolio</h1>

          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About Me</a>
            <a href="#cluster" className="hover:text-foreground transition-colors">Cluster</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          </nav>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto relative bg-black/20 custom-scrollbar scroll-smooth">
          {/* A grid overlay pattern for that techy look */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, href, onClick }: { icon: ReactNode; label: string; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 w-full p-3 md:p-2.5 hover:bg-border rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200 whitespace-nowrap overflow-hidden"
    >
      <div className="shrink-0">
        {icon}
      </div>
      <span className="text-sm font-medium md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </a>
  );
}
