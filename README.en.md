[한국어](README.md) | English | [日本語](README.ja.md) | [中文](README.zh.md)

# woozi-design-kit

> **[Type: design kit] — a catalog of 31 structural macrostructures + an AI-tell-free UI generation skill**

**Claude Code skill + design-skeleton catalog** — pick a structural macrostructure from 31
options with your eyes, then generate AI-tell-free UI with the `taste` skill.

[Quick Start](#quick-start) • [Let AI Do It](#-let-ai-do-it) • [Why This Tool](#why-this-tool) • [What's in Here](#whats-in-here) • [Strengths and Limits](#strengths-and-limits) • [Provenance](#provenance--where-did-this-come-from) • [Compatibility](#compatibility)

---

## Quick start

1. Copy `skills/taste/` into your project's `.claude/skills/`.
2. Double-click `gallery/index.html` to open it (no server needed).
3. Click a structural macrostructure card you like and copy its `/taste --macro=<id>` snippet.
4. Run `/taste "your description" --macro=<id>` in your project.

The full walkthrough and a worked landing-page example are in
[`docs/usage-guide.md`](docs/usage-guide.md).

---

## 🤖 Let AI Do It

If manual installation feels like a hassle, paste the prompt below into Claude Code or another AI
coding tool as-is. It will install the kit and walk you through how to use it.

```text
Install the repository at https://github.com/SpaceWJK/woozi-design-kit and tell me how to use it.

1. Clone the repo and read README.md to understand this tool's purpose and structure.
2. Verify with npm test that 7 tests pass, and open gallery/index.html in a browser to confirm
   all 31 cards render correctly.
3. Set up the skill/preset reference wiring for my environment (copy skills/taste/ into
   .claude/skills/, confirm the macrostructures reference path). Before applying anything, show
   me exactly what will be installed/changed and where, and get my approval first.
4. Once installed, summarize: usage per key feature, how to enable/disable it, and how to roll
   back if something goes wrong.
5. If any step fails, explain the raw error, the likely cause, and how to fix it.
```

---

## Why This Tool

- **Problem** — AI-generated UI all looks the same. Purple gradient cards, evenly-spaced 3-column
  grids, center-aligned heroes — swap the colors or fonts and the "AI made this" smell is still
  there. The cause isn't the surface (color/font); it's that there's no **structural grammar** at
  all. A generation skill that dials intensity up or down is useful, but if there's no vocabulary
  for "should this page be a bento grid or a stat-led layout," every generation converges on the
  same default layout.
- **Solution** — This repo bundles a catalog of 31 structural macrostructures (`macrostructures/`)
  with a generation skill that consumes them directly via a `--macro=<id>` argument
  (`skills/taste/`). The macrostructure decides "what shape the body is built in"; the dial system
  (VAR/MOT/DEN — variance/motion/density) decides "how strongly to dress it." The two axes are
  independent, so you can lock the structure and vary the tone, or the reverse.
- **Evidence** — All 31 macrostructures ship with an instantly viewable static demo
  (`macrostructures/demos/*.html`) and an SVG diagram (`macrostructures/thumbnails/`) —
  double-click `gallery/index.html` and browse the card grid with no server required.
  `scripts/lint-designkit.mjs` mechanically verifies id parity across the JSON, demos, diagrams,
  and gallery data (31/31/31/31) and zero external dependencies (`npm test`). The `taste` skill
  itself is a methodology that was shaped over months of real UI work — WCAG contrast gates,
  accessibility gates, and layout-robustness gates are all applied automatically at generation
  time. This catalog's design concepts have been validated in production on a live QA dashboard
  service.

---

## What's in here

| Component | Location | What it does |
|---|---|---|
| `taste` skill | `skills/taste/SKILL.md` | Premium frontend UI generation/audit/redesign. React/Next.js + Tailwind CSS only. Auto-infers a 3-axis dial (VAR/MOT/DEN), accepts `--macro` to pin a structural skeleton, applies WCAG/accessibility/layout-robustness gates, and self-scores against 4 criteria |
| 31 macrostructures | `macrostructures/` | `macrostructures.md` (description doc) + `macrostructures.json` (structured data) + `demos/*.html` (31 live demos) + `thumbnails/ms-*.svg` (31 diagrams) |
| Static gallery | `gallery/index.html` | Browse all 31 with search, tag filters, and sorting; clicking a card shows its description, when to avoid it, a live demo, and a copy-ready `/taste --macro=<id>` snippet. Zero dependencies — works the same opened directly via `file://` or deployed to GitHub Pages |
| Usage guide | `docs/usage-guide.md` | One-session walkthrough from install → pick a skeleton in the gallery → run the snippet → check the score, plus a worked example on a fictional landing page |
| Integrity lint | `scripts/lint-designkit.mjs` | Mechanically verifies id parity, zero external dependencies, and zero leftover internal-only artifacts (`npm test`), including a seeded-defect self-test |

---

## Strengths and Limits

### Good combinations

Each row distinguishes "field-tested" (there's real evidence this combination is actually used)
from "recommended (theoretical)" (no real-world case yet, but worth trying). This isn't a vague
list — it names where the evidence diverged from the original assumption, too.

| Pairing | Relationship | Status |
|---|---|---|
| Within woozi-design-kit (macrostructures → taste) | Pick the skeleton first, then generate with `--macro`. Pinning the structure removes one failure axis from the generate-and-score rework loop — rework reasons narrow from "structure is wrong" to "tone is wrong" | **Field-tested** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)'s `deep-review` | Re-reviews taste-generated UI in full context after it's done (a conditional 10th axis, UI-only). Unlike taste's own scoring (at generation time, single component), this catches tone drift across a page assembled from multiple taste calls | **Field-tested** |
| [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)'s `predeploy` | The responsive/accessibility/UX axes of its 10-axis pre-deploy audit apply to taste's output as an existing, no-new-wiring-required gate | **Field-tested** |
| [`woozi-claude-guards`](https://github.com/SpaceWJK/woozi-claude-guards)'s `regression-grep-guard` / `simplicity-check` | Applied globally via Edit/Write hooks — auto-warns when taste changes a component's props or a REDESIGN scope grows too large | **Field-tested** |
| [`woozi-brain`](https://github.com/SpaceWJK/woozi-brain) | Accumulates UI-preference feedback as experience and feeds it back into future generations (in principle). Requires a separate MCP server install, so "the principle is field-tested, the integration itself is on you" | **Field-tested (in principle)** |
| [`woozi-agent-qa`](https://github.com/SpaceWJK/woozi-agent-qa) | Use its exam framework to verify how well a frontend agent actually uses taste | **Recommended (theoretical)** — no confirmed real exam run against taste yet |

#### Review ownership by output type — correcting editorial-audit's place in this picture

What this repo is about (applying a concept/skeleton via structure + dial) covers every
React/Tailwind output `taste` produces — it does not mean "React apps are excluded from review."
The dividing line isn't the scope of concept/skeleton application; it's **which tool reviews the
finished output's visual quality**:

| Output type | Review owner |
|---|---|
| React/Tailwind UI (components/pages `taste` generates) | `taste`'s own audit mode (automatic AI-tell + Golden Rule detection) + [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)'s `deep-review` (a UI-only 10th axis, full-context re-review after the fact) |
| Document-style HTML (slide decks, reports, guides) | [`woozi-claude-skills`](https://github.com/SpaceWJK/woozi-claude-skills)'s `editorial-audit` — its own skill file states the boundary explicitly: "React app component generation/audit is taste's job; this skill is document-style HTML only" |

In other words, editorial-audit isn't "excluded" — reviewing taste's own output (React apps) was
simply never its job to begin with. Re-reviewing a React component against document-HTML review
criteria, or running editorial-audit on a slide deck through taste, both take the tool outside its
intended scope — just follow the row that matches your output type.

### Limitations (stated honestly)

- **No color/mood preset system is included.** `macrostructures.md`'s examples were generalized
  ("theme: dark minimal") so the document stands on its own without this repo's absent preset
  system, but the actual color-token/mood-preset catalog lives in a separate environment with
  unclear licensing and was not bundled. `taste` works completely fine without it, falling back to
  prompt-keyword-based dial inference.
- **[StyleSeed](https://github.com/bitjaru/styleseed) integration is optional.** It's a separate
  MIT open-source design engine — if present, `taste` references its Golden Rules; if absent, it
  logs one warning and falls back to its own base AI-tell rules. It is not vendored here (we don't
  have redistribution rights to it). See PHASE 0 in `skills/taste/SKILL.md`.
- **The static gallery only ships the structural-skeleton tab.** The original environment's
  gallery also had a color/mood preset grid and a dial-studio tab, but both are entangled with
  assets of unclear license, so they were deliberately excluded from this release — this gallery
  is scoped to showing the skeletons as-is.
- **Agent names are illustrative.** References to a sub-agent like `web-frontend` inside `taste`
  point at a custom agent from the environment this skill was extracted from — this repo does not
  include that agent's definition. Substitute Claude Code's default agent, or design your own.

---

## Testing

```bash
npm test
# or directly:
node scripts/lint-designkit.mjs
```

`scripts/lint-designkit.mjs` uses zero external dependencies (Node built-ins only) to:

1. Verify that `macrostructures.json` ↔ `macrostructures/demos/*.html` ↔
   `macrostructures/thumbnails/ms-*.svg` ↔ `gallery/gallery-data.js` share an identical id set
   (all 31)
2. Verify that demos, diagrams, and gallery files reference no external URL (the SVG `xmlns`
   namespace declaration is whitelisted)
3. Verify that no leftover "forgot to finish redacting" marker remains anywhere in the
   published tree. Two layers: (a) 3 built-in, org-agnostic markers (see
   `BUILTIN_FORBIDDEN_PATTERNS` in the script for the exact strings) — this public repo itself
   contains no organization-specific name or ticket scheme; (b) an optional `lint.tokens.json`
   at the repo root (gitignored) is auto-loaded if present — this is where a fork registers its
   own project codename, internal ticket-ID scheme, internal usernames, etc.; see
   `lint.tokens.example.json` for the format
4. **Self-test** — seed 6 kinds of defects (id mismatch, missed external URL, xmlns false
   positive, leaked built-in marker, CRLF evasion, org-specific extension pattern compile/match,
   malformed-regex safety) into in-memory fixtures and assert the checks above actually catch
   every one. Also verifies detection survives a CRLF checkout (Windows `core.autocrlf=true`;
   see `.gitattributes`)

---

## Compatibility

| Item | Requirement |
|---|---|
| Node.js | 14.18+ (built-in modules only, no `npm install` needed — only required to run the lint) |
| Gallery (`gallery/`) | Pure HTML/CSS/JS, no build tooling. Any browser can open it directly via `file://` |
| Claude Code | Standard skill frontmatter (`name`/`description`) — no version constraint |
| Target stack (taste's output) | React / Next.js + Tailwind CSS (auto-detects v3/v4) |
| OS | Scripts, demos, and gallery are all cross-platform (no hardcoded path separators); lint passes under both CRLF and LF |

---

## Provenance — where did this come from?

| Component | Bucket | Original | License | What we changed |
|---|---|---|---|---|
| `taste` (UI generation skill) | ② forked-hardened | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | Added auto-inferred 3-axis dial (VAR/MOT/DEN), integrated structural macrostructures via `--macro`, added a variants mode with auto-scoring, and added several new quality gates (WCAG, accessibility, layout robustness) — details: [`skills/taste/ATTRIBUTION.md`](skills/taste/ATTRIBUTION.md) |
| `macrostructures` (31 structural skeletons) | ② forked-hardened | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | Rewrote the original 21 in Korean, added 10 self-designed skeletons (31 total), newly produced 31 SVG diagrams and 31 demo HTML files, and built the orthogonal integration framework with `taste` — details: [`macrostructures/ATTRIBUTION.md`](macrostructures/ATTRIBUTION.md) |

Both components keep the original MIT notice in their respective `ATTRIBUTION.md`. One of the
demos in the "practical app" family (`data-table-workspace.html`) was rewritten with entirely
fictional mock data — it originally contained real-world-shaped mock data discovered while
preparing this repo. The layout grammar itself is unchanged from the original.

---

## Standard files

- `LICENSE` — MIT
- `skills/taste/ATTRIBUTION.md`, `macrostructures/ATTRIBUTION.md` — two upstream license notices
- `CONTRIBUTING.md` — pre-PR checklist, procedure for adding a new skeleton
- `.gitattributes` — forces `eol=lf` (defends against Windows `core.autocrlf=true`)
- `.gitignore` — includes `lint.tokens.json` (the org-specific lint extension file)
- `lint.tokens.example.json` — the expected format for `lint.tokens.json`; copy it and register
  your own organization name/ticket scheme there, this example file itself stays committed
- `package.json` — `npm test` runs the lint script
- `docs/GLOSSARY.md` — definitions for terms used throughout this repo (macrostructure, the
  3-axis dial, provenance buckets, etc.)
- `docs/usage-guide.md` — walkthrough from install to a worked example

---

## License

MIT — see [`LICENSE`](LICENSE) for details.

<div align="center">

**A design kit that's honestly modified, structure-first, tone-second**

</div>
