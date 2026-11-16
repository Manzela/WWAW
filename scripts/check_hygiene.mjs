#!/usr/bin/env node
// Public-repository hygiene check.
//
// Scope (deliberately narrow):
//   1. Blocks committed environment files (.env, .env.*), except documented templates.
//   2. Flags common credential formats and local home-directory paths in text files.
//   3. Flags unresolved decision markers so placeholder text cannot ship.
//   4. Confirms every *.json file parses.
//
// Out of scope: Worldwide Agentic Web conformance. Use the reference tooling in
// cognizant-ai-labs/agentic-web for that (see docs/CONFORMANCE_CHECKLIST.md).
// This check is a safety net, not a replacement for GitHub secret scanning.
//
// Usage:
//   node scripts/check_hygiene.mjs              scan the repository
//   node scripts/check_hygiene.mjs --self-test  verify every rule fires on synthetic input

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const ALLOWED_ENV_TEMPLATES = new Set([".env.example", ".env.template", ".env.sample"]);
const SKIPPED_DIRS = new Set([".git", "node_modules"]);
const TEXT_EXTENSIONS = new Set([
  ".md", ".txt", ".json", ".hocon", ".conf", ".js", ".mjs", ".cjs", ".ts", ".tsx",
  ".jsx", ".html", ".css", ".yml", ".yaml", ".py", ".sh", ".toml", ".svg",
]);

// Patterns are assembled at runtime so this file never contains a literal match.
function buildRules() {
  const posixHome = ["Users", "home"].map((dir) => `/${dir}/[A-Za-z0-9._-]+/`).join("|");
  const windowsHome = ["[A-Za-z]:", "Users", "[A-Za-z0-9._-]+"].join("\\\\{1,2}");
  const marker = ["DECISION", "PENDING"].join("-");
  return [
    { label: "OpenAI-style API key", pattern: new RegExp(`\\b${"sk"}-(?:proj-|live-|test-)?[A-Za-z0-9_-]{20,}`) },
    { label: "Otari API key", pattern: new RegExp(`\\b${"otk"}_[A-Za-z0-9_-]{16,}`) },
    { label: "GitHub token", pattern: new RegExp(`\\b${"gh"}[pousr]_[A-Za-z0-9_]{20,}`) },
    { label: "GitHub fine-grained token", pattern: new RegExp(`\\b${"github_pat"}_[A-Za-z0-9_]{20,}`) },
    { label: "Google API key", pattern: new RegExp(`\\b${"AIza"}[0-9A-Za-z_-]{35}`) },
    { label: "AWS access key ID", pattern: new RegExp(`\\b${"AKIA"}[0-9A-Z]{16}\\b`) },
    { label: "Private key block", pattern: new RegExp(`-----BEGIN (?:RSA |EC |OPENSSH |DSA )?${"PRIVATE KEY"}-----`) },
    { label: "Local POSIX home path", pattern: new RegExp(`(?:^|[\\s"'\`(=])(?:${posixHome})`) },
    { label: "Local Windows user path", pattern: new RegExp(`(?:^|[\\s"'\`(=])${windowsHome}`) },
    { label: "Unresolved decision marker", pattern: new RegExp(`\\[\\[${marker}`) },
  ];
}

function listFiles() {
  try {
    const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    return out.split("\0").filter(Boolean).filter((p) => fs.existsSync(path.join(REPO_ROOT, p)));
  } catch {
    const found = [];
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (SKIPPED_DIRS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.isFile()) found.push(path.relative(REPO_ROOT, full));
      }
    };
    walk(REPO_ROOT);
    return found;
  }
}

function isTextFile(relPath) {
  const base = path.basename(relPath);
  return base === "LICENSE" || base.startsWith(".") || TEXT_EXTENSIONS.has(path.extname(relPath).toLowerCase());
}

function isForbiddenEnvFile(relPath) {
  const base = path.basename(relPath);
  return (base === ".env" || base.startsWith(".env.")) && !ALLOWED_ENV_TEMPLATES.has(base);
}

function scanText(label, content, rules, findings) {
  content.split(/\r?\n/).forEach((line, idx) => {
    for (const rule of rules) {
      if (rule.pattern.test(line)) findings.push(`${label}:${idx + 1}: ${rule.label}`);
    }
  });
}

function scanRepository() {
  const rules = buildRules();
  const files = listFiles();
  const findings = [];
  let jsonCount = 0;

  for (const relPath of files) {
    if (isForbiddenEnvFile(relPath)) {
      findings.push(`${relPath}: environment file must not be committed`);
      continue;
    }
    if (!isTextFile(relPath)) continue;

    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
    scanText(relPath, content, rules, findings);

    if (relPath.toLowerCase().endsWith(".json")) {
      jsonCount += 1;
      try {
        JSON.parse(content);
      } catch (err) {
        findings.push(`${relPath}: invalid JSON (${err.message})`);
      }
    }
  }

  console.log(`Hygiene check: ${files.length} file(s) scanned, ${jsonCount} JSON file(s) parsed.`);
  if (findings.length > 0) {
    console.error("Hygiene check failed:");
    for (const finding of findings) console.error(`  - ${finding}`);
    process.exit(1);
  }
  console.log("Hygiene check passed.");
}

function selfTest() {
  const rules = buildRules();
  const repeat = (ch, n) => ch.repeat(n);
  const positives = {
    "OpenAI-style API key": `key = "${"sk"}-${repeat("a", 24)}"`,
    "Otari API key": `${"otk"}_${repeat("b", 20)}`,
    "GitHub token": `${"gh"}p_${repeat("c", 30)}`,
    "GitHub fine-grained token": `${"github_pat"}_${repeat("d", 30)}`,
    "Google API key": `${"AIza"}${repeat("e", 35)}`,
    "AWS access key ID": `${"AKIA"}${repeat("F", 16)}`,
    "Private key block": `-----BEGIN ${"PRIVATE KEY"}-----`,
    "Local POSIX home path": ` /${"Users"}/someone/project`,
    "Local Windows user path": ` C:\\${"Users"}\\someone\\project`,
    "Unresolved decision marker": `[[${"DECISION"}-${"PENDING"}: contact]]`,
  };
  const negatives = [
    "https://api.otari.ai/api/v1",
    "http://127.0.0.1:8080/",
    "Use an API key that starts with otk_ from your account.",
    "See docs/CONFORMANCE_CHECKLIST.md",
  ];

  const failures = [];
  for (const rule of rules) {
    const sample = positives[rule.label];
    if (!sample || !rule.pattern.test(sample)) failures.push(`rule did not fire: ${rule.label}`);
  }
  for (const sample of negatives) {
    for (const rule of rules) {
      if (rule.pattern.test(sample)) failures.push(`false positive (${rule.label}): ${sample}`);
    }
  }
  if (!isForbiddenEnvFile("app/.env.local") || isForbiddenEnvFile(".env.example")) {
    failures.push("environment file rule misclassified a path");
  }

  if (failures.length > 0) {
    console.error("Self-test failed:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }
  console.log(`Self-test passed: ${rules.length} rules fire on synthetic input, ${negatives.length} negatives clean.`);
}

if (process.argv.includes("--self-test")) selfTest();
else scanRepository();
