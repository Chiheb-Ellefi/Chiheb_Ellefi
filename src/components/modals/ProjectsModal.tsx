"use client";

import { useEffect, useState } from 'react';
import { X, GitBranch, Star, ExternalLink } from 'lucide-react';
import { fetchGitHubProjects, GitHubRepo } from '@/lib/github';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && projects.length === 0) {
      setLoading(true);
      fetchGitHubProjects().then(data => {
        setProjects(data);
        setLoading(false);
      });
    }
  }, [isOpen, projects.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card w-full max-w-4xl max-h-[85vh] rounded-xl border border-border flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-black/20">
              <div className="flex items-center gap-2 font-semibold">
                <GitBranch className="text-primary" size={20} />
                <span>GitHub Repositories</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-border rounded text-muted-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-transparent to-black/10">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-4">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p>Fetching repositories from GitHub API...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map(repo => (
                    <a 
                      key={repo.id} 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-4 rounded-lg border border-border bg-black/20 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col h-full"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-primary group-hover:underline flex items-center gap-2">
                          {repo.name}
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1 text-xs text-warning">
                            <Star size={12} className="fill-warning" />
                            {repo.stargazers_count}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex-1 mb-4">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        {repo.language && (
                          <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground border border-border">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
