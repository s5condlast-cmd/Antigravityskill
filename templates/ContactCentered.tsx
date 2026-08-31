import React, { useState } from 'react';

export function ContactCentered() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white text-center">
      <div className="max-w-xl mx-auto">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.12em]">Feedback & Support</span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-2 mb-4">Send Us a Direct Message</h2>
        <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
          Questions, integration requests, or bug reports? Let us know below.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4 text-left shadow-2xl">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="text-emerald-400 font-mono text-sm font-semibold">✔ Message Delivered</div>
              <p className="text-xs text-zinc-400">Our engineering leads review inquiries daily.</p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400">Email Address</label>
                <input required type="email" placeholder="you@company.com" className="w-full h-10 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400">Message</label>
                <textarea required rows={4} placeholder="Your thoughts or questions..." className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none" />
              </div>
              <button type="submit" className="w-full h-10 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white active:scale-[0.98] transition-all">
                Submit Feedback
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
