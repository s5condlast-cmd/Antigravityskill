# 🎨 Design System & UI/UX Engineering Guidelines

This manual defines the design system tokens, component architecture, responsive grid rules, and elite craftsmanship standards for the **`/design`** slash skill.

---

## 🚫 0. The Anti-AI-Slop Design Manifesto

Most AI-generated UI looks like generic "AI slop": tacky neon radial blur circles, buzzword marketing copy, fake testimonials with stock headshots, and low-density floating cards. 

**`/design` strictly prohibits AI tropes.** All generated interfaces must meet the standard of world-class design engineering (Linear, Stripe, Apple, Vercel, Raycast).

```text
┌──────────────────────────────────────────────┬──────────────────────────────────────────────┐
│       ❌ REJECTED (GENERIC AI SLOP)          │         ✅ ENFORCED (ELITE CRAFTSMANSHIP)    │
├──────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ • Giant purple/cyan radial blur backgrounds  │ • Crisp neutral darks (#09090b) with 1 accent│
│ • Empty buzzwords ("Unleash Next-Gen AI")    │ • Realistic product copy and dense metadata  │
│ • Fake stock photo testimonials ("Alex R.")  │ • Real interactive widgets & product preview │
│ • Low-density cards floating in empty voids  │ • High data density (tabular-nums, mono IDs) │
│ • Tacky neon drop shadows & rainbow borders  │ • Hairline borders (border-white/[0.08])     │
│ • Static dummy mockups that don't do anything│ • Real keyboard navigation (⌘K, Escape, Tab) │
└──────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 🌈 1. Semantic Color Token Architecture

All UI components must use **semantic design tokens** rather than hardcoded hex values or raw arbitrary classes. This ensures seamless dark/light mode theming and high-contrast accessibility.

### 1.1 CSS Variables / Tailwind Token Mapping

```css
:root {
  /* Surface & Canvas */
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  
  /* Cards & Elevate Surfaces */
  --card: 0 0% 100%;
  --card-foreground: 224 71.4% 4.1%;
  --popover: 0 0% 100%;
  --popover-foreground: 224 71.4% 4.1%;
  
  /* Brand & Actions */
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Muted & Subdued */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Feedback States */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --success: 142.1 76.2% 36.3%;
  --success-foreground: 355.7 100% 97.3%;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
  
  /* Borders & Focus Rings */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.75rem;
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 40% 98%;
  --card: 224 71.4% 6%;
  --card-foreground: 210 40% 98%;
  --popover: 224 71.4% 6%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}
