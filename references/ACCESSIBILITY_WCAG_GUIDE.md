# ♿ WCAG 2.1 & 2.2 Accessibility (a11y) Engineering Guide

This manual defines the accessibility standards, color contrast formulas, keyboard navigation trees, and ARIA attributes enforced by the **`/design`** slash skill to achieve full **WCAG 2.1 / 2.2 Level AA and AAA** compliance.

---

## 🧭 The 4 Core Principles of Accessible Design (POUR)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PERCEIVABLE   │ Information must be presentable to users in ways they   │
│                  │ can perceive (Color Contrast, Text Resizing, Alt Text). │
├──────────────────┼─────────────────────────────────────────────────────────┤
│ 2. OPERABLE      │ Interface components must be fully operable by keyboard │
│                  │ and assistive tech (Focus Traps, Target Size ≥ 44px).   │
├──────────────────┼─────────────────────────────────────────────────────────┤
│ 3. UNDERSTANDABLE│ Information and operation must be clear and predictable │
│                  │ (Explicit Errors, Semantic Labels, Clear Navigation).   │
├──────────────────┼─────────────────────────────────────────────────────────┤
│ 4. ROBUST        │ Content must be interpreted reliably by assistive       │
│                  │ technologies and screen readers (Valid HTML, ARIA).     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 1. Color Contrast & Mathematical Thresholds

### 1.1 Contrast Ratio Standards

| Target Element | WCAG Level AA | WCAG Level AAA | Verification Class |
| :--- | :--- | :--- | :--- |
| **Normal Body Text** ($< 18\text{pt}$ or $< 14\text{pt}$ bold) | $\ge 4.5:1$ | $\ge 7:1$ | `text-foreground` on `bg-background` |
| **Large Headings** ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) | $\ge 3.0:1$ | $\ge 4.5:1$ | `text-3xl font-bold` |
| **UI Components & Borders** (Inputs, switches, cards) | $\ge 3.0:1$ | $\ge 4.5:1$ | `border-border` / `bg-primary` |
| **Incidental / Disabled Text** | No requirement | No requirement | `disabled:opacity-50` |

### 1.2 Color Independence (Never Rely on Color Alone)
Never indicate status (success, error, warning) solely through color:
* ❌ **Bad**: Showing red text without an icon or prefix.
* ✅ **Good**: Pairing red text with an `[AlertCircle]` icon and clear descriptive text: *"Error: Email address is invalid"*.

---

## ⌨️ 2. Full Keyboard Navigation Matrix

Every interactive widget **MUST** be operable without a mouse:

| Widget Type | Key | Standard Accessible Behavior |
| :--- | :--- | :--- |
| **All Interactive Elements** | `Tab` / `Shift+Tab` | Moves focus forward and backward in logical DOM order. |
| **Buttons & Links** | `Enter` / `Space` | Triggers click action. |
| **Modal Dialogs & Drawers** | `Escape` | Immediately closes the dialog and restores focus to triggering element. |
| **Dropdown Menus & Select** | `ArrowUp` / `ArrowDown` | Traverses options; `Enter` selects option; `Escape` closes menu. |
| **Tabs & Segmented Controls** | `ArrowLeft` / `ArrowRight` | Navigates between sibling tabs. |
| **Accordions & Disclosures** | `Enter` / `Space` | Expands or collapses item. |

---

## 🔍 3. Focus Management & Focus Visible Styling

### 3.1 Focus Trapping in Modals
When a modal or drawer opens, focus must be trapped within its container:
```tsx
import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return containerRef;
}
```

### 3.2 High-Contrast Focus Indicator
Never suppress focus outlines with `outline: none` without providing a visible `focus-visible` replacement:
```tsx
// Universal accessible focus ring class:
const ACCESSIBLE_FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-background";
```

---

## 🏷️ 4. Essential ARIA Semantic Roles & Attributes

| ARIA Attribute / Role | Usage | Example |
| :--- | :--- | :--- |
| `aria-label="Description"` | Gives a descriptive name to icon-only buttons or ambiguous controls. | `<button aria-label="Close settings dialog"><X /></button>` |
| `aria-expanded="true/false"` | Communicates open/collapsed state of accordions, dropdowns, and drawers. | `<button aria-expanded={isOpen} aria-controls="faq-answer-1">` |
| `aria-controls="id"` | Identifies the element whose contents are controlled by this button. | `<div id="faq-answer-1" role="region">` |
| `aria-invalid="true/false"` | Informs screen readers if a form input currently has an error. | `<input aria-invalid={!!error} aria-describedby="err-msg">` |
| `aria-describedby="id"` | Associates input with error message or helper text ID. | `<p id="err-msg">Password must be 8+ chars</p>` |
| `aria-live="polite"` | Announces asynchronous dynamic updates (toasts, count changes) to screen readers. | `<div role="status" aria-live="polite">{toastMessage}</div>` |
| `aria-hidden="true"` | Hides decorative icons from screen readers to prevent redundant chatter. | `<Sparkles aria-hidden="true" />` |

---

## 🏃 5. Vestibular Motion Safety (`prefers-reduced-motion`)

Users with vestibular disorders experience dizziness or nausea from unexpected motion:
```css
/* Automatically disable rapid translations and scaling for users requesting reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
