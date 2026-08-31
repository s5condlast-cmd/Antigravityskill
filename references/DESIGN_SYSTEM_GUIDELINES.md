# 🎨 Design System & UI/UX Engineering Guidelines

This manual defines the design system tokens, component architecture, responsive grid rules, and accessibility standards for the **`/design`** slash skill.

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
