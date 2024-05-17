import { convertPropsToObject } from '@libs/utils/convert-props-to-object.util';
import { Guard } from '@libs/guard';
import { ArgumentNotProvidedException } from '@libs/exceptions/exceptions';

/**
 * Domain Primitive is an object that contains only a single value
 */
export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value : T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

/**
 * Abstract class to be used as a base for value objects.
 */
export abstract class ValueObject<T> {

  protected readonly props : ValueObjectProps<T>;

  constructor( props : ValueObjectProps<T> ) {

    this.checkIfEmpty( props );

    this.validate( props ); // Ensure validation logic is run on construction

    this.props = props;
  }

  /**
   * Abstract validation method to enforce invariants of the value object.
   * This method should throw an error if the invariants are violated.
   * @param props - The properties to be validated.
   */
  protected abstract validate( props : ValueObjectProps<T> ) : void;

  static isValueObject( obj : unknown ) : obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }
  
  /**
   * Equality method to compare two value objects for equality.
   * Value objects are equal when their properties are equal.
   * @param vo - The value object to compare against.
   */
  public equals( vo ?: ValueObject<T> ) : boolean {
    if ( vo === null || vo === undefined ) {
      return false;
    }
    return JSON.stringify( this ) === JSON.stringify( vo );
  }

  private checkIfEmpty( props : ValueObjectProps<T> ) : void {
    if (
      Guard.isEmpty( props ) ||
      ( this.isDomainPrimitive( props ) && Guard.isEmpty( props.value ) )
    ) {
      throw new ArgumentNotProvidedException( 'Property cannot be empty' );
    }
  }

  /**
   * Unpack a value object to get its raw properties
   */
  public unpack() : T {
    if ( this.isDomainPrimitive( this.props ) ) {
      return this.props.value;
    }

    const propsCopy = convertPropsToObject( this.props );

    return Object.freeze( propsCopy );
  }

  private isDomainPrimitive(
    obj : unknown,
  ) : obj is DomainPrimitive<T & ( Primitives | Date )> {
    return Object.hasOwn( obj as object, 'value' );

  }
}
