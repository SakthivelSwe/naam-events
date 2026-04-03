import type { GalleryItem } from "@/lib/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="card-surface overflow-hidden">
          <div className="h-72">
            <img src={item.imageUrl} alt={item.category.toLowerCase()} className="h-full w-full object-cover" />
          </div>
          <div className="border-t border-brand-border px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {item.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
