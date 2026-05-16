import { describe, it, expect } from 'vitest';
import { formatReport } from '../../src/validators/report.js';

describe('validators', () => {
  it('formats empty report', () => {
    expect(formatReport([])).toContain('No issues');
  });
});
