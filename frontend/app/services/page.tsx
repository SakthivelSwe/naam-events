import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/api";

export const runtime = 'edge';

const ALL_SERVICES = [
  { id: 1,  name: "Complete Wedding Package",    description: "Grand couple entry, DJ, photography, and all premium stalls bundled for your perfect day.", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", category: "Wedding" },
  { id: 2,  name: "DJ Music",                    description: "High-energy professional DJ for non-stop celebrations all night long.", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 3,  name: "360° Selfie Booth",           description: "Interactive slow-motion video booth for unforgettable memories.", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 4,  name: "Smoke Effect Entry",          description: "Magical low-lying fog for a cinematic couple entrance.", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 5,  name: "Cold Fire Entry",             description: "Sparkling cold pyro columns lining the couple's grand entry path.", imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 6,  name: "Paper Blaster & Confetti",    description: "Burst of confetti and paper streamers for the ultimate celebration moment.", imageUrl: "https://images.unsplash.com/photo-1603571405948-697f6c0b3c1e?auto=format&fit=crop&w=600&q=80", category: "Entry Effects" },
  { id: 7,  name: "Chocolate Fountain",          description: "Flowing Belgian chocolate cascade — an elegant crowd-pleaser.", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 8,  name: "Popcorn & Cotton Candy",      description: "Classic fair-style treats loved by guests of all ages.", imageUrl: "https://images.unsplash.com/photo-1582885994348-18ff8eb4cb1c?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 9,  name: "Pani Puri Live Stall",        description: "Street food favourite, live and fresh for your event guests.", imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 10, name: "Welcome Juice Live Stall",    description: "Refreshing live juice bar for all your guests on arrival.", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 11, name: "Ice Cream Stall",             description: "Premium ice cream stations with multiple flavours.", imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80", category: "Food Stalls" },
  { id: 12, name: "Photo & Video Coverage",      description: "Professional cinematography capturing every precious moment.", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", category: "Photography" },
  { id: 13, name: "Balloon Decoration",          description: "Custom balloon arrangements and themed decor that transforms any venue.", imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80", category: "Decor" },
  { id: 14, name: "Floral Decoration",           description: "Fresh floral arrangements for stage, mandap, and venue decor.", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80", category: "Decor" },
  { id: 15, name: "Mangala Vadyam",              description: "Traditional Nadaswaram & Thavil for auspicious wedding ceremonies.", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
  { id: 16, name: "Chenda Melam",                description: "Energetic traditional drum performance for processions and events.", imageUrl: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?auto=format&fit=crop&w=600&q=80", category: "Entertainment" },
];

const CATEGORIES = ["All", "Wedding", "Entertainment", "Entry Effects", "Food Stalls", "Photography", "Decor"];

export default async function ServicesPage() {
  // We load from backend but fall back to our static list if empty
  let services = ALL_SERVICES;
  try {
    const backendServices = await getServices();
    if (backendServices && backendServices.length > 0) {
      services = backendServices as typeof ALL_SERVICES;
    }
  } catch {
    // use static list
  }

  return (
    <div>
      {/* ── Page Hero ── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent" />
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
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`rounded-full px-5 py-2 text-sm font-semibold border transition cursor-pointer ${
                  cat === "All"
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "border-brand-border text-slate-700 hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} />
            ))}
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
