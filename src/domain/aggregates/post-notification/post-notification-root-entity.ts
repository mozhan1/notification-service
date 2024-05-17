import {AggregateRoot} from "@nestjs/cqrs";
import {ArgumentInvalidException} from "@libs/exceptions/exceptions";

interface PostNotificationProps {
    postNotificationId: string;
    postId: string;
    postNotificationType: string;
    postNotificationMessage: string | null;
    postNotificationRead: boolean;
    postNotificationReadAt: Date | null;
    postNotificationCreatedAt: Date;
    profileId: string;
}

export class PostNotificationRootEntity extends AggregateRoot<PostNotificationProps> {
    declare protected readonly _id: string;

    protected validate(props : PostNotificationProps ): void {
        if (!props.postNotificationId) {
            throw new ArgumentInvalidException('Post notification id is required.');
        }
        if (!props.postId) {
            throw new ArgumentInvalidException('Post id is required.');
        }
        if (!props.postNotificationType) {
            throw new ArgumentInvalidException('Post notification type is required.');
        }
    }
}
