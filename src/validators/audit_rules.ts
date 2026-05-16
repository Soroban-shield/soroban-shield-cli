import fs from 'node:fs';
import path from 'node:path';
import { AntiPattern, PATTERNS } from './patterns.js';

export interface AuditFinding {
  pattern: AntiPattern;
  file: string;
  line: number;
}

export function scanDirectory(dir: string): AuditFinding[] {
  const findings: AuditFinding[] = [];
  if (!fs.existsSync(dir)) return findings;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findings.push(...scanDirectory(full));
    else if (entry.name.endsWith('.rs')) findings.push(...scanFile(full));
  }
  return findings;
}

function scanFile(filePath: string): AuditFinding[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings: AuditFinding[] = [];
  for (const pattern of PATTERNS) {
    lines.forEach((line, idx) => {
      if (pattern.regex.test(line)) {
        findings.push({ pattern, file: filePath, line: idx + 1 });
      }
    });
  }
  return findings;
}
