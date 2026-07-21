import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/lib/company";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "2D & 3D Animation", href: "#services" },
      { label: "VR & AR", href: "#services" },
      { label: "Web Solutions", href: "#services" },
      { label: "e-Learning", href: "#services" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="section-pad border-t border-border bg-bg-soft/60 pt-16 pb-8">
      <div className="container-site grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-white">
              DX
            </span>
            <span className="font-display text-lg font-bold tracking-wide text-foreground">
              DEVOTRIC<span className="text-accent">X</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {company.legalName} — transforming ideas into immersive digital experiences
            through animation, VR/AR, web solutions, and e-learning.
          </p>
          <a
            href={company.telLink}
            className="mt-4 flex items-center gap-2 text-sm text-foreground transition hover:text-accent"
          >
            <Phone size={14} className="text-accent" />
            {company.phone}
          </a>
          <a
            href={company.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted transition hover:text-accent"
          >
            <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
            {company.address}
          </a>
          <div className="mt-5 flex gap-3">
            <a
              href={`mailto:${company.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
            </a>
            <a
              href={company.whatsapp}
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted transition hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-site mt-12 flex flex-col gap-2 border-t border-border pt-6 text-center text-xs text-muted md:flex-row md:items-center md:justify-between md:text-left">
        <p>
          © {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </p>
        <p>Hyderabad, Telangana · India</p>
      </div>
    </footer>
  );
}
