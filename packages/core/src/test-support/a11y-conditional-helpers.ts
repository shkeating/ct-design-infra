// Shared plumbing for `*.a11y-conditional.e2e.ts` specs — the tier that turns
// wcag-data/<name>.json's `Conditional` entries into enforced checks (see
// docs/adr/0008-hybrid-a11y-audit-skill.md and the design discussion that
// preceded this file). This is the one place that reaches into
// `.claude/skills/sonnet-a11y-audit/scripts/lib/` — that skill's rule engine
// is the canonical implementation of these WCAG extractors, and CLAUDE.md's
// own convention for that skill is "extend rules.mjs, not a workaround
// elsewhere," so spec files import from here rather than each reaching across
// that boundary individually.
import type { Page } from '@playwright/test';
import { RULES, INTERACTIVE_RULES, type A11yRule } from '../../../../.claude/skills/sonnet-a11y-audit/scripts/lib/rules.mjs';
import { runAxePhase, type AxeFinding } from '../../../../.claude/skills/sonnet-a11y-audit/scripts/lib/audit-engine.mjs';

/** Navigates to a component's default Fractal preview and waits for its custom element to upgrade. */
export async function gotoComponentPreview(page: Page, name: string, tagName: string): Promise<void> {
  await page.goto(`/components/preview/${name}`);
  await page.waitForFunction((tag) => customElements.get(tag) !== undefined, tagName);
}

/** Sets Lit properties directly on the live element instance (not attributes) and waits for its next render. */
export async function setComponentProps(page: Page, tagName: string, props: Record<string, unknown>): Promise<void> {
  await page.evaluate(
    async ({ tag, props: p }) => {
      const el = document.querySelector(tag) as (Element & { updateComplete?: Promise<unknown> }) | null;
      if (!el) throw new Error(`<${tag}> not found on page — did gotoComponentPreview run first?`);
      Object.assign(el, p);
      await el.updateComplete;
    },
    { tag: tagName, props },
  );
}

function findRule(id: string): A11yRule {
  const rule = RULES.find((r) => r.id === id) ?? INTERACTIVE_RULES.find((r) => r.id === id);
  if (!rule) throw new Error(`No rule with id "${id}" in rules.mjs RULES/INTERACTIVE_RULES.`);
  return rule;
}

/**
 * Runs one `RULES` text-kind extractor (by its `rules.mjs` `id`, e.g. "2.4.4")
 * against the given tag's current rendered state and returns its raw result —
 * either `{ computedVerdict, reason }` (extractor decided on its own) or a
 * context payload (extractor found something needing judgment; a
 * conditional-enforcement test treats a non-empty payload as a FAIL signal,
 * since there's no Claude in the loop to adjudicate nuance here).
 */
export async function runExtractor(page: Page, tagName: string, ruleId: string): Promise<any> {
  const rule = findRule(ruleId);
  return page.evaluate(rule.extractor, tagName);
}

/** True when a text-kind extractor's result represents an unambiguous pass (either an explicit PASS verdict, or an empty context payload). */
export function extractorPassed(result: any): boolean {
  if (result.computedVerdict) return result.computedVerdict === 'PASS';
  return Object.values(result).every((v) => Array.isArray(v) && v.length === 0);
}

/**
 * Runs the axe-core phase (the same one `audit-component.mjs` runs) and
 * returns findings for one specific axe rule id (e.g. "button-name",
 * "link-name"). Prefer this over a custom `rules.mjs` extractor for SCs where
 * axe itself is already the authority — accessible-name *presence* (as
 * opposed to accessible-name *quality*, which the custom extractors judge).
 */
export async function runAxeFor(page: Page, tagName: string, axeRuleId: string): Promise<AxeFinding[]> {
  const { findings } = await runAxePhase(page, tagName);
  return findings.filter((f) => f.ruleId === axeRuleId);
}

/**
 * Replaces a parent custom element's light-DOM children of `childTag` with
 * freshly-created elements carrying `childrenProps`, then forces the parent
 * to re-render and waits for it to settle.
 *
 * Composite components (`ct-accordion`/`ct-breadcrumb`/`ct-social-links`/etc.
 * — see each one's own doc comment) read their light-DOM `ct-*-item` children
 * as plain data via `this.querySelectorAll(':scope > ct-*-item')` *inside
 * their own `render()`*, rather than treating each child as a Lit reactive
 * controller the parent observes. That means `setComponentProps` on a child
 * alone doesn't do anything visible — the parent only re-renders when one of
 * its *own* reactive properties changes. This forces that re-render after
 * swapping in the new children, the same way the parent's own property
 * setters do it internally.
 */
export async function setLightDomChildren(
  page: Page,
  parentTag: string,
  childTag: string,
  childrenProps: Record<string, unknown>[],
): Promise<void> {
  await page.evaluate(
    async ({ parentTag, childTag, childrenProps }) => {
      const parent = document.querySelector(parentTag) as
        | (Element & { updateComplete?: Promise<unknown>; requestUpdate?: () => void })
        | null;
      if (!parent) throw new Error(`<${parentTag}> not found on page — did gotoComponentPreview run first?`);
      parent.querySelectorAll(`:scope > ${childTag}`).forEach((el) => el.remove());
      for (const props of childrenProps) {
        const child = document.createElement(childTag);
        Object.assign(child, props);
        parent.appendChild(child);
      }
      parent.requestUpdate?.();
      await parent.updateComplete;
    },
    { parentTag, childTag, childrenProps },
  );
}
