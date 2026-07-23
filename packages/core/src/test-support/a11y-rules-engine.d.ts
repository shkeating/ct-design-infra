// Ambient typings for the two `.mjs` modules the a11y-conditional test tier
// imports from `.claude/skills/sonnet-a11y-audit/scripts/lib/` (see
// a11y-conditional-helpers.ts for why: that skill's rule engine is the single
// canonical source for these WCAG extractors per ADR 0008, and this repo's own
// convention is to extend `rules.mjs`, not reimplement its logic elsewhere).
// Wildcard specifiers so the declaration doesn't hardcode the relative-path
// depth from wherever it's imported.

declare module '*/sonnet-a11y-audit/scripts/lib/rules.mjs' {
  export interface A11yRule {
    id: string;
    standard: string;
    earlId: string;
    kind?: string;
    relevantSelectors?: string[];
    rubricRef?: string;
    states?: string[];
    extractor: (...args: any[]) => any;
  }
  export const RULES: A11yRule[];
  export const INTERACTIVE_RULES: A11yRule[];
  export const PAGE_RULES: A11yRule[];
}

declare module '*/sonnet-a11y-audit/scripts/lib/audit-engine.mjs' {
  import type { Page } from '@playwright/test';

  export interface AxeFinding {
    source: 'axe-core';
    ruleId: string;
    earlId: string;
    standard: string;
    verdict: 'PASS' | 'FAIL' | 'CANNOT_TELL' | 'INAPPLICABLE';
    reason: string;
  }

  export function runAxePhase(page: Page, tagName: string): Promise<{ findings: AxeFinding[]; error?: string }>;
}
