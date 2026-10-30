# Comic Style Finder v0.1.0 · Comic Story Studio

An offline, selection-first finder for a standalone comic prompt you can paste into any AI image tool. It does not generate images or connect to story-to-comics.

## Open it

[Open the live finder](https://ai.rockyfu.com/comic-style-finder) · [GitHub repository](https://github.com/silentbuilds/comic-style-finder) · [v0.1.0 downloads](https://github.com/silentbuilds/comic-style-finder/releases/tag/comic-style-finder/v0.1.0)

Open `comic-style-finder-v0.1.0.html` in a browser. It contains the CSS, JavaScript and all 96 current sample images. No network, account, API key or dependency installation is needed.

For editable source, open `index.html` or serve this folder locally with `python3 -m http.server 8000`.

For Vercel, use this app as the project root. `vercel.json` publishes only the verified standalone as `dist/index.html`; it does not publish source masters, tests or internal builds. The shared-site address is `https://ai.rockyfu.com/comic-style-finder`. Its rewrite, registry and sitemap entry live in `silentbuilds/frontier-models`, which owns the domain. The app-only source repository starts with the first public release; its standalone is byte-identical to the studio release artifact. The existing root page and project routes are preserved.

## Flow

1. Choose one of nine story types. Everyday and personal stories share one choice; Kids is an intended audience in the results filters. Story text is written in the AI tool.
2. Choose a reader feeling, or Surprise me.
3. Choose Not sure yet, Social carousel, Vertical webcomic, Classic comic page or Short comic strip. Social carousel shows a channel choice: Instagram (default), LinkedIn or RedNote. Optionally select Mostly wordless or Visual explainer; click the active approach again to clear it.
4. Filter suggestions live by art treatment, color preference and intended audience above the grid, or browse/search all 96 styles. Neutral defaults show six suggestions. Active filters may show fewer matches; incompatible combinations show an empty state with Clear filters. Open a card directly to see its sample, Style Prompt and primary Copy Style Prompt button. Advanced starts collapsed and contains the visual fields and Copy style only.

The full Style Prompt has labeled sections: `Story: [Who is it about, where are they, and what happens? 1–3 sentences]`, `Style:` and, for an explicit format, `Format:`. `Style:` contains the name, signature, palette, linework, texture, pacing, reader feeling and approach; `Format:` holds image size, slide/panel count, layout and character consistency. Not sure yet omits Format. Below Copy Style Prompt, the finder says: “Replace the bracketed line with your story before you paste.” The finder selects a style; the story is written in the AI tool. The style block is the reusable unit; the full prompt is a convenience wrapper around it. Copy style only copies exactly the `Style:` section. The four visual editors update both outputs; the separately labeled format consistency note affects only the full prompt and appears only when a format is selected. The requested layout takes precedence over the sample's panel arrangement. Details show the tool size to select before generating and the assembly steps afterward.

## Evidence and matching

All 96 canonical names and IDs match `archive/web-app/src/lib/styles.ts`. The catalog mixes techniques, traditions, genres and layouts. Samples are AI-generated illustrative interpretations, not historical exemplars or controlled comparisons.

Every signature and visual recipe derives from the exact saved sample-generation prompt in `art_manifest.json`, with `signatureConfidence: "high"` and a source reference. This confidence describes provenance; reproducing a thumbnail in another tool is still an unverified manual check. Subject-specific character/scene details were excluded from signatures. `fixtures/canonical-style-names.json` pins the 96 names for app-only checkouts; the tests also compare it with the studio archive when that archive is present.

Matching uses curated offline affinities: story type, feeling, format (+9) and approach (+8). Live results filters constrain eligible styles using the catalog’s art treatment, color and audience mappings, including when browsing the full catalog. It does not accept or analyze story text or assign probabilities. At most two recommendations come from the same visual family. Increased scores can leave the six recommendations unchanged; `docs/MATCHING-AUDIT.md` lists every such case in the default-refinement matrix. `docs/PROMPT-AUDIT.md` lists every original descriptor collision and its resolution.

## Generation workflow

The format targets use the presets supplied in the owner’s brief. Set the actual size in your image tool; the prompt supplies composition guidance.

| Format | Generation target | After generating |
| --- | --- | --- |
| Not sure yet | No size or format instruction | No format-specific guidance |
| Social carousel | 6–8 separate 3:4 portrait slides; important content inside centered 4:5 area | Instagram/RedNote: post as is. LinkedIn: crop to 4:5 (1080×1350), then combine into a PDF. Reuse the same character description on every slide. |
| Vertical webcomic | One 3:4 portrait image per panel, or 9:16 for a tall dramatic panel | Stack panels top to bottom with white gaps |
| Classic comic page | One 3:4 portrait image, 4–6 grid panels with white gutters | Assemble separate panels if a single generated page is inconsistent |
| Short comic strip | One 16:9 widescreen image, 3–4 equal left-to-right panels | Assemble separate panels if a single generated strip is inconsistent |

The page and strip cards recommend simple scenes. Carousel channels change post-production instructions, not the recommendation score.

## Local state and compatibility

Choices and recipe edits persist in localStorage where permitted. Legacy memoir choices become Everyday & personal, kids choices become the Kids audience, and wordless/explainer formats become independent approaches. Obsolete shortlists and story-text fields are discarded; sanitized choices are saved on load so legacy story text is removed from local storage.

JSON download is hidden behind `ENABLE_RECIPE_DOWNLOAD=false` in `app.js`. Its implementation remains available if the flag is enabled. The export schema remains `version: 2` and retains `styleRecipe`, `stylePrompt`, `creativeDirectionPrompt` and an empty `comparisonShortlist`, and adds `styleOnlyPrompt`; guided choices include `approach` and `carouselChannel`. The compatibility key `creativeDirectionPrompt` contains the full wrapper. The product version is independent of that schema. v0.1.0 is the first public release. Earlier V2.0–V2.2 and v0.2–v0.3 labels were internal, unpublished builds; older standalone files remain historical outputs. Open the v0.1.0 file for the current flow. Public changes are recorded in CHANGELOG.md.

## Checks and build

From this folder:

```sh
node --check app.js
node test_logic.js
node test_regressions.js
node test_prompt_revision.js
node test_matching_matrix.js
node test_format_filters.js
python3 build_standalone.py
```

`test_matching_matrix.js --write` deliberately regenerates the committed sensitivity report after scoring changes. `test_browser.js` runs with the already available `playwright-cli run-code --filename=test_browser.js` in a disposable browser at the local app URL; it resets only that session's finder storage. It covers desktop/mobile flow, channel selection, live filters/empty reset, keyboard focus, size/crop guidance, clipboard/fallback, edits, reload and migrations. The format/filter suite covers all 45 format × channel × approach combinations and diagram scoring.

`verify_release.py` and `test_release.py` use the existing Pillow-enabled Python runtime to verify artwork provenance, all 96 embedded image bytes, standalone source parity and stale-build detection. No runtime library is shipped with the app. Run `build_standalone.py` after changing HTML, CSS or JavaScript.

Typography uses shared roles: 14px helpers, 16px body/descriptions, 24px card titles, 32px section headings, and 48px step headings (40px tablet, 32px phone), expressed in rem. The current serif and system-sans stacks remain local with no font downloads. `PRODUCT.md` records the confirmed design context. Run `test_typography.js` through the same disposable `playwright-cli run-code --filename=test_typography.js` workflow to check computed sizes, helper contrast, first-row visibility and catalog width at 1280×800, 390×844 and 320×800, plus overflow at 640×400.

The sample-generation scripts, accepted raster masters, legacy SVG references, sidecars and `contact-96.jpg` were present before this revision. None were regenerated or altered. Follow the six-style owner check in `docs/TASKS.md` before judging prompt-to-thumbnail fidelity.
