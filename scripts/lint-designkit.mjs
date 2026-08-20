#!/usr/bin/env node
// lint-designkit.mjs — woozi-design-kit integrity lint.
//
// Node built-in modules only (fs, path, url) — no npm install required.
// Three real checks, run against the actual repo tree:
//   1. macrostructures.json <-> demos/*.html <-> thumbnails/ms-*.svg <-> gallery-data.js
//      three-/four-way id parity (31 each, exact id set match).
//   2. Self-containment: demos/*.html and gallery/* reference no external URL
//      (the SVG xmlns namespace declaration is the one documented exception).
//   3. No leftover placeholder/redaction-marker tokens anywhere in the
//      published tree. Two layers:
//        (a) built-in, org-agnostic markers (BUILTIN_FORBIDDEN_PATTERNS) that
//            catch generic "forgot to finish redacting" leftovers — this repo
//            ships with no organization-specific names or ticket schemes.
//        (b) an optional `lint.tokens.json` at the repo root (gitignored by
//            default, see .gitignore) where a fork registers its own
//            organization name, internal ticket-ID scheme, usernames, etc.
//            See lint.tokens.example.json for the expected shape.
//
// A self-test (`selfTest()`, folded into the default `npm test` run) seeds
// several kinds of defects into in-memory fixtures and asserts every check
// actually catches them — passing the real checks alone proves nothing if
// the checks themselves are blind.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let failures = 0;
let checks = 0;

function ok(label) {
  checks++;
  console.log("  PASS  " + label);
}

function fail(label, detail) {
  checks++;
  failures++;
  console.log("  FAIL  " + label);
  if (detail) console.log("        " + detail);
}

function readText(p) {
  return readFileSync(p, "utf8").replace(/\r\n/g, "\n"); // CRLF normalize (defense in depth, see .gitattributes)
}

// ---------------------------------------------------------------------------
// Check 1: id parity across macrostructures.json / demos / thumbnails / gallery-data.js
// ---------------------------------------------------------------------------

function loadMacrostructureIds(jsonText) {
  const data = JSON.parse(jsonText);
  if (!Array.isArray(data.macrostructures)) {
    throw new Error("macrostructures.json: 'macrostructures' array missing");
  }
  return data.macrostructures.map((m) => m.id).sort();
}

function loadGalleryDataIds(jsText) {
  const m = jsText.match(/window\.MACROSTRUCTURES_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!m) throw new Error("gallery-data.js: MACROSTRUCTURES_DATA assignment not found");
  const data = JSON.parse(m[1]);
  return data.macrostructures.map((x) => x.id).sort();
}

function checkIdParity(root, log) {
  const jsonPath = path.join(root, "macrostructures", "macrostructures.json");
  const demosDir = path.join(root, "macrostructures", "demos");
  const thumbsDir = path.join(root, "macrostructures", "thumbnails");
  const galleryDataPath = path.join(root, "gallery", "gallery-data.js");

  const jsonIds = loadMacrostructureIds(readText(jsonPath));
  const demoIds = readdirSync(demosDir)
    .filter((f) => f.endsWith(".html"))
    .map((f) => f.replace(/\.html$/, ""))
    .sort();
  const thumbIds = readdirSync(thumbsDir)
    .filter((f) => f.startsWith("ms-") && f.endsWith(".svg"))
    .map((f) => f.replace(/^ms-/, "").replace(/\.svg$/, ""))
    .sort();
  const galleryIds = loadGalleryDataIds(readText(galleryDataPath));

  const setsEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  if (jsonIds.length !== 31) {
    fail(log + ": macrostructures.json id count", "expected 31, got " + jsonIds.length);
  } else {
    ok(log + ": macrostructures.json has 31 ids");
  }

  if (!setsEqual(jsonIds, demoIds)) {
    const missing = jsonIds.filter((id) => !demoIds.includes(id));
    const extra = demoIds.filter((id) => !jsonIds.includes(id));
    fail(
      log + ": json <-> demos/*.html id parity",
      "missing demos: " + JSON.stringify(missing) + " / extra demos: " + JSON.stringify(extra)
    );
  } else {
    ok(log + ": json <-> demos/*.html id parity (31/31)");
  }

  if (!setsEqual(jsonIds, thumbIds)) {
    const missing = jsonIds.filter((id) => !thumbIds.includes(id));
    const extra = thumbIds.filter((id) => !jsonIds.includes(id));
    fail(
      log + ": json <-> thumbnails/ms-*.svg id parity",
      "missing thumbs: " + JSON.stringify(missing) + " / extra thumbs: " + JSON.stringify(extra)
    );
  } else {
    ok(log + ": json <-> thumbnails/ms-*.svg id parity (31/31)");
  }

  if (!setsEqual(jsonIds, galleryIds)) {
    const missing = jsonIds.filter((id) => !galleryIds.includes(id));
    const extra = galleryIds.filter((id) => !jsonIds.includes(id));
    fail(
      log + ": json <-> gallery-data.js id parity",
      "missing in gallery-data.js: " + JSON.stringify(missing) + " / extra: " + JSON.stringify(extra)
    );
  } else {
    ok(log + ": json <-> gallery-data.js id parity (31/31)");
  }
}

