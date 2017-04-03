import {Entity} from '../../../../../../src/resources/features/persistence/entity';
import {resource} from '../../../../../../src/resources/features/persistence/decorator/resource';
import {hasOne} from '../../../../../../src/resources/features/persistence/decorator/has-one';
import {BaseEntity} from './base-entity';

@resource()
export class WithAssociationsEntity extends Entity {
  @hasOne(BaseEntity)
  base = null;
}
