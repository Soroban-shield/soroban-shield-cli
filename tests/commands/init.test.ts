import { describe, it, expect } from 'vitest';
import { MODULES } from '../../src/commands/list.js';

describe('init', () => {
  it('lists default modules', () => {
    expect(MODULES.length).toBeGreaterThan(0);
  });
});
