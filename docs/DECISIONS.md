# Decisions

## 30 October 2026 — Public presentation and repository layout

- Keep the visitor README under 120 lines; preserve its former technical sections in `docs/DEVELOPMENT.md`.
- Reuse accepted previews for README composites; capture actual app states at 1280×800. Do not modify app behavior, prompts, scoring or artwork.
- Keep tests in `tests/`, tooling in `scripts/`, and masters/legacy source art in `art/sources/`. Build standalone downloads into ignored `build/`; publish only `dist/index.html`.
- Add MIT licensing with holder silentbuilds and a sample-image attribution note. Keep v0.1.0 and its release tag unchanged; describe this work under Unreleased.

## 30 October 2026 — First public release v0.1.0

- Adopt the exact studio SemVer policy in root AGENTS.md. This app's first public release is 0.1.0; V2.0–V2.2 and v0.2–v0.3 were unpublished internal labels. Only explicit prepare-release tasks change product versions. Record future work under Unreleased in CHANGELOG.md.
- Set the current document title and badge to v0.1.0, describe it as an early release, and build comic-style-finder-v0.1.0.html. Update active release tests/docs while preserving old standalone snapshots, historical records and obsolete untracked handoff files as history.
- JSON export `version: 2` and the existing localStorage key are compatibility identifiers, not product-version constants. Preserve them and saved choices.
- The owner explicitly approved committing the current artwork and verification inputs after discovering that tracked previews differed from the manifest. Include previews, raster masters, sidecars, legacy SVG references, contact sheet and existing preparation scripts so the release rebuilds from a clean checkout. Generate no new art.
- Pin canonical style names in an app-local fixture; compare with the studio archive when available. App-only GitHub publication must not require or publish unrelated studio apps.
- Existing local tags before this release: none. Create comic-style-finder/v0.1.0 after verification, without deleting or renaming tags.
- Published source: silentbuilds/comic-style-finder, with fresh app-only history from the studio release. Public source commit bf30fb8 and studio release commit 53092be carry the same scoped tag and byte-identical standalone; SOURCE.md records the export boundary. Publish only dist/index.html on Vercel.
- Public URL: https://ai.rockyfu.com/comic-style-finder. The separate silentbuilds/frontier-models routing commit 3dff877 adds the rewrite pair, registry entry, sitemap entry and portfolio link. Preserve its existing root, models, SEA Compass and AI Developer GTM routes. Record this offline tool as analytics not enabled; existing sites retain their configured analytics.

## 30 October 2026 — Approved typography refinement

- **Reason:** non-artists need readable descriptions and guidance while the first answer row remains visible on desktop and phone.
- Preserve the warm editorial appearance and existing Georgia/Times serif and Inter/system-sans families. Use installed fallbacks only; add no external font loading or dependencies.
- Define purpose-based rem tokens: caption 14px, body 16px, title 24px, section 32px, step 48px with 40px tablet/32px phone variants. Descriptions and prompt prose use the body role at every breakpoint; remove one-off font sizes and conflicting title overrides.
- Use 14px helpers and the established muted color. The Advanced summary helper now has 5.35:1 contrast on the cream surface, replacing 11px text at 4.43:1. Reduce footer tracking for sentence-length text.
- Reduce intro spacing, balance headings and stack mobile progress labels below their numbers so larger readable text fits. Keep the first answer row visible at 1280×800 and 390×844; narrower/shorter viewports may scroll.
- Style `.reason-block` directly because the rendered card uses a span. Put the mobile catalog's two-column layout on `.style-card-open`, the wrapper that actually contains the image and text; the old article-level grid confined both to one narrow track.
- Record confirmed context in app-local `PRODUCT.md`, the installed Impeccable teach/init format. No legacy `.impeccable.md` or speculative workflow settings are added. Keep v0.3 and rebuild its existing standalone.

Current decisions are the dated 29 October entries below. The latest A–D follow-up supersedes earlier story-entry, format-size and refinement-placement decisions. The original Product/Engineering/Studio sections record the 17 October baseline and are superseded where the requested revision removes a feature.

Agreed with the owner. Don't reopen them without the owner. Moved here from `CODEX_HANDOFF.md` on 17 Oct 2026.

## Product

- **A style-selection product, not a comic generator.** Image generation is out of scope for this app.
- **Selection first.** Step 1 asks the story **type** (11 cards); typing a premise is optional and secondary.
- **Three questions, then results:**
  1. Story type.
  2. Reader feeling (or Surprise me).
  3. Publishing format (or Not sure yet), with optional refinements: art treatment, color preference, audience.
  4. Results: six explained recommendations, plus browse, shortlist 2–4, compare, choose.
- **Browse all 96 is always available**, without going through the wizard.
- **No tall sticky sidebar,** and no style gallery competing with Step 1.
- **Why (owner feedback on V1):** the free-text story field felt ineffective because offline keyword matching was weak, and the sticky sidebar blocked natural scrolling.
- **Default output is a short, copy-ready Style Prompt** (V2.1). Editing controls, the full creative brief and the JSON Style Recipe sit under a collapsed "Advanced: Creative Direction" section.

