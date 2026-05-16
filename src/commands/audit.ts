import { scanDirectory } from '../validators/audit_rules.js';
import { formatReport } from '../validators/report.js';
import { logger } from '../utils/logger.js';

export function auditCommand(targetDir: string): number {
  const findings = scanDirectory(targetDir);
  process.stdout.write(formatReport(findings));
  const code = findings.some((f) => f.pattern.severity === 'high') ? 1 : 0;
  if (code) logger.error('Audit failed');
  else logger.success('Audit passed');
  return code;
}
