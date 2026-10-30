# Sample-led Style Prompts implementation plan

Goal: make the existing offline finder produce useful prompts and a shorter selection flow.
Architecture: retain the vanilla JS catalog, scoring and local state; replace inferred descriptors with explicit sample-prompt metadata. No dependencies, image edits, shared data, or integration. Work on main as requested.

Files: app.js (data, scoring, prompts, UI); test_logic.js, test_regressions.js, test_browser.js and test_prompt_revision.js (behavior); index.html and styles.css (details flow); build_standalone.py, test_release.py, verify_release.py and README.md (v0.2 packaging); docs/TASKS.md, DECISIONS.md and SESSION-LOG.md (evidence).

For each priority: add regression assertions, observe failure, implement, run checks, document and commit.

- [x] P1: inspect generation prompts; add 3–5 subject-free signature traits and explicit descriptors for all 96; record and resolve descriptor collisions; signature-first prompt.
- [x] P2: article/conjunction grammar across every feeling and format; merge story or exact placeholder; one continuity instruction; remove generic artist caveat.
- [x] P3: five formats plus optional single approach toggle; exact layout instructions; independently weighted scoring; migrate old formats; exercise rankings across choices.
- [x] P4: nine story categories; combine everyday/personal; migrate kids to audience; update examples and saved states.
- [x] P5: explicit bestFor/avoidIf for all 96; show differentiating card reason; remove strong-start badge and visible IDs.
- [x] P6: direct details with sample, prompt, copy, collapsed Advanced; remove shortlist/modal flow; disabled JSON flag; build v0.2; desktop/mobile/keyboard/persistence/clipboard checks.

Review focus: malformed storage; legacy categories and formats; empty stories and user HTML; edited descriptors; back-navigation and focus; offline bundle parity.

Rulings: use current v0.1 naming and bump to v0.2 per explicit request. Recreate requested docs from HEAD because locally deleted. Existing unrelated work and artwork remain untouched.

Final review: three important findings fixed with observed RED→GREEN regressions; full suite and browser/release checks green. No review minors deferred. Owner image comparison remains intentionally pending.
