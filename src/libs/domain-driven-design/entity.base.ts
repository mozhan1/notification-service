import { UuidValueObject } from '@domain/aggregates/shared-value-objects/uuid.value-object';
import { ArgumentInvalidException, ArgumentNotProvidedException, ArgumentOutOfRangeException } from '@libs/exceptions/exceptions';
import { Guard } from '@libs/guard';
import { convertPropsToObject } from '@libs/utils/convert-props-to-object.util';

export type AggregateId = UuidValueObject;

export interface BaseEntityProps {
  id : AggregateId;
  createdAt : Date;
  updatedAt : Date;
}

export interface CreateEntityProps<T> {
  props : T;
  createdAt ?: Date;
  updatedAt ?: Date;
}

/**
 * Abstract class to be used as a base for entities adhering to domain design principles.
 */
export abstract class Entity<EntityProps> {

  constructor( id : AggregateId, {
    createdAt,
    updatedAt,
    props,
  } : CreateEntityProps<EntityProps> ) {
    this.setId( id );
    this.validateProps( props );

    const now = new Date();

    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    this.validate( props );
  }

  protected readonly props : EntityProps;

  protected  _id : AggregateId;

  private readonly _createdAt : Date;

  private readonly _updatedAt : Date;

  /**
   * Abstract validation method to enforce invariants of the entity.
   * This method should throw an error if the invariants are violated.
   * It can be implemented to validate `this.props` as required.
   */
  protected abstract validate( props : EntityProps ) : void;

  private validateProps( props : EntityProps ) : void {
    const MAX_PROPS = 50;

    if ( Guard.isEmpty( props ) ) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
    if ( typeof props !== 'object' ) {
      throw new ArgumentInvalidException( 'Entity props should be an object' );
    }
    if ( Object.keys( props as any ).length > MAX_PROPS ) {
      throw new ArgumentOutOfRangeException(
        `Entity props should not have more than ${MAX_PROPS} properties`,
      );
    }
  }

  static isEntity( entity : unknown ) : entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   * Method to compare two entities for equality.
   * Entities are equal if their identities (ids) are equal.
   * @param entity - The entity to compare against.
   */
  /**
   *  Checks if two entities are the same Entity by comparing ID field.
   * @param object Entity
   */
  public equals( object ?: Entity<EntityProps> ) : boolean {
    if ( object === null || object === undefined ) {
      return false;
    }

    if ( this === object ) {
      return true;
    }

    if ( !Entity.isEntity( object ) ) {
      return false;
    }

    return this.idToString ? this.idToString === object.idToString : false;
  }

  /**
   * Convert an Entity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  public toObject() : unknown {
    const plainProps = convertPropsToObject( this.props );

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    };

    return Object.freeze( result );
  }

  /**
   * Returns entity properties.
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getProps() : EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze( propsCopy );
  }

  private setId( id : AggregateId ) : void {
    this._id = id;
  }

  get createdAt() : Date {
    return this._createdAt;
  }

  get updatedAt() : Date {
    return this._updatedAt;
  }

  /**
   * Get the entity's identity.
   */
  get idToString() : string {
    return this._id.toString;
  }

  get Id() : AggregateId {
    return this._id;
  }
}
