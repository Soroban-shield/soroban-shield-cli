export interface AntiPattern {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  regex: RegExp;
}

export const PATTERNS: AntiPattern[] = [
  {
    id: 'raw-storage-write',
    severity: 'high',
    message: 'Raw storage write outside accessor function',
    regex: /storage\(\)\.instance\(\)\.set/g,
  },
  {
    id: 'missing-auth',
    severity: 'high',
    message: 'Privileged function without require_auth',
    regex: /pub fn \w+\([^)]*\)[^{]*\{[^}]*$/gm,
  },
  {
    id: 'single-step-ownable',
    severity: 'medium',
    message: 'Ownership transfer may not use 2-step pattern',
    regex: /set\(&OWNER.*new_owner/g,
  },
];
