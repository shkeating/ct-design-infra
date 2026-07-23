// Component-level contextual/visual WCAG checks, adapted from the Gemini Nano
// A11y Auditor's `src/rules/*.js` (see ../../../../nano-a11y-audit sibling repo).
//
// Key adaptation from the source project: every extractor there queried
// `document.querySelectorAll(...)` against a plain server-rendered page with no
// Shadow DOM. Every ct-* component here renders its real markup into a shadow
// root (CLAUDE.md: "no external or global stylesheet ever applies to markup
// inside a component"), so every extractor below resolves `root` as
// `host.shadowRoot ?? host` first and queries through that instead of
// `document`. A rule whose component has no shadow root (rare; e.g. a light-DOM
// child like ct-accordion-item) still works because `root` falls back to the
// host element itself.
//
// Each extractor is a standalone function (no closures over outer scope) so it
// can be handed to Playwright's `page.evaluate(fn, tagName)` as-is, exactly
// like the nano tool's rule files note their helpers "must survive injection."
//
// `kind` drives what the orchestrator does with a rule:
//   - "text":        extractor returns either a computedVerdict (decided purely
//                    by code, no judgment call needed) or a context payload —
//                    Claude reads the payload and applies the matching rubric
//                    in references/wcag-rubrics.md to reach a verdict.
//   - "interactive": orchestrator drives a real Playwright interaction
//                    (.focus()/.hover()) and diffs computed style before/after
//                    — this replaces the nano tool's static CSS-rule-text
//                    parsing (fragile, and blind to Lit's adoptedStyleSheets)
//                    with an actual browser interaction, which Playwright can
//                    do reliably where a content script could not.
//   - "visual":      orchestrator captures a screenshot for Claude to look at
//                    directly (Claude is multimodal; no nested vision-model
//                    call is needed the way the nano tool needed one for
//                    Gemini Nano's separate multimodal session).
//   - "destructive": like visual, but the orchestrator mutates the page first
//                    (injects CSS, resizes, etc.) and must revert afterward.

