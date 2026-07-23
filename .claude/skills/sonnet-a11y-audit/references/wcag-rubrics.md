# WCAG contextual-review rubrics

Condensed from `nano-a11y-audit/data/original-llm-prompts.md` and the per-rule
`systemPrompt`s in `nano-a11y-audit/src/rules/*.js`, and reworded from "you are
an AI, return strict JSON" into direct judging instructions — because here
there's no nested model call to prompt-engineer around. You (Claude, reading
this rubric inline) already have the evidence in your context window and can
just reason about it and write the verdict.

For every item in a `report.json`'s `pendingReview` array, find the section
below matching its `rubricRef`, apply it to the item's `context` (DOM data) or
`screenshots` (read them with the Read tool — they're PNGs, you're multimodal),
and edit that item in place to add:

```json
{ "verdict": "PASS" | "FAIL" | "CANNOT_TELL", "reason": "one or two sentences, specific to what you saw" }
```

Use `CANNOT_TELL` only when the evidence genuinely doesn't resolve it (e.g. a
screenshot where the relevant region rendered blank) — don't use it as a hedge.

If a verdict is a genuine judgment call that would flip what
`wcag-data/<name>.json` currently claims (e.g. turning an existing
`Conditional` into a confirmed `Fail`, or a `Pass` into a `Fail`) and you're
not confident in either direction after actually looking at the evidence,
don't silently pick one and move on — ask the user directly (one specific
question, with the item's text/screenshot as context) before writing the
verdict. `CANNOT_TELL` is for evidence that can't answer the question at all;
a live, low-confidence-but-consequential call is a question for the user, not
a coin flip.

---

## 1.1.1 — Non-text Content (image/icon alt-text quality)

Evidence: `context.images[]`, each `{ element, context }`.

FAIL when the alt text is:
- Exactly a generic word: "image", "photo", "picture", "icon", "graphic", "spacer", "placeholder".
- A redundant prefix: "image of...", "photo of...", "icon of...".
- A filename (`icecream.jpg`, `img_001.png`) or ends in a file extension.
- Just punctuation, or describes something implausible for what the element likely is.
- Marked "Marked as Decorative (Hidden)" while the surrounding component context suggests the icon conveys real information (not just visual flourish).

PASS otherwise, including correctly-hidden purely-decorative icons.

## 1.3.1 — Info and Relationships (orphaned form labels)

Evidence: `context.orphans[]`, each `{ inputType, nearbyText }` — these are
inputs with **no** accessible name where `nearbyText` looks like it's meant to
label them.

FAIL if `nearbyText` reads like a real label ("First Name", "Email Address").
PASS (i.e. downgrade) only if `nearbyText` is clearly unrelated to the field
(navigation text, decorative content) — this is the escape hatch nano-a11y-audit's
own extractor can't apply heuristically and needs a judgment call for.

## 1.3.3 — Sensory Characteristics

Evidence: `context.renderedText` (rendered text content, truncated).

