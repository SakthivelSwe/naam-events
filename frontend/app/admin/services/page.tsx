import { AdminServiceManager } from "@/components/AdminServiceManager";
import { AdminShell } from "@/components/AdminShell";

export default function AdminServicesPage() {
  return (
    <AdminShell title="Services" description="Add, update, or remove service offerings shown on the public website.">
      <AdminServiceManager />
    </AdminShell>
  );
}

