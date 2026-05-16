import { AuditFinding } from './audit_rules.js';

export function formatReport(findings: AuditFinding[]): string {
  if (findings.length === 0) return '✅  No issues found.\n';
  const lines = findings.map(
    (f) =>
      `${f.pattern.severity === 'high' ? '❌' : '⚠️'}  [${f.pattern.severity.toUpperCase()}] ${f.pattern.message} (${f.file}:${f.line})`,
  );
  return `${lines.join('\n')}\n\n${findings.length} issue(s) found.\n`;
}
