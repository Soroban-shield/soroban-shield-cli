import { describe, it, expect } from 'vitest';
import { render } from '../../src/utils/template.js';

describe('template', () => {
  it('renders handlebars', () => {
    expect(render('Hello {{name}}', { name: 'Shield' })).toBe('Hello Shield');
  });
});