## Engineering

- **96 canonical IDs and names are fixed.** They match the original catalog exactly, in the same order (checked 17 Oct 2026); `fixtures/canonical-style-names.json` now pins that catalog locally.
- **The catalog mixes** visual aesthetics, techniques, cultural influences, genres and publishing formats. Don't present it as 96 mutually exclusive rendering styles.
- **Matching stays transparent.** `GENRES`, `MOODS`, `FORMATS`, `FINISHES` and `FAMILIES` are editorial mappings. Show reasons; don't show made-up probabilities, and don't present keyword cues as AI analysis.
- **Comparison images show different scenes.** Don't claim controlled same-scene comparisons.
- **JSON export compatibility:** keep `styleRecipe`, `creativeDirectionPrompt` and `stylePrompt`.
- **Offline and local:** no server, account or model. Choices persist in localStorage where the browser allows, and the app still works when it doesn't.

## Studio

- **Repository boundary.** This public repository owns the 96-style catalog. Historically it moved into the originating studio on 17 Oct 2026; the studio rule was to move shared data into a shared directory only when story-to-comics or another app needed it. That integration remains outside this repository.

## 29 October 2026 — P1

- Replace shared inferred descriptors with explicit subject-free sample-prompt metadata. Generation prompts are the best available evidence; confidence labels describe provenance, not a promise of image fidelity.
- Remove generic signatures and family-derived recipe defaults because they created misleading identical recipes.
- Keep all 96 IDs/names and all current samples unchanged.

## 29 October 2026 — P2

- Both copy outputs use “and” in authored instructions; the feeling article follows its first letter. Preserve user story text verbatim after trimming.
- Remove the paste-time “Add your story” guidance: copy includes Story or the exact editable placeholder.
- Remove the generic artist-copying caveat from consistency notes: no catalog entry names an artist or studio. Keep one recognizable-character instruction per default prompt.

## 29 October 2026 — P3

- Remove wordless/explainer from format choices: layout and storytelling approach are independent. One optional approach is selected; selecting it again clears it. Legacy saved formats migrate to approach with format “Not sure yet”.
- Every explicit layout has concrete prompt specs and a curated +9 affinity; approaches add +8. Keep the existing maximum of two styles per family. An increased score need not change the six recommendations. Do not fabricate ranking changes where the six are already favored.
- Requested format specs override sample-specific panel arrangements. “Not sure yet” adds no layout specifications.

## 29 October 2026 — P4

- Remove “For kids” as a story type because it describes audience. Legacy choices set audience to Kids and clear genre; users in steps 2/3 return to step 1 to pick a story type. Existing chosen styles and story text survive.
- Merge “Everyday life” and “Personal stories” into “Everyday & personal”, retaining the stable slice state key and union of style affinities. Legacy memoir values migrate to slice.

## 29 October 2026 — P5

- Replace repeated story/feeling match labels on cards with each style’s specific bestFor. Keep numeric scoring transparent in code.
- Replace family-generic trade-offs with explicit avoidIf notes for every style; remove the obsolete fallback tables.
- Remove Strong start rather than adding another explanation. Remove style numbers from rendered labels while retaining IDs and ID search for data compatibility.

## 29 October 2026 — P6 and final review

- Remove the intermediate style modal: a card opens the single details view directly, with the sample before the prompt and one primary copy action.
- Remove Shortlist, comparison dock, comparison modal and their local state because the result grid already supports visual comparison. Preserve the legacy export key as an empty array for compatibility.
- Hide JSON download behind the code-level flag `ENABLE_RECIPE_DOWNLOAD=false` to keep developer output out of the default user flow; retain the download function and export schema/keys. Advanced remains collapsed with editable fields and Copy Full Creative Direction.
- Add a separate `detailsOpen` view marker so returning to results, browsing or editing the story preserves the selected style and its edits. A new style or explicit reset clears the edits. Legacy selected-state records open their existing details view.
- Generalize incidental sample locations/actions, such as planting, sneezing and germination stages, so the user’s Story line controls the scene. Keep genre-defining traits such as giant robots and technical diagrams.
- Explicitly state that edited visual fields override the signature, the requested layout overrides the sample arrangement, and the selected approach overrides sample text/labeling conventions. This allows the independent choices to compose without ambiguous instructions.
- Follow the working copy’s unpublished v0.1 filename convention and the owner’s explicit bump request: v0.2. The JSON schema stays version 2. The older untracked v0.1 bundle is left untouched; v0.2 is the current rebuilt output.
- Keep the incumbent visual design. Mechanical design checks reported existing small type/tracking and palette/font warnings; no visual redesign or dependency installation is part of this request.
- Restore only the three requested locally deleted documentation files from HEAD. Retain existing working-copy edits in app files that this revision changes. Do not stage existing image changes, reference masters, unrelated app changes or deleted agent guides. Track the existing generation manifest as the source evidence for the new metadata.

## 29 October 2026 — Story-free style selection