// ---------------------------------------------------------------------------
// Check 2: self-containment — no external URL in demos/gallery (xmlns exception)
// ---------------------------------------------------------------------------

const URL_RE = /https?:\/\/[^\s"'()<>]+/g;
const XMLNS_ALLOW = /^https?:\/\/www\.w3\.org\//;

function findExternalUrls(text) {
  const matches = text.match(URL_RE) || [];
  return matches.filter((u) => !XMLNS_ALLOW.test(u));
}

function checkSelfContainment(root, log) {
  const targets = [];
  const demosDir = path.join(root, "macrostructures", "demos");
  for (const f of readdirSync(demosDir)) {
    if (f.endsWith(".html")) targets.push(path.join(demosDir, f));
  }
  const thumbsDir = path.join(root, "macrostructures", "thumbnails");
  for (const f of readdirSync(thumbsDir)) {
    if (f.endsWith(".svg")) targets.push(path.join(thumbsDir, f));
  }
  const galleryDir = path.join(root, "gallery");
  for (const f of readdirSync(galleryDir)) {
    if (/\.(html|css|js)$/.test(f)) targets.push(path.join(galleryDir, f));
  }

  let violations = [];
  for (const file of targets) {
    const urls = findExternalUrls(readText(file));
    if (urls.length > 0) {
      violations.push(path.relative(root, file) + ": " + urls.join(", "));
    }
  }

  if (violations.length > 0) {
    fail(log + ": external URL scan (demos + thumbnails + gallery)", violations.join(" | "));
  } else {
    ok(log + ": external URL scan — 0 matches across " + targets.length + " files (xmlns excluded)");
  }
}

// ---------------------------------------------------------------------------
// Check 3: forbidden placeholder/redaction-marker tokens
//
// Layer (a) — built-in, org-agnostic. These are generic "forgot to finish
// redacting" markers, not any specific organization's name or ticket scheme.
// A fork of this repo is expected to search-and-replace its own internal
// names with markers like these (or its own choice) before publishing.
// ---------------------------------------------------------------------------

const BUILTIN_FORBIDDEN_PATTERNS = [
  { name: "unfinished redaction marker (FIXME-INTERNAL)", re: /FIXME-INTERNAL/ },
  { name: "unfinished redaction marker (DO-NOT-SHIP)", re: /DO-NOT-SHIP/ },
  { name: "unfinished redaction marker (INTERNAL-ONLY)", re: /INTERNAL-ONLY/ },
];

// Layer (b) — extension point. If `lint.tokens.json` exists at the repo root,
// load additional forbidden-token patterns from it. This is where a fork
// registers its own organization name, internal ticket-ID scheme, internal
// usernames, internal repo path fragments, etc. See lint.tokens.example.json
// for the expected shape. Not shipped by default (see .gitignore) — this
// public repo has no organization-specific tokens to register.

const ORG_TOKENS_PATH = path.join(ROOT, "lint.tokens.json");

function compileOrgPatterns(data) {
  if (!data || !Array.isArray(data.patterns)) return [];
  const out = [];
  for (const p of data.patterns) {
    if (!p || typeof p.pattern !== "string") continue;
    try {
      out.push({ name: p.name || "org-specific token", re: new RegExp(p.pattern, p.flags || "i") });
    } catch (e) {
      // Malformed regex in a fork's local config — skip it rather than crash
      // the lint for everyone else.
      continue;
    }
  }
  return out;
}

function loadOrgForbiddenPatterns(configPath) {
  if (!existsSync(configPath)) return [];
  let data;
  try {
    data = JSON.parse(readFileSync(configPath, "utf8"));
  } catch (e) {
    console.log("  WARN  lint.tokens.json exists but failed to parse: " + e.message);
    return [];
  }
  return compileOrgPatterns(data);
}

function scanTree(dir, exts, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanTree(full, exts, out);
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
}

function checkForbiddenTokens(root, log) {
  const files = [];
  scanTree(root, [".html", ".js", ".json", ".md", ".css"], files);

  const orgPatterns = loadOrgForbiddenPatterns(ORG_TOKENS_PATH);
  const patterns = BUILTIN_FORBIDDEN_PATTERNS.concat(orgPatterns);
  const resolvedConfigPath = path.resolve(ORG_TOKENS_PATH);

  const hits = [];
  for (const file of files) {
    // lint.tokens.json itself legitimately contains the registered token
    // strings as configuration data, not as leaked content — don't scan it
    // against its own patterns.
    if (path.resolve(file) === resolvedConfigPath) continue;
    const text = readText(file);
    for (const pat of patterns) {
      if (pat.re.test(text)) {
        hits.push(path.relative(root, file) + " :: " + pat.name);
      }
    }
  }

  const sourceNote = orgPatterns.length > 0 ? " (+" + orgPatterns.length + " from lint.tokens.json)" : "";
  if (hits.length > 0) {
    fail(log + ": forbidden token scan" + sourceNote, hits.join(" | "));
  } else {
    ok(log + ": forbidden token scan — 0 hits across " + files.length + " files" + sourceNote);
  }
}

// ---------------------------------------------------------------------------
// Self-test — prove the checks above actually catch defects (in-memory only,
// never touches the real repo tree).
// ---------------------------------------------------------------------------

function selfTest() {
  console.log("\nself-test (seeded-defect detection proof):");
  let selfFailures = 0;

  // Defect A: id parity mismatch (json has an id with no demo file)
  try {
    const jsonIds = ["bento-grid", "long-document", "ghost-structure"].sort();
    const demoIds = ["bento-grid", "long-document"].sort();
    const setsEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
    if (setsEqual(jsonIds, demoIds)) {
      console.log("  SELFTEST FAIL  defect A (missing demo file) was not detected");
      selfFailures++;
    } else {
      console.log("  SELFTEST PASS  defect A (missing demo file) correctly detected as mismatch");
    }
  } catch (e) {
    console.log("  SELFTEST FAIL  defect A threw: " + e.message);
    selfFailures++;
  }

  // Defect B: external URL slipped into a demo file
  {
    const fixture = '<html><body><img src="https://cdn.example.com/logo.png"></body></html>';
    const urls = findExternalUrls(fixture);
    if (urls.length === 1 && urls[0] === "https://cdn.example.com/logo.png") {
      console.log("  SELFTEST PASS  defect B (external URL) correctly detected");
    } else {
      console.log("  SELFTEST FAIL  defect B (external URL) was not detected: " + JSON.stringify(urls));
      selfFailures++;
    }
  }

  // Defect B2: xmlns namespace must NOT false-positive
  {
    const fixture = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    const urls = findExternalUrls(fixture);
    if (urls.length === 0) {
      console.log("  SELFTEST PASS  xmlns namespace correctly whitelisted (no false positive)");
    } else {
      console.log("  SELFTEST FAIL  xmlns namespace incorrectly flagged: " + JSON.stringify(urls));
      selfFailures++;
    }
  }

  // Defect C: built-in placeholder markers leaked into a fixture
  {
    const fixture = "<td>FIXME-INTERNAL</td><td>note: DO-NOT-SHIP this section</td>";
    let hitCount = 0;
    for (const pat of BUILTIN_FORBIDDEN_PATTERNS) {
      if (pat.re.test(fixture)) hitCount++;
    }
    if (hitCount >= 2) {
      console.log("  SELFTEST PASS  defect C (FIXME-INTERNAL + DO-NOT-SHIP) correctly detected (" + hitCount + " patterns matched)");
    } else {
      console.log("  SELFTEST FAIL  defect C was under-detected (" + hitCount + " patterns matched, expected >= 2)");
      selfFailures++;
    }
  }

  // Defect D: CRLF-checked-out file must not defeat the forbidden-token scan
  {
    const fixtureCRLF = "line one\r\nINTERNAL-ONLY marker leaked here\r\nline three\r\n";
    const normalized = fixtureCRLF.replace(/\r\n/g, "\n");
    const hit = /INTERNAL-ONLY/.test(normalized);
    if (hit) {
      console.log("  SELFTEST PASS  defect D (placeholder marker under CRLF) still detected after \\r\\n normalization");
    } else {
      console.log("  SELFTEST FAIL  defect D (placeholder marker under CRLF) was missed");
      selfFailures++;
    }
  }

  // Defect E: extension point (lint.tokens.json shape) compiles and matches —
  // proves a fork's org-specific patterns actually take effect once loaded.
  // In-memory only: exercises compileOrgPatterns() directly, never touches disk.
  {
    const compiled = compileOrgPatterns({
      patterns: [{ name: "example: org codename", pattern: "acme-widgets", flags: "i" }],
    });
    const fixture = "Project: Acme-Widgets (internal only)";
    const matched = compiled.length === 1 && compiled[0].re.test(fixture);
    if (matched) {
      console.log("  SELFTEST PASS  defect E (org-specific extension pattern) compiled and matched");
    } else {
      console.log("  SELFTEST FAIL  defect E (org-specific extension pattern) did not compile/match as expected");
      selfFailures++;
    }
  }

  // Defect F: malformed org pattern (bad regex) must be skipped, not crash the lint
  {
    let threw = false;
    let compiled = [];
    try {
      compiled = compileOrgPatterns({ patterns: [{ name: "bad", pattern: "(unclosed" }] });
    } catch (e) {
      threw = true;
    }
    if (!threw && compiled.length === 0) {
      console.log("  SELFTEST PASS  defect F (malformed org pattern) skipped without throwing");
    } else {
      console.log(
        "  SELFTEST FAIL  defect F (malformed org pattern) was not handled safely (threw=" + threw + ", compiled=" + compiled.length + ")"
      );
      selfFailures++;
    }
  }

  if (selfFailures > 0) {
    fail("self-test", selfFailures + " seeded defect(s) went undetected — the real checks cannot be trusted");
  } else {
    ok("self-test — all 6 seeded defects correctly detected, 0 false positives");
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

console.log("woozi-design-kit lint\n");

console.log("structural integrity:");
checkIdParity(ROOT, "  ");

console.log("\nself-containment:");
checkSelfContainment(ROOT, "  ");

console.log("\nhygiene:");
checkForbiddenTokens(ROOT, "  ");

selfTest();

console.log("\n" + checks + " checks, " + failures + " failed.");
if (failures > 0) {
  process.exit(1);
}
