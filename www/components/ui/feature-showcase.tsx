"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TabMedia = {
  value: string;
  label: string;
  src: string;
  alt?: string;
};

export type ShowcaseStep = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type FeatureShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  stats?: string[];
  steps?: ShowcaseStep[];
  tabs: TabMedia[];
  defaultTab?: string;
  panelMinHeight?: number;
  className?: string;
};

export function FeatureShowcase({
  eyebrow = "Discover",
  title,
  description,
  stats = [],
  steps = [],
  tabs,
  defaultTab,
  panelMinHeight = 720,
  className,
}: FeatureShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab ?? tabs[0]?.value ?? "tab-0");
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  return (
    <section className={cn("w-full bg-white text-foreground", className)}>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-12 md:py-16 lg:gap-10">
        {/* Left column */}
        <div className="md:col-span-6">
          <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 mb-4">
            {eyebrow}
          </div>

          <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-neutral-900">
            {title}
          </h2>

          {description && (
            <p className="mt-4 max-w-xl text-sm text-neutral-600">{description}</p>
          )}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-6 max-w-xl">
            <div className="w-full space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === step.id ? null : step.id)}
                    className="w-full text-left px-3 py-2.5 bg-white hover:bg-neutral-50 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-neutral-900">{step.title}</span>
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform text-neutral-600",
                        openAccordion === step.id && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === step.id && (
                    <div className="px-3 py-2.5 bg-neutral-50 border-t border-neutral-200">
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-6">
          <div
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-lg"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            {/* Tab content */}
            <div className="relative h-full w-full">
              {tabs.map((t, idx) => (
                <div
                  key={t.value}
                  className={cn(
                    "absolute inset-0 h-full w-full transition-opacity duration-300",
                    activeTab === t.value ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <img
                    src={t.src}
                    alt={t.alt ?? t.label}
                    className="h-full w-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* Tab controls (pill) */}
            {tabs.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 z-10 flex w-full justify-center">
                <div className="flex gap-2 rounded-xl border border-neutral-200 bg-white/80 p-1 backdrop-blur">
                  {tabs.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setActiveTab(t.value)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                        activeTab === t.value
                          ? "bg-neutral-900 text-white"
                          : "bg-transparent text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
