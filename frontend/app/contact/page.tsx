import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919080086413";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 90800 86413";
const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Ganapathy Nagar, Gudiyattam, Vellore, Tamil Nadu 632602, India";
const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/naam_events_gudiyattam?igsh=MTE0empxcnFpY3J0OA==";

export default function ContactPage() {
  return (
    <section className="section-space">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Speak with our team about your event requirements."
            description="We are happy to discuss scope, timelines, venue coordination, and the support your event may need."
          />
          <div className="card-surface space-y-5 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">Phone</p>
              <p className="mt-2 text-base text-brand-primary">{phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">Address</p>
              <p className="mt-2 text-base text-brand-primary">{address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">Instagram</p>
              <Link href={instagram} target="_blank" rel="noreferrer" className="mt-2 block text-base text-brand-primary">
                naam_events_gudiyattam
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="button-primary">
                Chat on WhatsApp
              </Link>
              <Link href={instagram} target="_blank" rel="noreferrer" className="button-secondary">
                View Instagram
              </Link>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
