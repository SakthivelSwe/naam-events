"use client";

import { FormEvent, useState } from "react";
import { submitBooking } from "@/lib/api";
import type { BookingPayload, EventType } from "@/lib/types";

type BookingFormState = Omit<BookingPayload, "guests"> & {
  guests: string;
};

const initialState: BookingFormState = {
  name: "",
  phone: "",
  eventType: "WEDDING",
  date: "",
  guests: "",
  message: ""
};

const eventTypes: EventType[] = ["WEDDING", "BIRTHDAY", "CORPORATE", "CATERING"];

export function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await submitBooking({
        ...form,
        guests: Number(form.guests)
      });
      setForm(initialState);
      setStatus("Your booking request has been sent. Our team will contact you shortly.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to submit your booking right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
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
        <select
          className="field"
          value={form.eventType}
          onChange={(event) => setForm({ ...form, eventType: event.target.value as EventType })}
        >
          {eventTypes.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType.charAt(0) + eventType.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <input
          className="field"
          type="date"
          value={form.date}
          onChange={(event) => setForm({ ...form, date: event.target.value })}
          required
        />
        <div className="space-y-2">
          <label htmlFor="guest-count" className="text-sm font-semibold text-brand-primary">
            Guest count
          </label>
          <input
            id="guest-count"
            className="field"
            type="number"
            min={1}
            placeholder="Number of guests"
            value={form.guests}
            onChange={(event) => setForm({ ...form, guests: event.target.value })}
            required
          />
        </div>
      </div>
      <textarea
        className="field min-h-40"
        placeholder="Tell us about your event requirements"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        required
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">{status}</p>
        <button type="submit" disabled={submitting} className="button-primary disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </form>
  );
}
