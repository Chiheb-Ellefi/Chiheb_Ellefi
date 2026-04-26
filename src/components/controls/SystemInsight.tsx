"use client";

import { useSystemStore } from "@/store/useSystemStore";
import { Lightbulb } from "lucide-react";

export default function SystemInsight() {
  const systemInsight = useSystemStore(state => state.systemInsight);

  return (
    <div className="space-y-2">
      <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-wider flex items-center gap-2">
        <Lightbulb size={14} className="text-warning" /> System Insight
      </h3>
      <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg text-xs text-primary/90 leading-relaxed font-mono">
        {systemInsight}
      </div>
    </div>
  );
}