```

---

## 🔤 2. Typography Hierarchy & Fluid Scales

Use a modular, readable type scale that maintains vertical harmony:

| Level | Size (Tailwind) | Line Height | Tracking | Recommended Use |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `text-4xl sm:text-6xl font-extrabold` | `leading-tight` | `tracking-tight` | Landing page hero headlines |
| **H1 Headline** | `text-3xl sm:text-4xl font-bold` | `leading-snug` | `tracking-tight` | Major page headers & title sections |
| **H2 Section** | `text-2xl sm:text-3xl font-semibold`| `leading-snug` | `tracking-tight` | Feature blocks & category headers |
| **H3 Subsection** | `text-xl sm:text-2xl font-semibold` | `leading-normal`| `tracking-normal`| Cards, modals, dialog titles |
| **Body (Large)** | `text-lg font-normal` | `leading-relaxed`| `tracking-normal`| Subtitles, lead paragraphs, hero descriptions |
| **Body (Base)** | `text-base font-normal` | `leading-relaxed`| `tracking-normal`| Standard UI text, descriptions, content |
| **Caption / Small**| `text-sm font-medium` | `leading-normal`| `tracking-wide` | Badges, timestamps, input helper text |
| **Micro / Mono** | `text-xs font-mono font-medium` | `leading-none` | `tracking-wider` | Keyboard shortcuts, status tags, pill tags |

---

## 📐 3. Spacing, Elevation & Glassmorphism

### 3.1 8-Point Spacing Rhythm
* **Component Padding**: `p-4` (16px) for compact cards, `p-6` (24px) for standard cards, `p-8` (32px) for hero containers.
* **Section Gap**: `space-y-12` or `space-y-16` (48px - 64px) between distinct landing page sections.
* **Grid Gaps**: `gap-6` (24px) on desktop, `gap-4` (16px) on mobile screens.

### 3.2 Elevation & Modern Shadow Tokens
* **Card Elevation**: `shadow-sm hover:shadow-md transition-shadow duration-200`
* **Dropdown / Popover Elevation**: `shadow-lg ring-1 ring-black/5 dark:ring-white/10`
* **Modal Dialog Elevation**: `shadow-2xl`
* **Glassmorphic Surface**:
  ```tsx
  className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50"
  ```

---

## 🔘 4. Interactive Component State Matrix

Every interactive component (buttons, inputs, cards, tabs) **MUST** support all 6 core states:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        // Base styling & transition
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none",
        // Focus-visible ring for accessibility (WCAG)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-zinc-950",
        // Disabled state
        "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
        // Active click micro-interaction
        "active:scale-[0.98]",
        // Variant mapping
        variant === 'primary' && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === 'outline' && "border border-border bg-background hover:bg-muted text-foreground",
        variant === 'ghost' && "hover:bg-muted text-foreground",
        variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        // Size mapping
        size === 'sm' && "h-9 px-3 text-xs gap-1.5",
        size === 'md' && "h-11 px-5 text-sm gap-2",
        size === 'lg' && "h-13 px-7 text-base gap-2.5",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

---

## ♿ 5. WCAG 2.1 AA Accessibility Checklist

When designing any UI with `/design`:

- [ ] **Contrast Ratio**: Normal text has at least **4.5:1** contrast against background; large text (18pt+ or 14pt bold) has at least **3:1**.
- [ ] **Focus Visible**: All interactive elements have distinct `focus-visible:ring-2` outline indicators for keyboard users.
- [ ] **Aria Attributes**: Decorative icons use `aria-hidden="true"`; interactive icons without visible text include `aria-label="Action description"`.
- [ ] **Semantic HTML**: Use semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`) instead of nested generic `<div>` trees.
- [ ] **Keyboard Navigation**: Dropdowns, accordions, and dialogs close on `Escape` key and support `Tab` navigation with focus trapping.
- [ ] **Reduced Motion**: Smooth animations respect user preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 🧩 6. Reusable Component Blueprint: Modern Bento Grid & Stats Card

```tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, isPositive = true, icon }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 group">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
        <span className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
          isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3 rotate-90" />}
          {change}
        </span>
      </div>
    </div>
  );
}
```

---

## 🎬 7. Motion Choreography & Staggered Delay Animations

Smooth, intentional motion guides the user's eye without feeling sluggish or overwhelming.

### 7.1 Easing Curves & Timing Standards

| Motion Type | Duration | Easing Curve | Tailwind / CSS Class |
| :--- | :--- | :--- | :--- |
| **Micro-Interactions** (Button hover, click) | `150ms - 200ms` | `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` | `transition-all duration-200 ease-out` |
| **Surface Expansions** (Modals, menus, dropdowns) | `250ms - 300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` (Spring feel) | `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]` |
| **Page Entry / Staggered Elements** | `400ms - 600ms` | `ease-out` with staggered delays | `animate-in fade-in slide-in-from-bottom-4` |

### 7.2 Staggered Cascade Delays (Bento & Lists)
When rendering lists, cards, or hero items, stagger entrance animations sequentially:
* **Item 1**: `delay-0`
* **Item 2**: `delay-75` (75ms offset)
* **Item 3**: `delay-150` (150ms offset)
* **Item 4**: `delay-200` (200ms offset)

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cards.map((card, index) => (
    <div
      key={card.id}
      style={{ animationDelay: `${index * 80}ms` }}
      className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
    >
      <MetricCard {...card} />
    </div>
  ))}