export const RULES = [
  {
    id: "1.1.1",
    standard: "1.1.1 Non-text Content (Level A)",
    earlId: "WCAG22:non-text-content",
    kind: "text",
    relevantSelectors: ["img", "svg", "[role='img']"],
    rubricRef: "1.1.1",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      const images = [];
      for (const el of root.querySelectorAll("img, svg, [role='img']")) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10 || !isVisible(el)) continue;

        const hasAltAttr = el.hasAttribute("alt");
        const altValue = el.getAttribute("alt");
        const role = el.getAttribute("role");
        const ariaLabel = el.getAttribute("aria-label");
        const title = el.getAttribute("title");

        let context = "";
        if ((hasAltAttr && altValue === "") || role === "presentation" || role === "none") {
          context = "Marked as Decorative (Hidden)";
        } else if (altValue || ariaLabel || title) {
          context = `Alt Text: "${(altValue || ariaLabel || title).trim()}"`;
        } else {
          continue; // missing accessible name entirely — that's axe's job (image-alt), not ours
        }

        images.push({ element: `<${el.tagName.toLowerCase()}>`, context });
        if (images.length >= 10) break;
      }

      if (images.length === 0) {
        return { computedVerdict: "PASS", reason: "No evaluable images/icons found." };
      }
      return { images };
    },
  },

  {
    id: "1.3.1",
    standard: "1.3.1 Info and Relationships (Level A)",
    earlId: "WCAG22:info-and-relationships",
    kind: "text",
    relevantSelectors: ["input", "textarea", "select"],
    rubricRef: "1.3.1",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      function getAccessibleName(el) {
        if (el.hasAttribute("aria-labelledby")) return "Has aria-labelledby";
        if (el.hasAttribute("aria-label")) return el.getAttribute("aria-label");
        if (el.id) {
          const label = root.querySelector(`label[for="${CSS.escape(el.id)}"]`);
          if (label) return label.textContent;
        }
        if (el.closest("label")) return el.closest("label").textContent;
        return "";
      }

      const orphans = [];
      for (const el of root.querySelectorAll("input:not([type='hidden']):not([type='submit']), textarea, select")) {
        if (!isVisible(el)) continue;
        const accName = getAccessibleName(el);
        if (accName && accName.trim().length > 0) continue;

        let nearbyText = "";
        const prev = el.previousElementSibling;
        if (prev && isVisible(prev)) nearbyText = prev.textContent.trim();
        else if (el.parentElement?.previousElementSibling && isVisible(el.parentElement.previousElementSibling)) {
          nearbyText = el.parentElement.previousElementSibling.textContent.trim();
        }

        if (nearbyText && nearbyText.length < 50 && nearbyText.length > 2) {
          orphans.push({ inputType: el.tagName + (el.type ? `[type="${el.type}"]` : ""), nearbyText });
        }
        if (orphans.length >= 5) break;
      }

      if (orphans.length === 0) {
        return { computedVerdict: "PASS", reason: "No inputs with a missing accessible name but a visible nearby label." };
      }
      return { orphans };
    },
  },

  {
    id: "1.3.3",
    standard: "1.3.3 Sensory Characteristics (Level A)",
    earlId: "WCAG22:sensory-characteristics",
    kind: "text",
    relevantSelectors: ["*"],
    rubricRef: "1.3.3",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const text = (root.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 3) {
        return { computedVerdict: "PASS", reason: "Component renders no instructional text." };
      }
      const SENSORY_PATTERN = /\b(round|square|circular)\s+(button|icon)|\b(button|link|tab|field)\s+on\s+the\s+(left|right|top|bottom)|\b(red|green|blue|yellow)\s+(button|field|icon|item)\b/i;
      if (!SENSORY_PATTERN.test(text)) {
        return { computedVerdict: "PASS", reason: "No sensory-only reference patterns (shape/position/color-as-instruction) detected in rendered text." };
      }
      return { renderedText: text.slice(0, 500) };
    },
  },

  {
    id: "1.4.1",
    standard: "1.4.1 Use of Color (Level A)",
    earlId: "WCAG22:use-of-color",
    kind: "text",
    relevantSelectors: ["input[required]", "input[aria-required='true']", "[aria-current]", "[aria-selected]"],
    rubricRef: "1.4.1",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      function hasVisualIndicator(el, label) {
        const text = label ? label.textContent.toLowerCase() : "";
        return (
          text.includes("*") ||
          text.includes("required") ||
          text.includes("error") ||
          (el.getAttribute("aria-describedby") &&
            root.getElementById?.(el.getAttribute("aria-describedby"))?.textContent.trim().length > 0)
        );
      }

      const failingForms = [];
      for (const el of root.querySelectorAll("input, textarea, select")) {
        if (el.offsetParent === null) continue;
        if (["submit", "button", "hidden", "image"].includes(el.type)) continue;
        const label = el.id ? root.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null;
        if (hasVisualIndicator(el, label)) continue;
        const isReq = el.hasAttribute("required") || el.getAttribute("aria-required") === "true";
        const isErr = el.getAttribute("aria-invalid") === "true" || el.className.includes("error");
        if (isReq || isErr) failingForms.push({ text: label ? label.textContent.trim().slice(0, 30) : "Unlabeled Field" });
      }

      const failingStates = [];
      for (const el of root.querySelectorAll("[aria-current], [aria-selected='true']")) {
        if (el.offsetParent === null || el.getAttribute("aria-current") === "false") continue;
        const s = window.getComputedStyle(el);
        const hasShapeCue =
          s.textDecorationLine?.includes("underline") ||
          (s.borderStyle && s.borderStyle !== "none") ||
          (s.outlineStyle && s.outlineStyle !== "none") ||
          parseInt(s.fontWeight, 10) >= 700;
        const before = window.getComputedStyle(el, "::before").content;
        const after = window.getComputedStyle(el, "::after").content;
        const hasIcon = (before && before !== "none") || (after && after !== "none");
        if (!hasShapeCue && !hasIcon) {
          failingStates.push({ text: (el.textContent || el.tagName).trim().slice(0, 30) });
        }
      }

      if (failingForms.length === 0 && failingStates.length === 0) {
        return { computedVerdict: "PASS", reason: "No required/error/selected-state indicators found relying on color alone." };
      }
      return { formElements: failingForms, stateElements: failingStates };
    },
  },

  {
    id: "2.4.4",
    standard: "2.4.4 Link Purpose (In Context) (Level A)",
    earlId: "WCAG22:link-purpose-in-context",
    kind: "text",
    relevantSelectors: ["a"],
    rubricRef: "2.4.4",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      const SUSPICIOUS = ["click", "here", "read", "more", "details", "info", "link", "go", "start", "view", "continue"];
      const items = [];
      for (const el of root.querySelectorAll("a")) {
        if (!isVisible(el)) continue;
        const text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (!text) continue;
        const lower = text.toLowerCase();
        const isGeneric = SUSPICIOUS.some((t) => lower.includes(t));
        const wordCount = text.split(" ").length;
        if (isGeneric || wordCount <= 1) {
          const parentText = el.parentElement ? el.parentElement.textContent.replace(text, "").trim().slice(0, 200) : "";
          items.push(`Link: "${text}", Surrounding context: "${parentText}"`);
        }
        if (items.length >= 10) break;
      }

      if (items.length === 0) {
        return { computedVerdict: "PASS", reason: "No ambiguous/generic link text found." };
      }
      return { items };
    },
  },

  {
    id: "2.4.6",
    standard: "2.4.6 Headings and Labels (Level AA)",
    earlId: "WCAG22:headings-and-labels",
    kind: "text",
    relevantSelectors: ["h1", "h2", "h3", "h4", "h5", "h6", "label", "legend"],
    rubricRef: "2.4.6",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      const GENERIC = ["name", "date", "email", "address", "phone", "yes", "no", "other", "input", "field", "value", "quantity", "search", "title", "details"];
      const items = [];
      let currentHeading = "No Heading Found";
      for (const el of root.querySelectorAll("h1, h2, h3, h4, h5, h6, label, legend")) {
        if (!isVisible(el)) continue;
        const text = (el.textContent || "").replace(/[:\-.]/g, "").trim();
        if (!text) continue;
        if (el.tagName.startsWith("H")) {
          currentHeading = text;
        } else {
          const lower = text.toLowerCase();
          const isGeneric = GENERIC.includes(lower) || text.split(" ").length < 3;
          if (isGeneric) items.push(`Heading: "${currentHeading}" | Label: "${text}"`);
        }
        if (items.length >= 20) break;
      }

      if (items.length === 0) {
        return { computedVerdict: "PASS", reason: "No ambiguous headings/labels found." };
      }
      return { items };
    },
  },

  {
    id: "2.5.3",
    standard: "2.5.3 Label in Name (Level A)",
    earlId: "WCAG22:label-in-name",
    kind: "text",
    relevantSelectors: ["button", "a", "input", "select", "textarea", "[role='button']", "[role='link']", "[role='checkbox']", "[role='radio']"],
    rubricRef: "2.5.3",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };
      const cleanText = (s) => (s ? s.toLowerCase().replace(/[\W_]+/g, " ").trim() : "");

      function getAccessibleName(el) {
        if (el.hasAttribute("aria-labelledby")) {
          const ids = el.getAttribute("aria-labelledby").split(" ");
          const labels = ids.map((id) => root.getElementById?.(id)?.textContent || "").filter(Boolean);
          if (labels.length) return labels.join(" ");
        }
        if (el.hasAttribute("aria-label")) return el.getAttribute("aria-label").trim();
        if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) {
          if (el.id) {
            const label = root.querySelector(`label[for="${CSS.escape(el.id)}"]`);
            if (label) return label.textContent;
          }
          if (["submit", "reset", "button"].includes(el.type)) return el.value;
        }
        return el.textContent || "";
      }

      function getVisibleLabel(el) {
        if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) {
          if (["submit", "reset", "button"].includes((el.type || "").toLowerCase())) return el.value;
          return el.getAttribute("placeholder") || "";
        }
        return el.textContent;
      }

      const mismatched = [];
      for (const el of root.querySelectorAll("button, a, input, select, textarea, [role='button'], [role='link'], [role='checkbox'], [role='radio']")) {
        if (!isVisible(el)) continue;
        const visibleRaw = getVisibleLabel(el);
        const accessibleRaw = getAccessibleName(el);
        if (!visibleRaw?.trim() || !accessibleRaw?.trim()) continue;
        const visible = cleanText(visibleRaw);
        const accessible = cleanText(accessibleRaw);
        if (visible.length > 0 && !accessible.includes(visible)) {
          mismatched.push({ visible: visibleRaw.trim().slice(0, 50), accessible: accessibleRaw.trim().slice(0, 50), element: `<${el.tagName.toLowerCase()}>` });
        }
        if (mismatched.length >= 10) break;
      }

      if (mismatched.length === 0) {
        return { computedVerdict: "PASS", reason: "Every visible label is contained within its accessible name." };
      }
      return { mismatchedElements: mismatched };
    },
  },

  {
    id: "4.1.2",
    standard: "4.1.2 Name, Role, Value (Level A)",
    earlId: "WCAG22:name-role-value",
    kind: "text",
    relevantSelectors: ["button", "a", "[role='button']", "[role='link']", "input[type='submit']", "input[type='button']"],
    rubricRef: "4.1.2",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      function getAccessibleName(el) {
        if (el.hasAttribute("aria-labelledby")) {
          const ids = el.getAttribute("aria-labelledby").split(" ");
          const labels = ids.map((id) => root.getElementById?.(id)?.textContent || "").filter(Boolean);
          if (labels.length) return labels.join(" ");
        }
        if (el.hasAttribute("aria-label")) return el.getAttribute("aria-label").trim();
        if (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) {
          if (el.type === "submit" || el.type === "button") return el.value;
        }
        return el.textContent || "";
      }

      const JUNK_REGEX = /^$|^button$|^link$|^submit$|^click here$|^untitled$|^\d+$|^\W+$|\.(png|jpg|svg|gif|webp)$/i;
      const suspicious = [];
      for (const el of root.querySelectorAll("button, a, [role='button'], [role='link'], input[type='submit'], input[type='button']")) {
        if (!isVisible(el) || el.offsetWidth < 10 || el.offsetHeight < 10) continue;
        const cleanName = getAccessibleName(el).trim();
        if (!cleanName) continue;
        if (JUNK_REGEX.test(cleanName) || cleanName.length < 3) {
          suspicious.push({ element: `<${el.tagName.toLowerCase()}>`, name: cleanName });
        }
        if (suspicious.length >= 10) break;
      }

      if (suspicious.length === 0) {
        return { computedVerdict: "PASS", reason: "No generic/placeholder accessible names detected." };
      }
      return { suspiciousItems: suspicious };
    },
  },

  {
    id: "1.4.12",
    standard: "1.4.12 Text Spacing (Level AA)",
    earlId: "WCAG22:text-spacing",
    kind: "destructive",
    relevantSelectors: ["*"],
    rubricRef: "1.4.12",
    // CSS is injected directly into the component's shadow root (see
    // audit-component.mjs) because a <style> on the top document cannot reach
    // shadow DOM content — the same isolation CLAUDE.md documents for
    // `variables.css` applies here.
    spacingCss: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }`,
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        if (!el) return false;
        if (el.tagName === "BODY" || el.tagName === "HTML") return true;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      // The standard visually-hidden/sr-only pattern (screen-reader-only text,
      // e.g. an icon-only button's accessible name) deliberately clips itself
      // to ~1px with `clip`/`clip-path` — that's correct, not a text-spacing
      // regression, and would otherwise false-positive on every such element.
      const isIntentionallyClipped = (el, style) => {
        const rect = el.getBoundingClientRect();
        const tiny = rect.width <= 1 || rect.height <= 1;
        const clips = (style.clip && style.clip !== "auto") || (style.clipPath && style.clipPath !== "none");
        return tiny && clips;
      };

      const clipped = [];
      for (const el of root.querySelectorAll("div, p, section, article, li, td, span, button, a, label")) {
        if (!isVisible(el)) continue;
        const style = window.getComputedStyle(el);
        if (isIntentionallyClipped(el, style)) continue;
        if (["hidden", "scroll", "auto"].includes(style.overflowY) && el.scrollHeight > el.clientHeight + 2) {
          if ((el.textContent || "").trim().length > 0) {
            clipped.push({ element: `<${el.tagName.toLowerCase()}>`, details: `scrollHeight ${el.scrollHeight}px > clientHeight ${el.clientHeight}px with overflow:${style.overflowY}` });
          }
        }
        if (clipped.length >= 5) break;
      }

      if (clipped.length === 0) {
        return { computedVerdict: "PASS", reason: "No text clipping detected with WCAG-minimum spacing applied." };
      }
      return { clippedElements: clipped };
    },
  },

  {
    id: "HC",
    standard: "1.4.11 Non-text Contrast (Level AA) — Forced Colors",
    earlId: "WCAG22:contrast-enhanced",
    kind: "destructive",
    relevantSelectors: ["button", "a", "input", "select", "textarea", "[role='button']", "svg", "img"],
    rubricRef: "high-contrast",
    forcedColorsCss: `
      :host, * { background-image: none !important; box-shadow: none !important; text-shadow: none !important; }
      * { background-color: Canvas !important; color: CanvasText !important; border-color: CanvasText !important; }
      svg { fill: CanvasText !important; stroke: CanvasText !important; }
    `,
    extractor: function () {
      return {}; // purely visual — orchestrator captures before/after screenshots, no DOM extraction needed
    },
  },

  {
    id: "1.4.4",
    standard: "1.4.4 Resize Text (Level AA)",
    earlId: "WCAG22:resize-text",
    kind: "destructive",
    relevantSelectors: ["*"],
    rubricRef: "1.4.4",
    extractor: function () {
      return {}; // purely visual — orchestrator zooms and screenshots
    },
  },

  {
    id: "1.3.1-visual-heading",
    standard: "1.3.1 Info and Relationships (Level A) — Visual Headings",
    earlId: "WCAG22:info-and-relationships",
    kind: "text",
    relevantSelectors: ["p", "div", "span"],
    rubricRef: "1.3.1-visual-heading",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      function isVisualHeading(el) {
        const text = (el.textContent || "").trim();
        if (!text) return false;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const size = parseFloat(style.fontSize);
        const weight = parseInt(style.fontWeight, 10) || (style.fontWeight === "bold" ? 700 : 400);
        const isItalic = style.fontStyle === "italic";
        const hasEmoji = /\p{Extended_Pictographic}/u.test(text);
        const isShort = text.length < 60;
        if (size >= 24 && isShort) return true;
        if (weight >= 600 && size >= 16 && isShort) return true;
        if (size >= 11 && isShort) {
          if (isItalic || hasEmoji) return true;
          if (text === text.toUpperCase() && text.length > 3) return true;
        }
        return false;
      }

      const candidates = [];
      let count = 0;
      for (const el of root.querySelectorAll("p, div, span")) {
        if (count > 25) break;
        if (el.querySelector("div, p, h1, h2, h3, h4, h5, h6")) continue;
        if (el.closest('a, button, [role="button"]')) continue;
        if (isVisualHeading(el)) {
          candidates.push({ text: (el.textContent || "").slice(0, 100), tagName: el.tagName.toLowerCase() });
          count++;
        }
      }

      if (candidates.length === 0) {
        return { computedVerdict: "PASS", reason: "No elements found that resemble visual (non-semantic) headings." };
      }
      return { candidates };
    },
  },

  {
    id: "1.3.2",
    standard: "1.3.2 Meaningful Sequence (Level A)",
    earlId: "WCAG22:meaningful-sequence",
    kind: "text",
    relevantSelectors: ["*"],
    rubricRef: "1.3.2",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const orderingProperties = [];
      for (const el of root.querySelectorAll("*")) {
        if (el.getAttribute("aria-hidden") === "true" || el.getAttribute("role") === "presentation") continue;
        const style = window.getComputedStyle(el);
        let reason = "";
        if (style.order && style.order !== "0" && style.order !== "auto") reason += `order:${style.order} `;
        if (style.flexDirection === "row-reverse" || style.flexDirection === "column-reverse") reason += `flex-dir:${style.flexDirection} `;
        if (style.cssFloat && style.cssFloat !== "none") reason += `float:${style.cssFloat} `;
        if (style.position === "absolute" || style.position === "fixed") {
          const hasText = (el.textContent || "").trim().length > 0;
          const isTiny = el.clientWidth < 20 || el.clientHeight < 20;
          if (hasText && !isTiny) reason += `pos:${style.position} `;
        }
        if (reason) orderingProperties.push({ element: el.tagName.toLowerCase(), css: reason.trim() });
        if (orderingProperties.length >= 5) break;
      }

      const layoutTables = Array.from(root.querySelectorAll("table")).filter(
        (t) => t.getAttribute("role") === "presentation" || (!t.querySelector("th") && !t.querySelector("caption")),
      );

      if (orderingProperties.length === 0 && layoutTables.length === 0) {
        return { computedVerdict: "PASS", reason: "No CSS ordering/positioning properties or layout tables found that could disrupt the visual-vs-DOM reading order." };
      }
      return { orderingProperties: orderingProperties.slice(0, 5), layoutTables: layoutTables.length > 0 ? [{ note: "Table without <th>/<caption> — verify it's not used purely for layout." }] : [] };
    },
  },

  {
    id: "2.2.2",
    standard: "2.2.2 Pause, Stop, Hide (Level A)",
    earlId: "WCAG22:pause-stop-hide",
    kind: "text",
    relevantSelectors: ["*"],
    rubricRef: "2.2.2",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };
      const isEssential = (el) => {
        const role = el.getAttribute("role");
        const classes = (el.className || "").toString().toLowerCase();
        return role === "progressbar" || role === "status" || classes.includes("spinner") || classes.includes("loader") || classes.includes("loading");
      };
      const parseDuration = (s) => (!s ? 0 : s.includes("ms") ? parseFloat(s) / 1000 : parseFloat(s));

      const movingElements = [];
      for (const el of root.querySelectorAll("*")) {
        if (["SCRIPT", "STYLE"].includes(el.tagName) || !isVisible(el)) continue;
        const style = window.getComputedStyle(el);
        if (style.animationName && style.animationName !== "none") {
          const duration = parseDuration(style.animationDuration);
          const iterationCount = style.animationIterationCount;
          const totalDuration = iterationCount === "infinite" ? Infinity : duration * parseFloat(iterationCount);
          if (totalDuration > 5 && !isEssential(el)) {
            movingElements.push({ type: "CSS Animation", element: `<${el.tagName.toLowerCase()}>`, details: `Duration: ${iterationCount === "infinite" ? "Infinite" : `${totalDuration}s`}` });
          }
        }
      }
      for (const anim of root.querySelectorAll("animate, animateTransform")) {
        const parentSvg = anim.closest("svg");
        if (!parentSvg || !isVisible(parentSvg)) continue;
        const dur = parseDuration(anim.getAttribute("dur"));
        const repeat = anim.getAttribute("repeatCount");
        if (repeat === "indefinite" || dur > 5) {
          movingElements.push({ type: "SVG Animation", element: "SVG Object", details: `Duration: ${repeat === "indefinite" ? "Infinite" : `${dur}s`}` });
        }
      }

      if (movingElements.length === 0) {
        return { computedVerdict: "PASS", reason: "No auto-playing animation longer than 5 seconds detected." };
      }
      return { movingElements: movingElements.slice(0, 10) };
    },
  },

  {
    id: "3.2.2",
    standard: "3.2.2 On Input (Level A)",
    earlId: "WCAG22:on-input",
    kind: "text",
    relevantSelectors: ["select", "input", "textarea", "[contenteditable]", "[onchange]", "[oninput]", "[onblur]"],
    rubricRef: "3.2.2",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };
      const SUSPICIOUS = ["submit(", "submit()", "window.open", "location.href", "location.assign", "location.replace"];

      const riskyInputs = [];
      for (const el of root.querySelectorAll("select, input, textarea, [contenteditable], [onchange], [oninput], [onblur]")) {
        if (!isVisible(el)) continue;
        const handlers = [el.getAttribute("onchange"), el.getAttribute("oninput"), el.getAttribute("onblur"), el.getAttribute("onclick")];
        let issue = null;
        for (const code of handlers) {
          if (!code) continue;
          const lower = code.toLowerCase();
          const hit = SUSPICIOUS.find((p) => lower.includes(p));
          if (hit) {
            issue = `Handler contains: "${hit}"`;
            break;
          }
        }
        if (issue) riskyInputs.push({ element: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : ""), details: issue });
        if (riskyInputs.length >= 10) break;
      }

      if (riskyInputs.length === 0) {
        return { computedVerdict: "PASS", reason: "No suspicious inline event-handler code (auto-submit, window.open, forced navigation) found on any input." };
      }
      return { riskyInputs };
    },
  },

  {
    id: "3.3.2",
    standard: "3.3.2 Labels or Instructions (Level A)",
    earlId: "WCAG22:labels-or-instructions",
    kind: "text",
    relevantSelectors: ["input", "textarea", "select"],
    rubricRef: "3.3.2",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      function getAccessibleLabel(el) {
        if (el.hasAttribute("aria-labelledby")) {
          const ids = el.getAttribute("aria-labelledby").split(" ");
          const label = ids.map((id) => root.getElementById?.(id)?.textContent || "").filter(Boolean).join(" ");
          if (label.trim()) return label.trim();
        }
        if (el.hasAttribute("aria-label")) return el.getAttribute("aria-label").trim();
        let native = "";
        if (el.id) {
          const label = root.querySelector(`label[for="${CSS.escape(el.id)}"]`);
          if (label) native = label.textContent;
        }
        if (!native && el.closest("label")) native = el.closest("label").textContent;
        let description = "";
        const describedBy = el.getAttribute("aria-describedby");
        if (describedBy) {
          description = describedBy.split(" ").map((id) => root.getElementById?.(id)?.textContent || "").filter(Boolean).join(" ");
        }
        return `${native} ${description}`.trim();
      }

      const HINT_PATTERN = /\(.*\)|e\.g\.|example|format:|\d{2}\/\d{2}|\d{3}-\d{2}/i;
      const REQ_INDICATOR_PATTERN = /\*|required|mandatory/i;
      const FREE_TEXT_PATTERN = /name|address|city|comment|search|email|appointment|subject/i;
      const EXCLUDED_TYPES = ["hidden", "submit", "button", "image", "reset", "checkbox", "radio", "file", "date", "time", "datetime-local", "month", "week", "color", "range"];

      const suspectFields = [];
      const confirmedFailures = [];
      for (const el of root.querySelectorAll("input, textarea, select")) {
        if (!isVisible(el)) continue;
        const type = (el.getAttribute("type") || el.type || "text").toLowerCase().trim();
        if (EXCLUDED_TYPES.includes(type)) continue;

        const label = getAccessibleLabel(el);
        const placeholder = el.getAttribute("placeholder") || "";
        const fullText = `${label} ${placeholder}`;
        const isRequired = el.hasAttribute("required") || el.getAttribute("aria-required") === "true";

        if (isRequired && !REQ_INDICATOR_PATTERN.test(fullText)) {
          confirmedFailures.push(`${label.slice(0, 50)} (required field missing an indicator)`);
          continue;
        }
        if (HINT_PATTERN.test(fullText)) continue;
        if (FREE_TEXT_PATTERN.test(fullText)) continue;

        suspectFields.push({ label: label.slice(0, 150) });
        if (suspectFields.length >= 10) break;
      }

      if (suspectFields.length === 0) {
        return confirmedFailures.length === 0
          ? { computedVerdict: "PASS", reason: "All fields have sufficient instructions/indicators." }
          : { computedVerdict: "FAIL", reason: `Required fields missing an indicator: ${confirmedFailures.join(", ")}.` };
      }
      return { confirmedFailures, suspectFields };
    },
  },

  {
    id: "1.4.1-images",
    standard: "1.4.1 Use of Color (Level A) — Graphics",
    earlId: "WCAG22:use-of-color",
    kind: "visual-elements",
    relevantSelectors: ["img", "svg", "canvas"],
    rubricRef: "1.4.1-images",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const images = [];
      for (const el of root.querySelectorAll("img, svg, canvas")) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) continue;
        const role = el.getAttribute("role");
        if (role === "presentation" || role === "none") continue;

        const id = "a11y-1-4-1-img-" + Math.random().toString(36).slice(2, 9);
        el.setAttribute("data-a11y-1-4-1-id", id);
        images.push({
          selector: `[data-a11y-1-4-1-id="${id}"]`,
          alt: el.getAttribute("alt") || el.getAttribute("aria-label") || "No text alternative",
        });
        if (images.length >= 5) break;
      }

      if (images.length === 0) {
        return { computedVerdict: "PASS", reason: "No relevant graphical content found." };
      }
      return { images };
    },
  },

  {
    id: "1.4.5",
    standard: "1.4.5 Images of Text (Level AA)",
    earlId: "WCAG22:images-of-text",
    kind: "visual-elements",
    relevantSelectors: ["img", "svg", "[role='img']"],
    rubricRef: "1.4.5",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };

      const images = [];
      for (const el of root.querySelectorAll("img, svg, [role='img']")) {
        if (!isVisible(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 20 || rect.height < 20) continue;

        const id = "a11y-1-4-5-img-" + Math.random().toString(36).slice(2, 9);
        el.setAttribute("data-a11y-1-4-5-id", id);
        images.push({ selector: `[data-a11y-1-4-5-id="${id}"]`, alt: el.getAttribute("alt") || "" });
        if (images.length >= 10) break;
      }

      if (images.length === 0) {
        return { computedVerdict: "PASS", reason: "No image/graphic content found to check for embedded text." };
      }
      return { images };
    },
  },

  {
    id: "1.4.11-graphics",
    standard: "1.4.11 Non-text Contrast (Level AA) — Graphics",
    earlId: "WCAG22:non-text-contrast",
    kind: "visual-elements",
    relevantSelectors: ["svg", "img", "canvas", "[role='img']", "[role='graphics-symbol']", "[role='graphics-document']"],
    rubricRef: "1.4.11-graphics",
    extractor: function (tagName) {
      const host = document.querySelector(tagName);
      const root = host?.shadowRoot ?? host;
      if (!root) return { computedVerdict: "INAPPLICABLE", reason: "Component not found." };

      const images = [];
      for (const el of root.querySelectorAll("svg, img, canvas, [role='img'], [role='graphics-symbol'], [role='graphics-document']")) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) continue;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;

        const id = "a11y-1-4-11g-" + Math.random().toString(36).slice(2, 9);
        el.setAttribute("data-a11y-1-4-11g-id", id);
        images.push({ selector: `[data-a11y-1-4-11g-id="${id}"]`, name: el.getAttribute("aria-label") || el.getAttribute("alt") || `<${el.tagName.toLowerCase()}>` });
        if (images.length >= 4) break;
      }

      if (images.length === 0) {
        return { computedVerdict: "PASS", reason: "No standalone graphics (icons, charts) found." };
      }
      return { images };
    },
  },

  {
    id: "1.4.10",
    standard: "1.4.10 Reflow (Level AA)",
    earlId: "WCAG22:reflow",
    kind: "destructive",
    relevantSelectors: ["*"],
    rubricRef: "1.4.10",
    extractor: function () {
      const doc = document.documentElement;
      const hasHorizontalScrollbar = doc.scrollWidth > doc.clientWidth + 1;
      if (!hasHorizontalScrollbar) {
        return { computedVerdict: "PASS", reason: "No horizontal scrollbar at a 320px viewport width." };
      }
      return { hasHorizontalScrollbar: true, details: `scrollWidth ${doc.scrollWidth}px > viewport width ${doc.clientWidth}px` };
    },
  },
];

export const INTERACTIVE_RULES = [
  {
    id: "2.4.7",
    standard: "2.4.7 Focus Visible (Level AA)",
    earlId: "WCAG22:focus-visible",
    rubricRef: "2.4.7",
    relevantSelectors: ["a", "button", "input", "select", "textarea", "[tabindex]"],
    states: ["focus"],
  },
  {
    id: "1.4.11",
    standard: "1.4.11 Non-text Contrast (Level AA)",
    earlId: "WCAG22:non-text-contrast",
    rubricRef: "1.4.11",
    relevantSelectors: ["button", "input", "select", "textarea", "[role='button']"],
    states: ["focus"],
  },
  {
    // Ported from nano-a11y-audit's 1.4.1.js `hasValidVisualCues`/link contrast
    // logic, which statically parsed stylesheet text for `:hover`/`:focus` rules
    // — fragile, and blind to Lit's adoptedStyleSheets. Replaced with a real
    // hover/focus interaction + computed-style diff, the same upgrade applied to
    // 2.4.7/1.4.11. This rule was dropped during the initial port (the 1.4.1
    // "text" rule only re-implemented the forms/state-indicator checks) — links
    // that are visually distinguished by color alone at rest need their own
    // check for whether hover/focus adds a non-color cue (underline, weight,
    // border) per WCAG technique G183/F73.
    id: "1.4.1-link",
    standard: "1.4.1 Use of Color (Level A) — Link Distinction",
    earlId: "WCAG22:use-of-color",
    rubricRef: "1.4.1-link",
    relevantSelectors: ["a"],
    states: ["hover", "focus"],
  },
];

// Whole-page-only checks: a single isolated component preview can't
// meaningfully violate these (a `<button>` doesn't have its own `<title>` or
// its own site navigation), but a real page assembled from these components —
// audit-page.mjs's target — can. Extractors here query `document` directly,
// not a component's shadow root, since there's no single custom element to
// scope to. `1.4.10` (Reflow) already lives in `RULES` above and is reused
// as-is for page-mode without duplication: its extractor already checks
// `document.documentElement`'s scrollWidth regardless of which tag it's
// invoked against.
//
// Deliberately NOT ported, with reasons (not silently dropped):
//   - 3.1.1 Language of Page / 3.1.2 Language of Parts: both depend on
//     Chrome's on-device Language Detection API, which requires the same
//     flags/model download nano-a11y-audit's README says its whole Chrome
//     Canary requirement exists for — this skill runs a stock Playwright
//     Chromium, which doesn't have it. `self.LanguageDetector` will simply be
//     undefined; there's no reliable local substitute worth faking.
export const PAGE_RULES = [
  {
    id: "2.4.2",
    standard: "2.4.2 Page Titled (Level A)",
    earlId: "WCAG22:page-titled",
    kind: "text",
    rubricRef: "2.4.2",
    extractor: function () {
      const title = (document.querySelector("title")?.textContent || "").trim();
      if (!title) {
        return { computedVerdict: "FAIL", reason: "The page <title> element is missing or empty." };
      }
      const bodyText = (document.body.innerText || "").replace(/\s+/g, " ").trim().slice(0, 1000);
      return { titleTag: title, contentSnippet: bodyText || "[No text content found on page]" };
    },
  },
  {
    id: "2.4.5",
    standard: "2.4.5 Multiple Ways (Level AA)",
    earlId: "WCAG22:multiple-ways",
    kind: "text",
    rubricRef: "2.4.5",
    extractor: function () {
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
      };
      const found = [];
      if (Array.from(document.querySelectorAll("input[type='search'], form[role='search']")).some(isVisible)) found.push("Search Function");
      for (const nav of document.querySelectorAll("nav, [role='navigation']")) {
        if (isVisible(nav) && nav.querySelectorAll("a").length > 2) {
          found.push("Navigation Menu");
          break;
        }
      }
      for (const a of document.querySelectorAll("a")) {
        if (!isVisible(a)) continue;
        const text = (a.textContent || "").toLowerCase();
        if (text.includes("sitemap") || text.includes("site map")) {
          found.push("Sitemap Link");
          break;
        }
        if (text.includes("table of contents")) {
          found.push("Table of Contents");
          break;
        }
      }
      const unique = [...new Set(found)];
      if (unique.length >= 2) {
        return { computedVerdict: "PASS", reason: `Found ${unique.length} navigation methods: ${unique.join(", ")}.` };
      }
      return { foundMechanisms: unique, computedVerdict: "FAIL", reason: unique.length === 0 ? "No navigation mechanisms (search, nav menu, sitemap, table of contents) found." : `Only one navigation mechanism found: ${unique[0]}. At least two are required.` };
    },
  },
  {
    // Orientation-lock detection only — the actual portrait/landscape
    // emulation is a viewport swap audit-page.mjs performs before running
    // this extractor, not something the extractor does itself.
    id: "1.3.4",
    standard: "1.3.4 Orientation (Level AA)",
    earlId: "WCAG22:orientation",
    kind: "text",
    rubricRef: "1.3.4",
    extractor: function () {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isVisible = (el) => {
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
        if (style.position === "fixed") return true;
        return el.offsetParent !== null;
      };
      const SUSPICIOUS = ["rotate", "landscape", "turn your device"];
      const restrictions = [];
      for (const el of document.querySelectorAll("div, p, h1, h2, h3, span, dialog")) {
        if (!isVisible(el)) continue;
        const text = (el.textContent || "").toLowerCase();
        if (text.length < 10 || text.length > 150) continue;
        if (SUSPICIOUS.some((kw) => text.includes(kw))) {
          const clean = el.textContent.trim();
          if (!restrictions.includes(clean)) restrictions.push(clean);
        }
      }
      if (restrictions.length === 0) {
        return { computedVerdict: "PASS", reason: `No orientation-restriction messaging found (viewport currently ${isPortrait ? "portrait" : "landscape"}).` };
      }
      return { potentialRestrictions: restrictions, currentOrientation: isPortrait ? "portrait" : "landscape" };
    },
  },
];
