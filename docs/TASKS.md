# Tasks

**Status (30 October 2026):** First public release v0.1.0 published; approved typography refinement and A–D follow-up complete; earlier P1–P6 revision and story-free follow-up retained. Offline vanilla HTML/CSS/JS; no dependencies added, no images generated/replaced, no story-to-comics integration. Existing unrelated working-copy changes remain outside these commits.

## Public presentation — 30 October 2026

- [x] Replace the technical landing README with a visitor guide, real prompt example, format table, privacy and author/license details.
- [x] Preserve former technical sections in DEVELOPMENT.md and correct repository-local paths.
- [x] Reuse existing samples for the hero/social preview and capture the three questions, results and detail with Playwright CLI.
- [x] Move tests/tooling/art sources into their dedicated directories and remove generated HTML from the root.
- [x] Verify all tests, source/art checksums, README links and unchanged deployment bytes; prepare the approved main-branch commit/push. No version bump or app/art changes.

## First public release — 30 October 2026

- [x] Check existing tags before making release changes: none exist.
- [x] Adopt the studio SemVer policy and add CHANGELOG.md with an empty Unreleased section, the v0.1.0 entry and internal-build history.
- [x] Set the current UI/title, standalone filename and release checks to v0.1.0; preserve JSON schema version 2 and historical records.
- [x] Run all checks and inspect the rebuilt standalone; commit and tag comic-style-finder/v0.1.0.
- [x] Publish the app-only silentbuilds/comic-style-finder GitHub repository and release; deploy at ai.rockyfu.com/comic-style-finder. Verify live artifact equality, 73 browser checks and existing project routes.

## Typography — 30 October 2026

- [x] Complete the Impeccable typeset audit and receive owner approval before editing.
- [x] Record the supplied offline/non-artist context in PRODUCT.md; preserve local serif/sans families.
- [x] Establish shared rem roles, 16px body/card descriptions and 14px helpers; fix the Advanced helper contrast and inactive span styling rules.
- [x] Verify the first answer row at 1280×800, 390×844 and 320×800; check 640×400 overflow. Correct the existing mobile catalog wrapper grid and add a browser regression.
- [x] Rebuild v0.3 and run Node, browser, typography and release checks.

## Reusable style block — 29 October 2026

- [x] Structure the full prompt as Story / Style / optional Format; omit Format for Not sure yet.
- [x] Replace the old full-direction copy action with Copy style only, copying the exact reusable Style section.
- [x] Preserve Advanced visual editing and update both outputs from the shared Style formatter; scope the separate consistency editor to Format.
- [x] Update tests and decision record; rebuild the existing v0.3 standalone without a version bump. Five Node suites, 71 desktop/mobile browser checks and release verification pass.

## Format and results follow-up — 29 October 2026

- [x] A: verify the existing story-free flow, exact shared first line and copy guidance; prevent deleted story/keyword code paths from returning.
- [x] B: carousel channels, preset-sized format instructions, size/after-generation guidance, simple-scene hints and distinct carousel icon.
- [x] C: verify optional single-choice approach interaction and diagram-friendly ranking boost.
- [x] D: move neutral refinements to live results filters; verify grid updates; release v0.3 and rebuild. All five Node suites, 65 desktop/mobile browser assertions and release checks pass.

## Story-free follow-up — 29 October 2026

- [x] Remove the entire story-idea section, topic chips/text and examples from step 1.
- [x] Remove story-text state, saved data, scoring and export fields; discard legacy text while preserving style choices/edits.
- [x] Start both copy outputs with exactly `Story: [Who is it about, where are they, and what happens? 1–3 sentences]`, followed by style instructions.
- [x] Show “Replace the bracketed line with your story before you paste.” below Copy Style Prompt.
- [x] Update tests and decision record; rebuild the v0.2 standalone without a version bump. All four Node suites, 48 desktop/mobile browser assertions and release verification pass.

## Completed revision

- [x] **P1:** All 96 canonical names/IDs checked against the archive; 3-trait signatures and explicit palette/linework/texture/pacing derived from saved generation prompts. All 17 original collision groups (69 styles) listed in `PROMPT-AUDIT.md`; zero unresolved collisions; zero low-confidence signatures.
- [x] **P2 (historical; story merging superseded above):** Story merged into the Style Prompt or exact placeholder; article and conjunction checks; one default continuity instruction; irrelevant artist caveat and paste-time story reminder removed.
- [x] **P3:** Five formats plus one optional approach, concrete layout specs, independent score bonuses and legacy saved-format migration. All 1,080 combinations audited in `MATCHING-AUDIT.md`; unchanged rankings reported explicitly.
- [x] **P4:** Nine story categories, merged Everyday & personal, Kids audience and saved-choice migrations.
- [x] **P5:** Distinct bestFor/avoidIf for all 96, specific card suitability, no Strong start or visible style numbers.
- [x] **P6:** Direct sample → prompt → primary copy → collapsed Advanced details; shortlist/modal flow removed; JSON implementation retained behind `ENABLE_RECIPE_DOWNLOAD=false`; recipe edits survive navigation; rebuilt `comic-style-finder-v0.2.html`.
- [x] **Checks:** JS syntax, original logic tests, saved-state regressions, prompt revision tests (including all 120 feeling/format/approach combinations), 1,080-case ranking matrix, 42 desktop/mobile browser assertions, file-based offline and blocked-storage checks, release source/embedded-art parity, stale-build detection, and 192 unchanged preview/master SHA-256 checks.
- [x] Fresh read-only code review. Fixed all three important findings: incidental sample-scene instructions, navigation discarding edits, and unclear precedence between sample cues and explicit choices.

## Owner check — pending

- [ ] For **six styles** — Mecha Anime, Watercolor, Ligne Claire Detective Comic, Claymation/Stop-Motion Comic, Risograph Indie Zine Comic and Swiss Design Infographic Comic — set Format to Not sure yet, leave approach off and keep the default visual fields. Copy each Style Prompt, replace its bracketed placeholder with this exact story: **girl in an orange jacket and teal scarf holding a glowing seed beside a potted plant**, then paste into ChatGPT and compare the generated result to the finder thumbnail. Check palette, line quality, texture, composition and characteristic subject cues. Record mismatches by style. This was not run during the offline implementation; source-prompt confidence does not establish output fidelity.

## Scope and history

The original F1 browser-review task is covered by this revision. The current sample set and its generation evidence were already present before this work and were carried forward unchanged; no sample replacement task was performed here. The earlier F3 integration question is outside this request: the output remains a standalone prompt for any AI image tool. Earlier V1/V2 labels were internal prototypes; this working copy used v0.1, so the explicit requested bump is v0.2. Export data schema remains version 2.

## Later (not scheduled)

- Consider controlled visual hybrids only if the owner requests them.
