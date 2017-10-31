import { resource } from '../features/persistence/decorator/resource';
import { hasOne } from '../features/persistence/decorator/has-one';
import { Entity } from '../features/persistence/entity';
import { UserEntity } from './user-entity';

@resource('news')
export class NewsEntity extends Entity {
  @hasOne(UserEntity)
  user: UserEntity = null;
}
