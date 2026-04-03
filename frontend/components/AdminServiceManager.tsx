"use client";

import { FormEvent, useEffect, useState } from "react";
import { createService, deleteService, getAdminServices, updateService, uploadToStorage } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";
import type { ServiceItem } from "@/lib/types";

const initialForm = { name: "", description: "", imageUrl: "" };

export function AdminServiceManager() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadServices() {
    try {
      setLoading(true);
      const token = getAdminToken();
      const data = await getAdminServices(token);
      setServices(data);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load services.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadServices();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const token = getAdminToken();
      if (editingId) {
        await updateService(token, editingId, form);
        setStatus("Service updated successfully.");
      } else {
        await createService(token, form);
        setStatus("Service created successfully.");
      }

      setForm(initialForm);
      setEditingId(null);
      await loadServices();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save service.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const token = getAdminToken();
      await deleteService(token, id);
      setStatus("Service deleted successfully.");
      await loadServices();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete service.");
    }
  }

  async function handleUpload(file: File) {
    try {
      setStatus("Uploading image...");
      const token = getAdminToken();
      const imageUrl = await uploadToStorage(token, file);
      setForm((current) => ({ ...current, imageUrl }));
      setStatus("Image uploaded to Supabase Storage successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image upload failed.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
        <h2 className="font-serif text-2xl font-semibold text-brand-primary">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>
        <input className="field" placeholder="Service name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <textarea className="field min-h-36" placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
        <input className="field" placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} required />
        <input type="file" accept="image/*" className="field file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold" onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleUpload(file);
          }
        }} />
        <p className="text-xs text-slate-500">Upload directly to Supabase Storage, or paste an existing image URL.</p>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="button-primary flex-1">
            {saving ? "Saving..." : editingId ? "Update Service" : "Create Service"}
          </button>
          {editingId ? (
            <button type="button" className="button-secondary" onClick={() => {
              setEditingId(null);
              setForm(initialForm);
            }}>
              Cancel
            </button>
          ) : null}
        </div>
        <p className="text-sm text-slate-600">{status}</p>
      </form>

      <div className="space-y-4">
        {loading ? <p className="text-sm text-slate-600">Loading services...</p> : null}
        {services.map((service) => (
          <div key={service.id} className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-semibold text-brand-primary">{service.name}</h3>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">{service.description}</p>
              <p className="text-xs text-slate-500">{service.imageUrl}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className="button-secondary" onClick={() => {
                setEditingId(service.id);
                setForm({
                  name: service.name,
                  description: service.description,
                  imageUrl: service.imageUrl
                });
              }}>
                Edit
              </button>
              <button type="button" className="button-primary" onClick={() => void handleDelete(service.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
