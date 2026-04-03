"use client";

import { useEffect, useState } from "react";
import { getAdminContacts } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";
import type { ContactItem } from "@/lib/types";

export function AdminContactsTable() {
  const [items, setItems] = useState<ContactItem[]>([]);
  const [status, setStatus] = useState("Loading contact requests...");

  useEffect(() => {
    async function load() {
      try {
        const token = getAdminToken();
        const data = await getAdminContacts(token);
        setItems(data);
        setStatus(data.length ? "" : "No contact requests yet.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to load contact requests.");
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
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Message</th>
              <th className="px-5 py-4">Received</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-brand-border">
                <td className="px-5 py-4 font-semibold text-brand-primary">{item.name}</td>
                <td className="px-5 py-4">{item.phone}</td>
                <td className="px-5 py-4 text-slate-600">{item.message}</td>
                <td className="px-5 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
