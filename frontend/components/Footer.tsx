import Link from "next/link";

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+91 90800 86413";
const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Ganapathy Nagar, Gudiyattam, Vellore, Tamil Nadu 632602, India";
const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/naam_events_gudiyattam?igsh=MTE0empxcnFpY3J0OA==";

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-primary text-slate-200">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <div>
            <div className="mb-4">
               <img src="/logoss.png" alt="Naam Events Logo" className="h-[72px] w-auto object-contain" />
            </div>
            <p className="mt-2 max-w-md text-sm leading-7 text-pink-100">
              Unforgettable moments, spectacular events. We deliver comprehensive event management with 40+ stalls, premium photography, and spectacular entries for weddings and celebrations!
            </p>
          </div>
          <p className="text-sm text-slate-300">{address}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Navigation</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/booking">Booking</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <p>{phone}</p>
            <Link href={instagram} target="_blank" rel="noreferrer">
              Instagram
            </Link>
            <Link href="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
