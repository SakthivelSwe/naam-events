import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getGallery, getServices } from "@/lib/api";

export const runtime = 'edge';

const testimonials = [
  {
    name: "Priya & Rohit",
    quote: "NaamEvent brought structure, calm, and beautiful execution to our wedding weekend. Every detail felt looked after."
  },
  {
    name: "Apex Consulting",
    quote: "Their team handled our annual client event with professionalism, clarity, and excellent guest flow from start to finish."
  },
  {
    name: "Sana Khan",
    quote: "The birthday celebration felt warm, personal, and incredibly well managed. We could truly enjoy the evening."
  }
];

const BRAND_SERVICES = [
  { id: 1, name: "Popcorn & Cotton Candy", description: "Delicious classic party treats", imageUrl: "https://images.unsplash.com/photo-1582885994348-18ff8eb4cb1c?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Chocolate Fountain", description: "Flowing chocolate for an elegant dessert", imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Welcome Juice Live Stall", description: "Refreshing live juice bar for guests", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Ice Cream", description: "Premium ice cream stations", imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Pani Puri", description: "Live street food station with fresh Pani Puri", imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Smoke Effect For Couple Entry", description: "Magical low smoke effect for a grand entry", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "DJ Music & 360 Selfie Booth", description: "High energy music and interactive selfie experiences", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Photography & Coverage", description: "Professional photo and video coverage", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80" },
];

export default async function HomePage() {
  const [, gallery] = await Promise.all([getServices(), getGallery()]);
  const services = BRAND_SERVICES;

  return (
    <div>
      <section
        className="relative isolate overflow-hidden bg-brand-muted"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-transparent to-blue-50 opacity-70"></div>
        <div className="container-shell py-24 sm:py-32 relative z-10">
          <div className="max-w-3xl space-y-6 text-slate-800">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Premier Event Management</p>
            <h1 className="font-serif text-5xl font-bold leading-tight sm:text-7xl text-brand-primary">
              Unforgettable Moments,<br/> Spectacular Events!
            </h1>
            <p className="max-w-2xl text-xl leading-8 text-slate-600">
              NaamEvent delivers spectacular weddings, private celebrations, and corporate gatherings with over 40+ specialized stalls, welcome entries, and flawless execution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <Link href="/booking" className="button-primary text-lg px-8">
                Request a Quote
              </Link>
              <Link href="/services" className="button-secondary text-lg px-8">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell space-y-10">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Our Services"
              title="We provide exactly what you need to make your party unforgettable."
              description="From Live Food Counters to 360 Selfie Booths and Special Couple Entries, we handle it all so you can enjoy your celebration!"
            />
            <Link href="/services" className="hidden text-sm font-semibold text-brand-primary hover:text-brand-accent md:block">
              View all services
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="container-shell space-y-10">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Gallery"
              title="A snapshot of the atmosphere we help create."
              description="Elegant styling, practical coordination, and an event experience that feels welcoming from arrival to close."
            />
            <Link href="/gallery" className="hidden text-sm font-semibold text-brand-primary hover:text-brand-accent md:block">
              Browse gallery
            </Link>
          </div>
          <GalleryGrid items={gallery.slice(0, 6)} />
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About NaamEvent"
              title="A dedicated partner for events filled with joy and spectacular colors."
              description="With over 40+ unique services including DJ music, Mangala Vadyam, Cotton Candy stalls, and Photo coverage, we guarantee a stress-free and magical experience for your guests."
            />
            <Link href="/contact" className="button-secondary">
              Speak with our team
            </Link>
          </div>
          <div className="card-surface grid gap-6 p-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-brand-primary">150+</p>
              <p className="mt-2 text-sm text-slate-600">Events coordinated across private and corporate categories.</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-brand-primary">10+</p>
              <p className="mt-2 text-sm text-slate-600">Years of combined planning and on-site event experience.</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-brand-primary">24/7</p>
              <p className="mt-2 text-sm text-slate-600">Client communication support during active event execution windows.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-gradient-to-r from-brand-secondary to-[#80d8ff] text-white">
        <div className="container-shell space-y-10">
          <div className="text-center space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">Testimonials</p>
              <h2 className="font-serif text-4xl font-semibold">Clients trust us with milestones that matter.</h2>
              <p className="max-w-2xl mx-auto text-lg text-white/90">Our approach stays grounded in communication, clarity, and smooth event delivery.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200">
                <p className="text-base leading-7">“{testimonial.quote}”</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">{testimonial.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="card-surface flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Contact</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-primary">Ready to start planning your event?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Share your event details and our team will prepare a clear, practical response tailored to your requirements.
              </p>
            </div>
            <Link href="/booking" className="button-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

