#!/usr/bin/env node
/**
 * Downstream interface #1: EARL (Evaluation and Report Language) JSON-LD report,
 * ported near-verbatim from nano-a11y-audit/src/utils/earl-reporter.js. The
 * report shape didn't need to change — only what produces the contextual
 * assertions did (Claude reasoning in-conversation over the evidence
 * audit-component.mjs gathered, instead of a nested Gemini Nano call) — so the
 * same downstream consumer nano-a11y-audit targets, the W3C WCAG-EM Report
 * Tool (https://www.w3.org/WAI/eval/report-tool/), still accepts this file
 * as-is via its "Open an existing report" file upload.
 *
 * Usage:
 *   node generate-earl-report.mjs <report.json> [<report.json> ...] [--out=<path>]
 *
 * Each report.json must have every `pendingReview` item's `verdict`/`reason`
 * filled in by the time this runs — that's the step SKILL.md has the invoking
 * Claude Code session do between audit-component.mjs and this script.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASELINE_IDS = [
  "WCAG22:non-text-content",
  "WCAG22:info-and-relationships",
  "WCAG22:sensory-characteristics",
  "WCAG22:identify-input-purpose",
  "WCAG22:use-of-color",
  "WCAG22:audio-control",
  "WCAG22:contrast-minimum",
  "WCAG22:resize-text",
  "WCAG22:contrast-enhanced",
  "WCAG22:reflow",
  "WCAG22:non-text-contrast",
  "WCAG22:text-spacing",
  "WCAG22:keyboard",
  "WCAG22:focus-order",
  "WCAG22:link-purpose-in-context",
  "WCAG22:headings-and-labels",
  "WCAG22:focus-visible",
  "WCAG22:label-in-name",
  "WCAG22:target-size-minimum",
  "WCAG22:labels-or-instructions",
  "WCAG21:parsing",
  "WCAG22:name-role-value",
];

function generateEarlReport(auditResults, { includePassed = true, includeNotPresent = true } = {}) {
  const date = new Date().toISOString();
  const websiteId = "_:website";
  const uniqueUrls = [...new Set(auditResults.map((r) => r.url))];

  const pages = uniqueUrls.map((url, index) => {
    const found = auditResults.find((r) => r.url === url);
    return { id: `_:page_${index + 1}`, type: ["TestSubject", "Webpage"], title: found?.pageTitle || url, description: url, date };
  });
  const urlToId = uniqueUrls.reduce((acc, url, i) => ((acc[url] = `_:page_${i + 1}`), acc), {});

  const allAssertions = [];
  const combinedIds = new Set([...BASELINE_IDS, ...auditResults.map((r) => r.earlId)]);

  combinedIds.forEach((fullId) => {
    const relevant = auditResults.filter((r) => r.earlId === fullId);
    if (relevant.length === 0) {
      allAssertions.push({
        type: "Assertion",
        date,
        mode: { type: "TestMode", "@value": "earl:manual" },
        result: { type: "TestResult", date, outcome: { id: "earl:untested", type: ["OutcomeValue", "NotTested"] } },
        subject: { id: websiteId, type: ["TestSubject", "Website"], title: "Sonnet A11y Audit" },
        test: { id: fullId, type: ["TestCriterion", "TestRequirement"] },
      });
      return;
    }

    const anyFail = relevant.some((r) => r.verdict === "FAIL");
    const anyCannotTell = relevant.some((r) => r.verdict === "CANNOT_TELL");
    const onlyInapplicable = relevant.every((r) => r.verdict === "INAPPLICABLE");

    let aggregateOutcome;
    let aggregateDescription = "";
    if (anyFail) {
      aggregateOutcome = { id: "earl:failed", type: ["OutcomeValue", "Fail"], title: "Failed" };
      aggregateDescription = "Issues were found in the sample.";
    } else if (anyCannotTell) {
      aggregateOutcome = { id: "earl:cantTell", type: ["OutcomeValue", "CannotTell"], title: "Cannot Tell" };
      aggregateDescription = "Some checks could not be completed automatically.";
    } else if (onlyInapplicable) {
      aggregateOutcome = { id: "earl:inapplicable", type: ["OutcomeValue", "NotApplicable"], title: "Not Present" };
      if (includeNotPresent) aggregateDescription = "Not Present";
    } else {
      aggregateOutcome = { id: "earl:passed", type: ["OutcomeValue", "Pass"], title: "Passed" };
      if (includePassed) aggregateDescription = "Passed";
    }

    allAssertions.push({
      type: "Assertion",
      date,
      mode: { type: "TestMode", "@value": "earl:manual" },
      result: { type: "TestResult", date, description: aggregateDescription, outcome: aggregateOutcome },
      subject: { id: websiteId, type: ["TestSubject", "Website"], title: "Sonnet A11y Audit" },
      test: { id: fullId, type: ["TestCriterion", "TestRequirement"] },
    });

    const byUrl = relevant.reduce((acc, item) => ((acc[item.url] ??= []).push(item), acc), {});
    for (const [url, pageResults] of Object.entries(byUrl)) {
      const isFail = pageResults.some((r) => r.verdict === "FAIL");
      const isCannotTell = pageResults.some((r) => r.verdict === "CANNOT_TELL");
      const isInapplicable = pageResults.every((r) => r.verdict === "INAPPLICABLE");
      const describe = (rs) => rs.map((r) => `${r.source ? `[${r.source}] ` : ""}${r.reason}${r.ruleId ? ` (Rule: ${r.ruleId})` : ""}`).join("\n\n");

      let outcomeObj;
      let description = "";
      if (isFail) {
        outcomeObj = { id: "earl:failed", type: ["OutcomeValue", "Fail"], title: "Failed" };
        description = describe(pageResults.filter((r) => r.verdict === "FAIL"));
      } else if (isCannotTell) {
        outcomeObj = { id: "earl:cantTell", type: ["OutcomeValue", "CannotTell"], title: "Cannot Tell" };
        description = describe(pageResults.filter((r) => r.verdict === "CANNOT_TELL"));
      } else if (isInapplicable) {
        outcomeObj = { id: "earl:inapplicable", type: ["OutcomeValue", "NotApplicable"], title: "Not Present" };
        if (includeNotPresent) description = "Not Present";
      } else {
        outcomeObj = { id: "earl:passed", type: ["OutcomeValue", "Pass"], title: "Passed" };
        if (includePassed) description = describe(pageResults);
      }

      allAssertions.push({
        type: "Assertion",
        date,
        mode: { type: "TestMode", "@value": "earl:manual" },
        result: { type: "TestResult", date, description, outcome: outcomeObj },
        subject: { id: urlToId[url] },
        test: { id: fullId, type: ["TestCriterion", "TestRequirement"] },
      });
    }
  });

  return {
    "@context": {
      reporter: "http://github.com/w3c/wcag-em-report-tool/",
      wcagem: "http://www.w3.org/TR/WCAG-EM/#",
      Evaluation: "wcagem:procedure",
      defineScope: "wcagem:step1",
      scope: "wcagem:step1a",
      step1b: { "@id": "wcagem:step1b", "@type": "@id" },
      conformanceTarget: "step1b",
      accessibilitySupportBaseline: "wcagem:step1c",
      additionalEvaluationRequirements: "wcagem:step1d",
      exploreTarget: "wcagem:step2",
      essentialFunctionality: "wcagem:step2b",
      pageTypeVariety: "wcagem:step2c",
      technologiesReliedUpon: "wcagem:step2d",
      selectSample: "wcagem:step3",
      structuredSample: "wcagem:step3a",
      randomSample: "wcagem:step3b",
      Website: "wcagem:website",
      Webpage: "wcagem:webpage",
      auditSample: "wcagem:step4",
      reportFindings: "wcagem:step5",
      documentSteps: "wcagem:step5a",
      commissioner: "wcagem:commissioner",
      evaluator: "wcagem:evaluator",
      evaluationSpecifics: "wcagem:step5b",
      WCAG: "http://www.w3.org/TR/WCAG/#",
      WCAG20: "http://www.w3.org/TR/WCAG20/#",
      WCAG21: "http://www.w3.org/TR/WCAG21/#",
      WAI: "http://www.w3.org/WAI/",
      earl: "http://www.w3.org/ns/earl#",
      Assertion: "earl:Assertion",
      TestMode: "earl:TestMode",
      TestCriterion: "earl:TestCriterion",
      TestRequirement: "earl:TestRequirement",
      TestSubject: "earl:TestSubject",
      TestResult: "earl:TestResult",
      OutcomeValue: "earl:OutcomeValue",
      Pass: "earl:Pass",
      Fail: "earl:Fail",
      CannotTell: "earl:CannotTell",
      NotApplicable: "earl:NotApplicable",
      NotTested: "earl:NotTested",
      assertedBy: "earl:assertedBy",
      mode: "earl:mode",
      result: "earl:result",
      subject: "earl:subject",
      test: "earl:test",
      outcome: "earl:outcome",
      dcterms: "http://purl.org/dc/terms/",
      title: "dcterms:title",
      description: "dcterms:description",
      summary: "dcterms:summary",
      date: "dcterms:date",
      id: "@id",
      type: "@type",
      language: "@language",
      A: "WAI:WCAG2A-Conformance",
      AA: "WAI:WCAG2AA-Conformance",
      AAA: "WAI:WCAG2AAA-Conformance",
      wcagVersion: "WAI:standards-guidelines/wcag/#versions",
    },
    type: "Evaluation",
    language: "en",
    reportToolVersion: "3.0.3",
    defineScope: { id: "_:defineScope", scope: { description: "", title: "Sonnet A11y Audit" }, conformanceTarget: "AA", wcagVersion: "2.2" },
    exploreTarget: { id: "_:exploreTarget", essentialFunctionality: "", pageTypeVariety: "", technologiesReliedUpon: [] },
    selectSample: { id: "_:selectSample", structuredSample: pages, randomSample: [] },
    auditSample: allAssertions,
  };
}

// Component-mode reports (audit-component.mjs) are flat: {axeFindings,
// autoVerdicts, pendingReview} at the top level, one component+variant per
// file. Page-mode reports (audit-page.mjs) nest the same shape per
// `byTag[tag]` plus a `pageLevel` bucket, one URL covering many tags per
// file. Both get flattened into the same {url, pageTitle, earlId, verdict,
// reason, source, ruleId} rows generateEarlReport() expects.
function flattenSection(section, url, pageTitle, label, warnLabel) {
  const results = [];
  for (const f of section.axeFindings || []) {
    results.push({ url, pageTitle, earlId: f.earlId, verdict: f.verdict, reason: f.reason, source: "Axe Core", ruleId: f.ruleId });
  }
  for (const v of section.autoVerdicts || []) {
    results.push({ url, pageTitle, earlId: v.earlId, verdict: v.verdict, reason: v.reason, source: "Deterministic", ruleId: v.id });
  }
  for (const p of section.pendingReview || []) {
    if (!p.verdict) {
      console.warn(`[generate-earl-report] ${warnLabel}: ${p.id} has no verdict yet — skipping. Fill in pendingReview[].verdict/reason before generating the report.`);
      continue;
    }
    results.push({ url, pageTitle, earlId: p.earlId, verdict: p.verdict, reason: p.reason, source: "Sonnet (contextual)", ruleId: p.id });
  }
  return results;
}

function toAuditResults(report) {
  if (report.byTag) {
    // Page-mode report: whole-document axe findings live at the top level,
    // page-level auto/pending verdicts live under `pageLevel` — merge both
    // into one section before flattening.
    const url = report.url;
    const pageTitle = url;
    const pageLevelSection = { axeFindings: report.axeFindings, autoVerdicts: report.pageLevel?.autoVerdicts, pendingReview: report.pageLevel?.pendingReview };
    const results = [...flattenSection(pageLevelSection, url, pageTitle, "page-level", `${url} (page-level)`)];
    for (const [tag, section] of Object.entries(report.byTag)) {
      results.push(...flattenSection(section, url, pageTitle, tag, `${url} (${tag})`));
    }
    return results;
  }

  // Component-mode report.
  const url = report.url;
  const pageTitle = `${report.component} — ${report.variant}`;
  return flattenSection(report, url, pageTitle, pageTitle, `${report.component}/${report.variant}`);
}

function main() {
  const args = process.argv.slice(2);
  const outFlag = args.find((a) => a.startsWith("--out="));
  const reportPaths = args.filter((a) => !a.startsWith("--out="));

  if (reportPaths.length === 0) {
    console.error("Usage: node generate-earl-report.mjs <report.json> [<report.json> ...] [--out=<path>]");
    process.exit(1);
  }

  const auditResults = reportPaths.flatMap((p) => toAuditResults(JSON.parse(readFileSync(p, "utf8"))));
  const earlReport = generateEarlReport(auditResults);

  const outPath = outFlag ? outFlag.slice("--out=".length) : path.join(path.dirname(reportPaths[0]), "earl-report.json");
  writeFileSync(outPath, JSON.stringify(earlReport, null, 2));
  console.log(`EARL report written to ${outPath}`);
  console.log("Upload it at https://www.w3.org/WAI/eval/report-tool/ (Step 4 > Open an existing report) to view/share it.");
}

main();
