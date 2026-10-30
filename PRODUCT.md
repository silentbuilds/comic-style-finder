# Comic Style Finder

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Non-artists choosing a visual style for a comic. The guided choices require no script or art knowledge.

## Product Purpose

Select a style and produce a reusable Style block, with a full prompt as a convenience wrapper. The story is written in the AI image tool.

## Operating Context

An offline, local browser tool. Users choose a story type, reader feeling, reading format and optional approach; browse or filter 96 styles; then copy a prompt into their preferred AI image tool. Advanced visual edits update both copy outputs.

## Capabilities and Constraints

- Plain HTML, CSS and JavaScript; no runtime dependencies or external font loading.
- The standalone HTML embeds all 96 samples and works without a network connection.
- Preserve the canonical style IDs/names and compatible JSON export keys.
- Keep work inside this app unless a separately authorized task requires more.
- Prompt-to-thumbnail fidelity remains subject to the six-style owner check in `docs/TASKS.md`.

## Brand Commitments

The owner requests a warm editorial look and preservation of the current Georgia/Times serif display stack and Inter/system sans body stack. Fonts use locally available fallbacks; do not add remote fonts.

## Evidence on Hand

`README.md` records the current flow. `docs/DECISIONS.md` records product decisions. `art_manifest.json` records sample-generation provenance. Samples are illustrative interpretations rather than historical exemplars or controlled comparisons.

## Product Principles

- Help non-artists make concrete visual choices.
- Keep the style block reusable and the story outside the finder.
- Keep offline use independent of accounts, API keys and network access.
- Favor readable choices and clear hierarchy at desktop and phone widths.
