import React, { useState } from 'react';

export function ContactSplit({
  tagline = "Direct Inquiries",
  headline = "Get in touch with the engineering team.",
  description = "Have a custom architecture question or need dedicated enterprise pairing? Send us a message and we'll reply within 24 hours.",
  emailContact = "team@antigravity.dev",
  location = "San Francisco, CA",
}: {
  tagline?: string;
  headline?: string;
  description?: string;
  emailContact?: string;
  location?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">{tagline}</span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100">{headline}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
          <div className="pt-6 font-mono text-xs text-zinc-400 space-y-2">
            <div>Email: <span className="text-zinc-200">{emailContact}</span></div>
            <div>Location: <span className="text-zinc-200">{location}</span></div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-2">
                <div className="text-emerald-400 font-mono text-sm font-semibold">✔ Message Dispatched</div>
                <p className="text-xs text-zinc-400">Thank you for reaching out. We will review your request shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Full Name</label>
                    <input required type="text" placeholder="Jane Doe" className="w-full h-10 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Work Email</label>
                    <input required type="email" placeholder="jane@company.com" className="w-full h-10 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">Project Context / Message</label>
                  <textarea required rows={4} placeholder="Describe your technical requirements..." className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none" />
                </div>
                <button type="submit" className="w-full h-10 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