</div>
```

---

## 📏 8. Pixel-Perfect Spatial Math & Alignment Standards

High-taste UI relies on mathematical consistency in heights, widths, paddings, and icon alignments:

### 8.1 Sizing & Padding Ladders

| Size Token | Control Height | Horizontal Padding | Icon Size | Font Size | Gap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Compact (`sm`)** | `h-9` (36px) | `px-3` (12px) | `h-4 w-4` (16px) | `text-xs font-medium` | `gap-1.5` |
| **Standard (`md`)** | `h-11` (44px) | `px-5` (20px) | `h-5 w-5` (20px) | `text-sm font-medium` | `gap-2` |
| **Featured (`lg`)** | `h-13` (52px) | `px-7` (28px) | `h-5 w-5` (20px) | `text-base font-semibold`| `gap-2.5` |

### 8.2 Optical Centering & Icon Legibility
* **Optical Alignment**: Never let icons float without vertical centering (`inline-flex items-center justify-center`).
* **Icon Recognition & Affordance**: Place icons to the **left** of action verbs (e.g., `[Search Icon] Search documents`) or to the **right** for external/forward navigation (`[ArrowRight]`).
* **Icon Touch Boundaries**: Interactive icons must have at least a `p-2` to `p-2.5` padding wrapper on mobile devices to meet Fitts's Law ($\ge 44\text{px}$ touch target).

---

## ✨ 9. The "Impeccable Taste" & Minimalist UI Checklist

When building interfaces under `/design`, enforce these 7 golden rules of taste:

1. **Eliminate Visual Noise**: If a border, divider, or background doesn't serve a clear grouping purpose, remove it and let whitespace create the structure.
2. **Harmonious Typography**: Stick to 2-3 distinct font weights per page (`normal`, `medium`, `bold`) and never use more than 2 font families.
3. **Subtle Surface Depth**: Layer surfaces smoothly (`canvas bg-background` $\rightarrow$ `card bg-card` with `border border-border/60` $\rightarrow$ `popover shadow-xl`).
4. **Soft Glows & Ambient Accents**: Use low-opacity radial gradients (`bg-gradient-to-r from-primary/10 via-transparent to-transparent`) instead of harsh solid blocks.
5. **No Broken Alignment**: Ensure all cards in a grid have equal height (`h-full flex flex-col justify-between`) and buttons align along the bottom edge.
6. **Easy-to-Scan Navigation**: Highlight active menu routes with a subtle pill background (`bg-accent text-accent-foreground font-semibold`) or bottom indicator line.
7. **Immediate Visual Feedback**: Every hover, click, and keystroke provides smooth, immediate micro-interactions ($< 150\text{ms}$).

---

## 🔄 10. Adaptive Brand Ingestion & Migration Framework (New & Existing Sites)

When applying `/design` to a codebase, the agent must adaptively respect, ingest, and elevate existing brand assets, logos, colors, icons, and imagery.

```text
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│ 1. BRAND INGESTION AUDIT  │ ───> │ 2. PRESERVE & MAP TOKENS  │ ───> │ 3. ENHANCE & MIGRATE      │
│  - Scan logos & SVGs      │      │  - Keep brand core colors │      │  - Ensure WCAG AA contrast│
│  - Extract palette/fonts  │      │  - Retain icon glyphs     │      │  - Generate dark mode pair│
│  - Identify image style   │      │  - Maintain brand meaning │      │  - 0-breaking-change drop │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

### 10.1 The 4 Rules of Brand Preservation & Elevation

1. **Never Overwrite User Brand Identity**:
   * If the project has an existing logo (`public/logo.svg`, `src/assets/logo.png`), always preserve its geometry, aspect ratio, and color hierarchy.
   * If the user has an established brand color (e.g. Stripe purple `#635bff`, Spotify green `#1ed760`, Airbnb coral `#ff5a5f`), preserve that exact hue and its semantic meaning.

2. **Map Existing Colors to Semantic Token Triad**:
   * Convert raw brand hex values into themeable semantic tokens:
     ```css
     :root {
       /* User's existing brand mapped directly into the system */
       --primary: 247 100% 68%; /* Existing brand purple */
       --primary-foreground: 0 0% 100%;
       
       /* Derived accessible companion tokens */
       --primary-hover: 247 90% 60%;
       --primary-subtle: 247 100% 96%;
     }
     ```

3. **Intelligent Enhancement Recommendations**:
   * If an existing brand color fails WCAG AA text contrast ($< 4.5:1$), recommend an accessible companion shade for body text while keeping the exact brand color for large logos and primary buttons:
     > *"Your primary brand color `#38bdf8` is vibrant! For small text on light backgrounds, I've added a high-contrast companion token `#0284c7` (5.2:1 contrast) to ensure full accessibility."*
   * If the codebase lacks a Dark Mode, generate harmonious dark-surface pairings that complement the user's primary brand color.

4. **Universal Drop-in Migration (New or Legacy Web)**:
   * Design components with standard CSS variable hooks so they drop seamlessly into **Next.js, Vite, Astro, Remix, Vue, Svelte, or plain HTML/CSS** without breaking legacy pages.
   * Use non-destructive Tailwind class merging via `cn(...)` so existing custom classes override defaults cleanly.
