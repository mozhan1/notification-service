import { Controller, Get } from '@nestjs/common';
import { RabbitMQService } from '@infrastructure/rabbitmq/rabbitmq-service';

@Controller( 'test' )
export class TestController {

  constructor(
    private readonly rabbitMQService : RabbitMQService,
  ) {}

  @Get( 'rabbitmq/emit-message' )
  async sendMessage() {
    const message = { content: 'Hello from Memo2!' };
    this.rabbitMQService.emitMessage( 'account.#', message );
    return 'Message sent!';
  }

}
