import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getGallery, getServices } from "@/lib/api";

export const runtime = 'edge';

const testimonials = [
  {
    name: "Priya & Rohit",
    quote: "NaamEvent made our wedding absolutely magical. Every single detail — from the smoke entry to the DJ — was flawless. Our guests are still talking about it!",
    event: "Wedding Reception"
  },
  {
    name: "Sundar Family",
    quote: "We booked them for our son's birthday party. The 360 selfie booth, popcorn stall, and balloon decor blew everyone away. Worth every rupee!",
    event: "Birthday Celebration"
  },
  {
    name: "Kavitha & Vijay",
    quote: "From the Smoke Effect couple entry to the Mangala Vadyam, everything was perfectly timed and so beautifully executed. Highly recommended!",
    event: "Wedding Ceremony"
  }
];

// Bento Box layout — 4 featured + 4 secondary items
const FEATURED_SERVICES = [
  {
    id: 1, span: "lg:col-span-2 lg:row-span-2",
    name: "Complete Wedding Package",
    description: "Grand couple entry, DJ, photography, and all premium stalls bundled for your perfect day.",
    imageUrl: "https://images.unsplash.com/photo-1574017121722-2c8ead5a7e90?auto=format&fit=crop&w=800&q=80",
    tag: "Most Popular"
  },
  {
    id: 2, span: "lg:col-span-1",
    name: "360° Selfie Booth",
    description: "Interactive slow-motion video booth for unforgettable memories.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    tag: "Trending"
  },
  {
    id: 3, span: "lg:col-span-1",
    name: "Smoke Effect Entry",
    description: "Magical low-lying fog for a cinematic couple entrance.",
    imageUrl: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=600&q=80",
    tag: "Signature"
  },
  {
    id: 4, span: "lg:col-span-1",
    name: "Live Food Counters",
    description: "Pani Puri, Popcorn, Cotton Candy, Masala Soda & more — live stations your guests will love.",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    tag: "40+ Options"
  },
  {
    id: 5, span: "lg:col-span-1",
    name: "Wedding Mandap Decor",
    description: "Stunning floral mandap setups — the centerpiece of your auspicious ceremony.",
    imageUrl: "https://images.unsplash.com/photo-1574017121722-2c8ead5a7e90?auto=format&fit=crop&w=600&q=80",
    tag: "Premium"
  },
  {
    id: 6, span: "lg:col-span-1",
    name: "DJ Music",
    description: "High-energy professional DJ for non-stop celebrations all night long.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    tag: "Entertainment"
  },
  {
    id: 7, span: "lg:col-span-1",
    name: "Photo & Video Coverage",
    description: "Professional cinematography capturing every precious moment.",
    imageUrl: "https://images.unsplash.com/photo-1567530331069-630c6a3926f3?auto=format&fit=crop&w=600&q=80",
    tag: "Memories"
  },
  {
    id: 8, span: "lg:col-span-2",
    name: "Floral & Balloon Decoration",
    description: "Custom flower arrangements, themed balloon decor that transforms any venue into a dream setting.",
    imageUrl: "https://images.unsplash.com/photo-1571983371651-221e6c0b910a?auto=format&fit=crop&w=800&q=80",
    tag: "Decor"
  },
];

