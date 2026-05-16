export type ShieldModule =
  | 'ownable'
  | 'access_control'
  | 'pausable'
  | 'reentrancy_guard'
  | 'rate_limiter'
  | 'multi_sig'
  | 'upgradeable';

export const ALL_MODULES: ShieldModule[] = [
  'ownable',
  'access_control',
  'pausable',
  'reentrancy_guard',
  'rate_limiter',
  'multi_sig',
  'upgradeable',
];
