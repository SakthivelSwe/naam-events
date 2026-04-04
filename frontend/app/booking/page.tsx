import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";

export default function BookingPage() {
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-transparent to-transparent" />
        <div className="container-shell relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            Book Your Event
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-tight">
            Let's Plan Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-300">
              Spectacular.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            Fill in your event details below and our team will craft a personalized quote within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Booking Content ── */}
      <section className="section-space bg-brand-muted">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">

          {/* Left: Info Panel */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">How It Works</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900">Simple, fast and personalized.</h2>
            </div>

            <div className="space-y-6">
              {[
                { step: "01", title: "Fill the Form", desc: "Share your event type, date, guest count, and preferred services." },
                { step: "02", title: "We Review", desc: "Our team reviews your request and prepares a custom proposal within 24 hours." },
                { step: "03", title: "Confirm & Book", desc: "Once you're happy with the plan, we confirm your slot and begin coordination." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info card — glassmorphism style */}
            <div className="rounded-3xl bg-white border border-brand-border p-6 shadow-card space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-primary">We Support</p>
              <div className="grid grid-cols-2 gap-3">
                {["💍 Weddings", "🎂 Birthdays", "🏢 Corporate Events", "🎉 Private Parties", "🎪 Cultural Events", "🥗 Catering Events"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-brand-border">
                <p className="text-xs text-slate-400">Early enquiries help us reserve vendors and give you better options.</p>
              </div>
            </div>

            {/* Quick contact */}
            <div className="flex gap-3 flex-wrap">
              <Link
                href="https://wa.me/919080086413"
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                💬 WhatsApp Us Directly
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card-surface p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
