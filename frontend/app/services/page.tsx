"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/api";

const ALL_SERVICES = [
  { id: 1,  name: "Complete Wedding Package",    description: "Grand couple entry, DJ, photography, and all premium items bundled for your perfect day.", imageUrl: "https://images.unsplash.com/photo-1574017121722-2c8ead5a7e90?auto=format&fit=crop&w=600&q=80", category: "Wedding" },
  { id: 2,  name: "DJ Music",                    description: "High-energy professional DJ setup for non-stop celebrations.", imageUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 3,  name: "360° Selfie Booth",           description: "Interactive slow-motion video booth setup with professional lighting.", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 4,  name: "Smoke Effect Entry",          description: "Magical low-lying fog for a cinematic venue aesthetic.", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 5,  name: "Cold Fire Entry",             description: "Sparkling cold pyro columns lining the entryway.", imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 6,  name: "Paper Blaster & Confetti",    description: "Burst of confetti and paper streamers for the ultimate celebration moment.", imageUrl: "https://images.unsplash.com/photo-1603571405948-697f6c0b3c1e?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 7,  name: "Chocolate Fountain",          description: "Flowing Belgian chocolate cascade — an elegant crowd-pleaser.", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 8,  name: "Popcorn & Cotton Candy",      description: "Classic fair-style treats, freshly made at live stations.", imageUrl: "https://images.unsplash.com/photo-1582885994348-18ff8eb4cb1c?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 9,  name: "Pani Puri Live Stall",        description: "Street food favourite, live and fresh for your event guests.", imageUrl: "https://images.unsplash.com/photo-1679934408676-73b4896063b7?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 10, name: "Welcome Juice Live Stall",    description: "Refreshing live juice bar setup for all your guests on arrival.", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 11, name: "Ice Cream Stall",             description: "Premium ice cream stations with multiple flavours.", imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 12, name: "Photo & Video Cameras",       description: "Professional cinematography gears capturing every precious moment.", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80", category: "Photography" },
  { id: 13, name: "Balloon Decoration",          description: "Custom balloon arrangements and themed decor that transforms any venue.", imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80", category: "Decor" },
  { id: 14, name: "Floral Decoration",           description: "Fresh floral arrangements for stage, mandap, and venue decor.", imageUrl: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=600&q=80", category: "Decor" },
  { id: 15, name: "Mangala Vadyam",              description: "Traditional Nadaswaram & Thavil instruments for auspicious ceremonies.", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 16, name: "Traditional Melam",           description: "Energetic traditional drum sets for processions and events.", imageUrl: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
];

const CATEGORIES = ["All", "Wedding", "Entertainment", "Entry Effects", "Food Stalls", "Photography", "Decor"];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [services, setServices] = useState(ALL_SERVICES);

  useEffect(() => {
    async function load() {
      try {
        const backendServices = await getServices();
        if (backendServices && backendServices.length > 0) {
          setServices(backendServices as typeof ALL_SERVICES);
        }
      } catch {
        // fallback to static ALL_SERVICES
      }
    }
    load();
  }, []);

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div>
      {/* ── Page Hero ── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1574017121722-2c8ead5a7e90?auto=format&fit=crop&w=1920&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.1) brightness(0.7) blur(4px)",
            transform: "scale(1.05)" // Prevents white edges when blurring
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent" />
        
        <div className="container-shell relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            40+ Unique Services
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-tight">
            Every Service You Need<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-300">
              For a Perfect Event.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            From grand smoke entries to live food counters, DJ music, and complete wedding packages — Naam Events has it all.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-space bg-white">
        <div className="container-shell space-y-12">
          {/* Category filter pills - NOW INTERACTIVE */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold border transition cursor-pointer ${
                  cat === activeCategory
                    ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/30 scale-105"
                    : "border-brand-border text-slate-700 hover:border-brand-primary hover:text-brand-primary bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[400px]">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, i) => (
                <div key={service.id} className="animate-in fade-in zoom-in duration-300">
                  <ServiceCard service={service} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">
                No services found for this category.
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-[2rem] bg-gradient-to-r from-brand-primary to-pink-400 p-10 text-center text-white">
            <h2 className="font-serif text-3xl font-bold">Don't see what you need?</h2>
            <p className="mt-3 text-white/80">Contact us — we customize packages for every unique event.</p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <Link href="/booking" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-bold text-brand-primary shadow-lg hover:-translate-y-0.5 transition-all">
                Request a Custom Package
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-8 py-3.5 font-semibold text-white hover:bg-white/15 transition-all">
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
