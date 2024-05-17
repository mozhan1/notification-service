import { Result } from 'oxide.ts';

export interface Mapper<DomainEntity, DbRecord = unknown> {
  toPersistence( entity : DomainEntity ) : DbRecord;
  toDomain( record : unknown ) : Result<DomainEntity, string>;
  //toResponse( entity : DomainEntity ) : ResponseDTO;
}
