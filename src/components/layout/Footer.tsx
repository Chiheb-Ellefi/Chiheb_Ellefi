import { Code, Briefcase, Mail, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-semibold text-lg tracking-tight">Chiheb Ellefi</h2>
          <p className="text-sm text-muted-foreground">Software Engineering Student</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/Chiheb-Ellefi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
            <Code size={20} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/chihebellefi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
            <Briefcase size={20} />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a href="mailto:chiheb.ellefi@example.com" className="text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-2">
            <Mail size={20} />
            <span className="text-sm font-medium">Email</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-full flex items-center gap-2 text-sm font-medium">
            <FileText size={16} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
