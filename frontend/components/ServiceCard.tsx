import type { ServiceItem } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="card-surface overflow-hidden">
      <div className="h-60">
        <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <h3 className="font-serif text-2xl font-semibold text-brand-primary">{service.name}</h3>
        <p className="text-sm leading-7 text-slate-600">{service.description}</p>
      </div>
    </article>
  );
}
