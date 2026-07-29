"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { company } from "@/lib/company";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    const text = [
      `Hello DevotricX,`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      ``,
      message,
    ].join("\n");

    setStatus("opening");
    window.open(
      `${company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    window.setTimeout(() => setStatus("idle"), 2000);
    form.reset();
  };

  const field =
    "w-full rounded-xl border border-border bg-bg/50 px-3 py-2 text-sm text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

  return (
    <section id="contact" className="section-pad relative py-12 md:py-16">
      <div className="container-site max-w-5xl">
        <div className="mb-6 max-w-xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Contact</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
            Let&apos;s start a conversation
          </h2>
          <p className="mt-2 text-sm text-muted">
            Share your project details—we usually reply within one business day.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-muted">Full Name</span>
                <input required name="name" className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted">Email</span>
                <input required type="email" name="email" className={field} placeholder="you@company.com" />
              </label>
            </div>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs text-muted">Service Interest</span>
              <select name="service" className={field} defaultValue="2D & 3D Animation">
                <option>2D & 3D Animation</option>
                <option>VR & AR</option>
                <option>Web Solutions</option>
                <option>e-Learning</option>
              </select>
            </label>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs text-muted">Message</span>
              <textarea
                required
                name="message"
                rows={3}
                className={`${field} resize-none`}
                placeholder="Goals, timeline, and scope..."
              />
            </label>
            <button type="submit" className="btn-primary mt-4 !px-5 !py-2.5 text-sm">
              <Send size={14} />
              {status === "opening" ? "Opening WhatsApp…" : "Send on WhatsApp"}
            </button>
            <p className="mt-2 text-[11px] text-muted">
              Opens WhatsApp with your message ready to send.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="space-y-4"
          >
            <div className="glass overflow-hidden rounded-2xl">
              <div className="relative h-40 w-full sm:h-44">
                <iframe
                  title="DevotricX office location on Google Maps"
                  src={company.mapsEmbed}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={company.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-t border-border px-3 py-2 text-xs text-muted transition hover:bg-accent-soft hover:text-accent"
              >
                <ExternalLink size={12} />
                Open in Google Maps
              </a>
            </div>

            <div className="glass space-y-3 rounded-2xl p-4">
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  DEVOTRIC<span className="text-accent">X</span>
                </p>
                <p className="text-xs text-muted">Technologies Private Limited</p>
              </div>

              <a
                href={company.telLink}
                className="flex items-center gap-2.5 text-sm text-foreground transition hover:text-accent"
              >
                <Phone size={15} className="shrink-0 text-accent" />
                {company.phone}
              </a>

              <a
                href={company.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 text-foreground transition hover:text-accent"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-xs leading-relaxed">{company.address}</span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 text-sm text-foreground transition hover:text-accent"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                {company.email}
              </a>

              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:border-accent"
              >
                <MessageCircle size={14} className="text-accent" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