FAIL if an instruction identifies something only by shape, size, color,
position, or sound, with no other identifier ("the round button", "the item on
the right", "click the green one") and there is no other component/label in
the same text that disambiguates it another way.

PASS if sensory cues are present only as a *supplement* to a text label/name,
or if there's no instructional text relying on them at all.

## 1.4.1 — Use of Color

Evidence: `context.formElements[]` (required/error fields with no non-color
indicator) and `context.stateElements[]` (aria-current/aria-selected items with
no non-color indicator).

FAIL if either array is non-empty — these were already filtered by the
extractor to exclude anything with an asterisk, the word "required"/"error", a
described-by hint, underline, border, bold, or icon, so anything reaching you
here really does appear to rely on color alone. Write the reason listing the
specific field/state text.

PASS if both arrays are empty.

## 1.4.4 — Resize Text (200% zoom simulation)

Evidence: `screenshots.before` / `screenshots.after` (component rendered at
`zoom: 2`, a real Chromium layout recalculation, not a CSS transform).

FAIL if any text is clipped, truncated, overlapping another element, or spills
outside its container in the "after" screenshot in a way that wasn't already
true (e.g. an intentionally fixed-width badge) in the "before" screenshot.

PASS if text reflows cleanly and remains fully readable.

## 1.4.11 — Non-text Contrast (boundary + focus ring)

Evidence: `screenshots[]`, each `{ index, default, focus }` PNG pair, plus
`styleDiffs[]` giving the raw `outlineColor`/`borderColor`/`boxShadow` computed
style for both states — use the screenshots as the primary evidence (color
math on computed style alone misses gradients and token-driven colors); the
style diff is a hint, not the verdict.

Check two things per element, independently:
- **Boundary** (`default` screenshot): does the control have a visible edge
  (border, background fill, or shadow) distinguishable from its surroundings
  at roughly 3:1, or does it look like white-on-white / pale-on-pale?
- **Focus ring** (`focus` screenshot): is there a clearly visible additional
  outline/halo distinct from the boundary, or is it missing/very faint?

FAIL if either check fails for any sampled element; say which one (boundary vs
focus) and for which element.

## 1.4.12 — Text Spacing

Evidence: `context.clippedElements[]` if present (computed via `scrollHeight >
clientHeight` with spacing applied — this is a fairly reliable programmatic
signal already), plus `screenshots.before`/`screenshots.after` for visual
confirmation.

FAIL if the "after" screenshot shows text cut off, overlapping, or a control
losing its visible label compared to "before".

PASS if layout holds up under the WCAG-minimum spacing values.

## 2.4.4 — Link Purpose (In Context)

Rule id `2.4.4-review`. Evidence: `context.items[]`, strings like `Link: "Read
more", Surrounding context: "..."` — **every** visible link found, not a
pre-filtered subset. Unlike most rules here, this one hands you every
candidate unfiltered on purpose (see the extractor's own comment in
rules.mjs): a fixed suspicious-word list can only ever miss phrasing it
wasn't told about, and can only ever over-flag short-but-fine text a human
judge would clearly wave through — so don't expect every item to be a real
problem. Most will be an easy PASS; read each one on its own merits rather
than assuming inclusion in the list means something's wrong.

PASS if the link text is clear on its own, or if it's short/generic but the
surrounding context clearly identifies what it refers to (a "Read more" right
under a specific article headline is fine; a single-word nav item like
"Housing" or "Pricing" is fine on its own). FAIL if the link text is
generic/ambiguous ("click here", "read more", a bare "link") AND the
surrounding context is empty, unrelated, or equally generic, such that a
screen-reader user tabbing through links out of context couldn't tell where
it goes.

(There is a separate mechanical `"2.4.4"` rule sharing this SC number, used
only by the `*.a11y-conditional.e2e.ts` CI test tier — plain Playwright, no
model in the loop at test time, so it still needs the fixed word list. You
won't see its output here; `runTextRulesPhase` only runs `kind: "text"`
rules, and that one is `kind: "text-mechanical"`.)

## 2.4.6 — Headings and Labels

Rule id `2.4.6-review`. Evidence: `context.items[]`, strings like `Heading
(<h2>): "..."` or `Heading: "..." | Label: "..."` — **every** heading and
every label/legend found, not a pre-filtered subset (same reasoning as
2.4.4-review: the fixed generic-word list this used to gate on can only miss
what it wasn't told about, and over-flag short-but-conventional text). Most
items will be an easy PASS.

PASS common, standard field labels ("Name", "Email", "Password", "Phone",
"Address", "City", "Zip") even without a specific heading — these are
conventional and understood in context. Also PASS a heading whose own text
specifically names what follows it, however short ("FAQ", "Pricing",
"Contact"). FAIL labels that are vague with no disambiguating heading
("Field 1", "Value", "Input", "Yes"/"No" used as a field label rather than an
answer), duplicate generic labels appearing under the same heading, or a
heading whose text is so generic ("Details", "Info", "Section") that a screen
reader user navigating by heading list couldn't tell what it introduces.

(Same mechanical/interactive split as 2.4.4 above: a `"2.4.6"` rule sharing
this SC number exists only for the e2e conditional test tier and never
reaches you. That mechanical version also only ever evaluated label/legend
text, never a heading's own text — this `-review` version is the one that
actually checks a heading-only component like `ct-heading`.)

## 2.5.3 — Label in Name

Evidence: `context.mismatchedElements[]`, each `{ visible, accessible,
element }` — the visible label text and the computed accessible name for
controls where the extractor already determined the accessible name doesn't
contain the visible text (case/whitespace/punctuation-normalized).

FAIL every entry here — the extractor's comparison is exact-substring after
normalization, so a genuine mismatch reaching you (e.g. visible "Search",
accessible name "Find") really is one. List each mismatched element and its
visible-vs-accessible text in the reason.

PASS only applies via the extractor's own `computedVerdict` shortcut (empty
`mismatchedElements`) — you won't see a pendingReview item for a clean pass.

## 2.4.7 — Focus Visible

Only reaches you here if the automated style-diff was ambiguous (a change was
detected but flagged as possibly too subtle, e.g. a near-transparent outline
color). Evidence: `screenshots[]` `{ default, focus }` pairs and `styleDiffs[]`.

Look at the `focus` screenshot: is there something a sighted keyboard user
would actually notice and register as "this is now focused"? FAIL if the only
change is imperceptible (near-identical color to the background, a 1px shift
with no color contrast). PASS if it's a clear, perceivable change even if
subtle in the raw computed-style diff.

## High Contrast / Forced Colors simulation

Evidence: `screenshots.before` / `screenshots.after` (after = simulated
`forced-colors: active`, per the `forcedColorsCss` injected directly into the
component's shadow root).

FAIL if an icon, boundary, or graphic that was visible "before" has vanished
or become indistinguishable from its background "after" (this is exactly the
"icon relies on a background-image/shadow with no forced-colors-safe fallback"
failure mode Windows High Contrast Mode users hit).

PASS if every element remains visible with a distinct boundary in both
screenshots.

## 1.4.1-link — Use of Color (link distinguishability at rest)

Evidence: `screenshots[]`, each `{ index, default, hover, focus }`, plus
`styleDiffs[]` with a `states.hover`/`states.focus` diff (`textDecoration`,
`fontWeight`, `borderBottom`, `outline` changes) relative to `default`.

A link that's identified *only* by its text color at rest is compliant if
hovering or focusing it adds a non-color cue — underline, bold, or a border —
per WCAG technique G183/F73. Look at the screenshots, not just the diff flags
(a diff can be "true" for a change too subtle to actually read as a cue).

FAIL if neither hover nor focus adds any perceivable non-color distinction
(the link would be indistinguishable from plain text to someone who can't
perceive its color, both at rest and on interaction).

PASS if either state clearly adds a non-color cue, or if the link is already
visually distinguished by something other than color at rest (underline,
icon, button-like styling).

## 1.3.1-visual-heading — Info and Relationships (fake headings)

Evidence: `context.candidates[]`, each `{ text, tagName }` — text flagged as
*looking* like a heading (large/bold/short, or ALL CAPS, or italic+short)
while rendered in a non-heading tag (`<div>`/`<p>`/`<span>`).

FAIL if the text functions as a section title introducing content below it
("Special Offers", "Related Articles") — a screen reader user navigating by
heading would miss it entirely since it isn't one.

PASS if the text is a price, date, button-like label, metadata tag ("Author:
Jane Doe"), or otherwise not acting as a heading despite the styling — the
extractor flags on visual signal alone and can't tell intent, that's your job.

## 1.3.2 — Meaningful Sequence

Evidence: `context.orderingProperties[]` (`{ element, css }` — CSS `order`,
reversed flex-direction, `float`, or absolutely/fixed-positioned text found)
and/or `context.layoutTables[]`.

FAIL if the flagged CSS would make the DOM reading order (what a screen
reader announces) diverge from the visual order in a way that changes
meaning — e.g. a card's price is moved before its title only visually via
`order`, but a screen reader would still hit title-then-price out of visual
sequence in a confusing way. A `layoutTables` entry is a real concern only if
the table has no `<th>`/`<caption>` *and* is being used for visual layout
rather than tabular data.

PASS if the ordering properties are cosmetic and don't change the meaning of
the reading order (e.g. `order` used only for responsive reflow that keeps
the same logical grouping), or if there's nothing flagged.

## 2.2.2 — Pause, Stop, Hide

Evidence: `context.movingElements[]`, each `{ type, element, details }` —
CSS/SVG animations lasting more than 5 seconds (or infinite) with no
`role="status"`/`progressbar`/spinner-class exemption already applied by the
extractor.

Per nano-a11y-audit's own logic here: you can detect potential unbounded
motion, but usually can't confirm from a static render whether a pause/stop
control exists elsewhere in the interaction (it might appear on hover, or be
a separate control not co-located with the animated element).

Default to `CANNOT_TELL` with a reason naming the animated element(s) and
recommending manual verification — only use `FAIL` if the evidence make it
unambiguous there's no plausible control (e.g. a purely decorative infinite
background animation with no interactive affordances anywhere in the
component), and `PASS` only if the motion is clearly essential/exempt
(a loading spinner, a `status`-role live region).

## 3.2.2 — On Input

Evidence: `context.riskyInputs[]`, each `{ element, details }` — inputs whose
inline `onchange`/`oninput`/`onblur`/`onclick` attribute contains a pattern
like `submit()`, `window.open`, or a forced-navigation call.

FAIL if present — these indicate a context change (submission, new window,
navigation) triggered automatically by an input event, which WCAG 3.2.2
requires a prior warning for. Note that a Lit component wiring the equivalent
behavior via `addEventListener` in its class body rather than an inline HTML
attribute won't be caught by this DOM-only check — if you have reason to
suspect that (e.g. the component's own source uses `@input`/`@change`
handlers that navigate), say so explicitly rather than rubber-stamping PASS
from empty evidence alone.

## 3.3.2 — Labels or Instructions

Evidence: `context.confirmedFailures[]` (required fields already determined
to be missing a required-indicator — decide FAIL for these, no judgment call
needed) and `context.suspectFields[]` (fields whose label wasn't clearly free
text and had no obvious format hint, needing your judgment).

For each `suspectFields` entry: FAIL if the label implies strictly-formatted
input (date, phone number, SSN/tax ID, a specific code format) with nothing
in the label suggesting an expected format. PASS if the label is generic
enough that no special format applies (name, message, comment, generic
search).

Combine: FAIL if `confirmedFailures` is non-empty OR any `suspectFields`
entry fails your judgment, listing every failing field. PASS only if both are
clear.

## 1.4.1-images — Use of Color (charts/status icons/diagrams)

Evidence: `items[]`, each `{ selector, alt, screenshot }` — read the
screenshot; the `alt` text is context, not the verdict (judge the *pixels*,
not what the alt text claims).

Categorize what you see and apply the matching check:
- **Chart/graph**: FAIL if data series are distinguished only by color with a
  legend and no patterns/textures/direct labels. PASS if series have
  patterns or are directly labeled.
- **Status indicator/icon**: FAIL if state is conveyed only by a color change
  (green dot vs. red dot) with no shape change or text label. PASS if shape
  also changes (checkmark vs. X) or text accompanies it.
- **Map/diagram**: FAIL if regions/lines are identified only by color
  matching a legend, no direct labels or line-style differences. PASS if
  labeled directly or styled distinctly (dotted vs. solid).
- **Alt text mismatch**: FAIL if the image conveys state via color but the
  alt text ignores that (e.g. alt="Status Icon" for a color-coded warning).

## 1.4.5 — Images of Text

Evidence: `items[]`, each `{ selector, alt, screenshot }` — look at the image
for visible text.

FAIL if the image contains text that isn't part of a logo/brand name, isn't
essential to a specific visual presentation (calligraphy sample, typography
demo), and isn't purely decorative — i.e. text that could have been real HTML
text without losing meaning or effect.

PASS if there's no text in the image, or the text is a logotype/brand name,
or the specific presentation is essential to what's being conveyed.

## 1.4.11-graphics — Non-text Contrast (standalone icons/graphics)

Evidence: `items[]`, each `{ selector, name, screenshot }`.

FAIL if any meaningful shape (icon outline, chart bar, diagram line) in the
screenshot is pale/pastel/low-contrast against its background (roughly
< 3:1) — ignore text (covered by 1.4.3, not this) and purely decorative
gradient/shadow details unless they're the *only* thing visible.

PASS if every meaningful shape reads as clearly high-contrast.

## 1.4.10 — Reflow

Evidence: `context.hasHorizontalScrollbar` + `context.details`
(`scrollWidth` vs. viewport `clientWidth` at a 320px-wide viewport), plus a
`screenshots.narrow` (component mode) or `screenshots.narrow`/`portrait`
(page mode) screenshot.

FAIL if the screenshot shows content requiring horizontal scrolling to read —
unless the content is inherently two-dimensional and exempt (a data table, a
map, a musical score, code blocks). Name what's overflowing.

PASS if everything reflows into a single column / wraps cleanly at 320px, or
the overflow is one of the documented exemptions.

## 2.4.2 — Page Titled (page-mode only)

Evidence: `context.titleTag` (the `<title>` text) and
`context.contentSnippet` (first ~1000 characters of visible body text).

FAIL if the title is generic/placeholder ("Home", "Untitled", "Document",
"Component Preview", "React App") or doesn't match what the content snippet
is actually about.

PASS if the title reasonably describes the page's specific topic or purpose
given the content snippet.

## 1.3.4 — Orientation (page-mode only)

Evidence: `context.potentialRestrictions[]` (text found at a forced
375×812 portrait viewport that mentions rotating/landscape) plus a
`screenshots.portrait` screenshot.

FAIL if a message demands the user switch orientation ("rotate your device",
"this site requires landscape") and there's no indication the specific
orientation is essential to the content (a bank-check replica, sheet music, a
game, VR/immersive content, medical imaging). PASS if no such message is
found, or the essential-orientation exception clearly applies.
