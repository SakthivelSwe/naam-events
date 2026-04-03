"use client";

import { FormEvent, useEffect, useState } from "react";
import { createGalleryItem, deleteGalleryItem, getAdminGallery, updateGalleryItem, uploadToMinio } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

const initialForm: Omit<GalleryItem, "id"> = {
  imageUrl: "",
  category: "WEDDING"
};

const categories: GalleryCategory[] = ["WEDDING", "BIRTHDAY", "CORPORATE"];

export function AdminGalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadGallery() {
    try {
      setLoading(true);
      const token = getAdminToken();
      const data = await getAdminGallery(token);
      setItems(data);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load gallery items.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadGallery();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const token = getAdminToken();
      if (editingId) {
        await updateGalleryItem(token, editingId, form);
        setStatus("Gallery item updated successfully.");
      } else {
        await createGalleryItem(token, form);
        setStatus("Gallery item created successfully.");
      }
      setForm(initialForm);
      setEditingId(null);
      await loadGallery();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save gallery item.");
    }
  }

  async function handleDelete(id: number) {
    try {
      const token = getAdminToken();
      await deleteGalleryItem(token, id);
      setStatus("Gallery item deleted successfully.");
      await loadGallery();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete gallery item.");
    }
  }

  async function handleUpload(file: File) {
    try {
      setStatus("Uploading image...");
      const token = getAdminToken();
      const imageUrl = await uploadToMinio(token, file);
      setForm((current) => ({ ...current, imageUrl }));
      setStatus("Image uploaded to MinIO successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Image upload failed.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
      <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
        <h2 className="font-serif text-2xl font-semibold text-brand-primary">{editingId ? "Edit Image" : "Add Image"}</h2>
        <input className="field" placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} required />
        <select className="field" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as GalleryCategory })}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input type="file" accept="image/*" className="field file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold" onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleUpload(file);
          }
        }} />
        <p className="text-xs text-slate-500">Upload directly to MinIO, or paste an existing image URL.</p>
        <div className="flex gap-3">
          <button type="submit" className="button-primary flex-1">
            {editingId ? "Update Image" : "Create Image"}
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
        {loading ? <p className="text-sm text-slate-600">Loading gallery...</p> : null}
        {items.map((item) => (
          <div key={item.id} className="card-surface flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">{item.category}</p>
              <p className="mt-2 text-sm text-slate-600">{item.imageUrl}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" className="button-secondary" onClick={() => {
                setEditingId(item.id);
                setForm({
                  imageUrl: item.imageUrl,
                  category: item.category
                });
              }}>
                Edit
              </button>
              <button type="button" className="button-primary" onClick={() => void handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
