import { AdminBookingsTable } from "@/components/AdminBookingsTable";
import { AdminShell } from "@/components/AdminShell";

export default function AdminBookingsPage() {
  return (
    <AdminShell title="Bookings" description="Review incoming booking requests from the public website.">
      <AdminBookingsTable />
    </AdminShell>
  );
}

