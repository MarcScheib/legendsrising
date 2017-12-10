import { Entity, resource } from 'resources/features/persistence';

@resource('param', 'param/:someId/sub')
export class ParamEntity extends Entity {

}
