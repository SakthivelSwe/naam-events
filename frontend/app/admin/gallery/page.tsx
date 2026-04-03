import { AdminGalleryManager } from "@/components/AdminGalleryManager";
import { AdminShell } from "@/components/AdminShell";

export default function AdminGalleryPage() {
  return (
    <AdminShell title="Gallery" description="Upload and organize gallery visuals by event category.">
      <AdminGalleryManager />
    </AdminShell>
  );
}

