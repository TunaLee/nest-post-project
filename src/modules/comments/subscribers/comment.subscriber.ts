import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from 'src/modules/posts/entities/post.entity';

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
  listenTo() {
    return Comment;
  }

  async beforeInsert(event: InsertEvent<Comment>) {
    const postRepository = event.manager.getRepository(Post);

    await postRepository.increment(
      { id: event.entity.post.id },
      'commentCount',
      1,
    );
  }
}
