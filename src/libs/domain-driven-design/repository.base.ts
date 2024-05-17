import { EventEmitter2 } from '@nestjs/event-emitter';
import { Mapper } from '@libs/mapper.interface';
import { ObjectLiteral } from '@libs/object-literal.type';
import { AggregateRoot } from '@libs/domain-driven-design/aggregate-root.base';

export abstract class RepositoryBase<
Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral> {
  constructor(
    protected readonly eventEmitter : EventEmitter2,
    //protected readonly logger: LoggerPort,
    protected readonly mapper : Mapper<Aggregate, DbModel>,

  ) {}

  /**
   * Publishes domain events of an aggregate.
   *
   * @param aggregate The aggregate whose events are to be published.
   */
  protected async publishDomainEvents( aggregate : Aggregate ) : Promise<void> {
    const events = aggregate.domainEvents;

    for ( const event of events ) {
      this.eventEmitter.emit( event.constructor.name, event );
      //this.logger.debug( `Published domain event: ${event.constructor.name}` );
    }

    // Clear events after publishing to prevent duplicate handling
    aggregate.clearEvents();
  }
}
