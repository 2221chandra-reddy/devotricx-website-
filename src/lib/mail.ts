import nodemailer from "nodemailer";

type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendMail({ to, subject, html, text }: SendMailInput) {
  const from =
    process.env.MAIL_FROM ||
    process.env.SMTP_USER ||
    "DevotricX <noreply@devotricx.com>";

  // 1) Resend API
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, text }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Email failed: ${body}`);
    }
    return { ok: true as const, provider: "resend" as const };
  }

  // 2) Gmail / SMTP
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || `"DevotricX" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
    });
    return { ok: true as const, provider: "smtp" as const };
  }

  throw new Error(
    "Email service not configured. Add SMTP_USER and SMTP_PASS (Gmail App Password) or RESEND_API_KEY in .env",
  );
}

export function appBaseUrl() {
  return (
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
