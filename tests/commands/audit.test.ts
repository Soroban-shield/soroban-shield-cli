import { describe, it, expect } from 'vitest';
import { PATTERNS } from '../../src/validators/patterns.js';

describe('audit', () => {
  it('has anti-patterns defined', () => {
    expect(PATTERNS.length).toBeGreaterThan(0);
  });
});
