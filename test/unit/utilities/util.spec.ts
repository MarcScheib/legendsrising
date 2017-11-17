import { _titlecase } from '../../../src/utilities/util';

describe('the Utilities module', () => {
  it('titelcases strings', () => {
    expect(_titlecase('test')).toBe('Test');
    expect(_titlecase('testTest')).toBe('Test Test');
  });
});
