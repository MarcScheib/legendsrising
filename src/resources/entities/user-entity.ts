import { Entity, resource } from '../features/persistence';

@resource('users')
export class UserEntity extends Entity {
  id: number;
  username: string;
}
