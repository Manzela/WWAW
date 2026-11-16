#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const IGNORED_DIRS = new Set([".git", "node_modules", ".venv", "venv", "dist", "build"]);
const TEXT_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".json",
  ".hocon",
  ".conf",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".html",
  ".css",
  ".yml",
  ".yaml",
  ".py",
  ".sh",
  ".toml",
]);

/**
 * Build secret and local-path hygiene checks without embedding literal test strings.
 */
function buildHygieneRules() {
  const macLinuxHome = ["Users", "home"].map((dir) => `/${dir}/[A-Za-z0-9._-]+/`).join("|");
  const winHome = ["[A-Za-z]:", "Users", "[A-Za-z0-9._-]+"].join("\\\\{1,2}");

  return [
    { label: "OpenAI-style API key", pattern: new RegExp(`\\b${"sk"}-(?:proj-|live-|test-)?[A-Za-z0-9_-]{20,}\\b`) },
    { label: "GitHub token", pattern: new RegExp(`\\b${"gh"}[pousr]_[A-Za-z0-9_]{20,}\\b`) },
    { label: "GitHub fine-grained PAT", pattern: new RegExp(`\\b${"github_pat"}_[A-Za-z0-9_]{20,}\\b`) },
    { label: "Google API key", pattern: new RegExp(`\\b${"AIza"}[0-9A-Za-z_-]{35}\\b`) },
    { label: "AWS access key", pattern: new RegExp(`\\b${"AKIA"}[0-9A-Z]{16}\\b`) },
    { label: "Private key block", pattern: new RegExp(`-----BEGIN (?:RSA |EC |OPENSSH |DSA )?${"PRIVATE KEY"}-----`) },
    { label: "Local POSIX home path", pattern: new RegExp(`(?:^|[\\s"'\`(=])(?:${macLinuxHome})`) },
    { label: "Local Windows user path", pattern: new RegExp(`(?:^|[\\s"'\`(=])${winHome}`) },
  ];
}

/**
 * List repository files using git (tracked + unignored untracked), with directory walk fallback.
 */
function listRepositoryFiles() {
  try {
    const stdout = execFileSync(
      "git",
      ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
      { cwd: REPO_ROOT, encoding: "utf8" }
    );
    return stdout
      .split("\0")
      .filter(Boolean)
      .filter((relPath) => fs.existsSync(path.join(REPO_ROOT, relPath)));
  } catch {
    const results = [];
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (IGNORED_DIRS.has(entry.name)) {
          continue;
        }
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          results.push(path.relative(REPO_ROOT, fullPath));
        }
      }
    };
    walk(REPO_ROOT);
    return results;
  }
}

/**
 * Check whether a file should be scanned as UTF-8 text.
 */
function isTextFile(relPath) {
  const base = path.basename(relPath);
  if (base === "LICENSE" || base.startsWith(".")) {
    return true;
  }
  return TEXT_EXTENSIONS.has(path.extname(relPath).toLowerCase());
}

/**
 * Check that no committed or unignored .env files or sensitive patterns exist.
 */
function checkHygiene(files, rules, errors) {
  for (const relPath of files) {
    const base = path.basename(relPath);
    if (
      (base === ".env" || base.startsWith(".env.")) &&
      ![".env.example", ".env.template", ".env.sample"].includes(base)
    ) {
      errors.push(`${relPath}: disallowed environment file present in repository`);
      continue;
    }

    if (!isTextFile(relPath)) {
      continue;
    }

    const content = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
    const lines = content.split(/\r?\n/);
    for (let idx = 0; idx < lines.length; idx += 1) {
      for (const rule of rules) {
        if (rule.pattern.test(lines[idx])) {
          errors.push(`${relPath}:${idx + 1}: potential ${rule.label} detected`);
        }
      }
    }
  }
}

/**
 * Parse a JSON file safely, recording syntax errors if invalid.
 */
