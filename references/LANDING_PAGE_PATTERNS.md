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

---

## 5. 🍱 Asymmetric Bento Grid Feature Showcase

Modern 3-column asymmetric bento grid with gradient glow, staggered animations, and live interactive feature previews.

```tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, ShieldCheck, Zap, Layers, Cpu, ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  className?: string;
  children?: React.ReactNode;
}

function BentoCard({ icon, title, description, tag, className, children }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-8 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between",
        className
      )}
    >
      {/* Top subtle ambient light */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
          {tag && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {children && <div className="mt-6 pt-4 border-t border-border/40">{children}</div>}
    </div>
  );
}

export function BentoGridSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            Engineered for Precision
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Everything you need for zero-defect velocity
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            High-performance tools, design systems, and diagnostic guardrails built right in.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large Featured (Spans 2 columns) */}
          <BentoCard
            icon={<Cpu className="h-6 w-6" />}
            title="5-Phase Systematic Root-Cause Diagnostics"
            description="Isolate defects at the boundary layer without trial-and-error edits or symptom-masking hacks."
            tag="Core Engine"
            className="md:col-span-2 min-h-[320px]"
          >
            <div className="rounded-xl bg-muted/60 p-4 border border-border flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">$ diagnose --strict</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                ✔ 0 red lines (100% healthy)
              </span>
            </div>
          </BentoCard>

          {/* Card 2: Regular */}
          <BentoCard
            icon={<Zap className="h-6 w-6" />}
            title="Buttery Smooth Micro-Interactions"
            description="Spring curves and cascading delays deliver fluid 60fps tactile response."
            tag="Motion"
          />

          {/* Card 3: Regular */}
          <BentoCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Strict WCAG 2.1 AA Accessibility"
            description="Guaranteed 4.5:1 contrast, visible focus rings, and screen-reader ARIA roles."
            tag="A11y"
          />

          {/* Card 4: Large (Spans 2 columns) */}
          <BentoCard
            icon={<Layers className="h-6 w-6" />}
            title="Semantic Token System (Light & Dark Mode)"
            description="Themeable HSL/OKLCH color scales ensure instant, seamless dark mode transitions."
            tag="Design System"
            className="md:col-span-2 min-h-[320px]"
          >
            <div className="flex flex-wrap gap-2">
              {['Primary', 'Secondary', 'Muted', 'Card', 'Popover', 'Destructive'].map((token) => (
                <span key={token} className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border text-foreground">
                  var(--{token.toLowerCase()})
                </span>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

---

## 6. ⭐ Testimonial & Social Proof Cards Grid

```tsx
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Rivera",
    role: "Staff Frontend Architect",
    company: "Vercel Ecosystem",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content: "The /design skill cut our component scaffolding time by 75%. Every card and modal comes out with flawless WCAG contrast and perfect 8-point spatial rhythm.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Lead Systems Engineer",
    company: "Supabase Cloud",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "Zero red lines isn't just a marketing slogan—the /debug workflow systematically identifies compiler mismatches before code ever touches Git.",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Head of Product Design",
    company: "Linear Workspaces",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    content: "Finally, an AI design tool that understands restrained minimalism, spring physics, and semantic tokens instead of generating cluttered, generic templates.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Loved by engineering leaders
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            See how teams ship higher-quality products with /debug and /design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-primary/30"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

---

## 7. ⚓ High-Converting Footer

```tsx
import React from 'react';
import { ArrowRight, Github, Twitter, Disc as Discord } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card/60 text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand & Newsletter (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black">
                ⚡
              </span>
              <span>Antigravity Skill</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Universal staff-engineer framework for /debug, /design, and zero-defect code generation.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 px-3.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-xs"
              />
              <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all flex items-center gap-1 shrink-0">
                <span>Join</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Links Column 1 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Framework</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">/debug Protocol</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">/design System</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">CI Quality Gate</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">/learn Memory</a></li>
            </ul>
          </div>

          {/* Navigation Links Column 2 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">References</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Component Library</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">UX Heuristics</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">WCAG 2.1 AA Guide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Common Bug Patterns</a></li>
            </ul>
          </div>

          {/* Navigation Links Column 3 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Community</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Discord Server</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">MIT License</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Release Notes</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Antigravity Engineering Framework. Open source under MIT License.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/s5condlast-cmd/Antigravityskill" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Discord className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
