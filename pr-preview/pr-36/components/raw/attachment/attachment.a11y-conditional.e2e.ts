// wcag-data/attachment.json has no enforced tests in this tier —
// documenting why, per this branch's convention of saying so explicitly
// rather than silently skipping a component (see
// tag.a11y-conditional.e2e.ts, heading.a11y-conditional.e2e.ts).
//
// attachment.json is the same boilerplate list copy-pasted across most
// components. Its most plausible entry, 2.4.4 Link Purpose ("compliance
// depends on the implementer providing clear and descriptive link text"),
// is a real concern for a file-download list, but isn't reachable with the
// tools this tier has: each file's link text (`file.name`) renders through
// a nested `<ct-link>` (attachment.ts's `renderFile()`), a separate custom
// element with its own shadow root that the mechanical rules.mjs 2.4.4
// extractor's `root.querySelectorAll("a")` can't see (it only queries the
// *host's own* shadow root — see breadcrumb.a11y-conditional.e2e.ts's class
// doc comment for the identical limitation and why axe-core's shadow-aware
// traversal doesn't have it but this plain-DOM extractor does). Unlike
// breadcrumb, attachment has no raw-`<a>` fallback path to fall back on.
// A `file.name=''` fixture doesn't produce a clean axe-testable gap either:
// `ct-link` always receives `title="Download ${file.name}"`, and an
// HTML `title` attribute is itself a valid (if weak) accessible-name
// source per the accname computation, so even an empty `name` likely still
// resolves to a non-empty accessible name via `title` — confirming that
// would require verifying `ct-link`'s own title-passthrough behavior in
// more depth than this component's own file warrants; not attempted here.
//
// The rest of attachment.json's entries are the same page/app-level
// boilerplate (form labels/instructions, status messages, page language)
// already established as out of scope for a single isolated component.
