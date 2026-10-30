# Changelog

User-facing changes follow Keep a Changelog. Each public release uses Semantic Versioning.

## Unreleased

### Added

- Visitor guide with a sample gallery, illustrated walkthrough, copied prompt example, social preview and MIT license.
- Development guide preserving the technical documentation and media-reproduction instructions.

### Changed

- Organize tests in `tests/`, tooling in `scripts/` and artwork sources in `art/sources/`.
- Build the release HTML into ignored `build/` output; Vercel rebuilds the same standalone into `dist/index.html`. Application behavior, prompts, scoring and sample artwork are unchanged.

### Removed

- Generated versioned HTML from the repository root; the published release download remains available.

## [0.1.0] - 2026-10-30

### Added

- Offline style discovery with 96 illustrated styles, six initial recommendations, full-catalog browsing and search.
- A guided flow for story type, reader feeling and reading format, plus optional Mostly wordless or Visual explainer direction.
- Live filters for art treatment, color preference and intended audience, including a clear reset for empty matches.
- Five reading-format choices, carousel channels for Instagram, LinkedIn and RedNote, and generation-size/assembly guidance.
- A full prompt with Story, Style and optional Format sections, plus Copy style only for reusing the visual direction.
- Advanced palette, linework, texture and pacing editors that update both copy outputs; a separate format-consistency editor.
- Local saved choices and edits, keyboard navigation, focus feedback, clipboard fallback and reduced-motion support.
- Responsive desktop/phone layouts with 16px descriptions, readable helpers and locally available serif/sans fonts.

## Internal pre-release builds

Builds labelled V2.0–V2.2 and v0.2–v0.3 were never published.
They developed the selection-first flow, the 96-style catalog and illustrated previews.
Later iterations refined matching, format guidance, reusable prompts and Advanced editing.
Typography and responsive fixes were completed before this first public release, v0.1.0.
