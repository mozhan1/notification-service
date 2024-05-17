/**
 * The purpose of this interface is to provide a flexible and generic type for objects where the specific keys are not known in advance, 
 * and the values can be of any type. 
 * It allows you to work with objects that have arbitrary string keys without specifying the exact structure.
 */
export interface ObjectLiteral {
  [key : string] : unknown;
}
