```markdown
# Design System Strategy: 3D Interior Visualization Platform

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Atelier"**

This design system is engineered to bridge the gap between high-end architectural curation and rigorous professional utility. While most visualization platforms settle for generic dark-mode templates, "The Digital Atelier" treats the interface as a physical, premium space. It borrows the deep, atmospheric tonal range of luxury interior design (via the Enviz influence) and marries it with the brutalist, functional clarity of professional submission workflows (via the itch.io influence).

The experience is defined by **Intentional Depth**. We avoid the "flatness" of the web by using a scale of nested dark surfaces and glassmorphism, making the UI feel like a sophisticated physical console. We reject standard structural lines in favor of light-based hierarchy, creating an environment that feels less like a website and more like a high-performance studio tool.

---

## 2. Colors
Our palette is anchored in deep cosmic purples and navies, punctuated by a high-frequency "Electric Lime" and "Amethyst" accent system.

### The "No-Line" Rule
To achieve a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through tonal shifts. For example, a project gallery section should sit on `surface`, while the discovery sidebar sits on `surface-container-low`. The contrast between these two tokens is sufficient to define edge-logic without the "cheapening" effect of visible strokes.

### Surface Hierarchy & Nesting
Treat the layout as a series of physical layers. Use the following hierarchy for stacking:
*   **Base Layer:** `surface` (#100f31) – The primary canvas.
*   **Receded Layer:** `surface-container-lowest` (#0b092c) – Used for input fields or "sunken" content wells.
*   **Elevated Layer:** `surface-container-high` (#272649) – Used for cards that need to "float" above the grid.

### The "Glass & Gradient" Rule
For overlays (like project stats on cards) or floating navigation bars, use **Glassmorphism**:
*   **Color:** `surface-variant` (#323154) at 60% opacity.
*   **Effect:** Backdrop-blur of 20px.
*   **Signature Texture:** Use a subtle linear gradient on primary CTAs transitioning from `primary` (#d8b9ff) to `primary-container` (#ad72ff) at a 135-degree angle. This adds a "lithographic" quality to the interactive elements.

---

## 3. Typography
We use a dual-font system to balance architectural elegance with data-heavy legibility.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its wide aperture and modern, geometric soul. This font carries the "Editorial" weight.
    *   *Usage:* Use `display-lg` for hero headers and `headline-md` for section titles. The generous letter-spacing evokes the feeling of an art gallery.
*   **Interface & Data (Inter):** The workhorse font. High x-height and exceptional legibility.
    *   *Usage:* Use `body-md` for form labels and `title-sm` for card titles.
*   **Hierarchy Logic:** Large, bold headlines create an authoritative anchor, while labels are kept small (label-md) and often uppercase with 5% tracking to maintain a "technical" aesthetic.

---

## 4. Elevation & Depth
Depth in this system is a result of light simulation, not decorative shadow-casting.

*   **The Layering Principle:** Avoid shadows for static elements. Instead, place a `surface-container-low` card onto a `surface-container-lowest` background. This "soft-lift" creates a naturalistic separation.
*   **Ambient Shadows:** For high-priority floating elements (Modals, Dropdowns), use an extra-diffused shadow: `0px 24px 48px rgba(11, 9, 44, 0.5)`. The shadow color is a deep indigo, never neutral black.
*   **The "Ghost Border" Fallback:** If high-contrast accessibility is required, use the `outline-variant` (#4b4454) at **15% opacity**. This creates a "suggestion" of a line that disappears into the background, maintaining the "No-Line" rule.

---

## 5. Components

### Project Discovery Cards
*   **Structure:** Edge-to-edge high-quality imagery with no visible border.
*   **Overlays:** Statistics (views/likes) utilize a `surface-variant` glass pill in the bottom-right corner.
*   **Interaction:** On hover, the image scales slightly (1.05x) and a `secondary` (#b7d24e) accent bar appears at the very top of the card.

### Input Fields & Structured Forms
*   **The Well Pattern:** Based on the itch.io workflow but modernized. Inputs are `surface-container-lowest` with an `outline` (#978da0) that only becomes `primary` on focus.
*   **Segmented Controls:** Use a "Switch-Track" style where the selected state is a `primary-container` pill sliding over a `surface-container-high` track.

### Buttons
*   **Primary:** `secondary` (#b7d24e) background with `on-secondary` (#2a3400) text. This provides a "techy neon" pop against the dark background.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.

### Sidebar Upload Navigation
*   **Logic:** A fixed, narrow sidebar on the left using `surface-container-low`. Active states are indicated not by a box, but by a 4px vertical "light bar" of `secondary` color on the far left edge of the menu item.

---

## 6. Do's and Don'ts

### Do:
*   **Do use asymmetric white space.** Allow large "breathing rooms" (64px+) between major sections to let the 3D renders shine.
*   **Do use Tonal Layering.** Create "steps" of depth from the background to the foreground using the surface-container tokens.
*   **Do prioritize the render.** Ensure that UI elements never obscure the focal point of the 3D interior imagery.

### Don't:
*   **Don't use 100% white (#FFFFFF) for body text.** Use `on-surface-variant` (#cec2d7) to reduce eye strain against the dark background and maintain a "midnight" aesthetic.
*   **Don't use sharp corners.** Adhere to the `md` (0.375rem) roundedness scale for cards and `full` for tags/badges to keep the UI feeling "designed" rather than "default."
*   **Don't use dividers.** Never use a horizontal rule `<hr>` to separate form fields. Use a 24px-32px vertical spacer instead. Gap-logic is superior to line-logic.

---
**Director's Final Note:** This design system is about the *absence* of noise. Every pixel of color and every shift in surface tone must be intentional. We are building a high-end lens through which users view their 3D creations—make sure the lens is as beautiful as the work it holds.```