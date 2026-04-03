"use client";

import { useEffect, useState } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { getGallery } from "@/lib/api";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

const filters: Array<GalleryCategory | "ALL"> = ["ALL", "WEDDING", "BIRTHDAY", "CORPORATE"];

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
    <section className="section-space bg-slate-50">
      <div className="container-shell space-y-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Browse recent event moments across our core categories."
          description="Use the filters below to focus on wedding, birthday, or corporate event setups."
        />
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                active === filter ? "bg-brand-primary text-white" : "border border-brand-border bg-white text-brand-primary"
              }`}
            >
              {filter === "ALL" ? "All" : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        {items.length ? <GalleryGrid items={items} /> : <div className="card-surface p-6 text-sm text-slate-600">{status}</div>}
      </div>
    </section>
  );
}

