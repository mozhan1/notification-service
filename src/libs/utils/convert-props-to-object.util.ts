/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { Entity } from '../domain-driven-design/entity.base';
import { ValueObject } from '../domain-driven-design/value-object.base';

function isEntity( obj : unknown ) : obj is Entity<unknown> {
  /**
   * 'instanceof Entity' causes error here for some reason.
   * Probably creates some circular dependency. This is a workaround
   * until I find a solution :)
   */
  
  if ( obj === null || obj === undefined )
    return false
  
  return (
    Object.hasOwn( obj as object, 'toObject' ) &&
    Object.hasOwn( obj as object, 'id' ) &&
    ValueObject.isValueObject( ( obj as Entity<unknown> ).idToString )
  );
}

function convertToPlainObject( item : any ) : any {

  if ( ValueObject.isValueObject( item ) ) {
    return item.unpack();
  }
  if ( isEntity( item ) ) {
    return item.toObject();
  }
  return item;
}

/**
 * Converts Entity/Value Objects props to a plain object.
 * Useful for testing and debugging.
 * @param props
 */
export function convertPropsToObject( props : any ) : any {
  const propsCopy = structuredClone( props );

  // eslint-disable-next-line guard-for-in
  for ( const prop in propsCopy ) {
    if ( Array.isArray( propsCopy[prop] ) ) {
      propsCopy[prop] = ( propsCopy[prop] as Array<unknown> ).map( ( item ) => {
        return convertToPlainObject( item );
      } );
    }
    propsCopy[prop] = convertToPlainObject( propsCopy[prop] );
  }

  return propsCopy;
}
