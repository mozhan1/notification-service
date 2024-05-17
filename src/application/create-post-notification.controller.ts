import {Controller, Post} from "@nestjs/common";
import {PostNotificationRootEntity} from "@domain/aggregates/post-notification/post-notification-root-entity";


@Controller('create-post-notification')
export class CreatePostNotificationController {

    @Post()
    createPostNotification() {

        const postNotification = new PostNotificationRootEntity( '1', {
            props: {
                postNotificationId: '1',
                postId: '1',
                notificationTypes: 'LIKE',
                postNotificationMessage: 'You have a new like',
                postNotificationRead: false,
                postNotificationReadAt: new Date(),
                postNotificationCreatedAt: new Date(),
                profileId: '1'
            }
        });
        return {
            status: 'success',
            data :' Post Notification Created Successfully',
        };
    }

}
