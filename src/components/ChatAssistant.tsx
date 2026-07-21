"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";

const replies = [
  "Thanks for reaching out! Our team specializes in 2D/3D animation, VR/AR, web solutions, and e-learning. How can we help?",
  "Great question. Share your project goals and timeline, and we'll guide you to the right service.",
  "You can schedule a meeting via the Contact section, or message us on WhatsApp for a quick reply.",
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: "Hi! Need a quick answer about our services or process? Ask here—or tap WhatsApp for a direct chat.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: replies[prev.length % replies.length] },
      ]);
    }, 600);
  };

  return (
    <>
      {!open ? (
        <a
          href="https://wa.me/917672041816"
          target="_blank"
          rel="noreferrer"
          className="fixed right-5 bottom-24 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
          aria-label="WhatsApp chat"
        >
          <MessageCircle size={22} />
        </a>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_30px_rgba(239,68,68,0.4)] transition hover:scale-105"
        aria-label={open ? "Close quick help" : "Open quick help"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Bot size={22} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="glass fixed right-5 bottom-24 z-50 flex h-[420px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl"
          >
            <div className="border-b border-border bg-accent/10 px-4 py-3">
              <p className="font-display text-sm font-semibold text-foreground">
                DevotricX Assistant
              </p>
              <p className="text-xs text-muted">Ask about services & next steps</p>
            </div>
            <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "bot"
                      ? "bg-bg-elevated text-foreground"
                      : "ml-auto bg-accent text-white"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-border bg-bg/40 px-4 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
