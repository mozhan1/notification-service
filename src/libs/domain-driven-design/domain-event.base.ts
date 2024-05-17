import { randomUUID } from 'crypto';
import { ArgumentNotProvidedException } from '@libs/exceptions/exceptions';
import { Guard } from '../guard';

type DomainEventMetadata = {
  /** Timestamp when this domain event occurred */
  readonly timestamp : number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId : string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId ?: string;

  /**
   * Profile ID for debugging and logging purposes
   */
  readonly profileId ?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId : string;
  metadata ?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id : string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId : string;

  public readonly metadata : DomainEventMetadata;

  constructor( props : DomainEventProps<unknown> ) {
    if ( Guard.isEmpty( props ) ) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }
    this.id = randomUUID();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId:
        props?.metadata?.correlationId || '1',
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      profileId: props?.metadata?.profileId,
    };
  }
}
