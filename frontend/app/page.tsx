import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getGallery, getServices } from "@/lib/api";

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

export default async function HomePage() {
  const [services, gallery] = await Promise.all([getServices(), getGallery()]);

  return (
    <div>
      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.65)), url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container-shell py-24 sm:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Professional Event Management</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              Thoughtful event planning that feels polished, calm, and client-focused.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              NaamEvent delivers weddings, private celebrations, and corporate gatherings with careful planning, clear communication, and dependable execution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/booking" className="button-primary bg-brand-accent text-brand-primary hover:bg-amber-400">
                Request a Quote
              </Link>
              <Link href="/services" className="button-secondary border-white text-white hover:bg-white/10">
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
              eyebrow="Services"
              title="Planning support built around the kind of event you are hosting."
              description="From intimate family celebrations to corporate gatherings, our team focuses on coordination, presentation, and guest comfort."
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
              title="A dependable partner for events that need both warmth and precision."
              description="We work closely with clients to simplify planning, coordinate vendors, manage timelines, and deliver events that feel intentional rather than overwhelming."
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

      <section className="section-space bg-brand-primary">
        <div className="container-shell space-y-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients trust us with milestones that matter."
            description="Our approach stays grounded in communication, clarity, and smooth event delivery."
            align="center"
          />
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

