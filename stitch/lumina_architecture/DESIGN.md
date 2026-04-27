# Design System: High-Tech Immersive Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Ether."**

We are moving away from the standard "SaaS dashboard" aesthetic and toward a digital experience that feels like a high-end architectural visualization. The goal is to create a space that feels expansive, immersive, and premium. This is achieved by utilizing deep tonal depth, intentional asymmetry, and "Glassmorphism" to simulate light passing through physical layers.

To break the "template" look, we prioritize breathing room (negative space) and a non-linear layout. Elements should feel like they are floating in a void rather than being locked into rigid, bordered boxes. We use high-contrast typography scales—pairing massive, authoritative headers with tiny, precise labels—to create a sense of technical sophistication and editorial intent.

---

## 2. Colors
Our palette is rooted in a "Deep Space" foundation, using purples and navies to create depth, while utilizing "Electric Lime" as a high-visibility surgical tool for conversion and focus.

### The Foundation
- **Background (`#100f31`):** The canvas. This deep navy provides the infinite depth required for an immersive feel. This color is mapped to `neutral_color_hex` in the design tokens.
- **Primary & Containers (`#d8b9ff`, `#ad72ff`):** Used for brand presence and soft, lavender-tinted surfaces. These are mapped to `primary` and `primary_container` in `named_colors`.
- **Secondary (`#b7d24e`):** The "Pulse." Use this exclusively for high-priority calls to action and critical highlights. This is mapped to `secondary` in `named_colors`.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries are created through:
1. **Tonal Shifts:** Placing a `surface_container_low` section directly against a `background` section.
2. **Negative Space:** Using the spacing scale to create "visual islands" of content.
3. **Soft Glows:** Using subtle background gradients to imply a boundary without a hard line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the `surface_container` tiers (Lowest to Highest) to create nested depth.
* **Hero Sections:** Use the base `surface` or `surface_dim`.
* **Feature Cards:** Use `surface_container`.
* **Floating Modals/Popovers:** Use `surface_bright` with a backdrop blur.

### The "Glass & Gradient" Rule
To achieve a premium "Glassmorphism" effect, floating elements must use semi-transparent surface colors with a `backdrop-blur` (recommended: 12px–20px). Main CTAs should utilize a subtle linear gradient from `primary` to `primary_container` (top-left to bottom-right) to give them a tactile, "lit from within" quality.

---

## 3. Typography
The typography system balances the tech-forward personality of **Plus Jakarta Sans** with the functional clarity of **Inter**.

* **Display & Headlines (Plus Jakarta Sans):** These are our "Architectural" elements. They should be bold, tight-lettered, and often used in asymmetrical layouts. Large `display-lg` sizes convey premium authority.
* **Body & Labels (Inter):** These are our "Technical" elements. Use `body-md` for standard readability.
* **Signature Styling:** For `label-sm` or `label-md`, use all-caps with a `0.05em` letter-spacing to mimic technical blueprints and high-end editorial captions.

---

## 4. Elevation & Depth
In this system, elevation is a property of light and opacity, not just shadow.

### The Layering Principle
Depth is achieved by stacking. A `surface_container_highest` element sitting on a `surface_container_low` background creates a natural lift. This "tonal layering" replaces the need for dividers.

### Ambient Shadows
When an element must "float" (e.g., a navigation bar or a primary modal), use **Ambient Shadows**:
- **Color:** A tinted version of `on_surface` (deep navy/purple), never pure black.
- **Opacity:** 4% to 8%.
- **Blur:** Large values (30px–60px) to simulate a distant, soft light source.

### The "Ghost Border" Fallback
If accessibility requirements demand a border, use a **Ghost Border**. Apply the `outline_variant` token at **15% opacity**. This provides enough contrast for the eye to track the edge without breaking the "Ether" aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text. Roundedness: `lg` (1rem).
- **Secondary:** Transparent background, Ghost Border, `secondary` text. For high-priority secondary actions, use the `secondary` (Lime) color for the text only.
- **Tertiary:** No background, no border. Subtle underline on hover using `primary_fixed_dim`.

### Cards & Lists
- **Rule:** Zero divider lines.
- **Style:** Use `surface_container_low` for the card background. Use a `1.5rem` (xl) corner radius for an organic, modern feel. Separate list items using vertical white space (`1rem` padding) or a subtle hover state shift to `surface_container_high`.

### Input Fields
- **Background:** `surface_container_lowest`.
- **Active State:** Change background to `surface_container` and add a `primary` Ghost Border.
- **Text:** `on_surface` for input; `on_surface_variant` for helper text.

### Chips
- **Selection Chips:** Semi-transparent `primary_container` (20% opacity) with `on_primary_container` text.
- **Action Chips:** Use `surface_bright` with a 1px Ghost Border for a "technical" look.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical spacing. If a text block is left-aligned, allow the right side to breathe significantly.
- **Do** use "Plus Jakarta Sans" for all numerical data to give it a high-tech, geometric feel.
- **Do** leverage backdrop blurs on any element that overlaps an image or a complex gradient background.
- **Do** use the `secondary` (Lime Green) color sparingly—it is a "laser pointer," not a highlight marker.

### Don't
- **Don't** use 100% opaque, high-contrast borders (e.g., pure white or pure grey lines).
- **Don't** use "Drop Shadows" with 0 blur and high opacity. This breaks the architectural immersion.
- **Don't** cram content. If the layout feels tight, increase the `surface_container` padding or the global spacing.
- **Don't** use standard "Grey" for neutrals. Every neutral in this system is tinted with a hint of purple or navy to maintain the brand’s tonal depth.