import {FooEntity} from './fixtures/foo-entity';
import {BarEntity} from './fixtures/bar-entity';
import {ParamEntity} from './fixtures/param-entity';

describe('Entity', () => {
  it('Should have the lower cased class name as the resource', () => {
    const entity: FooEntity = new FooEntity();
    expect(entity.getResource()).toBe('fooentity');
    expect(entity.getPath()).toBeUndefined();
  });

  it('Should have the specified name as the resource', () => {
    const entity: BarEntity = new BarEntity();
    expect(entity.getResource()).toBe('bar');
    expect(entity.getPath()).toBeUndefined();
  });

  it('Should have the specified name name as the resource', () => {
    const entity: ParamEntity = new ParamEntity();
    expect(entity.getResource()).toBe('param');
    expect(entity.getPath()).toBe('param/:someId/sub');
  });
});
