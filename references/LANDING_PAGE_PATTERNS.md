# 🎨 Pre-Existing Landing Page & UI Component Patterns

Production-ready, accessible, mobile-first component patterns and pre-existing code snippets that can be dropped into **any landing page or frontend application**.

---

## 1. 🌟 High-Conversion Hero Section

A responsive hero section with a social proof badge, dual CTA buttons, and responsive typography.

```tsx
import React from "react";

interface HeroProps {
  badgeText?: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroSection({
  badgeText = "✨ Now Live: Version 2.0 with Zero-Defect AI",
  headline,
  subheadline,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Social Proof / Release Badge */}
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-slate-800/80 border border-slate-700 text-cyan-400 mb-8 backdrop-blur-sm shadow-inner hover:border-cyan-500/50 transition-colors">
            <span>{badgeText}</span>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          {subheadline}
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <a
            href={primaryCtaLink}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] shadow-lg shadow-cyan-500/25 transition-all duration-200"
          >
            {primaryCtaText}
          </a>
          {secondaryCtaText && secondaryCtaLink && (
            <a
              href={secondaryCtaLink}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-800 hover:text-white border border-slate-700 active:scale-[0.98] transition-all duration-200"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## 2. 🧭 Glassmorphic Responsive Navbar with Mobile Drawer

```tsx
import React, { useState, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "#docs" },
];

export function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
            ⚡
          </span>
          <span>Antigravity</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#get-started"
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors shadow-sm"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-lg font-semibold text-white bg-cyan-500 hover:bg-cyan-400 mt-4"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
## 3. 💳 Interactive Pricing Matrix with Billing Toggle

```tsx
import React, { useState } from "react";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Ideal for individual developers exploring zero-defect AI skills.",
    features: ["Standard /debug engine", "Accessible /design tokens", "Community support"],
    ctaText: "Start Free",
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 24,
    description: "For professional engineers and high-velocity product teams.",
    features: [
      "Deep 5-phase /debug diagnostics",
      "Full /design UI component system",
      "Automated /learn memory synthesis",
      "Zero-Red-Line CI Quality Gate",
    ],
    isPopular: true,
    ctaText: "Upgrade to Pro",
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "Custom compliance, SLA, and dedicated engineering support.",
    features: [
      "Custom organization design rules",
      "Dedicated MCP tool connectors",
      "Self-hosted quality runners",
      "24/7 Priority engineering support",
    ],
    ctaText: "Contact Sales",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-base sm:text-lg">
          Choose the plan that best fits your development velocity.
        </p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className={`text-sm ${!isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Toggle annual billing"
            className="w-14 h-8 flex items-center bg-muted border border-border rounded-full p-1 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <div
              className={`bg-primary w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm flex items-center gap-1.5 ${isAnnual ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
            Annual <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-card border-2 border-primary shadow-xl shadow-primary/10 scale-105 z-10"
                    : "bg-card/60 border border-border hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 min-h-[40px] leading-relaxed">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-5xl font-black tracking-tight">${price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <ul className="space-y-3.5 text-left text-sm text-muted-foreground mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <span className="p-0.5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                        <span className="text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`w-full h-11 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] ${
                    plan.isPopular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

---

## 4. ❓ Accessible FAQ Accordion

```tsx
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Will this skill interfere with Antigravity or any AI model?",
    answer:
      "No. It uses progressive disclosure and only activates on demand during /debug or /design invocations, guaranteeing zero token waste and zero system interference.",
  },
  {
    question: "How does /design ensure accessible, high-taste UI?",
    answer:
      "The /design skill strictly follows WCAG 2.1 AA accessibility (≥ 4.5:1 contrast, visible focus rings, aria labels), an 8-point spatial grid, smooth spring motion delays, and semantic HSL/OKLCH design tokens.",
  },
  {
    question: "Can I use these skills on Python, Go, or Rust codebases?",
    answer:
      "Yes! All engineering standards, type guards, and CI quality gates are 100% polyglot and support TypeScript, Python, Go, and Rust out of the box.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40 text-foreground">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-border rounded-xl bg-card overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-lg text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-lg bg-muted text-muted-foreground ml-4 flex items-center justify-center">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```
