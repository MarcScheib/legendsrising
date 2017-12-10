import { Entity, hasOne, resource } from '../features/persistence';
import { UserEntity } from './user-entity';

@resource('news')
export class NewsEntity extends Entity {
  @hasOne(UserEntity)
  user: UserEntity = null;

  title: string;
}
