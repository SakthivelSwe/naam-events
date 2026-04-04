import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919080086413";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 90800 86413";
const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Ganapathy Nagar, Gudiyattam, Vellore, Tamil Nadu 632602, India";
const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/naam_events_gudiyattam?igsh=MTE0empxcnFpY3J0OA==";

export default function ContactPage() {
  return (
    <div>
      {/* ── Page Hero ── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555447405-057915b40299?auto=format&fit=crop&w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-transparent to-transparent" />
        <div className="container-shell relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            Get in Touch
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl leading-tight">
            Let's Start Planning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-pink-300">
              Your Event.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            We're here to help you with every detail. Reach out via WhatsApp, Instagram, or the form below.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="section-space bg-brand-muted">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">

          {/* Left: Contact Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-primary">Contact Details</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-slate-900">We'd love to hear from you.</h2>
              <p className="mt-3 text-slate-500 leading-relaxed">Discuss scope, timelines, venue coordination, or anything else. Our team responds quickly.</p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-muted text-xl">
                  📞
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone</p>
                  <p className="mt-1 text-lg font-bold text-brand-primary">{phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-muted text-xl">
                  📍
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Address</p>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">{address}</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-muted text-xl">
                  📸
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Instagram</p>
                  <Link
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm font-semibold text-brand-primary hover:underline"
                  >
                    @naam_events_gudiyattam
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="button-primary flex items-center justify-center gap-2"
              >
                <span>💬</span> Chat on WhatsApp
              </Link>
              <Link
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="button-secondary flex items-center justify-center gap-2"
              >
                <span>📷</span> View on Instagram
              </Link>
            </div>

            {/* Map placeholder */}
            <div className="card-surface overflow-hidden rounded-3xl h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.123456789!2d78.8674!3d12.9542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDU3JzE1LjEiTiA3OMKwNTInMDIuNiJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naam Events Location"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="card-surface p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
