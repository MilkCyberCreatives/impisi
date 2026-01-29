import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  phone?: string;
  website?: string; // honeypot (anti-spam)
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Basic honeypot (bots fill hidden fields)
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true }); // pretend success
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();
    const company = (body.company || "").trim();
    const phone = (body.phone || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // SMTP env vars (set in .env.local + Vercel)
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      CONTACT_TO,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email service is not configured. Missing SMTP environment variables.",
        },
        { status: 500 }
      );
    }

    const to = CONTACT_TO || "info@impisiresources.co.za";

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // 465 = true, 587 = false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: SMTP_FROM,               // e.g. "Impisi Website <no-reply@yourdomain.co.za>"
      to,                            // info@impisiresources.co.za
      replyTo: email,                // so replying goes to the sender
      subject: `Impisi Contact: ${subject}`,
      text: buildText({ name, email, company, phone, subject, message }),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildText(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return [
    "New Website Enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : "",
    data.phone ? `Phone: ${data.phone}` : "",
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}
