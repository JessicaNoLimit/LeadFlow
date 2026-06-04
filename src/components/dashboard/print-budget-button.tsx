"use client";

import { useState } from "react";

export function PrintBudgetButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  function handlePrint() {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    window.setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 120);
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={isGenerating}
      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isGenerating ? "Generando propuesta..." : "Exportar PDF"}
    </button>
  );
}
