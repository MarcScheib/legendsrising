import { Entity } from '../features/persistence/entity';
import { resource } from '../features/persistence/decorator/resource';

@resource('users')
export class UserEntity extends Entity {
  id: number;
}
