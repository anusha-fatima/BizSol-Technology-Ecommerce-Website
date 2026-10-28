// Vercel serverless function: emails each new order to the shop owner.
// Needs these Environment Variables in Vercel: SMTP_USER (Gmail address) and SMTP_PASS (Gmail app password).
const nodemailer = require("nodemailer");
const TO = process.env.ORDER_TO || "m.yousufakhter@gmail.com";
const hits = new Map();
const clean = (v, n = 200) => String(v == null ? "" : v).replace(/<[^>]*>/g, "").replace(/[\r\n]+/g, " ").trim().slice(0, n);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let b = req.body;
  try { if (typeof b === "string") b = JSON.parse(b); } catch (e) { b = null; }
  if (!b || b.website) return res.status(400).json({ ok: false });

  const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0].trim();
  const now = Date.now();
  if (hits.get(ip) && now - hits.get(ip) < 15000) return res.status(429).json({ ok: false });
  hits.set(ip, now);
  if (hits.size > 500) hits.clear();

  const o = {
    ref: clean(b.ref, 30).replace(/[^A-Z0-9-]/gi, ""), name: clean(b.name), phone: clean(b.phone, 30), city: clean(b.city),
    address: clean(b.address, 300), company: clean(b.company), email: clean(b.email), note: clean(b.note, 1000),
  };
  const items = Array.isArray(b.items) ? b.items.slice(0, 50).map((i) => ({ name: clean(i && i.name, 140), q: Math.max(1, Math.min(999, parseInt(i && i.q, 10) || 1)) })).filter((i) => i.name) : [];
  const emailOk = !o.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email);
  if (!o.name || !o.phone || !o.city || !o.address || !items.length || !emailOk) return res.status(422).json({ ok: false });

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return res.status(500).json({ ok: false, error: "Email is not configured" });

  const lines = items.map((i, n) => `${n + 1}. ${i.name} x ${i.q}`).join("\n");
  const text = `New order ${o.ref}\n\nName: ${o.name}\nCompany: ${o.company}\nPhone: ${o.phone}\nEmail: ${o.email}\nCity: ${o.city}\nAddress: ${o.address}\n\nItems:\n${lines}\n\nNotes: ${o.note}\n`;
  const rows = items.map((i) => `<tr><td style="padding:6px 12px;border:1px solid #ddd">${esc(i.name)}</td><td style="padding:6px 12px;border:1px solid #ddd;text-align:center">${i.q}</td></tr>`).join("");
  const html = `<h2>New order ${esc(o.ref)}</h2><p><b>${esc(o.name)}</b>${o.company ? " (" + esc(o.company) + ")" : ""}<br>Phone: ${esc(o.phone)}<br>Email: ${esc(o.email) || "-"}<br>City: ${esc(o.city)}<br>Address: ${esc(o.address)}</p><table style="border-collapse:collapse"><tr><th style="padding:6px 12px;border:1px solid #ddd">Product</th><th style="padding:6px 12px;border:1px solid #ddd">Qty</th></tr>${rows}</table><p>Notes: ${esc(o.note) || "-"}</p>`;

  try {
    const t = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    await t.sendMail({ from: `"BizSol Website" <${process.env.SMTP_USER}>`, to: TO, replyTo: o.email || undefined, subject: `New order ${o.ref} - ${o.name}`, text, html });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
};
