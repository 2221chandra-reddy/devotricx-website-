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
import SectionHeading from "./SectionHeading";

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

  return (
    <section id="contact" className="section-pad relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contact"
          title="Let's start a conversation"
          description="Share your project details and we’ll reply with a clear next step—usually within one business day."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-7 md:p-9"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Full Name</span>
                <input
                  required
                  name="name"
                  className="w-full rounded-2xl border border-border bg-bg/50 px-4 py-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-border bg-bg/50 px-4 py-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-muted">Service Interest</span>
              <select
                name="service"
                className="w-full rounded-2xl border border-border bg-bg/50 px-4 py-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                defaultValue="2D & 3D Animation"
              >
                <option>2D & 3D Animation</option>
                <option>VR & AR</option>
                <option>Web Solutions</option>
                <option>e-Learning</option>
              </select>
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-muted">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-none rounded-2xl border border-border bg-bg/50 px-4 py-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
                placeholder="Share project goals, timeline, and scope..."
              />
            </label>
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              <Send size={16} />
              {status === "opening" ? "Opening WhatsApp…" : "Send on WhatsApp"}
            </button>
            <p className="mt-3 text-xs text-muted">
              Submitting opens WhatsApp with your message ready to send.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <div className="glass overflow-hidden rounded-3xl">
              <div className="relative h-64 w-full md:h-72">
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
                className="flex items-center justify-center gap-2 border-t border-border px-4 py-3 text-sm text-muted transition hover:bg-accent-soft hover:text-accent"
              >
                <ExternalLink size={14} />
                Open in Google Maps
              </a>
            </div>

            <div className="glass space-y-4 rounded-3xl p-6">
              <div>
                <p className="font-display text-base font-semibold text-foreground">
                  DEVOTRIC<span className="text-accent">X</span>
                </p>
                <p className="text-sm text-muted">Technologies Private Limited</p>
              </div>

              <a
                href={company.telLink}
                className="flex items-center gap-3 text-foreground transition hover:text-accent"
              >
                <Phone size={18} className="shrink-0 text-accent" />
                {company.phone}
              </a>

              <a
                href={company.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-foreground transition hover:text-accent"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed">{company.address}</span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-foreground transition hover:text-accent"
              >
                <Mail size={18} className="shrink-0 text-accent" />
                {company.email}
              </a>

              <div className="flex gap-3 pt-2">
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-accent"
                >
                  <MessageCircle size={16} className="text-accent" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
