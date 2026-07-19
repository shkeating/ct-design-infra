# Project Roadmap

Thesis research plan for evaluating Control vs. Experimental LLM UI-generation pipelines.

## Phase 1: Infrastructure & Benchmarking

The immediate focus is to finalize the component infrastructure and lock in the prompt datasets so both pipelines have a standardized input.

### Week 1: Component API & Dataset Sourcing

- Finalize the core Lit components and their Zag.js state machines in the monorepo to ensure the target APIs are fully stable.
- Define the exact JSON schema for the machine-readable context files (W3C Design Tokens and component metadata).
- Acquire the WebAccessBench prompt dataset and select the specific subset of UI generation tasks (e.g., modals, data tables) that will be used for both the Control and Experimental groups.

### Week 2: Pipeline Construction

- Build the Control Pipeline: Configure the LLM with standard system instructions to generate raw HTML/CSS for the selected prompts.
- Build the Experimental Pipeline: Configure the system to restrict the LLM to outputting only the defined Lit component APIs, feeding it the JSON context files.

## Phase 2: Testing Harness & Baseline Execution

This phase shifts to building the automated measurement suite (the Dependent Variables) and executing the initial control tests.

### Week 3: The Measurement Suite

- Integrate the axe-core API into the evaluation script to automatically count WCAG 2.1 AA violations (DV 1).
- Write the Abstract Syntax Tree (AST) parsing script to scan the generated code and calculate the ratio of raw CSS values to tokenized CSS (DV 2).
- Hook up the W3C HTML Validator API to automatically flag structural hallucinations and invalid DOM nesting (DV 3).

### Week 4: Control Execution & Buffer

Note: Schedule this as a lighter development week to accommodate travel to State College.

- Run the WebAccessBench prompt suite entirely through the Control pipeline.
- Execute the measurement suite on the Control outputs to establish the objective baseline for error counts and structural hallucinations.

## Phase 3: Experimental Execution & Data Synthesis

With the baseline established, the constrained architecture is tested, and the empirical comparison is formulated.

### Week 5: Experimental Execution

- Run the identical prompt suite through the Experimental pipeline, utilizing the W3C tokens and Lit component guardrails.
- Process the outputs through the axe-core, AST, and W3C Validator evaluation scripts.

### Week 6: Data Analysis & Visualization

- Synthesize the automated output data.
- Calculate the exact delta between the Control and Experimental groups to evaluate Primary (H1), Secondary (H2), and Tertiary (H3) hypotheses.
- Generate the data visualizations (charts comparing error rates, token adherence percentages, and DOM hallucination counts) required for the manuscript.

## Phase 4: Writing & Submission

The final weeks are strictly reserved for drafting the paper around the empirical data and formatting it for the target venue.

### Week 7: Drafting the Core Manuscript

- Draft the Methodology, Results, and Discussion sections, directly tying the objective data back to the claims made in the Problem Definition.
- Detail how the state machines (Zag.js) successfully prevented the AI from inventing invalid interactive states.

### Week 8: Full Review & Refinement

- Complete a full end-to-end review of the paper.
- Ensure the narrative bridges the gap between the tested architecture and the broader implications for enterprise design systems.

### Week 9: Formatting & Metadata

- Convert the finalized text and charts into the required ACM template format.
- Prepare submission metadata, abstracts, and package the anonymized code repository (containing the evaluation scripts and context file schemas) as supplementary material.
