"use client";

import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/api";
import type { ContactPayload } from "@/lib/types";

const initialState: ContactPayload = {
  name: "",
  phone: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initialState);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await submitContact(form);
      setForm(initialState);
      setStatus("Your message has been sent. We will get back to you soon.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send your message right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
      <input
        className="field"
        placeholder="Full name"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        required
      />
      <input
        className="field"
        placeholder="Phone number"
        value={form.phone}
        onChange={(event) => setForm({ ...form, phone: event.target.value })}
        required
      />
      <textarea
        className="field min-h-40"
        placeholder="How can we help?"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        required
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">{status}</p>
        <button type="submit" disabled={submitting} className="button-primary disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

