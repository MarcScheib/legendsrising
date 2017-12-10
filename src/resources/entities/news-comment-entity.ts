import { Entity, resource } from '../features/persistence';

@resource('news/:newsId/comments')
export class NewsCommentEntity extends Entity {
}
