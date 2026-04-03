import { AdminContactsTable } from "@/components/AdminContactsTable";
import { AdminShell } from "@/components/AdminShell";

export default function AdminContactsPage() {
  return (
    <AdminShell title="Contact Requests" description="Review direct contact messages submitted by prospective clients.">
      <AdminContactsTable />
    </AdminShell>
  );
}

