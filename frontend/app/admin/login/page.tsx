"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api";
import { setAdminToken } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await adminLogin({ username, password });
      setAdminToken(response.token);
      router.replace("/admin/services");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="container-shell max-w-lg">
        <form onSubmit={handleSubmit} className="card-surface space-y-5 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Admin Access</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-brand-primary">Sign in to manage NaamEvent</h1>
          </div>
          <input className="field" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" required />
          <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
          <button type="submit" disabled={submitting} className="button-primary w-full">
            {submitting ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-sm text-slate-600">{status}</p>
        </form>
      </div>
    </section>
  );
}
