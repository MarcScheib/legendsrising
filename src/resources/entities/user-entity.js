import {Entity} from '../features/persistence/entity';
import {resource} from '../features/persistence/decorator/resource';
import {hasOne} from '../features/persistence/decorator/has-one';

@resource('users')
export class UserEntity extends Entity {
}
