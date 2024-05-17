import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DataModel,
  Response = any,
> {
  toPersistence( entity : DomainEntity ) : DataModel;
  toDomain( record : any ) : DomainEntity;
  toResponse( entity : DomainEntity ) : Response;
}
