"use client";

import { useEffect, useState } from "react";
import { getAdminBookings } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";
import type { BookingItem } from "@/lib/types";

export function AdminBookingsTable() {
  const [items, setItems] = useState<BookingItem[]>([]);
  const [status, setStatus] = useState("Loading bookings...");

  useEffect(() => {
    async function load() {
      try {
        const token = getAdminToken();
        const data = await getAdminBookings(token);
        setItems(data);
        setStatus(data.length ? "" : "No bookings yet.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to load bookings.");
      }
    }

    void load();
  }, []);

  if (!items.length) {
    return <div className="card-surface p-6 text-sm text-slate-600">{status}</div>;
  }

  return (
    <div className="card-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-brand-primary">
            <tr>
              <th className="px-5 py-4">Client</th>
              <th className="px-5 py-4">Event</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Guests</th>
              <th className="px-5 py-4">Message</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-brand-border">
                <td className="px-5 py-4">
                  <p className="font-semibold text-brand-primary">{item.name}</p>
                  <p className="text-slate-500">{item.phone}</p>
                </td>
                <td className="px-5 py-4">{item.eventType}</td>
                <td className="px-5 py-4">{item.date}</td>
                <td className="px-5 py-4">{item.guests}</td>
                <td className="px-5 py-4 text-slate-600">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

