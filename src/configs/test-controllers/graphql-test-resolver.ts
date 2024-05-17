import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphQLHealthCheckResolver {

  @Query( () => String )
  healthCheck() : any {

    return JSON.stringify(  {
      status: 'UP',
      message: 'Server is running'
    } );
  }
}
