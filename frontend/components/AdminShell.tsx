"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/admin-auth";

const items = [
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/contacts", label: "Contacts" }
];

export function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="bg-slate-50">
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="card-surface h-fit p-6">
          <div className="border-b border-brand-border pb-5">
            <p className="font-serif text-2xl font-semibold text-brand-primary">NaamEvent Admin</p>
            <p className="mt-2 text-sm text-slate-600">Manage services, media, and client requests.</p>
          </div>
          <nav className="mt-5 space-y-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                  pathname === item.href ? "bg-brand-primary text-white" : "text-brand-primary hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              clearAdminToken();
              router.replace("/admin/login");
            }}
            className="button-secondary mt-6 w-full"
          >
            Logout
          </button>
        </aside>

        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-brand-primary">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

