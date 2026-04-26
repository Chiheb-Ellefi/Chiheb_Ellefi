"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, MapPin } from 'lucide-react';
import { useSystemStore } from '@/store/useSystemStore';

const tourSteps = [
  {
    title: "Welcome to Chiheb System",
    content: "This is not a static portfolio. You're looking at a live simulation of a distributed microservices architecture. Let me guide you through it.",
    target: "center"
  },
  {
    title: "System Architecture",
    content: "In the center, you see the system topology. We have an API Gateway routing requests, an Auth service for security, and several backend services backed by PostgreSQL and Redis. Kafka handles asynchronous event streaming.",
    target: "architecture"
  },
  {
    title: "Interactive Controls",
    content: "Use the control panel on the right to simulate traffic, view live logs, or even kill a service instance to see how the system reacts in a degraded state.",
    target: "controls"
  },
  {
    title: "System Terminal",
    content: "Click the Terminal icon in the sidebar (or run commands) to interact with the system like a real DevOps engineer. Try typing 'system status'.",
    target: "terminal"
  },
  {
    title: "About the Developer",
    content: "I'm Chiheb Ellefi, a Software Engineer passionate about backend systems, DevOps, and building scalable platforms. Click the user icon on the left to learn more about my stack.",
    target: "about"
  }
];

export default function TourGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(var(--primary),0.2)]"
      >
        <MapPin size={14} />
        Start Guided Tour
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div 
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className="relative bg-card w-[400px] border border-primary/30 rounded-xl shadow-2xl pointer-events-auto overflow-hidden"
            >
              <div className="h-1 bg-primary/20 w-full">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-primary">{tourSteps[currentStep].title}</h3>
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed min-h-[80px]">
                  {tourSteps[currentStep].content}
                </p>

                <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground font-mono">
                    Step {currentStep + 1} of {tourSteps.length}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="p-2 rounded hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-colors flex items-center gap-1"
                    >
                      {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                      {currentStep !== tourSteps.length - 1 && <ChevronRight size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