function readJson(relPath, errors) {
  try {
    const raw = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
    return { raw, data: JSON.parse(raw) };
  } catch (err) {
    errors.push(`${relPath}: invalid JSON (${err.message})`);
    return null;
  }
}

/**
 * Validate agent-manifest.json according to WWAW MVP Profile 0.2.
 */
function validateManifest(relPath, errors) {
  const parsed = readJson(relPath, errors);
  if (!parsed) {
    return;
  }
  const { data } = parsed;
  if (!data || typeof data !== "object" || !Array.isArray(data.networks) || data.networks.length === 0) {
    errors.push(`${relPath}: must declare a non-empty "networks" array`);
    return;
  }

  for (const [index, net] of data.networks.entries()) {
    for (const field of ["name", "front_man", "hocon"]) {
      if (typeof net?.[field] !== "string" || net[field].trim() === "") {
        errors.push(`${relPath}: networks[${index}] missing non-empty "${field}"`);
      }
    }
  }
}

/**
 * Validate *.network.json against WWAW MVP Profile 0.2 data-only requirements.
 */
function validateNetwork(relPath, errors) {
  const parsed = readJson(relPath, errors);
  if (!parsed) {
    return;
  }
  const { raw, data } = parsed;

  if (/^\s*include\b/m.test(raw) || /\$\{[^}]+\}/.test(raw)) {
    errors.push(`${relPath}: contains unresolved HOCON include or variable substitution`);
  }

  if (!data || typeof data !== "object" || !Array.isArray(data.tools) || data.tools.length === 0) {
    errors.push(`${relPath}: must define a non-empty top-level "tools" array`);
    return;
  }

  const seenNames = new Set();
  for (const [index, agent] of data.tools.entries()) {
    if (typeof agent?.name !== "string" || agent.name.trim() === "") {
      errors.push(`${relPath}: tools[${index}] missing non-empty "name"`);
      continue;
    }
    if (seenNames.has(agent.name)) {
      errors.push(`${relPath}: duplicate agent name "${agent.name}"`);
    }
    seenNames.add(agent.name);

    if (typeof agent?.function?.description !== "string" || agent.function.description.trim() === "") {
      errors.push(`${relPath}: agent "${agent.name}" missing "function.description"`);
    }
    if (typeof agent?.instructions !== "string" || agent.instructions.trim() === "") {
      errors.push(`${relPath}: agent "${agent.name}" missing non-empty "instructions"`);
    }
    if (!Array.isArray(agent?.tools)) {
      errors.push(`${relPath}: agent "${agent.name}" must declare a "tools" array`);
    }
  }
}

/**
 * Validate links.json peer-network link map format.
 */
function validateLinks(relPath, errors) {
  const parsed = readJson(relPath, errors);
  if (!parsed) {
    return;
  }
  const { data } = parsed;
  if (typeof data?.version !== "number") {
    errors.push(`${relPath}: must declare numeric "version"`);
  }
  if (!data?.networks || typeof data.networks !== "object" || Array.isArray(data.networks)) {
    errors.push(`${relPath}: must declare an object map "networks"`);
  }
}

function main() {
  const files = listRepositoryFiles();
  const rules = buildHygieneRules();
  const errors = [];

  checkHygiene(files, rules, errors);

  let manifestCount = 0;
  let networkCount = 0;
  let linksCount = 0;

  for (const relPath of files) {
    const base = path.basename(relPath);
    if (base === "agent-manifest.json") {
      manifestCount += 1;
      validateManifest(relPath, errors);
    } else if (base.endsWith(".network.json")) {
      networkCount += 1;
      validateNetwork(relPath, errors);
    } else if (base === "links.json") {
      linksCount += 1;
      validateLinks(relPath, errors);
    }
  }

  console.log(
    `WWAW validation summary: scanned ${files.length} file(s) ` +
      `[manifests: ${manifestCount}, networks: ${networkCount}, link-maps: ${linksCount}]`
  );

  if (errors.length > 0) {
    console.error("Validation failed:");
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log("All WWAW hygiene and specification checks passed.");
}

main();
