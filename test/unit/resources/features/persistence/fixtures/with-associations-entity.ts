import { Entity, hasOne, resource } from 'resources/features/persistence';
import { BaseEntity } from './base-entity';
import { BarEntity } from './bar-entity';

@resource()
export class WithAssociationsEntity extends Entity {
  @hasOne(BaseEntity)
  base: BaseEntity = null;

  @hasOne()
  bar: any = null;

  @hasOne('bar')
  anotherBar: BarEntity = null;
}
