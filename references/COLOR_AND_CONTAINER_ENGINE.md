# 🎨 Color Theory, Container Determination & Viewport Engine

This manual provides the engineering rules, color restraint formulas, containerless layout criteria, and zero-overflow viewport standards for the **`/design`** slash skill.

---

## 🧭 Master Architectural Framework

```text
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│ 1. 80 / 15 / 5 COLOR RULE │ ───> │ 2. CONTAINER DETERMINATION│ ───> │ 3. ZERO-OVERFLOW VIEWPORT │
│  - 80% Neutral Canvas     │      │  - Whitespace-first       │      │  - No unintended scrollbar│
│  - 15% Structural Surface │      │  - Box ONLY when dense    │      │  - max-w containment      │
│  - 5% Intentional Accent  │      │  - Banish "box-in-box"    │      │  - overflow-x: clip       │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

---

## 🎨 1. The 80 / 15 / 5 Color Restraint Rule

Elite minimalist interfaces (Linear, Apple, Stripe) use color with surgical precision. Color is a signal, not a wallpaper.

| Color Layer | Proportion | Dark Theme | Light Theme | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas / Base** | **80%** | `#09090b` / `#000000` | `#ffffff` / `#fafafa` | Background, body text canvas, section negative space. |
| **Surface / Structure**| **15%** | `#121215` / `#18181b` | `#f4f4f5` / `#e4e4e7` | Cards, popovers, table headers, hairline borders (`border-white/[0.08]`). |
| **Intentional Accent** | **5%** | Primary Brand Token | Primary Brand Token | Focal words, active CTA buttons, operational live dots, focus rings. |

---

## 📍 2. The 4 Approved Spots for Accent Colors

Never spray accent colors randomly. Accent color is strictly confined to these 4 spots:

1. **Spot 1: Active Interactive Affordance**:
   - Primary Call-to-Action buttons (`bg-primary text-primary-foreground`).
   - Active navigation pills / selected tab background (`bg-accent text-accent-foreground`).
   - Accessible keyboard focus rings (`focus-visible:ring-primary`).

2. **Spot 2: Semantic State Feedback**:
   - Live operational status pulse dots (Emerald `bg-emerald-400`).
   - Diagnostic warnings (Amber `bg-amber-400`) and compiler errors (Rose `bg-rose-400`).

3. **Spot 3: Hero Focal Headline Accent**:
   - 1 or 2 impactful words in the main headline rendered as an adaptive gradient:
     ```tsx
     <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
       Autonomous intelligence with{" "}
       <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
         deterministic precision.
       </span>
     </h1>
     ```

4. **Spot 4: Ambient Canvas Light Bleed**:
   - A single, very subtle top-center radial gradient aura ($< 15\%$ opacity) pinned behind the Hero:
     ```tsx
     <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_70%)] pointer-events-none" />
     ```

---

## 📦 3. The Container Determination Engine (Whitespace vs. Boxes)

Avoid **"containeritis"**—the AI anti-pattern of wrapping every single heading, paragraph, and bullet item inside nested boxes.

```text
                                [IS A CONTAINER NEEDED?]
                                            │
           ┌────────────────────────────────┴────────────────────────────────┐
           ▼                                                                 ▼
      [YES: USE A BOX]                                            [NO: GO CONTAINERLESS]
 • Multi-row Data Tables & Log Feeds                         • Hero sections & Page Intros
 • Spotlight Command Palettes (⌘K)                           • Section Headers & Feature Paragraphs
 • Interactive Modals & Slide-Over Drawers                   • FAQ Accordion Lists (use hairline divide-y)
 • Syntax-Highlighted Code Previews                          • Text Testimonials & Blockquotes
 • Multi-tier Pricing & Bento Metric Boxes                   • Footer Navigation Columns
```

### 3.1 The Containerless Layout Rules (Whitespace as Structure)
* **Use the Law of Proximity**: Place related items close together (`space-y-2`) and separate distinct sections with expansive whitespace (`py-24 sm:py-32`).
* **Use Hairline Dividers Instead of Cards**: For FAQ accordions and lists, use clean border rules (`divide-y divide-border/60`) instead of enclosing each item in a separate card container.
* **Banish "Box-in-Box" Nesting**: Never place a Card $\rightarrow$ inside a Section Card $\rightarrow$ inside a Container Box $\rightarrow$ around a Pill tag.

---

## 🚫 4. Zero-Horizontal-Scroll & Viewport Containment

Horizontal scrolling and side overflows look broken and amateurish. Enforce these viewport invariants:

### 4.1 Invariants for Viewport Safety
1. **Root Containment**: Top-level containers must declare `overflow-x-clip` or `overflow-x-hidden` to catch ambient radial glows or absolute decorations.
2. **Never Use Unconstrained Negative Margins**: Avoid `-mx-4` or `-mx-8` unless wrapped inside a container with explicit padding offsets.
3. **No 100vw Scrollbar Shift**: Use `w-full` instead of `w-screen` to prevent layout jumps when vertical scrollbars appear.
4. **Data Tables & Code Blocks**: Only wide data tables and code blocks may scroll horizontally, and they must use isolated local `overflow-x-auto` with clean unobtrusive scrollbars:
   ```css
   /* Clean unobtrusive code scrollbar */
   .clean-scrollbar::-webkit-scrollbar {
     height: 6px;
   }
   .clean-scrollbar::-webkit-scrollbar-thumb {
     background: rgba(255, 255, 255, 0.1);
     border-radius: 9999px;
   }
   ```

---

## 🎯 5. Intentional Icon & Curated Image Standards

### 5.1 Icon Clutter Reduction
* ❌ **Anti-pattern**: Placing an icon next to every single link, table header, button, badge, and paragraph.
* ✅ **Intentional Rule**: Use Lucide icons **ONLY** for:
  1. Primary navigation & command triggers (`Search`, `Terminal`, `Menu`, `X`).
  2. Diagnostic feedback states (`CheckCircle2`, `AlertTriangle`, `Loader2`).
  3. External navigation cues (`ArrowUpRight`, `ChevronRight`).
  4. Quick scanning in high-density data tables.

### 5.2 Curated Online Imagery
When displaying imagery, use real, high-resolution architectural, hardware, or workspace photography with explicit aspect ratios (`aspect-video` or `aspect-[16/10]`) and subtle hairline borders (`border border-white/10 rounded-2xl`):

```tsx
<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
  <img
    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
    alt="High-performance system workspace"
    className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
    loading="lazy"
  />
</div>
```
