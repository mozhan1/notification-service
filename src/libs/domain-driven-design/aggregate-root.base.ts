import { DomainEvent } from './domain-event.base';
import { Entity } from './entity.base';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestContextService } from '@application/context/AppRequestContext';
import { LoggerService } from '@nestjs/common';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents : DomainEvent[] = [];

  get domainEvents() : DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent( domainEvent : DomainEvent ) : void {
    this._domainEvents.push( domainEvent );
  }

  public clearEvents() : void {
    this._domainEvents = [];
  }

  public async publishEvents(
    logger : LoggerService,
    eventEmitter : EventEmitter2,
  ) : Promise<void> {
    await Promise.all(
      this.domainEvents.map( async ( event ) => {
        logger.log(
          `[${RequestContextService.getRequestId()}] "${
            event.constructor.name
          }" event published for aggregate ${this.constructor.name} : ${
            this.idToString
          }`,
        );
        return eventEmitter.emitAsync( event.constructor.name, event );
      } ),
    );
    this.clearEvents();
  }
}
