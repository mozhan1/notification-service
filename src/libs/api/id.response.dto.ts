import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
  constructor( id : string ) {
    this.id = id;
  }

  @ApiProperty( { example: 'UUID of ID of something, for response standardization' } )
  readonly id : string;
}
