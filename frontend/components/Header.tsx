"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col">
          <img src="/logo.jpeg" alt="Naam Event Logo" className="h-16 w-auto object-contain" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-brand-border px-4 py-2 text-sm font-semibold text-brand-primary md:hidden"
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  active ? "text-brand-accent" : "text-brand-primary hover:text-brand-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/booking" className="button-primary">
            Request a Quote
          </Link>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-brand-border md:hidden">
          <nav className="container-shell flex flex-col gap-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-semibold ${pathname === item.href ? "text-brand-accent" : "text-brand-primary"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setOpen(false)} className="button-primary w-full">
              Request a Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