- **Reason:** the finder selects a style; the story is written in the AI tool.
- Remove the entire “Have a story idea?” section: story text box, recognized-topic chips and explanatory text, and example chips. Remove both example datasets, keyword rules and scoring, story-text state, input handlers, storage and optional story export field.
- Discard obsolete story-text fields when loading saved choices and immediately persist the sanitized state. Preserve selected styles, guided choices and visual edits. Storage remains optional if the browser blocks it.
- Both Style Prompt and Full Creative Direction begin with exactly `Story: [Who is it about, where are they, and what happens? 1–3 sentences]`, then a newline and style instructions. Neither output uses saved story text.
- Below Copy Style Prompt, show exactly “Replace the bracketed line with your story before you paste.”
- Keep the product at v0.2 and rebuild its existing standalone file. No changes to the 96 style names, sample images, layout/approach scoring or JSON schema version.

## 29 October 2026 — Follow-up A: retain story-free selection

The finder selects a style; the story is written in the AI tool. Section A of the follow-up is already implemented by 07483fd. Retain the exact shared first-line placeholder and copy guidance. Add explicit source-path and obsolete-input-event tests so story-text state, storage, keyword scoring and examples cannot return silently.

## 29 October 2026 — Follow-up B: generation targets and channels

- Use the owner-supplied ChatGPT preset targets for generation: Portrait 3:4 for carousels/pages, Portrait 3:4 or Story 9:16 for webcomic panels, and Widescreen 16:9 for strips. Not sure yet adds no size or format instructions. These are app generation targets supplied in the brief; no online verification was performed in this offline task.
- Prompt text gives composition guidance; users must set image size in the tool. Details explicitly say to use the image size option instead of relying on Auto.
- Social carousel reveals a native single-choice channel group: Instagram by default, LinkedIn or RedNote. All three generate 6–8 separate 3:4 slides with centered 4:5 safe composition. Channels change post-production guidance, not ranking.
- LinkedIn slides are cropped to 4:5 (1080×1350) after generation and combined into one PDF. Instagram and RedNote slides post as generated. Keep the same character description on every slide.
- Webcomic images are generated per panel and stacked with white gaps. Pages/strips hold all panels in one image, with separate generation/assembly suggested if consistency fails. The page and strip choices say “Works best with simple scenes”. The carousel icon is a stack of portrait cards.
- Both copy outputs retain the exact first-line Story placeholder and include the revised format specs. Size selection and post-production instructions sit around the primary copy action.

## 29 October 2026 — Follow-up C: optional storytelling approach

Retain one optional choice: Mostly wordless or Visual explainer. Choosing the other switches it; choosing the active choice clears it. Both prompts add the matching instruction. The existing +8 affinity for nine diagram-friendly styles already makes Visual explainer affect scores and can change the ordered recommendations, so no artificial extra scoring is added. New tests pin the actual click transitions, all nine bonuses, an unaffected non-diagram style and a changed sci-fi ranking.

## 29 October 2026 — Follow-up D: live results filters and v0.3

- Move Art treatment, Color preference and Intended audience from the step-3 disclosure to visible live filters above recommendations. Remove the disclosure and its Optional → label; step 3 asks only format/channel and optional approach.
- Defaults remain neutral (Any visual finish, No preference, Everyone). Active choices constrain eligible catalog styles and immediately update recommendations and the browsable catalog. Keep established ranking and the two-per-family diversity cap within the eligible set; fewer than six cards can remain. A conflicting filter combination shows a clear empty state and reset action.
- Preserve keyboard focus when filters repaint the grid. Clearing an empty result focuses a surviving filter. Catalog empty guidance names family and style filters as possible causes as well as search terms.
- Preserve existing saved refinements as the corresponding results filters. Preserve channel choice across navigation/reload, defaulting old records to Instagram. Product version becomes v0.3 under the current filename convention; JSON schema stays version 2.
- All work remains offline and local. Image-size/tool behavior copy follows the owner-supplied brief; no new external research, dependencies, sample generation or story-to-comics integration is included.

## 29 October 2026 — Reusable Style block and convenience wrapper

- **Reason:** the style block is the reusable unit; the full prompt is a convenience wrapper around it.
- Build the full Style Prompt from labeled Story, Style and Format sections separated by blank lines. Preserve the exact Story placeholder. Omit the entire Format section for Not sure yet.
- Style contains style name, signature, palette, linework, texture, pacing, reader feeling and any approach instruction. Retain pacing and feeling as part of the reusable visual direction; they do not depend on a chosen format/channel.
- Format contains size, slide/panel count, layout and the character-consistency rule. Requested layout still takes precedence over the sample arrangement.
- Replace Copy Full Creative Direction with “Copy style only”, which copies exactly the shared Style section, including its label, with no Story or Format wrapper. Keep Advanced collapsed and retain its four visual editors; their edits affect both copies through the same formatter.
- Preserve the existing separate format-consistency editor only when an explicit format is selected. Label it “Format consistency rule (full prompt only)” because it belongs to Format rather than the reusable style. Its saved notes remain compatible.
- Keep the hidden JSON schema at version 2 and retain existing top-level keys. `creativeDirectionPrompt` remains a full-wrapper compatibility key; add `styleOnlyPrompt` for the reusable block. Keep product version v0.3 and rebuild the same standalone.
