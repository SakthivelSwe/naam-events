"use client";

import { useEffect, useState } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getGallery } from "@/lib/api";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

const filters: Array<GalleryCategory | "ALL"> = ["ALL", "WEDDING", "BIRTHDAY", "CORPORATE"];

const filterLabels: Record<string, string> = {
  ALL: "All Events",
  WEDDING: "Weddings",
  BIRTHDAY: "Birthdays",
  CORPORATE: "Corporate",
};

export default function GalleryPage() {
  const [active, setActive] = useState<GalleryCategory | "ALL">("ALL");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [status, setStatus] = useState("Loading gallery...");

  useEffect(() => {
    async function load() {
      try {
        setStatus("Loading gallery...");
        const data = await getGallery(active);
        setItems(data);
        setStatus(data.length ? "" : "No gallery items found for this category.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to load gallery.");
      }
    }
    void load();
  }, [active]);

  return (
    <div>
      {/* ── Page Hero ── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="container-shell relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            Event Gallery
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-tight">
            A Glimpse of the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-300">
              Magic We Create.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            Browse real moments from weddings, birthdays, and corporate events crafted by Naam Events.
          </p>
        </div>
      </section>

      {/* ── Gallery Content ── */}
      <section className="section-space bg-white">
        <div className="container-shell space-y-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  active === filter
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30 scale-105"
                    : "border border-brand-border bg-white text-slate-700 hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {filterLabels[filter]}
              </button>
            ))}
          </div>

          {/* Grid or status */}
          {items.length ? (
            <GalleryGrid items={items} />
          ) : (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
                <p className="text-sm text-slate-500">{status}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
