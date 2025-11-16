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
  isMobile?: boolean;
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
  isMobile = false,
}: FeatureShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab ?? tabs[0]?.value ?? "tab-0");
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  return (
    <section className={cn("w-full bg-white text-foreground", className)}>
      <div className={cn(
        "container mx-auto grid max-w-7xl grid-cols-1 px-6",
        isMobile ? "gap-6 py-8 overflow-y-auto" : "gap-8 py-12 md:grid-cols-12 md:py-16 lg:gap-10"
      )}>
        {/* Left column */}
        <div className={isMobile ? "" : "md:col-span-6"}>
          <div className={`inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700 mb-3 ${isMobile ? "text-[10px]" : "text-xs mb-4"}`}>
            {eyebrow}
          </div>

          <h2 className={`text-balance font-bold leading-tight text-neutral-900 ${isMobile ? "text-2xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
            {title}
          </h2>

          {description && (
            <p className={`mt-3 max-w-xl text-neutral-600 ${isMobile ? "text-xs mt-2" : "mt-4 text-sm"}`}>{description}</p>
          )}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className={isMobile ? "mt-3 flex flex-wrap gap-1.5" : "mt-4 flex flex-wrap gap-2"}>
              {stats.map((s, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-neutral-700 ${isMobile ? "text-[10px]" : "text-xs"}`}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className={isMobile ? "mt-4 max-w-xl" : "mt-6 max-w-xl"}>
            <div className={isMobile ? "w-full space-y-1.5" : "w-full space-y-2"}>
              {steps.map((step) => (
                <div key={step.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === step.id ? null : step.id)}
                    className={`w-full text-left bg-white hover:bg-neutral-50 transition-colors flex items-center justify-between ${isMobile ? "px-2.5 py-2" : "px-3 py-2.5"}`}
                  >
                    <span className={`font-medium text-neutral-900 ${isMobile ? "text-xs" : "text-sm"}`}>{step.title}</span>
                    <svg
                      className={cn(
                        "transition-transform text-neutral-600",
                        isMobile ? "w-3.5 h-3.5" : "w-4 h-4",
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
                    <div className={`bg-neutral-50 border-t border-neutral-200 ${isMobile ? "px-2.5 py-2 text-xs" : "px-3 py-2.5"}`}>
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={isMobile ? "" : "md:col-span-6"}>
          <div
            className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-lg ${isMobile ? "" : ""}`}
            style={{ 
              height: isMobile ? 300 : panelMinHeight, 
              minHeight: isMobile ? 300 : panelMinHeight 
            }}
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
