import {ArgumentInvalidException} from "@libs/exceptions/exceptions";
import {AggregateRoot} from "@libs/domain-driven-design/aggregate-root.base";

enum NotificationTypes {
    LIKE = 'LIKE',
    COMMENT = 'COMMENT',
    SHARE = 'SHARE',
    FOLLOW = 'FOLLOW',
    MENTION = 'MENTION',
    REPLY = 'REPLY',
    REACTION = 'REACTION',
}

interface PostNotificationProps {
    postNotificationId: string | null;
    postId: string | null;
    notificationTypes: string | null;
    postNotificationMessage: string | null;
    postNotificationRead: boolean;
    postNotificationReadAt : Date | null;
    postNotificationCreatedAt: Date | null;
    profileId: string | null;
}

export class PostNotificationRootEntity extends AggregateRoot<PostNotificationProps> {
    declare protected readonly _id: string;

    protected validate(props : PostNotificationProps ): void {
    }
}