export default async function HomePage() {
  const [, gallery] = await Promise.all([getServices(), getGallery()]);

  return (
    <div>
      {/* ─── HERO: Immersive full‑screen with video‑like overlay ─── */}
      <section className="relative isolate min-h-screen flex items-center overflow-hidden">
        {/* Background image with warm brand overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1654156577076-e0350ba86cc1?auto=format&fit=crop&w=1920&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.1) brightness(0.7) blur(8px)",
            transform: "scale(1.05)"
          }}
        />
        {/* Scrim: dark gradient bottom-to-top for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        {/* Pink brand tint overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent" />

        <div className="container-shell relative z-20 py-40">
          <div className="max-w-4xl space-y-8">
            <span
              data-animate
              data-animate-delay="1"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
              Premier Event Management · Gudiyattam
            </span>

            <h1
              data-animate
              data-animate-delay="2"
              className="font-serif text-6xl font-bold leading-[1.1] text-white sm:text-7xl lg:text-8xl"
            >
              Unforgettable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-300">
                Moments,
              </span>
              <br />
              Spectacular Events!
            </h1>

            <p
              data-animate
              data-animate-delay="3"
              className="max-w-2xl text-xl leading-8 text-white/85"
            >
              Naam Events delivers spectacular weddings, private celebrations, and gatherings with
              over <strong className="text-white">40+ specialized stalls</strong>, grand couple entries, DJ music, and flawless execution.
            </p>

            <div data-animate data-animate-delay="4" className="flex flex-col gap-4 sm:flex-row pt-2">
              <Link href="/booking" className="button-primary text-base px-9 py-4">
                Book Your Event
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-9 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/15 backdrop-blur-sm">
                Explore 40+ Services →
              </Link>
            </div>

            {/* Quick stat strip */}
            <div data-animate data-animate-delay="5" className="flex flex-wrap gap-8 pt-4 border-t border-white/20 mt-8">
              {[
                { n: "150+", l: "Events Delivered" },
                { n: "40+", l: "Unique Services" },
                { n: "10+", l: "Years Experience" },
                { n: "24/7", l: "Client Support" }
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-3xl font-bold text-white font-serif">{n}</p>
                  <p className="text-xs text-white/70 mt-0.5 uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENTO BOX SERVICES GRID ─── */}
      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="mb-16 flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Our Services</p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl leading-tight">
                Everything you need for the{" "}
                <span className="text-brand-primary">perfect celebration.</span>
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-500">
                From Live Food Counters to exclusive Smoke Entries — browse our 40+ services in an immersive showcase.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 rounded-full border border-brand-border px-6 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-muted md:block"
            >
              All Services →
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-3 auto-rows-[280px]">
            {FEATURED_SERVICES.map((service, i) => (
              <article
                key={service.id}
                data-animate
                data-animate-delay={String(Math.min(i + 1, 6))}
                className={`relative overflow-hidden rounded-3xl group cursor-pointer ${service.span}`}
              >
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="img-branded absolute inset-0 h-full w-full"
                />
                {/* Dark scrim for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Glassmorphism tag */}
                <span className="absolute top-4 right-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {service.tag}
                </span>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">{service.name}</h3>
                  <p className="mt-1.5 text-sm text-white/75 leading-relaxed line-clamp-2 max-w-sm">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY NAAM EVENTS — asymmetric layout ─── */}
      <section className="section-space bg-brand-muted">
        <div className="container-shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: image collage */}
            <div className="relative h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1654157085616-cd80ec5fca2f?auto=format&fit=crop&w=800&q=85"
                alt="Event setup"
                className="absolute left-0 top-0 h-80 w-[70%] rounded-3xl object-cover shadow-2xl img-branded"
              />
              <div className="absolute right-0 bottom-0 h-64 w-[60%] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=600&q=80"
                  alt="Event flowers"
                  className="img-branded h-full w-full"
                />
              </div>
              {/* Floating glassmorphism stat card */}
              <div className="card-glass absolute bottom-24 left-4 px-6 py-4 text-white">
                <p className="text-3xl font-bold font-serif">150+</p>
                <p className="text-xs text-white/80 mt-0.5">Happy Events Delivered</p>
              </div>
            </div>

            {/* Right: text */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Why Choose Us</p>
                <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl leading-tight">
                  A dedicated partner for joy‑filled, <span className="text-brand-primary">spectacular</span> celebrations.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-500">
                  With 40+ unique services — from DJ music and Mangala Vadyam to Cotton Candy and Family Fingerprint Trees — we handle every detail so you can be fully present in the moment.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "🎪", title: "40+ Services", desc: "Stalls, decor, music, and more under one roof" },
                  { icon: "📸", title: "Full Coverage", desc: "Photo, video, and 360° booth for every memory" },
                  { icon: "✨", title: "Grand Entries", desc: "Smoke, Cold Fire, Paper Blasters & more" },
                  { icon: "🎵", title: "Live Entertainment", desc: "DJ, Chenda Melam, Mangala Vadyam & more" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="font-bold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="button-primary">
                Speak with our team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <section className="section-space bg-white">
        <div className="container-shell space-y-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Gallery</p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl leading-tight">
                A glimpse of the magic <span className="text-brand-primary">we create.</span>
              </h2>
            </div>
            <Link href="/gallery" className="hidden shrink-0 rounded-full border border-brand-border px-6 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-muted md:block">
              Full Gallery →
            </Link>
          </div>
          <GalleryGrid items={gallery.slice(0, 6)} />
        </div>
      </section>

      {/* ─── TESTIMONIALS: Glassmorphism cards over rich background ─── */}
      <section className="relative section-space overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1726068449701-4e11c5d64b11?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(6px) brightness(0.6)",
            transform: "scale(1.05)"
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="container-shell relative z-10 space-y-14">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Testimonials</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Trusted for milestones that matter.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-white/70">
              Hundreds of families have trusted Naam Events for their most special celebrations.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                data-animate
                data-animate-delay={String(i + 1)}
                className="card-glass p-8"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-brand-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-base leading-7 text-white/90 italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                  <div className="h-9 w-9 rounded-full bg-brand-primary/60 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/55">{t.event}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="section-space bg-white">
        <div className="container-shell">
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-12 lg:p-20 text-center"
            style={{
              background: "linear-gradient(135deg, #e6007e 0%, #ff6eb4 50%, #c8007a 100%)"
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="relative z-10 space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/80">Get Started Today</p>
              <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl leading-tight">
                Ready to create something <br/> truly unforgettable?
              </h2>
              <p className="max-w-xl mx-auto text-lg text-white/80">
                Tell us about your event and we'll craft a personalized experience with our 40+ premium services.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center pt-2">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-base font-bold text-brand-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Book Your Event Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-9 py-4 text-base font-semibold text-white transition-all hover:bg-white/15 hover:border-white"
                >
                  WhatsApp Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
