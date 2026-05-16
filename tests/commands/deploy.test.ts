import { describe, it, expect } from 'vitest';
import { getNetwork } from '../../src/utils/network.js';

describe('deploy', () => {
  it('resolves testnet config', () => {
    expect(getNetwork('testnet').name).toBe('testnet');
  });
});
