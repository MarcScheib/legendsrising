import { _hyphenate, _titlecase } from 'utilities/util';

describe('Utilities', () => {
  it('titelcase()', () => {
    expect(_titlecase('test')).toBe('Test');
    expect(_titlecase('testTest')).toBe('Test Test');
  });

  it('hyphenate()', () => {
    expect(_hyphenate('legalNotice')).toBe('legal-notice');
    expect(_hyphenate('testTest')).toBe('test-test');
  });
});
