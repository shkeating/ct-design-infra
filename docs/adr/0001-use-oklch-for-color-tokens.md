## ADR 0001: Use OKLCH for Color Tokens

Date: 2026-05-09

### Context

Traditional color spaces like HEX, RGB, and HSL are not perceptually uniform. In HSL, for example, two colors with the same "lightness" value can appear to have vastly different brightness levels to the human eye (e.g., a pure yellow vs. a pure blue). This makes it difficult to programmatically ensure accessibility compliance across a design system.

Furthermore, the upcoming WCAG 3.0 standard introduces the Accessible Perceptual Contrast Algorithm (APCA). Unlike current WCAG 2.x math, APCA is based on how humans actually perceive contrast, prioritizing the spatial frequency and the lightness difference (L\*) of colors.

### Decision

We will use OKLCH (oklch()) as the primary format for color tokens in the design system.

### Rationale

- OKLCH is designed to be perceptually accurate. Increasing the "L" (Lightness) value results in a predictable increase in perceived brightness across all hues.
- Because OKLCH separates lightness from chroma and hue in a way that mimics human vision, it simplifies the calculation of contrast ratios under the APCA model, ensuring the infrastructure is "future-proof" for WCAG 3.0.
- OKLCH provides access to P3 color gamuts on modern displays, which traditional HSL and RGB cannot reach.
- It allows for intuitive color manipulation (e.g., creating hover states by simply adjusting the Lightness value) without shifting the hue or saturation unexpectedly.

### Consequences

- All modern evergreen browsers now support oklch(). For legacy support, Style Dictionary can be configured to output HEX fallbacks, though the core system will remain OKLCH-first.
- The ct-design-infra core will be able to leverage predictable lightness values to automate accessibility checks within web components.
