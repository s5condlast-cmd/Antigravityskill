# 🧠 Cognitive Psychology & UX Design Heuristics Manual

This manual provides the foundational psychological laws, cognitive formulas, and human-computer interaction (HCI) principles used by the **`/design`** slash skill to create intuitive, friction-free digital experiences.

---

## 🏛️ The 7 Fundamental Laws of UX

```text
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│       FITTS'S LAW       │   │       HICK'S LAW        │   │       JAKOB'S LAW       │
│   Touch Targets ≥ 44px  │   │  Progressive Disclosure │   │  Familiar Mental Models │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
             │                             │                             │
             ▼                             ▼                             ▼
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│      MILLER'S LAW       │   │    DOHERTY THRESHOLD    │   │    GESTALT PRINCIPLES   │
│   Chunking (7 ± 2 items)│   │   Response < 400ms      │   │   Proximity & Similarity│
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

---

## 1. Fitts's Law (Target Acquisition & Touch Zones)

* **Mathematical Formula**:
  $$\text{MT} = a + b \log_2\left(\frac{2D}{W}\right)$$
  Where $\text{MT}$ is Movement Time, $D$ is Distance to target, and $W$ is the Width/size of the target.
* **Core Rule**: The time to acquire a target is a function of the distance to and size of the target.
* **Actionable UX Rules**:
  1. **Minimum Touch Target**: Every interactive element on mobile must have at least a $44 \times 44\text{px}$ touch bounding box (use `p-2.5` wrapper padding on small icons).
  2. **Thumb-Reach Zone**: Place primary mobile navigation, filter toggles, and primary CTA buttons in the bottom $40\%$ of the screen.
  3. **Screen Edge Pinning**: Desktop pinned headers, dock bars, and edge buttons are infinitely wide in one dimension, making them the fastest possible targets to click.

---

## 2. Hick's Law (Decision Latency & Cognitive Load)

* **Mathematical Formula**:
  $$\text{RT} = b \cdot \log_2(n + 1)$$
  Where $\text{RT}$ is Reaction Time, and $n$ is the number of equally probable alternatives.
* **Core Rule**: Increasing the number of choices logarithmically increases decision time.
* **Actionable UX Rules**:
  1. **Progressive Disclosure**: Only show options when they become relevant. Use dropdowns, accordions, and multi-step wizards for complex forms.
  2. **Recommended Defaults**: Pre-select the most popular option (e.g. "Pro Annual" in pricing tables) to eliminate decision paralysis.
  3. **Limit Top-Level Navigation**: Never put more than $5\text{–}7$ options in the primary navigation bar.

---

## 3. Jakob's Law (Mental Models & User Expectations)

* **Core Rule**: Users spend $90\%+$ of their time on other digital products. They expect your product to function using the same conventions.
* **Actionable UX Rules**:
  1. **Standard Placements**: 
     - Logo / Home $\rightarrow$ Top left.
     - Global search $\rightarrow$ Top center or command bar (`Cmd+K`).
     - Profile / Settings / Cart $\rightarrow$ Top right.
  2. **Recognizable Iconography**: Use standard Lucide icons (Magnifying glass for search, Gear for settings, Trash for delete). Never invent esoteric metaphors.
  3. **Standard Keyboard Shortcuts**: `Esc` closes modals, `Enter` submits forms, `Tab` traverses fields.

---

## 4. Miller's Law (Working Memory & Information Chunking)

* **Core Rule**: The human working memory can only hold $7 \pm 2$ discrete chunks of information at one time.
* **Actionable UX Rules**:
  1. **Visual Chunking**: Group long lists into distinct cards, bento boxes, or grouped lists with subtle borders.
  2. **Formatted Inputs**: Automatically format credit cards (`4111 2222 3333 4444`), phone numbers (`(555) 019-2834`), and dates (`YYYY-MM-DD`).
  3. **Dashboard Scannability**: High-level dashboards should present no more than 4-6 primary metric cards per view.

---

## 5. The Doherty Threshold (Perceived Latency & Optimistic UI)

* **Core Rule**: Human productivity spikes when computer and user interact at a pace where neither waits on the other ($< 400\text{ms}$).
* **Actionable UX Rules**:
  1. **Optimistic UI**: Instantly update the UI (toggle switch, button state, liked status) before the backend API confirms.
  2. **Skeleton Shimmers**: Use skeleton screens mimicking layout geometry instead of static spinners to create perceived forward momentum.
  3. **Micro-Feedback**: Buttons must provide instant active feedback (`active:scale-[0.98]`) in $< 100\text{ms}$.

---

## 6. Gestalt Principles of Visual Perception

| Principle | Meaning | UI Application |
| :--- | :--- | :--- |
| **Proximity** | Objects close together are perceived as a group. | Keep form labels closer to their corresponding input than to preceding fields (`mb-1.5` label gap vs `mb-6` field gap). |
| **Similarity** | Objects sharing color, shape, or weight are related. | Use the same primary color and shape across all primary action buttons. |
| **Common Region** | Elements enclosed within a boundary share a common purpose. | Use cards (`bg-card border border-border p-6 rounded-2xl`) to enclose related stats. |
| **Figure / Ground** | The eye separates focal objects from background canvas. | Use backdrop blur (`backdrop-blur-md bg-black/60`) to pop modal dialogs forward. |

---

## 7. The Peak-End Rule & Delighters

* **Core Rule**: Users judge an experience based on how they felt at its *peak* (most intense point) and at its *end* (completion moment).
* **Actionable UX Rules**:
  1. **Celebratory End States**: When a user completes onboarding, deploys a project, or finishes checkout, provide a polished success screen with subtle confetti or a clear celebratory message.
  2. **Friendly Empty States**: When a list is empty, don't show a blank void; show an encouraging illustration, clear explanation, and a 1-click CTA button to create the first item.
  3. **Helpful Error Recovery**: If an operation fails, explain *why* in plain language and provide a 1-click "Retry" button.
