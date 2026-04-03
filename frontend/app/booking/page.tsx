import { BookingForm } from "@/components/BookingForm";
import { SectionHeading } from "@/components/SectionHeading";

export default function BookingPage() {
  return (
    <section className="section-space bg-slate-50">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Booking"
            title="Tell us about your event and we will prepare a tailored quote."
            description="Share the essential details below and our team will get back to you with next steps, timelines, and planning support."
          />
          <div className="card-surface space-y-4 p-6">
            <p className="text-sm leading-7 text-slate-600">
              We support wedding celebrations, private parties, corporate gatherings, and catering-focused requirements.
            </p>
            <p className="text-sm leading-7 text-slate-600">
              Early enquiries help us reserve vendors, align schedules, and shape a smoother planning process.
            </p>
          </div>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

