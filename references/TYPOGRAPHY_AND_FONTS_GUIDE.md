# 🔤 Master Typography, Font Pairing & Text Styling Guide

This manual codifies the mathematical formulas, font pairing stacks, optical letter-spacing (tracking) laws, and fluid leading rules for the **`/design`** slash skill.

---

## 🧭 Master Typography Architecture

```text
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│ 1. INVERSE TRACKING LAW   │ ───> │ 2. INVERSE LEADING LAW    │ ───> │ 3. 4-TIER TEXT HIERARCHY  │
│  - Big Text = Tight Gap   │      │  - Big Text = Tight Line  │      │  - Tier 1: Primary 100%   │
│  - Tiny Text = Wide Gap   │      │  - Body Text = Relaxed    │      │  - Tier 2: Body 65%       │
│  - Body = Neutral         │      │  - 45-75 Char Measure     │      │  - Tier 3: Muted Meta 45% │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

---

## 🔠 1. Modern Engineered Font Stacks

Never rely on bare unconfigured system defaults. Use these battle-tested, high-performance font stacks:

### 1.1 The Primary UI & Body Stack (Geist / Inter Modern Neo-Grotesque)
Optimized for developer interfaces, high-density data, and mathematical clarity.

```css
/* Tailwind CSS / CSS Variables */
:root {
  --font-sans: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-display: 'Geist', 'Inter', -apple-system, sans-serif;
}

/* Enable OpenType features for optical crispness */
body {
  font-family: var(--font-sans);
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'ss01';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Always enable tabular numerals for counters, metrics, and timestamps */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

### 1.2 The Optional Editorial / Expressive Serif Stack
For sophisticated editorial dispatches or high-trust landing pages:

```css
:root {
  --font-serif: 'Newsreader', 'Playfair Display', 'Charter', 'Iowan Old Style', Georgia, serif;
}
```

---

## 📐 2. The Inverse Tracking Law (Optical Letter-Spacing)

The human eye perceives letter-spacing differently at different scales:

| Scale / Role | Font Size | Tracking Formula | Tailwind Class | Why |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | $\ge 48\text{px}$ | `-0.03em` to `-0.04em` | `tracking-[-0.035em]` or `tracking-tighter` | Large letterforms look disjointed if spaced loosely. Tightening creates a cohesive, punchy lockup. |
| **Section Title (H2/H3)** | $24\text{px} - 36\text{px}$ | `-0.02em` to `-0.025em` | `tracking-[-0.02em]` or `tracking-tight` | Maintains solid visual weight and hierarchy. |
| **Body Paragraph** | $14\text{px} - 16\text{px}$ | `0em` to `-0.01em` | `tracking-normal` | Zero friction, maximum natural reading velocity. |
| **Micro-Badges & Uppercase**| $10\text{px} - 12\text{px}$ | `+0.08em` to `+0.15em` | `tracking-[0.1em]` or `tracking-widest` | Tiny uppercase letters blur together without generous positive letter-spacing. |

---

## 📏 3. The Inverse Leading Law (Line-Height Harmony)

Line-height must contract as font-size expands to avoid gaping vertical voids:

```text
[Headline: 64px] ──> Leading: 1.05 to 1.10 (Ultra-Compact)
[Subheading: 24px] ──> Leading: 1.25 to 1.30 (Structured)
[Body Text: 16px] ──> Leading: 1.55 to 1.65 (Comfortable Breathing Room)
[Captions: 12px] ──> Leading: 1.40 (Snug)
```

### 3.1 Line-Length Measure (The 45–75 Character Rule)
Never allow paragraphs to stretch across full-bleed $100\text{vw}$ containers. Always constrain text column width:
```tsx
{/* Perfect readable line length */}
<p className="text-base text-zinc-400 max-w-prose sm:max-w-xl leading-relaxed">
  Precision AI pair-programming with mathematical design systems.
</p>
```

---

## 🎨 4. The 4-Tier Optical Text Hierarchy

Never color all text pure solid white. Use a 4-tier optical hierarchy:

| Tier | Role | Dark Theme | Light Theme | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (Focal)** | H1, H2, Primary Actions | `text-zinc-100` (`#f4f4f5`) | `text-zinc-900` (`#18181b`) | $\ge 14.5:1$ (AAA) |
| **Tier 2 (Body)** | Explanatory Text, Inputs | `text-zinc-400` (`#a1a1aa`) | `text-zinc-600` (`#52525b`) | $\ge 5.2:1$ (AA) |
| **Tier 3 (Meta)** | Timestamps, Commit Hashes | `text-zinc-500` (`#71717a`) | `text-zinc-500` (`#71717a`) | $\ge 4.5:1$ (AA on surfaces) |
| **Tier 4 (Focal Accent)** | 1-2 Headline Key Words | Adaptive Gradient | Adaptive Gradient | High Vibrancy |

### 4.1 Crafting Adaptive Headline Gradients (Spot 3)
```tsx
<h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-zinc-100">
  Deterministic software with{' '}
  <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
    zero red lines.
  </span>
</h1>
```

---

## ⚖️ 5. Weight Restraint Rule (Maximum 3 Weights)

Using too many font weights creates chaotic, amateurish designs. Use **strictly 3 weights**:

1. **`font-normal` (400)**: All body text, descriptions, and paragraphs.
2. **`font-medium` (500)**: Interactive buttons, table headers, menu items, tabs, and badges.
3. **`font-semibold` / `font-bold` (600/700)**: Page headlines, section titles, and modal headers.

---

## 🛡️ 6. Typography Anti-Patterns & Quick Fixes

| Anti-Pattern ❌ | Surgical Fix ✅ |
| :--- | :--- |
| Large headline with loose `tracking-widest` | Use `tracking-[-0.035em]` or `tracking-tight` |
| Small uppercase tag with tight negative tracking | Use `uppercase tracking-[0.12em] text-[11px]` |
| Paragraph spanning full screen (120+ chars) | Wrap in `max-w-xl` or `max-w-prose` with `leading-relaxed` |
| Monospace numbers with shifting widths | Add `tabular-nums` class to align numerals vertically |
| 5 different font weights in one section | Restrict strictly to `normal (400)`, `medium (500)`, `bold (700)` |
