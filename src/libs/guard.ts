import Decimal from 'decimal.js';

export class Guard {
  /**
   * Checks if value is empty. Accepts strings, numbers, booleans, objects and arrays.
   */
  static isEmpty( value : unknown ) : boolean {
    if ( typeof value === 'number' || typeof value === 'boolean' ) {
      return false;
    }
    if ( typeof value === 'undefined' || value === null ) {
      return true;
    }
    if ( value instanceof Date ) {
      return false;
    }
    if ( value instanceof Object && !Object.keys( value ).length ) {
      return true;
    }
    if ( Array.isArray( value ) ) {
      if ( value.length === 0 ) {
        return true;
      }
      if ( value.every( ( item ) => Guard.isEmpty( item ) ) ) {
        return true;
      }
    }
    if ( value === '' ) {
      return true;
    }

    return false;
  }

  /**
   * Checks length range of a provided number/string/array
   */
  static lengthIsBetween( value : number | string | Array<unknown> | Decimal, min : number, max : number ) : boolean {
    if ( Guard.isEmpty( value ) ) {
      throw new Error( 'Cannot check length of a value. Provided value is empty' );
    }
    if ( value instanceof Decimal )
      return value.greaterThanOrEqualTo( min ) && value.lessThanOrEqualTo( max );

    const valueLength = typeof value === 'number' ? Number( value ).toString().length : value.length;
    return valueLength >= min && valueLength <= max;
  }

  /**
   * Checks if a value is a non-negative integer.
   * This method is used to validate that the age value is not negative and is an integer.
   *
   * @param value - The value to check.
   * @returns {boolean} True if the value is a non-negative integer, false otherwise.
   */
  public static isNonNegativeInteger( value : number ) : boolean {
    return Number.isInteger( value ) && value >= 0;
  }
}
