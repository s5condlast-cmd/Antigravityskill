# 🎨 UI/UX Design Toolchain Guide (`agentation`, `taste-skill`, `impeccable`)

This reference provides complete, copy-pasteable integration code, layout wrappers, and design token presets for the 3 external UI tools installed via `/install`.

---

## 🛠️ Toolchain Overview

| Tool | Purpose | Installation | Key Role in Code |
| :--- | :--- | :--- | :--- |
| **`agentation`** | Visual DOM inspection & agent UI feedback toolbar | `npm install agentation` | Mount `<Agentation />` in dev layout for live visual telemetry |
| **`taste-skill`** | Refined typography, micro-interactions & high-taste tokens | `npx skills add Leonxlnx/taste-skill` | Enforces subtle borders, glassmorphism, and balanced spacing |
| **`impeccable`** | Design token engine & design system configuration | `npx impeccable install` | Generates consistent design tokens (`design.config.json`) |

---

## 1. 🔍 Agentation Integration Code

`agentation` provides a non-intrusive visual toolbar in your browser during local development to inspect elements, highlight layout boundaries, and provide visual feedback to AI agents.

### Next.js App Router (`app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Conditionally import Agentation for client dev mode
import { Agentation } from "agentation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Web Application",
  description: "Built with Antigravity UI Toolchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        {children}

        {/* 2. Dev-Only Visual Inspection Toolbar */}
        {process.env.NODE_ENV === "development" && (
          <Agentation />
        )}
      </body>
    </html>
  );
}
```

### Vite + React SPA (`src/App.tsx` or `src/main.tsx`)

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Agentation } from "agentation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </React.StrictMode>
);
```

---

## 2. 💎 Taste-Skill Design Tokens & Aesthetic Component Recipes

`taste-skill` enforces high-taste design rules:

1. **Subtle Borders**: Use `border-white/10` or `border-border/40` instead of harsh solid borders.
2. **Glassmorphism**: Use `backdrop-blur-md bg-background/80` for elevated layers.
3. **Micro-Interactions**: Use `transition-all duration-200 ease-out active:scale-[0.98]`.
4. **Balanced Typography**: Tight tracking (`tracking-tight`) for display headers, relaxed line-height for body.

### Design Tokens (`app/globals.css` / `src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 6%;
    --card-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
  }
}
```

### Aesthetic Button Component Recipe (`components/ui/Button.tsx`)

```tsx
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground shadow-sm hover:opacity-90 hover:shadow",
    secondary:
      "bg-muted text-foreground hover:bg-muted/80",
    glass:
      "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 shadow-sm",
    outline:
      "border border-border/80 text-foreground hover:bg-accent hover:text-accent-foreground",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Glassmorphic Card Recipe (`components/ui/Card.tsx`)

```tsx
import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  children,
  hoverEffect = true,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 ${
        hoverEffect ? "hover:border-border/80 hover:shadow-md hover:-translate-y-0.5" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

---

## 3. 🎯 Impeccable Design Token Integration

`impeccable` standardizes design systems by generating theme tokens and spacing invariants.

### Configuration (`design.config.json` / `impeccable.config.json`)

```json
{
  "name": "Antigravity UI Design System",
  "version": "1.0.0",
  "theme": {
    "colors": {
      "brand": {
        "primary": "#0F172A",
        "accent": "#38BDF8",
        "surface": "#020617"
      },
      "neutral": {
        "borderSubtle": "rgba(255, 255, 255, 0.08)",
        "borderStrong": "rgba(255, 255, 255, 0.16)",
        "textMuted": "#94A3B8"
      }
    },
    "typography": {
      "fontFamilySans": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      "fontFamilyDisplay": "Plus Jakarta Sans, Inter, sans-serif"
    },
    "radii": {
      "sm": "0.375rem",
      "md": "0.75rem",
      "lg": "1rem",
      "xl": "1.5rem"
    }
  }
}
```

---

## 4. ⚡ Post-Installation Checklist

After running `/install`:

1. **Verify Agentation Visibility**: Start local dev server (`npm run dev`) and verify the Agentation inspector toolbar renders in the bottom corner of your browser.
2. **Apply Design Tokens**: Import the `globals.css` variables into your root layout.
3. **Use Tasteful Components**: Use the `<Button variant="glass" />` and `<Card />` recipes for clean, modern interfaces.
