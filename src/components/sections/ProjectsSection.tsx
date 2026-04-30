"use client";

import { useEffect, useState } from 'react';
import { GitBranch, Star, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { fetchGitHubProjects, GitHubRepo } from '@/lib/github';

const FEATURED_COUNT = 3;

export default function ProjectsSection() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (projects.length === 0) {
      setLoading(true);
      fetchGitHubProjects().then(data => {
        setProjects(data);
        setLoading(false);
      });
    }
  }, [projects.length]);

  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section id="projects" className="w-full py-24 px-8 md:px-16">
      {/* Section header */}
      <div className="mb-14">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-4">
          03 — Projects
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Featured Work
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 text-muted-foreground py-12">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="font-mono text-sm">Fetching repositories…</span>
        </div>
      ) : (
        <>
          {/* 3-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featured.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-6 rounded-xl border border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <GitBranch size={16} className="text-primary/50 mt-0.5" />
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3 className="font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {repo.name.replace(/[-_]/g, ' ')}
                </h3>

                <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">
                  {repo.description || "No description provided."}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  {repo.language && (
                    <span className="text-xs font-mono text-primary/60">
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Star size={11} className="fill-current" />
                      {repo.stargazers_count}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* See more button */}
          {rest.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-border/50 text-sm font-mono text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-200"
              >
                See all {projects.length} projects
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}
        </>
      )}

      {/* All Projects Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-card w-full max-w-2xl max-h-[80vh] rounded-xl border border-border/50 flex flex-col shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary/50 block mb-0.5">
                  All Projects
                </span>
                <span className="font-semibold text-foreground">
                  {projects.length} Repositories
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-border/30 text-muted-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal list */}
            <div className="overflow-y-auto flex-1 divide-y divide-border/20">
              {projects.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 px-6 py-4 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                        {repo.name.replace(/[-_]/g, ' ')}
                      </span>
                      {repo.language && (
                        <span className="text-xs font-mono text-primary/40">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 pt-0.5">
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star size={11} className="fill-current" />
                        {repo.stargazers_count}
                      </div>
                    )}
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
