"use client";

import { X, User, Briefcase, Code, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card w-full max-w-3xl max-h-[85vh] rounded-xl border border-border flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-black/20">
              <div className="flex items-center gap-2 font-semibold">
                <User className="text-primary" size={20} />
                <span>Developer Profile // Chiheb Ellefi</span>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-border rounded text-muted-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 min-h-0 bg-gradient-to-b from-transparent to-black/10">
              <div className="flex flex-col md:flex-row gap-8">

                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Chiheb Ellefi</h2>
                    <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
                      Backend Developer // System Design & DevOps Focus
                    </p>
                  </div>

                  <div className="prose prose-invert prose-sm max-w-none text-muted-foreground">
                    <p>
                      I’m a backend-focused software developer with a strong interest in how systems behave in production — not just how they are built.
                      I spend most of my time designing and implementing distributed systems, exploring trade-offs, and understanding the mechanics behind scalability, fault tolerance, and performance.
                    </p>

                    <p>
                      My work revolves around the Spring ecosystem, event-driven architectures, and infrastructure tooling. I’ve built systems using
                      OAuth2/OpenID authentication flows, API gateways, service discovery, caching strategies, and asynchronous messaging.
                      I’m particularly interested in how components interact: how a request flows, how failures propagate, and how systems recover.
                    </p>

                    <p>
                      This portfolio is designed as a live system rather than a static showcase.
                      You can explore services, simulate traffic, trigger failures, and observe how the system reacts — reflecting how I think about software:
                      as interconnected, evolving systems rather than isolated pieces of code.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-black/20 border border-border p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Code size={16} />
                        <h3 className="font-semibold text-sm">Backend & System Design</h3>
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                        <span className="bg-secondary px-2 py-1 rounded">Java</span>
                        <span className="bg-secondary px-2 py-1 rounded">Spring Boot</span>
                        <span className="bg-secondary px-2 py-1 rounded">Spring Security (OAuth2 / JWT)</span>
                        <span className="bg-secondary px-2 py-1 rounded">Spring Data JPA / Hibernate</span>
                        <span className="bg-secondary px-2 py-1 rounded">Spring AOP</span>
                        <span className="bg-secondary px-2 py-1 rounded">Microservices Architecture</span>
                        <span className="bg-secondary px-2 py-1 rounded">REST APIs</span>
                        <span className="bg-secondary px-2 py-1 rounded">Distributed Systems</span>
                      </div>
                    </div>

                    <div className="bg-black/20 border border-border p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Terminal size={16} />
                        <h3 className="font-semibold text-sm">Infrastructure & Performance</h3>
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                        <span className="bg-secondary px-2 py-1 rounded">Docker</span>
                        <span className="bg-secondary px-2 py-1 rounded">Linux (Fedora)</span>
                        <span className="bg-secondary px-2 py-1 rounded">Redis (Caching / Rate Limiting)</span>
                        <span className="bg-secondary px-2 py-1 rounded">PostgreSQL</span>
                        <span className="bg-secondary px-2 py-1 rounded">Kafka (Event-Driven Systems)</span>
                        <span className="bg-secondary px-2 py-1 rounded">Nginx (Load Balancing)</span>
                        <span className="bg-secondary px-2 py-1 rounded">CI/CD Concepts</span>
                        <span className="bg-secondary px-2 py-1 rounded">Git & GitHub</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
